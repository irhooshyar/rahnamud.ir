async function semantic_similarity() {
    try {
        const main_document_id = document.getElementById("document").value
        document.getElementById("SemanticSimilarityTable").innerHTML = "";

        const request_link = 'http://' + location.host + "/paragraph_approach_similarity/" + main_document_id + "/";
        const semantic_response = await fetch(request_link).then(response => response.json());
        const response = semantic_response["result"]
        const similrity_result = []

        for (let i = 0; i < response.length; i++) {
            const index = i + 1;

            const curr_document_id = response[i]['_source']["document_id"]
            const document_name = response[i]['_source']["name"]
            const approval_date = response[i]['_source']["approval_date"]
            const subject_name = response[i]['_source']["subject_name"] ?? "-"

            const book_link = 'http://' + location.host + "/document_profile?id=" + curr_document_id
            const name = "<a target='_blank' href=" + book_link + ">" + document_name + "</a>"

            const modal_function = "detailFunction('" + curr_document_id + "','" + document_name + "')"
            const detail = '<button type="button" class="btn modal_btn" disabled onclick="' + modal_function + '" data-bs-target="#ab">جزئیات</button>'

            const row = {
                "index": index,
                "document_name": name,
                "subject_name": subject_name,
                "rahbari_date": approval_date,
                "detail": detail,
            }

            similrity_result.push(row)
        }

        $('#SemanticSimilarityTable').empty();
        $('.SemanticSimilarityTable').footable({
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
                "name": "subject_name",
                "title": "موضوع",
                "style": {
                    "width": "10%"
                }
            }, {
                "name": "rahbari_date",
                "title": "تاریخ تصویب",
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