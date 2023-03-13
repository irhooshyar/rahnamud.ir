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

            const curr_document_id = response[i]["document_id"]
            const document_name = response[i]["name"]
            const approval_date = response[i]["approval_date"]
            const subject_name = response[i]["subject_name"] ?? "-"
            const score = (parseFloat(response[i]["score"]) * 1000).toFixed(2)

            const book_link = 'http://' + location.host + "/document_profile?id=" + curr_document_id
            const name = "<a target='_blank' href=" + book_link + ">" + document_name + "</a>"

            const modal_function = "select_para_sim_function('" + curr_document_id + "','" + document_name + "','" + main_document_id + "')"
            const detail = '<button type="button" class="btn modal_btn" onclick="' + modal_function + '" data-bs-target="#">جزئیات</button>'

            const row = {
                "index": index,
                "document_name": name,
                "subject_name": subject_name,
                "rahbari_date": approval_date,
                "score": score,
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
                    "name": "score",
                    "title": "امتیاز شباهت",
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

async function select_para_sim_function(doc2_id, doc2_name, doc1_id) {
    document.getElementById("LabelSimModalBody").innerHTML = ""
    // startFullPageBlockUI();
    /* Title Text */
    const dest_document_link = 'http://' + location.host + "/information/?id=" + doc2_id;
    let dest_document_tag = "<a target='to_blank' href='" + dest_document_link + "'>" + doc2_name + "</a>";
    document.getElementById("LabelSimModalHeader").innerHTML = "<span class='text-secondary'>" + " سند انتخابی: " + "</span>" + dest_document_tag

    $('#LabelSimModal').modal('show');
    let request_link = 'http://' + location.host + "/paragraph_approach_similarity_detail/" + doc1_id + '/' + doc2_id + '/';
    let response = await fetch(request_link).then(response => response.json());
    let sim_para_list = response['result']

    /* Body Text */
    let tag = ''
    for (row of sim_para_list) {
        const src_para = row['src_para']
        const dest_paras = row['dest_paras']
        const dest_doc_id = row['dest_doc_id']
        const dest_doc_name = row['dest_doc_name']


        tag += '<div class="mb-2 px-2 pt-2 border-bottom border-2 rounded">' +
            '<p class="text-secondary">' + 'پاراگراف مبدأ: ' + '</p>' +
            '<p>' + src_para + '</p>';

        for (let dest_para_obj of dest_paras) {
            const dest_doc_link = 'http://' + location.host + "/document_profile/?id=" + dest_doc_id
            const dest_doc_tag = '<a style="text-decoration:none;" target="_blank" href="' + dest_doc_link + '">' + dest_doc_name + "</a>"
            const score = parseFloat(dest_para_obj['score']).toFixed(2)
            const dest_para = dest_para_obj["dest_para"]

            tag += '<span class="text-secondary">' + 'پاراگراف مشابه در سند ' +
                '<span class="bold">' + dest_doc_tag + ':</span>' + '</span>' +
                '<span style="display: block" class="text-secondary">' + 'امتیاز شباهت: ' + '<span class="text-primary bold">' + score + '</span>' + '</span>' +
                '<p class="mt-1">' + dest_para + '</p>'
        }
        tag += '</div>'
    }
    document.getElementById("LabelSimModalBody").innerHTML = tag
    // stopFullPageBlockUI('انتخاب سند')
}