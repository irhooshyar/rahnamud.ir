async function BM25Similarity() {
    try {
        const document_id = document.getElementById("document").value;
        request_link = 'http://' + location.host + "/GetDocumentsSimilarity/" + document_id + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["docs"]
        similrity_result = []

        document.getElementById("SimilarityTable").innerHTML = "";
        for (let i = 0; i < response.length; i++) {
            let BM25_similarity = "-"
            let DFR_similarity = "-"
            let DFI_similarity = "-"
            const index = i + 1;

            const curr_document_id = response[i]["document_id"]
            const document_name = response[i]["name"]
            const approval_date = response[i]["rahbari_date"]
            const subject_name = response[i]["subject_name"] ?? "-"

            BM25_similarity = Math.round(response[i]["BM25_score"] * 100) / 100
            DFR_similarity = Math.round(response[i]["DFR_score"] * 100) / 100
            DFI_similarity = Math.round(response[i]["DFI_score"] * 100) / 100

            let mean_value = (BM25_similarity + DFR_similarity + DFI_similarity) / 3

            const book_link = 'http://' + location.host + "/document_profile?id=" + curr_document_id
            const name = "<a target='_blank' href=" + book_link + ">" + document_name + "</a>"

            const modal_function = "detailFunction('" + curr_document_id + "','" + document_name + "')"
            const detail = '<button type="button" class="btn modal_btn" onclick="' + modal_function + '" data-bs-target="#ab">جزئیات</button>'


            const row = {
                "index": index,
                "document_name": name,
                "rahbari_date": approval_date,
                "BM25_similarity": BM25_similarity,
                "DFR_similarity": DFR_similarity,
                "DFI_similarity": DFI_similarity,
                "mean": parseFloat(mean_value.toFixed(2)),
                "detail": detail,
            }

            similrity_result.push(row)
        }

        $('#SimilarityTable').empty();
        $('.SimilarityTable').footable({
            "paging": {
                "enabled": true,
                strings: {
                    first: '»',
                    prev: '›',
                    next: '‹',
                    last: '«'
                }
            },
            "filtering": {
                "enabled": false
            },
            "sorting": {
                "enabled": true
            },
            "empty": "سندی یافت نشد.",
            "columns": [{
                "name": "index",
                "title": "ردیف",
                "breakpoints": "xs sm",
                "type": "number",
                "style": {
                    "width": "5%"
                }
            }, {
                "name": "document_name",
                "title": "نام سند",
                "style": {
                    "width": "30%"
                }
            }, {
                "name": "rahbari_date",
                "title": "تاریخ تصویب",
                "style": {
                    "width": "10%"
                }
            }, {
                "name": "BM25_similarity",
                "title": "مشابهت بر اساس BM25",
                "style": {
                    "width": "10%"
                }
            },
                {
                    "name": "DFR_similarity",
                    "title": "مشابهت بر اساس DFR",
                    "style": {
                        "width": "10%"
                    }
                },
                {
                    "name": "DFI_similarity",
                    "title": "مشابهت بر اساس DFI",
                    "style": {
                        "width": "10%"
                    }
                },
                {
                    "name": "mean",
                    "title": "میانگین شباهت ها",
                    "style": {
                        "width": "10%"
                    }
                },
                {
                    "name": "detail",
                    "title": "جزییات",
                    "style": {
                        "width": "10%"
                    }
                },

            ],
            "rows": similrity_result
        });
    } catch (e) {
        console.log(e)
    }
}

async function detailFunction(select_document_id, select_document_name) {
    startBlockUI()
    document.getElementById("BM25_dest_document").innerHTML = ""
    document.getElementById("DFI_dest_document").innerHTML = ""
    document.getElementById("DFR_dest_document").innerHTML = ""

    document.getElementById("BM25_source_document").innerHTML = ""
    document.getElementById("DFI_source_document").innerHTML = ""
    document.getElementById("DFR_source_document").innerHTML = ""

    const header = document.getElementById("document_similarity_detail_ModalHeader");
    const main_document_name = document.getElementById('document_select').title
    const main_document_id = document.getElementById("document").value

    header.innerText = `جزییات شباهت سند «${main_document_name}» و «${select_document_name}»`

    const BM25_request_link = 'http://' + location.host + "/similarityDetail/" + main_document_id + "/" + select_document_id + "/BM25/";
    const DFI_request_link = 'http://' + location.host + "/similarityDetail/" + main_document_id + "/" + select_document_id + "/DFI/";
    const DFR_request_link = 'http://' + location.host + "/similarityDetail/" + main_document_id + "/" + select_document_id + "/DFR/";

    let BM25_response = fetch(BM25_request_link).then(response => response.json());
    let DFI_response = fetch(DFI_request_link).then(response => response.json());
    let DFR_response = fetch(DFR_request_link).then(response => response.json());

    BM25_response = await BM25_response;

    let source_html = ""
    const main_doc_result = BM25_response['main_doc_result'][0]['highlight']['attachment.content'][0]
    const source_doc_paragraphs = main_doc_result.split("\n")
    for (let paragraph of source_doc_paragraphs) {
        source_html += "<p class='lh-lg'>" + paragraph + "</p>"
    }


    const BM25_similarity_result = BM25_response['similarity_result'][0]['highlight']['attachment.content'][0]
    const BM25_dest_doc_paragraphs = BM25_similarity_result.split("\n")
    for (let paragraph of BM25_dest_doc_paragraphs) {
        document.getElementById("BM25_dest_document").innerHTML += "<p class='lh-lg'>" + paragraph + "</p>"
    }

    DFI_response = await DFI_response
    const DFI_similarity_result = DFI_response['similarity_result'][0]['highlight']['attachment.content'][0]
    const DFI_dest_doc_paragraphs = DFI_similarity_result.split("\n")
    for (let paragraph of DFI_dest_doc_paragraphs) {
        document.getElementById("DFI_dest_document").innerHTML += "<p class='lh-lg'>" + paragraph + "</p>"
    }

    DFR_response = await DFR_response
    const DFR_similarity_result = DFR_response['similarity_result'][0]['highlight']['attachment.content'][0]
    const DFR_dest_doc_paragraphs = DFR_similarity_result.split("\n")
    for (let paragraph of DFR_dest_doc_paragraphs) {
        document.getElementById("DFR_dest_document").innerHTML += "<p class='lh-lg'>" + paragraph + "</p>"
    }

    source_html = "<p class=\"text-center\">«" + main_document_name + "»</p>" + source_html

    document.getElementById("DFR_dest_document").innerHTML = "<p class=\"text-center\">«" + select_document_name + "»</p>" + document.getElementById("DFR_dest_document").innerHTML
    document.getElementById("DFI_dest_document").innerHTML = "<p class=\"text-center\">«" + select_document_name + "»</p>" + document.getElementById("DFI_dest_document").innerHTML
    document.getElementById("BM25_dest_document").innerHTML = "<p class=\"text-center\">«" + select_document_name + "»</p>" + document.getElementById("BM25_dest_document").innerHTML

    document.getElementById("BM25_source_document").innerHTML = source_html
    document.getElementById("DFI_source_document").innerHTML = source_html
    document.getElementById("DFR_source_document").innerHTML = source_html

    stopBlockUI()
    $("#document_similarity_detail_modal_btn").click()
}