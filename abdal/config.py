import os
from pathlib import Path

BASE_PATH = Path(os.path.dirname(__file__)).parent
MEDIA_PATH = Path(BASE_PATH, 'media_cdn')
DATA_PATH = Path(BASE_PATH, 'media_cdn', "data")

DECISION_TREE_PATH = Path(BASE_PATH, 'media_cdn', "decision_tree_data")
DOC_STATIC_PATH = Path(BASE_PATH, 'doc', 'static')
DENDROGRAM_PATH = Path(DOC_STATIC_PATH, "dendrogram_plots")

# /****** Advanced ARIMA ******/
ACF_PATH = Path(DOC_STATIC_PATH, "ACF_plot")
PACF_PATH = Path(DOC_STATIC_PATH, "PACF_plot")
# /****** Advanced ARIMA ******/

RESULT_PATH = Path(BASE_PATH, 'media_cdn', "result")
ZIPS_PATH = Path(BASE_PATH, 'media_cdn', "zips")
PERSIAN_PATH = Path(BASE_PATH, 'text_files', "Persian")
ENGLISH_PATH = Path(BASE_PATH, 'text_files', "English")

BATCH_SIZE = 1000

Thread_Count = 8

# ----------------------------------------------
LOCAL_HUGGINGFACE_CONFIGS = {
    "sentimentAnalyser": "local",
    "taggingAnalyser": "local",
    "classificationAnalyser": "local",
    "machineTranslator": "local",
    "summarizer": "local",
}
SERVER_HUGGINGFACE_CONFIGS = {
    "sentimentAnalyser": "global",
    "taggingAnalyser": "global",
    "classificationAnalyser": "global",
    "machineTranslator": "global",
    "summarizer": "global",
}

LOAD_MODELS = str(os.environ.get('LOAD_MODELS')) == 'true'

# HUGGINGFACE_CONFIGS = SERVER_HUGGINGFACE_CONFIGS if (os.environ.get('LOAD_MODELS') is None or LOAD_MODELS) else LOCAL_HUGGINGFACE_CONFIGS
HUGGINGFACE_CONFIGS = LOCAL_HUGGINGFACE_CONFIGS
SERVER_USER_NAME = "mn76"
# ----------------------------------------------

FULL_ADAPTION_CONFIGS = {
    "rahbari": {
        "index_name": "rahbarifull_rahbari_bm25_index",
        "stopword_filename": "rahbari_doc_similarity_stopwords.txt",
        "document_date": "rahbari_date",
        "document_name": "name",
        "country_name": "اسناد رهبری",
        "is_term_vector_with_position_offset": True,
    },
    "hooshyar": {
        "index_name": "doticfull_document",
        "stopword_filename": "",
        "document_date": "approval_date",
        "document_name": "name",
        "country_name": "هوشیار",
        "is_term_vector_with_position_offset": False,
    },
    "standard": {
        "index_name": "standard_1500_standard",
        "stopword_filename": "",
        "document_date": "approval_year",
        "document_name": "name",
        "country_name": "استاندارد",
        "is_term_vector_with_position_offset": False,

    },
    "tabnak": {
        "index_name": "tabnak_full_document",
        "stopword_filename": "",
        "document_date": "document_date",
        "document_name": "document_name",
        "country_name": "تابناک",
        "is_term_vector_with_position_offset": True,
    },
    "asr_iran": {
        "index_name": "asriran_document",
        "stopword_filename": "",
        "document_date": "document_date",
        "document_name": "document_name",
        "country_name": "عصرایران",
        "is_term_vector_with_position_offset": True,
    },
    "khabar_online": {
        "index_name": "khabar_online_document",
        "stopword_filename": "",
        "document_date": "document_date",
        "document_name": "document_name",
        "country_name": "خبرآنلاین",
        "is_term_vector_with_position_offset": True,
    },
    "isna": {
        "index_name": "isna_full_document",
        "stopword_filename": "",
        "document_date": "document_date",
        "document_name": "document_name",
        "country_name": "ایسنا",
        "is_term_vector_with_position_offset": True,
    },
    "bbc": {
        "index_name": "bbc_full_document",
        "stopword_filename": "",
        "document_date": "document_date",
        "document_name": "document_name",
        "country_name": "BBC",
        "is_term_vector_with_position_offset": False,
    },
}
