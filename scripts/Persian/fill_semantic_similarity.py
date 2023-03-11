from abdal import config
from pathlib import Path
from scripts.Persian import Preprocessing
from doc.models import Document, DocumentParagraphs, ParagraphVector, ParagraphVectorType, ParagraphSemanticSimilarity, \
    DocumentSemanticSimilarity
from scripts.Persian.Preprocessing import standardIndexName
from elasticsearch import Elasticsearch
from abdal import es_config
import pandas as pd
import math
from itertools import chain
import time
import threading
from es_scripts import IngestParagraphsVectorsToElastic
# -----------------------------------
from IPython import display

import numpy as np
import pandas as pd

import hazm
import requests
import time
import torch

es_url = es_config.ES_URL
client = Elasticsearch(es_url, timeout=40)
bucket_size = es_config.BUCKET_SIZE

batch_size = 1000


def apply(folder_name, Country):
    index_name = "rahbarifull_documentparagraphs"
    similar_document_groupBy_agg = {
        "document_agg": {
            "terms": {
                "field": "document_id",
                "size": 2200
            }
        },
    }
    all_document_paragraph_query = {
        "bool": {
            "must": [
                {"range": {"attachment.content_length": {
                    "gt": 150
                }}}
            ]
        }
    }
    all_document_response = client.search(index=index_name,
                                          _source_includes=['attachment.content'],
                                          request_timeout=40,
                                          query=all_document_paragraph_query,
                                          aggregations=similar_document_groupBy_agg,
                                          size=2200
                                          )
    all_document_aggregations = all_document_response['aggregations']['document_agg']['buckets']
    all_document_dict = {item['key']: item['doc_count'] for item in all_document_aggregations}

    paragraph_semantic_similarity_create_list = []
    document_semantic_similarity_create_list = []

    for document_item in all_document_aggregations:
        main_document_id = document_item['key']

        main_document_model = Document.objects.get(id=main_document_id)

        fetch_document_paragraph_query = {
            "bool": {
                "must": [
                    {"term": {"document_id": main_document_id}},
                    {"range": {"attachment.content_length": {
                        "gt": 150
                    }}}
                ]
            }
        }
        main_document_response = client.search(index=index_name,
                                               _source_includes=['attachment.content'],
                                               request_timeout=40,
                                               query=fetch_document_paragraph_query,
                                               size=bucket_size,
                                               )
        main_document_paragraphs = main_document_response['hits']['hits']
        main_doc_paragraphs_count = document_item["doc_count"]

        # -----------------------------------------------------------------

        document_scores_sum = {}

        vector_index_name = index_name + "_vectors"

        for paragraph in main_document_paragraphs:

            paragraph_model = DocumentParagraphs.objects.get(id=paragraph["_id"])
            vector_query = {
                'term': {
                    'paragraph_id': paragraph['_id']
                }
            }
            vector_response = client.search(index=vector_index_name,
                                            _source_includes=['wikitriplet_vector'],
                                            request_timeout=40,
                                            query=vector_query
                                            )

            para_vector = list(vector_response['hits']['hits'][0]['_source']['wikitriplet_vector'])

            knn_qeury = {
                "script_score": {
                    "query": {
                        "bool": {
                            "must_not": {
                                "term": {
                                    "document_id": main_document_id
                                }
                            },
                            "filter": [
                                {"range": {"attachment.content_length": {
                                    "gt": 150
                                }}}
                            ]
                        }
                    },
                    "script": {
                        "source": "cosineSimilarity(params.query_vector, 'wikitriplet_vector') + 1.0",
                        "params": {
                            "query_vector": para_vector
                        }
                    }
                }
            }

            # search and get result
            similarity_response = client.search(index=vector_index_name,
                                                _source_includes=['document_id', 'attachment.content', 'paragraph_id'],
                                                request_timeout=40,
                                                query=knn_qeury,
                                                size=100
                                                )

            similar_paragraphs = similarity_response['hits']['hits']

            paragraph_similarity_string = ""
            for item in similar_paragraphs:
                key = item['_source']['document_id']
                score = item["_score"]
                similar_paragraph_id = item['_source']['document_id']

                paragraph_similarity_string += str(similar_paragraph_id) + "&" + str(score) + "&" + str(key) + ";"
                try:
                    document_scores_sum[key] += score
                except:
                    document_scores_sum[key] = score

            paragraph_semantic_similarity_item = ParagraphSemanticSimilarity(paragraph=paragraph_model,
                                                                             similar_paragraphs=paragraph_similarity_string)
            paragraph_semantic_similarity_create_list.append(paragraph_semantic_similarity_item)
        # normalize -----------------
        for item in document_scores_sum:
            try:
                key = item
                all_paragraphs_count = all_document_dict[key]
                document_scores_sum[key] = document_scores_sum[key] / (all_paragraphs_count * main_doc_paragraphs_count)
            except:
                print("error: ", key)

        paragraph_similars_list = [(item, document_scores_sum[item])
                                   for item in document_scores_sum]
        paragraph_similars_list.sort(key=get_document_count, reverse=True)
        best_doc_list = paragraph_similars_list[:20]
        document_similarity_string = ""
        for document_tuple in best_doc_list:
            document_similarity_string += str(document_tuple[0]) + "&" + str(document_tuple[1]) + ";"

        document_semantic_similarity_item = DocumentSemanticSimilarity(document=main_document_model,
                                                                       similar_documents=document_similarity_string)
        document_semantic_similarity_create_list.append(document_semantic_similarity_item)

        if paragraph_semantic_similarity_create_list.__len__() > batch_size:
            ParagraphSemanticSimilarity.objects.bulk_create(paragraph_semantic_similarity_create_list)
            print('====================\n')
            print(f'{len(paragraph_semantic_similarity_create_list)} paragraph similarity created.')
            print('====================\n')

            paragraph_semantic_similarity_create_list.clear()

        if document_semantic_similarity_create_list.__len__() > batch_size:
            DocumentSemanticSimilarity.objects.bulk_create(document_semantic_similarity_create_list)
            print('====================\n')
            print(f'{len(document_semantic_similarity_create_list)} documents similarity created.')
            print('====================\n')

            document_semantic_similarity_create_list.clear()

    ParagraphSemanticSimilarity.objects.bulk_create(paragraph_semantic_similarity_create_list)
    print('====================\n')
    print(f'{len(paragraph_semantic_similarity_create_list)} paragraph similarity created.')
    print('====================\n')

    DocumentSemanticSimilarity.objects.bulk_create(document_semantic_similarity_create_list)
    print('====================\n')
    print(f'{len(document_semantic_similarity_create_list)} documents similarity created.')
    print('====================\n')

    paragraph_semantic_similarity_create_list.clear()
    document_semantic_similarity_create_list.clear()

    print("...finished")


def get_document_count(item):
    return item[1]
