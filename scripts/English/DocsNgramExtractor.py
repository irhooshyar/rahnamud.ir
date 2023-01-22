from pathlib import Path
from nltk.util import ngrams
from collections import Counter

from abdal import config
from scripts.English import Preprocessing
from en_doc.models import DocumentNgram,Document
import math
import threading
from itertools import chain
import time

def Ngram_Extractor(corpus, n, Document_Dictionary, Result_Create_List, thread_number,):
    Create_List = []
    try:
        for doc_name in corpus:

            doc_id = Document_Dictionary[doc_name]

            content = corpus[doc_name]
            n_gram = list(ngrams(content, n))
            n_gram = Counter(n_gram).most_common()

            for item in n_gram:
                text = " ".join(list(item[0])).lower()
                count = item[1]

                ngram_obj = DocumentNgram(text=text, gram=n, count=count, document_id_id=doc_id)
                Create_List.append(ngram_obj)
    except Exception as e:
        pass

    Result_Create_List[thread_number] = Create_List

def Slice_Dict(docs_dict, n):
    results = []
    docs_dict_keys = list(docs_dict.keys())
    step = math.ceil(docs_dict.keys().__len__() / n)
    for i in range(n):
        start_idx = i * step
        end_idx = min(start_idx + step, docs_dict_keys.__len__())
        res = {}
        for j in range(start_idx, end_idx):
            key = docs_dict_keys[j]
            res[key] = docs_dict[key]
        results.append(res)
    return results


def apply(folder_name, n, Country):
    t = time.time()

    DocumentNgram.objects.filter(document_id__country_id=Country, gram=n).delete()

    dataPath = str(Path(config.DATA_PATH, folder_name))
    input_data = Preprocessing.readFiles_parallel(dataPath, preprocessArg={"stem": False})

    Iter_Count = 32
    Thread_Count = config.Thread_Count
    Sliced_Files = Slice_Dict(input_data, Thread_Count * Iter_Count)

    document = Document.objects.filter(country_id=Country)
    Document_Dictionary = {}
    for doc in document:
        Document_Dictionary[doc.name] = doc.id

    for i in range(Iter_Count):
        print("Iter", i)
        start_idx = i * Thread_Count
        end_idx = min(start_idx + Thread_Count, Sliced_Files.__len__())
        slice_list = Sliced_Files[start_idx:end_idx]
        thread_insert(slice_list, n, Document_Dictionary, Thread_Count)

    print("time ", time.time() - t)

def thread_insert(Sliced_Files, n, Document_Dictionary, Thread_Count):
    Result_Create_List = [None] * Thread_Count
    thread_obj = []
    thread_number = 0
    for S in Sliced_Files:
        thread = threading.Thread(target=Ngram_Extractor,
                                  args=(S, n, Document_Dictionary, Result_Create_List, thread_number,))
        thread_obj.append(thread)
        thread_number += 1
        thread.start()
    for thread in thread_obj:
        thread.join()

    Result_Create_List = list(chain.from_iterable(Result_Create_List))

    print(Result_Create_List.__len__())
    batch_size = 20000
    slice_count = math.ceil(Result_Create_List.__len__() / batch_size)
    for i in range(slice_count):
        start_idx = i * batch_size
        end_idx = min(start_idx + batch_size, Result_Create_List.__len__())
        sub_list = Result_Create_List[start_idx:end_idx]
        DocumentNgram.objects.bulk_create(sub_list)

