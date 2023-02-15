async function DetailFunction2(document_id, document_name) {
    startBlockUI();
    /* Title Text */
    const src_document_link = 'http://' + location.host + "/document_profile/?id=" + document_id;
    let src_document_tag = "<a class='mt-2' target='blank' href='" + src_document_link + "'>" + document_name + "</a>";

    // clear tables
    document.getElementById("TitleSimSearchTable").innerHTML = '';
    document.getElementById("TitleSimSearchTable").innerHTML = '';
    document.getElementById("LabelSimSearchTable").innerHTML = '';
    document.getElementById("ParaSimSearchTable").innerHTML = '';


    /********** LabelSimSearchTable *****************/


    country_id = document.getElementById("country").value;
    request_link = 'http://' + location.host + "/GetDoticSimDocument_ByLabels/" + document_id + '/';
    response = await fetch(request_link).then(response => response.json());
    result_doc_list = response['result_doc_list']
    labels = response['labels']
    await showDetailsDataExact(result_doc_list, document_id, document_name, "LabelSimSearchTable")

    label_span = '<h6 class="mt-4">' + ' برچسب سند: ' + labels + "</div>"
    document.getElementById("SimilaritiesDetail_ModalHeader").innerHTML = "<h6 class='text-secondary'> " + "سند انتخابی از اسناد رهبری: " + "</h6>" + src_document_tag + label_span

    /********** ParaSimSearchTable *****************/

    country_id = document.getElementById("country").value;
    request_link = 'http://' + location.host + "/GetDoticSimDocument/" + document_id + '/';
    response = await fetch(request_link).then(response => response.json());
    result_similar_docs = response['result_similar_docs']
    await showDetailsDataExact(result_similar_docs, document_id, document_name, "ParaSimSearchTable")

    /********** TitleSimSearchTable *****************/

    startBlockUI('TitleSimSearchTable');
    country_id = document.getElementById("country").value;
    request_link = 'http://' + location.host + "/GetDoticSimDocument_ByTitle/" + document_name + '/';
    response = await fetch(request_link).then(response => response.json());
    result_doc_list = response['result_doc_list']
    await showDetailsDataExact(result_doc_list, document_id, document_name, "TitleSimSearchTable")

    stopBlockUI()

}

async function showDetailsDataExact(sim_doc_list, document_id, document_name, table_id) {

    /* Title Text */
    const src_document_link = 'http://' + location.host + "/information/?id=" + document_id;
    let src_document_tag = "<a target='to_blank' href='" + src_document_link + "'>" + document_name + "</a>";

    /* Body Text */
    document.getElementById(table_id).innerHTML = '';
    dest_para_tag = ''
    index = 1
    document_result = []

    //-------- find max score -------------
    max_score = 0
    for (doc of sim_doc_list) {
        doc_sim = Math.round((doc[2] * 100)) / 100
        if (doc_sim > max_score) {
            max_score += doc_sim
        }
    }
    // ---------------------------------------

    for (doc of sim_doc_list) {
        doc_id = doc[0]
        doc_name = doc[1]
        doc_sim = Math.round((doc[2] * 100)) / 100

        doc_sim = Math.round(((doc_sim / max_score) * 100)) / 100

        let detail = '<button type="button" class="btn modal_btn">جزئیات</button>'


        if (table_id == 'ParaSimSearchTable') {
            sim_para_count = doc[3]
            select_function = `SelectParaSimFunction('${doc_id}','${doc_name}', '${document_id}')`;

            detail = '<button type="button" class="btn modal_btn" onclick="' + select_function + '">انتخاب</button>'

            if (sim_para_count == 0)
                detail = '<button type="button" disabled class="btn modal_btn" onclick="' + select_function + '">انتخاب</button>'

        }


        if (table_id == 'LabelSimSearchTable') {
            sim_para_count = doc[3]
            const detail_function = `DetailLabelSimFunction('${doc_id}','${doc_name}', '${document_id}')`;

            detail = '<button type="button" class="btn modal_btn"  onclick="' + detail_function + '">جزئیات</button>'


        }

        const document_link = 'http://' + location.host + "/information/?id=" + doc_id
        doc_name = '<a target="_blank" href="' + document_link + '">' + doc_name + "</a>"


        // if (doc_sim < 100) {
        //     doc_sim = "خیلی کم"
        // }
        // else if (doc_sim < 200) {
        //     doc_sim = "کم"
        // }
        // else if (doc_sim < 300) {
        //     doc_sim = "متوسط"
        // }
        // else if (doc_sim < 400) {
        //     doc_sim = "زیاد"
        // }
        // else if (doc_sim < 500) {
        //     doc_sim = "خیلی زیاد"
        // }


        let row = {

            "index": index,
            "doc_id": doc_id,
            "doc_name": doc_name,
            "doc_sim": doc_sim,
            "detail": detail
        }

        document_result.push(row)
        index += 1
    }


    $('#' + table_id).empty();

    if (table_id == 'LabelSimSearchTable' || table_id == 'ParaSimSearchTable') {
        $('.' + table_id).footable({
            "paging": {
                "enabled": true
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
                "name": "doc_name",
                "title": "نام سند",
                "style": {
                    "width": "35"
                }
            }
                // , {
                //     "name": "doc_sim",
                //     "title": "امتیاز",
                //     "style": {
                //         "width": "10%"
                //     }
                // },
                , {
                    "name": "detail",
                    "title": "جزئیات",
                    "style": {
                        "width": "10%"
                    }
                }
            ],
            "rows": document_result
        });


    } else {
        $('.' + table_id).footable({
            "paging": {
                "enabled": true
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
                "name": "doc_name",
                "title": "نام سند",
                "style": {
                    "width": "35"
                }
            }
                // , {
                //     "name": "doc_sim",
                //     "title": "امتیاز",
                //     "style": {
                //         "width": "10%"
                //     }
                // },

            ],
            "rows": document_result
        });


    }


    // document.getElementById("DestDocumentParagraph").innerHTML = '<ul>' + dest_para_tag + '</ul>';


    // document.getElementById("DetailText").innerHTML = '<p class="m-4">'+supervisions_text+'</p>';
    popup_handler();
}

async function DetailLabelSimFunction(doc2_id, doc2_name, doc1_id) {
    document.getElementById("LabelSimModalBody").innerHTML = ""
    $('#LabelSimModal').modal('show');

    /* Title Text */
    const selected_document_link = 'http://' + location.host + "/information/?id=" + doc2_id;
    let selected_document_tag = "<a target='to_blank' href='" + selected_document_link + "'>" + doc2_name + "</a>";

    document.getElementById("LabelSimModalHeader").innerHTML = "<span class='text-secondary'>" + " سند انتخابی: " + "</span>" + selected_document_tag

    let request_link = 'http://' + location.host + "/GetDetail_DoticSimDocument_ByLabels/" + doc1_id + '/' + doc2_id + '/';
    let response = await fetch(request_link).then(response => response.json());
    let paragraph_list = response['result_para']
    console.log(paragraph_list)
    body_tag = ""
    for (para of paragraph_list) {


        paragraph_id = para['_source']['paragraph_id']
        paragraph = para["highlight"]["attachment.content"][0]


        paragraph_link = 'http://' + location.host + "/sentiment_analysis/?id=" + paragraph_id;

        paragraph_tag = "<a class='' title = 'پروفایل حکم' target='blank' href='" + paragraph_link + "'>" + paragraph + "</a>"

        // profile_tag = paragraph

        tag = "<li class='mb-3 lh-lg'>" + paragraph_tag + "</li>"
        body_tag += tag


    }

    if (body_tag == "") {
        body_tag = "<h5 class='mt-5 text-center text-secondary'>عبارت موردنظر در متن سند یافت نشد.</h5>"
    }

    document.getElementById("LabelSimModalBody").innerHTML += "<ul>" + body_tag + "</ul>"


}

async function SelectParaSimFunction(doc2_id, doc2_name, doc1_id) {
    document.getElementById("LabelSimModalBody").innerHTML = ""
    // startFullPageBlockUI();
    /* Title Text */
    const dest_document_link = 'http://' + location.host + "/information/?id=" + doc2_id;
    let dest_document_tag = "<a target='to_blank' href='" + dest_document_link + "'>" + doc2_name + "</a>";
    document.getElementById("LabelSimModalHeader").innerHTML = "<span class='text-secondary'>" + " سند انتخابی: " + "</span>" + dest_document_tag

    $('#LabelSimModal').modal('show');
    let request_link = 'http://' + location.host + "/GetParaSimilarity/" + doc1_id + '/' + doc2_id + '/';
    let response = await fetch(request_link).then(response => response.json());
    let sim_para_list = response['result']

    /* Body Text */
    tag = ''
    for (row of sim_para_list) {
        src_para = row['src_para']
        dest_para = row['dest_para']
        dest_doc_id = row['dest_doc_id']
        dest_doc_name = row['dest_doc_name']

        dest_doc_link = 'http://' + location.host + "/information/?id=" + dest_doc_id
        dest_doc_tag = '<a style="text-decoration:none;" target="_blank" href="' + dest_doc_link + '">' + dest_doc_name + "</a>"


        score = row['score']
        tag += '<div class="mb-2 px-2 pt-2 border-bottom border-2 rounded">' +
            '<p class="text-secondary">' + 'پاراگراف مبدأ: ' + '</p>' + '<p>' + src_para + '</p>' +
            '<p class="text-secondary">' + 'امتیاز شباهت: ' + '<span class="text-primary bold">' + score + '</span>' + '</p>' +
            '<span class="text-secondary">' + 'پاراگراف مشابه در سند ' +
            '<span class="bold">' + dest_doc_tag + ':</span>' + '</span>' +
            '<p class="mt-1">' + dest_para + '</p>' +
            '</div>'
    }
    document.getElementById("LabelSimModalBody").innerHTML = tag
    // stopFullPageBlockUI('انتخاب سند')
}

function popup_handler() {
    let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
}