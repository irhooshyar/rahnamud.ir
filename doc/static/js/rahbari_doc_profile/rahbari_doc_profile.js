$(document).ready(function () {
    $('#ApprovalsDropdown').addClass('active');
    $('#information').addClass('active');
    $('select#language').on('change', function (e) {
        let selected_language = this.value;
        let current_url = window.location.href;
        if (selected_language === 'England') {
            let page_name = current_url.split('/')[3]
            let requested_url = current_url.replace(page_name, 'en')
            window.location = requested_url;
        } else if (selected_language === 'Russia') {
            let page_name = current_url.split('/')[3]
            let requested_url = current_url.replace(page_name, 'ru')
            window.location = requested_url;
        }
    });
});

init();

async function init() {
    await initSearchableSelects();

    /* Get Actors List */
    let request_link = 'http://' + location.host + "/GetActorsList/";
    let response = await fetch(request_link).then(response => response.json());
    actors_list = response["actorsList"]

    const url = new URL(window.location.href);
    var document_id = url.searchParams.get("id");

    if (document_id) {
        const request_link = 'http://' + location.host + "/GetDocumentById/" + document_id + "/";
        let response = await fetch(request_link).then(response => response.json());
        response = response["document_information"][0]

        document.getElementById("document").innerHTML = "<option value=" + response["id"] + " >" + response["name"] + "</option>";

        document_select_tag = '<i class="dropdown_icon bi bi-chevron-down ml-2 bold text-black"></i>' + response['name']
        document.getElementById('document_select').innerHTML = document_select_tag;
        document.getElementById('document_select').title = response['name'];

        /* disable country , document */
        document.getElementById("document_select").disabled = true;
        document.getElementById("country").disabled = true;


        const select = document.getElementById("country");
        let control = select.tomselect;
        control.setValue(response["country_id"])

        await ShowResult();

    } else {
        const text = "انتخاب نمایید"
        document.getElementById("document").innerHTML = "<option value=" + 0 + " disabled>" + text + "</option>";
        document.getElementById("document_download").disabled = true;
        document.getElementById("pdf_download").disabled = true;
        document.getElementById("document_search").disabled = true;
        document.getElementById("document_subject_btn").disabled = true;
        CountryChanged();
    }

    syncAllSelects(true);

    //user log
    let form_data = new FormData()
    let detail_type = "نمایش پنل"
    form_data.append('detail_type', detail_type);
    UserLog(form_data)


    country_id = document.getElementById('country').value

    request_link = 'http://' + location.host + "/GetTypeByCountryId/" + country_id + "/";
    response = await fetch(request_link).then(response => response.json());
    response = response["documents_type_list"]
    document.getElementById("ColorBox").innerHTML = "";
    for (var i = 0; i < response.length; i++) {
        const type_id = response[i]["id"]
        const type_name = response[i]["type"]
        const type_color = response[i]["color"]

        tag = '<div class="form-check pt-2 pb-2"> <input type="checkbox" id="' + type_id + '" checked disabled>'
        tag += '<label class="form-check-label bold" style="padding: 0px 25px; color: ' + type_color + '" for="flexCheckChecked">' + type_name + '</label></div>'


        document.getElementById("ColorBox").innerHTML += tag
    }


}

async function ShowResult() {
    await DownloadLinkSet();
    await ShowDocumentComment();
    await ShowDocumentNote();

    const document_id = document.getElementById("document").value
    document.getElementById("document_download").disabled = false;
    document.getElementById("pdf_download").disabled = false;
    document.getElementById("document_search").disabled = false;
    document.getElementById("document_subject_btn").disabled = false;
    //document.getElementById("document_summary").disabled = false;

    /******************************* Features **********************************/
    try {
        let request_link = 'http://' + location.host + "/GetDocumentById/" + document_id + "/";
        let response = await fetch(request_link).then(response => response.json());
        response = response["document_information"][0]

        document.getElementById("total_words").innerText = response["word_count"];
        document.getElementById("stop_words").innerText = response["stopword_count"];
        document.getElementById("distinct_words").innerText = response["distinct_word_count"];
        document.getElementById("approval_reference").innerText = response["approval_reference"];
        document.getElementById("approval_date").innerText = response["approval_date"];
        document.getElementById("document_level").innerText = response["level"];
        document.getElementById("document_subject").innerText = response["subject"];
        document.getElementById("document_type").innerText = response["type"];

        validation_type = response["validation_type"]
        revoked_size = response["revoked_size"]

        text_color = "text-danger"

        if (validation_type == 'معتبر') {
            text_color = "text-success"
        } else if (validation_type == 'منسوخ' || validation_type == 'منقضی') {
            text_color = "text-danger"
        } else if (validation_type == 'موقوف الاجرا') {
            text_color = "text-warning"
        }

        validation_type_tag = '<strong class="' + text_color + '"> ' + validation_type + '</strong>'

        validation_type_msg = validation_type_tag + (response["revoked_clauses"] != "" ? (" (" + response["revoked_clauses"] + ")") : '')


        document.getElementById("document_validation_type").innerHTML = validation_type_msg


        document_chart_data = response["actors_chart_data"];

        showActorsChart('actors_chart_container', document_chart_data);
    } catch (e) {
        console.log(e)
    }

    /******************************* Definition **********************************/  ////////////////////////////////////////////
    try {
        request_link = 'http://' + location.host + "/GetPersianDefinitionByDocumentId/" + document_id + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["documents_definition"][0]

        document.getElementById("definition_container").innerText = response["text"];
        let final_keywords = response["keywords"];
    } catch (e) {
        console.log(e)
    }

    /******************************* General definition **********************************/
    try {
        request_link = 'http://' + location.host + "/GetGeneralDefinition/" + document_id + "/";

        response = await fetch(request_link).then(response => response.json());
        response = response['result']
        // alert(request_link)
        let general_defintion_data = ''
        let general_defintion_index = 1
        let abbreviation_data = ''
        let abbreviation_index = 1
        const definition_keywords = []

        // if (response.length == 0)
        // data = "بخش تعاریف کلی برای این سند توسط سامانه پیدا نشد.";

        for (let i = 0; i < response.length; i++) {
            const word = response[i]["word"]
            const definition = response[i]["definition"]
            definition_keywords.push(word)
            if (response[i]["is_abbreviation"] == true) {
                abbreviation_data += `<p>${abbreviation_index}- ${word}: ${definition}</p>`
                abbreviation_index++
            } else {
                general_defintion_data += `<p>${general_defintion_index}- ${word}: ${definition}</p>`
                general_defintion_index++
            }

        }
        if (general_defintion_data == '') general_defintion_data = "بخش تعاریف کلی برای این سند توسط سامانه پیدا نشد.";
        if (abbreviation_data == '') abbreviation_data = "بخش اختصارات برای این سند توسط سامانه پیدا نشد.";

        document.getElementById("general_definition_container").innerHTML = general_defintion_data;
        document.getElementById("abbreviation_container").innerHTML = abbreviation_data;

        /******************************* final_keywords **********************************/
        if (final_keywords == 'هیچ کلمه کلیدی برای این سند توسط سامانه پیدا نشد.' && definition_keywords.length > 0) {
            final_keywords = '';
        }
        if (final_keywords.length > 0) {
            final_keywords += ' - '
        }
        final_keywords += definition_keywords.filter(function (k) {
            return !final_keywords.includes(k)
        }).join(' - ')
        document.getElementById("final_Keywords_container").innerText = final_keywords;
    } catch (e) {
        console.log(e)
    }

    /******************************* 1-Gram **********************************/
    try {
        request_link = 'http://' + location.host + "/GetTFIDFByDocumentId/" + document_id + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["documents_tfidf_list"]
        document.getElementById("1gram_frequency_table").innerHTML = "";
        let show_count = 10;
        for (var i = 0; i < show_count; i++) {
            const index = i + 1;
            const word = response[i]["word"]
            const count = response[i]["count"]
            const weight = response[i]["weight"]


            let tag = "<tr>" + "<td class='col-1'>" + index + "</td>" + "<td class='col-3'>" + word + "</td>" + "<td class='col-2'>" + count + "</td>" + "</tr>";

            document.getElementById("1gram_frequency_table").innerHTML += tag;
        }
    } catch (e) {
        console.log(e)
    }

    /******************************* 2-Gram **********************************/
    try {
        request_link = 'http://' + location.host + "/GetNGramByDocumentId/" + document_id + "/" + 2 + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["document_ngram_list"]
        show_count = 10

        document.getElementById("2gram_frequency_table").innerHTML = "";
        for (let i = 0; i < show_count && i < response.length; i++) {
            const index = i + 1;

            const id = response[i]["id"]
            const word = response[i]["text"]
            const count = response[i]["count"]
            const score = response[i]["score"]

            let status = ""
            if (score === 1) {
                status = "checked";
            }

            const checkBox = "<input type='checkbox' class='form-check-input' style='padding: 0px; margin: 0px; margin-top: 5px; position: relative;' id='" + id + "' " + status + ">"

            const deleteBox = '<span style="cursor: pointer" class="bi bi-trash" onclick="DeleteNGramWords(' + id + ')"></span>'
            let tag = "<tr>" + "<td class='col-1'>" + index + "</td>" + "<td class='col-3'>" + word + "</td>" + "<td class='col-2'>" + score + "</td>" + "<td class='col-2'>" + count + "</td>" + "<td class='col-2'>" + checkBox + "</td>" + "<td class='col-1'>" + deleteBox + "</td>"
            "</tr>";

            document.getElementById("2gram_frequency_table").innerHTML += tag;
        }
    } catch (e) {
        console.log(e)
    }

    /******************************* 3-Gram **********************************/
    try {
        request_link = 'http://' + location.host + "/GetNGramByDocumentId/" + document_id + "/" + 3 + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["document_ngram_list"]
        show_count = 10
        document.getElementById("3gram_frequency_table").innerHTML = "";

        for (let i = 0; i < show_count && i < response.length; i++) {
            const index = i + 1;

            const id = response[i]["id"]
            const word = response[i]["text"]
            const count = response[i]["count"]
            const score = response[i]["score"]

            let status = ""
            if (score === 1) {
                status = "checked";
            }

            const checkBox = "<input type='checkbox' class='form-check-input' style='padding: 0px; margin: 0px; margin-top: 5px; position: relative;' id='" + id + "' " + status + ">"
            const deleteBox = '<span style="cursor: pointer" class="bi bi-trash" onclick="DeleteNGramWords(' + id + ')"></span>'
            let tag = "<tr>" + "<td class='col-1'>" + index + "</td>" + "<td class='col-5'>" + word + "</td>" + "<td class='col-2'>" + score + "</td>" + "<td class='col-2'>" + count + "</td>" + "<td class='col-2'>" + checkBox + "</td>" + "<td class='col-1'>" + deleteBox + "</td>"
            "</tr>";


            document.getElementById("3gram_frequency_table").innerHTML += tag;

        }
    } catch (e) {
        console.log(e)
    }

    let references_documents_id_list = [parseInt(document_id)]
    /******************************* References List **********************************/
    try {
        request_link = 'http://' + location.host + "/GetReferencesByDocumentId/" + document_id + "/" + 1 + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["document_references_list"]
        response.sort(function (x, y) {
            return x["doc_level"] == 'قانون' ? -1 : y["doc_level"] == 'قانون' ? 1 : x["doc_level"] == "رأی" ? 1 : y["doc_level"] == "رأی" ? -1 : 0;
        })
        /******************************* References in doc Table **********************************/
        let document_result = []
        for (var i = 0; i < response.length; i++) {
            const doc_id = response[i]["doc_id"]
            const doc_name = response[i]["doc_name"]
            let doc_level = response[i]["doc_level"]
            let doc_approval_date = response[i]["doc_approval_date"]
            let doc_approval_reference_name = response[i]["doc_approval_reference_name"]
            if (doc_level == null) {
                doc_level = "نا‌مشخص"
            }
            let tag = "<p onclick='References_Show_Paragraphs(this)' id=" + doc_id + "><a href='#'>" + doc_name + "</a></p>"
            // document.getElementById("references_list").innerHTML += tag;

            const doc_link = 'http://' + location.host + "/information/?id=" + doc_id
            let doc_tag = "<a title = 'پروفایل سند'  target='blank' href='" + doc_link + "'>" + doc_name + "</a>"


            // let tag = "<p onclick='Citation_Show_Paragraphs(this)' id=" + doc_id + "><a href='#'>" + doc_name + "</a></p>"
            const detail_function = "References_Show_Paragraphs(" + doc_id + ")";
            const detail = '<button type="button" class="btn modal_btn" data-bs-toggle="modal" ' + ' onclick="' + detail_function + '">جزئیات</button>';

            const row = {
                "id": i + 1,
                "doc_name": doc_tag,
                'doc_level': doc_level,
                "doc_approval_date": doc_approval_date,
                "doc_approval_reference_name": doc_approval_reference_name,
                "detail": detail
            }
            document_result.push(row)
        }
        $('#ReferencesInDocTable').empty();
        $('.ReferencesInDocTable').footable({
            "paging": {
                "enabled": true, strings: {
                    first: '»', prev: '›', next: '‹', last: '«'
                }
            }, "filtering": {
                "enabled": false
            }, "sorting": {
                "enabled": true
            }, "empty": "ارجاعی یافت نشد.", "columns": [{
                "name": "id", "title": "ردیف", "breakpoints": "xs sm", "type": "number", "style": {
                    "width": "5%"
                }
            }, {
                "name": "doc_name", "title": "نام سند", "style": {
                    "width": "60%"
                }
            }, {
                "name": "doc_level", "title": "سطح سند", "style": {
                    "width": "10%"
                }
            }, {
                "name": "doc_approval_date", "title": "تاریخ تصویب", "style": {
                    "width": "10%"
                }
            }, {
                "name": "doc_approval_reference_name", "title": "مرجع تصویب", "style": {
                    "width": "15%"
                }
            }, {
                "name": "detail", "title": "جزئیات", "style": {
                    "width": "10%"
                }
            },], "rows": document_result
        });
    } catch (e) {
        console.log(e)
    }
    /******************************* Citation List **********************************/
    try {
        request_link = 'http://' + location.host + "/GetReferencesByDocumentId/" + document_id + "/" + 2 + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["document_references_list"]
        response.sort(function (x, y) {
            return x["doc_level"] == 'قانون' ? -1 : y["doc_level"] == 'قانون' ? 1 : x["doc_level"] == "رأی" ? 1 : y["doc_level"] == "رأی" ? -1 : 0;
        })

        console.log(response)
        /******************************* DocsReferencedToThisDocTable **********************************/
        document_result = []
        let min_year = 1000000
        let max_year = 0
        for (var i = 0; i < response.length; i++) {
            const doc_id = response[i]["doc_id"]
            const doc_name = response[i]["doc_name"]
            let doc_level = response[i]["doc_level"]
            let doc_approval_date = response[i]["doc_approval_date"]
            if (doc_approval_date != null) {
                let doc_year = parseInt(doc_approval_date.substr(0, 4))
                min_year = Math.min(min_year, doc_year)
                max_year = Math.max(max_year, doc_year)
            }

            let doc_approval_reference_name = response[i]["doc_approval_reference_name"]
            if (doc_level == null) {
                doc_level = "نا‌مشخص"
            }
            let tag = "<p onclick='Citation_Show_Paragraphs(this)' id=" + doc_id + "><a href='#'>" + doc_name + "</a></p>"
            // document.getElementById("citation_list").innerHTML += tag;

            const doc_link = 'http://' + location.host + "/information/?id=" + doc_id
            let doc_tag = "<a title = 'پروفایل سند'  target='blank' href='" + doc_link + "'>" + doc_name + "</a>"


            // let tag = "<p onclick='Citation_Show_Paragraphs(this)' id=" + doc_id + "><a href='#'>" + doc_name + "</a></p>"
            const detail_function = "Citation_Show_Paragraphs(" + doc_id + ")";
            const detail = '<button type="button" class="btn modal_btn" data-bs-toggle="modal" ' + ' onclick="' + detail_function + '">جزئیات</button>';


            const row = {
                "id": i + 1,
                "doc_name": doc_tag,
                'doc_level': doc_level,
                "doc_approval_date": doc_approval_date,
                "doc_approval_reference_name": doc_approval_reference_name,
                "detail": detail
            }
            document_result.push(row)
        }
        $('#DocsReferencedToThisDocTable').empty();
        $('.DocsReferencedToThisDocTable').footable({
            "paging": {
                "enabled": true, strings: {
                    first: '»', prev: '›', next: '‹', last: '«'
                }
            }, "filtering": {
                "enabled": false
            }, "sorting": {
                "enabled": true
            }, "empty": "ارجاعی یافت نشد.", "columns": [{
                "name": "id", "title": "ردیف", "breakpoints": "xs sm", "type": "number", "style": {
                    "width": "5%"
                }
            }, {
                "name": "doc_name", "title": "نام سند", "style": {
                    "width": "60%"
                }
            }, {
                "name": "doc_level", "title": "سطح سند", "style": {
                    "width": "10%"
                }
            }, {
                "name": "doc_approval_date", "title": "تاریخ تصویب", "style": {
                    "width": "10%"
                }
            }, {
                "name": "doc_approval_reference_name", "title": "مرجع تصویب", "style": {
                    "width": "15%"
                }
            }, {
                "name": "detail", "title": "جزئیات", "style": {
                    "width": "15%"
                }
            },], "rows": document_result
        });
    } catch (e) {
        console.log(e)
    }
    /******************************* doc_references_to_chart **********************************/
    try {
        let doc_references_to_chart = []
        let docs = [];
        let count = 0;
        // null years
        for (let j = 0; j < response.length; j++) {
            doc_approval_date = response[j]["doc_approval_date"]
            if (doc_approval_date == null) {
                count += 1
                docs.push(response[j]["doc_name"])
            }
        }
        if (count > 0) {
            doc_references_to_chart.push(["نامشخص", count, docs])
        }
        // with years
        for (let i = min_year; i <= max_year; i++) {
            count = 0
            docs = [];
            for (let j = 0; j < response.length; j++) {
                doc_approval_date = response[j]["doc_approval_date"]
                if (doc_approval_date != null) {
                    let doc_year = parseInt(doc_approval_date.substr(0, 4))
                    if (doc_year == i) {
                        count += 1
                        docs.push(response[j]["doc_name"])
                    }
                }
            }
            doc_references_to_chart.push([i, count, docs])
        }
        await DrawDocReferencesChart("doc_references_to_chart", doc_references_to_chart, document.getElementById("document").innerText);

        /******************************* AdvisoryOpinionsReferencedToThisDocTable **********************************/
        document_result = []
        ad_index = 1
        for (var i = 0; i < response.length; i++) {
            const doc_id = response[i]["doc_id"]
            const doc_name = response[i]["doc_name"]
            let doc_level = response[i]["doc_level"]
            let doc_type_name = response[i]["doc_type_name"]
            let doc_approval_date = response[i]["doc_approval_date"]
            let doc_approval_reference_name = response[i]["doc_approval_reference_name"]
            if (doc_level == null) {
                doc_level = "نا‌مشخص"
            }

            const doc_link = 'http://' + location.host + "/information/?id=" + doc_id
            let doc_tag = "<a title = 'پروفایل سند'  target='blank' href='" + doc_link + "'>" + doc_name + "</a>"


            // let tag = "<p onclick='Citation_Show_Paragraphs(this)' id=" + doc_id + "><a href='#'>" + doc_name + "</a></p>"
            const detail_function = "Citation_Show_Paragraphs(" + doc_id + ")";
            const detail = '<button type="button" class="btn modal_btn" data-bs-toggle="modal" ' + ' onclick="' + detail_function + '">جزئیات</button>';


            // document.getElementById("citation_list").innerHTML += tag;
            const row = {
                "id": ad_index,
                "doc_name": doc_tag,
                'doc_level': doc_level,
                "doc_approval_date": doc_approval_date,
                "doc_approval_reference_name": doc_approval_reference_name,
                "detail": detail
            }

            const ex_row = {
                "doc_name": doc_name,
                'doc_level': doc_level,
                "doc_approval_date": doc_approval_date,
                "doc_approval_reference_name": doc_approval_reference_name
            }

            if (doc_name.includes("نظر مشورتی")) {
                ad_index += 1
                document_result.push(row)
                advisory_document_result.push(ex_row)
            }
        }
        ad_index -= 1
        document.getElementById("SearchResultLable").innerText = "تعداد کل نتایج: " + ad_index + " سند"
        $('#AdvisoryOpinionsReferencedToThisDocTable').empty();
        $('.AdvisoryOpinionsReferencedToThisDocTable').footable({
            "paging": {
                "enabled": true, strings: {
                    first: '»', prev: '›', next: '‹', last: '«'
                }
            }, "filtering": {
                "enabled": false
            }, "sorting": {
                "enabled": true
            }, "empty": "نظری یافت نشد.", "columns": [{
                "name": "id", "title": "ردیف", "breakpoints": "xs sm", "type": "number", "style": {
                    "width": "5%"
                }
            }, {
                "name": "doc_name", "title": "نام سند", "style": {
                    "width": "60%"
                }
            }, //  {
                //     "name": "doc_level",
                //     "title": "سطح سند",
                //     "style": {
                //         "width": "10%"
                //     }
                // },
                {
                    "name": "doc_approval_date", "title": "تاریخ تصویب", "style": {
                        "width": "10%"
                    }
                }, {
                    "name": "doc_approval_reference_name", "title": "مرجع تصویب", "style": {
                        "width": "15%"
                    }
                }, {
                    "name": "detail", "title": "جزئیات", "style": {
                        "width": "10%"
                    }
                },], "rows": document_result
        });
    } catch (e) {
        console.log(e)
    }

    /******************************* Show References Graph **********************************/

    await showReferencesGraph(references_documents_id_list, 'references_graph_container', document_id)

    /******************************* Subject **********************************/
    try {
        request_link = 'http://' + location.host + "/GetSubjectByDocumentId/" + document_id + "/" + 1 + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["document_subject_list"]

        document.getElementById("subject_table").innerHTML = ""

        let chart_value_list = []

        for (let i = 0; i < response.length; i++) {
            const subject = response[i]["subject"]
            const weight = response[i]["weight"] * 100  /* For Scale To 0-100*/
            const keywords_text = response[i]["keywords_text"]
            const keywords_title = response[i]["keywords_title"]
            const special_references = response[i]["special_references"]

            tag = "<tr>" + "<td class='col-1'>" + (i + 1) + "</td>" + "<td class='col-2'>" + subject + "</td>" + "<td class='col-4'>" + keywords_text + "</td>" + "<td class='col-3'>" + keywords_title + "</td>" + "<td class='col-1'>" + special_references + "</td>" + "</tr>";

            document.getElementById("subject_table").innerHTML += tag;

            chart_value_list.push([subject, weight])
        }

        showChart(chart_value_list, "subject_chart_container");
    } catch (e) {
        console.log(e)
    }

    /******************************* Actor Paragraphs **********************************/
    try {
        request_link = 'http://' + location.host + "/GetActorsPararaphsByDocumentId/" + document_id + "/";
        response = await fetch(request_link).then(response => response.json());
        actors_paragraphs = response["actors_paragraphs"]
        console.log(actors_paragraphs)

        doc_motevali_paragraphs = actors_paragraphs['document_motevali_ejra_paragraphs']
        doc_salahiat_paragraphs = actors_paragraphs['document_salahiat_ekhtiar_paragraphs']
        doc_hamkar_paragraphs = actors_paragraphs['document_hamkaran_paragraphs']


        showActor_Paragraphs('motevalian_list', doc_motevali_paragraphs);
        showActor_Paragraphs('hamkaran_list', doc_hamkar_paragraphs);
        showActor_Paragraphs('salahiat_list', doc_salahiat_paragraphs);


        //user log
        let form_data = new FormData()
        let detail_type = "نتایج جست و جو"
        let country_name = $("#country option:selected").text();
        let document_select_name = document.getElementById("document_select").title
        form_data.append('detail_type', detail_type);
        form_data.append('country_name', country_name);
        form_data.append('document_select_name', document_select_name);
        UserLog(form_data)
    } catch (e) {
        console.log(e)
    }

    /******************************* Similarity **********************************/
    try {
        request_link = 'http://' + location.host + "/GetBM25Similarity/" + document_id + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["docs"]
        similrity_result = []

        document.getElementById("SearchTable").innerHTML = "";
        for (let i = 0; i < response.length; i++) {
            const index = i + 1;

            const curr_document_id = response[i]['_source']["document_id"]
            const document_name = response[i]['_source']["name"]
            const approval_date = response[i]['_source']["approval_date"]
            const approval_reference_name = response[i]['_source']["approval_reference_name"]
            const BM25_similarity = Math.round(response[i]["_score"] * 100) / 100

            const book_link = 'http://' + location.host + "/information?id=" + curr_document_id
            name = "<a href=" + book_link + ">" + document_name + "</a>"

            const row = {
                "index": index,
                "document_name": name,
                "approval_date": approval_date,
                "approval_reference_name": approval_reference_name,
                "BM25_similarity": BM25_similarity
            }

            similrity_result.push(row)
        }

        $('#SearchTable').empty();
        $('.SearchTable').footable({
            "paging": {
                "enabled": true, strings: {
                    first: '»', prev: '›', next: '‹', last: '«'
                }
            }, "filtering": {
                "enabled": false
            }, "sorting": {
                "enabled": true
            }, "empty": "سندی یافت نشد.", "columns": [{
                "name": "index", "title": "ردیف", "breakpoints": "xs sm", "type": "number", "style": {
                    "width": "5%"
                }
            }, {
                "name": "document_name", "title": "نام سند", "style": {
                    "width": "30%"
                }
            }, {
                "name": "approval_date", "title": "تاریخ تصویب", "style": {
                    "width": "10%"
                }
            }, {
                "name": "approval_reference_name", "title": "مرجع تصویب", "style": {
                    "width": "10%"
                }
            }, {
                "name": "BM25_similarity", "title": "مشابهت بر اساس BM25", "style": {
                    "width": "10%"
                }
            }], "rows": similrity_result
        });
    } catch (e) {
        console.log(e)
    }


}

function copyDocumentName() {
    const copyText = document.getElementById("document_select");
    navigator.clipboard.writeText(copyText.innerText);
    $('.tooltip-inner').html('کپی شد!');
}

async function ShowDocumentContent() {

    document.getElementById('DocumentContentBody').innerHTML = ""
    const document_id = document.getElementById("document").value
    // disable show button before choosing a document
    if (!document_id || document_id == '0') {
        alert('لطفا یک سند را انتخاب نمایید.')
        return
    }
    $('#documentContent').modal('show');

    const request_link = 'http://' + location.host + "/GetDocumentContent/" + document_id + "/";
    let response = await fetch(request_link).then(response => response.json());
    response = response["document_paragraphs"]

    for (var i = 0; i < response.length; i++) {
        const document_name = response[i]["document_name"]
        const paragraph_text = response[i]["paragraph_text"]
        const paragraph_id = response[i]["paragraph_id"]


        paragraph_link = 'http://' + location.host + "/sentiment_analysis/?id=" + paragraph_id;

        const paragraph_tag = '<p>' + paragraph_text + '</p>'

        document.getElementById('documentContentHeader').innerText = document_name
        document.getElementById('DocumentContentBody').innerHTML += paragraph_tag

    }

    //user log
    let form_data = new FormData()
    let detail_type = "نمایش سند"
    let country_name = $("#country option:selected").text();
    let document_select_name = document.getElementById("document_select").title
    form_data.append('detail_type', detail_type);
    form_data.append('country_name', country_name);
    form_data.append('document_select_name', document_select_name);
    UserLog(form_data)
}

async function ShowDocumentSubject() {

    document.getElementById('subjectContentBody').innerHTML = ""
    const document_id = document.getElementById("document").value
    // disable show button before choosing a document
    if (!document_id || document_id == '0') {
        alert('لطفا یک سند را انتخاب نمایید.')
        return
    }
    $('#subjectContent').modal('show');

    const request_link = 'http://' + location.host + "/GetDocumentSubjectContent/" + document_id + "/" + 12 + "/";
    let response = await fetch(request_link).then(response => response.json());
    response = response["document_paragraphs"]

    for (var i = 0; i < response.length; i++) {
        const document_name = response[i]["document_name"]
        const paragraph_text = response[i]["paragraph_text"]
        let subject_tag = ""
        if (response[i]["subject_name"] !== "")
            subject_tag = response[i]["subject_name"]

        const paragraph_tag = '<div class="subject-content-container"><p>' + paragraph_text + '</p>' + subject_tag + "</div>"
        document.getElementById('subjectContentHeader').innerText = document_name
        document.getElementById('subjectContentBody').innerHTML += paragraph_tag
    }

    //user log
    let form_data = new FormData()
    let detail_type = "نمایش موضوع"
    let country_name = $("#country option:selected").text();
    let document_select_name = document.getElementById("document_select").title
    form_data.append('detail_type', detail_type);
    form_data.append('country_name', country_name);
    form_data.append('document_select_name', document_select_name);
    UserLog(form_data)
}

async function generatePDF() {
    startBlockUI();

    const approval_reference = document.getElementById("approval_reference").innerText
    const approval_date = document.getElementById("approval_date").innerText

    const document_id = document.getElementById("document").value
    // disable show button before choosing a document
    if (!document_id || document_id == '0') {
        alert('لطفا یک سند را انتخاب نمایید.');
        return;
    }
    const request_link = 'http://' + location.host + "/GetDocumentContent/" + document_id + "/";
    let response = await fetch(request_link).then(response => response.json());
    response = response["document_paragraphs"];
    const document_name = response[0]["document_name"];
    let element = //"<div7 class='d-flex' style='justify-content: space-between;width: 100%'></div7> " +
        "<div8 class='d-flex'> <span>&nbsp;</span>  </div8>" +
        "<div1 class='container-fluid' style='direction: rtl'> " +
        "<div2 class='row p-4 mx-auto' style='border: 4px solid #ccc; border-radius: 20px;'> " +
        "<div6 style='margin: auto;text-align: center'> " +
        "<h5 style='padding-bottom: 10px'>" + document_name + "</h5> </div6> " +
        "<div7 class='d-flex' style='justify-content: space-between;width: 100%'> " +
        "<div8 class='d-flex'> <span> تاریخ تصویب  </span> <span>&nbsp;</span> <span> : </span> <span> " + approval_date + " </span> </div8> " +
        "<div9 class='d-flex'> <span> مرجع تصویب </span> <span>&nbsp;</span> <span> : </span> <span> " + approval_reference + " </span> </div9> </div7>" +

        "<div7 class='d-flex' style='justify-content: space-between;width: 100%'> " +
        "<div8 class='d-flex'> <span>&nbsp;</span>  </div8> " +
        "<div9 class='d-flex'>  <span>&nbsp;</span>  </div9> </div7> " +

        "<div3 class='d-flex' style='justify-content: space-between;width: 100%'>" + "<div4 > <p>سامانه هوش‌یار</p> </div4> " +
        "<div5> <span>www.virtualjuristic.datakaveh.com</span> </div5> </div3> </div2> </div1>"

    /*"<div1 class='container-fluid' style='direction: rtl'> " +
    "<div2 class='row p-4 mx-auto' style='border: 4px solid #ccc; border-radius: 20px;'> " +
    "<div3 class='d-flex' style='justify-content: space-between;width: 100%'> <div4 > <p>سامانه هوشیاران</p> </div4> " +
    "<div5> <span>www.virtualjuristic.datakaveh.com</span> </div5> </div3> <div6 style='margin: auto;text-align: center'> " +
    "<h5 style='padding-bottom: 10px'>" + document_name + "</h5> </div6> " +
    "<div7 class='d-flex' style='justify-content: space-between;width: 100%'> " +
    "<div8 class='d-flex'> <span> تاریخ تصویب  </span> <span> " + approval_date + " </span> </div8> " +
    "<div9 class='d-flex'> <span>مرجع تصویب:   </span> <span> " + approval_reference + " </span> </div9> </div7> </div2> </div1>"*/

    for (let i = 0; i < response.length; i++) {
        const paragraph_text = response[i]["paragraph_text"]
        const paragraph_tag = '<p dir="rtl">' + paragraph_text + '</p>';
        element += paragraph_tag;
    }
    //element += '</div>';
    console.log(element);

    let opt = {
        margin: 1,
        filename: document_name + '.pdf',
        image: {type: 'jpeg', quality: 0.98},
        html2canvas: {scale: 2},
        jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'},
        pagebreak: {mode: ['avoid-all', 'css', 'legacy'], after: 'firstPage'}


    };
    html2pdf().set(opt).from(element).save();

    stopBlockUI();

    //user log
    let form_data = new FormData()
    let detail_type = "دانلود سند"
    let country_name = $("#country option:selected").text();
    let document_select_name = document.getElementById("document_select").title
    form_data.append('detail_type', detail_type);
    form_data.append('country_name', country_name);
    form_data.append('document_select_name', document_select_name);
    UserLog(form_data)
}

async function DownloadLinkSet() {
    var country_id = document.getElementById("country").value;
    var request_link = 'http://' + location.host + "/GetCountryById/" + country_id + "/";
    let response = await fetch(request_link).then(response => response.json());
    response = response["country_information"][0]

    const country_folder = response["folder"];
    const country_name = response["name"];
    const document_id = document.getElementById("document").value;

    request_link = 'http://' + location.host + "/GetDocumentById/" + document_id + "/";
    response = await fetch(request_link).then(response => response.json());
    var document_file_name = response["document_information"][0]["file_name"]

    if (document_file_name !== "انتخاب نمایید ...") {
        var file_path = "";

        if (country_name.includes("فاوا")) {
            file_path = 'http://' + location.host + '/media/data/' + country_folder + '\\' + document_file_name + '.docx';
        } else {
            file_path = 'http://' + location.host + '/media/data/' + country_folder + '\\' + document_file_name + '.txt';
        }
        document.getElementById("txt_download").href = file_path;

        const document_id = document.getElementById("document").value;

    } else {
        document.getElementById("txt_download").href = "#";
        return false;
    }
}

async function ShowDocumentComment() {
    const document_id = document.getElementById("document").value
    const username = getCookie("username")

    const request_link = 'http://' + location.host + "/GetDocumentComments/" + document_id + "/" + username + "/";
    const response = await fetch(request_link).then(response => response.json());
    const comments = response['comments']

    let table_data = ''
    for (let i = 0; i < comments.length; i++) {
        let color = 'text-success'
        let commentStatus = 'تایید شده'
        if (comments[i].accepted === 0) {
            color = 'text-warning'
            commentStatus = 'در انتظار تایید'
        }
        if (comments[i].accepted === -1) {
            color = 'text-danger'
            commentStatus = 'رد شده'
        }
        let link = "#"
        if (comments[i].user_id) {
            link = 'http://' + location.host + "/ShowUserProfile/?u=" + comments[i].user_id;
        }
        table_data += `<tr>
                                <td class="text-center">${i + 1}</td>
                                <td class="text-center">
                                    <a href="${link}">${comments[i].first_name} ${comments[i].last_name}</a></td>
                                <td class="text-center"><span class="${color}">${commentStatus}</span></td>

                                <td class="text-center">${comments[i].comment}</td>
                                <td class="text-center">
                                <div class="">
                                    <button type="button" onclick="OnVoteClick('agree', ${comments[i].id})"
                                            class="btn btn-success btn-agree-state">
                                            <i class="bi bi-hand-thumbs-up-fill" style="position:relative;top:-3px;"
                                                                         data-bs-toggle="tooltip"
                                                                         data-bs-placement="top"
                                                                         title="موافق"></i></button>
                                    <button type="button" onclick="OnVoteClick('disagree', ${comments[i].id})"
                                            class="btn btn-danger btn-agree-state">
                                           <i class="bi bi-hand-thumbs-down-fill" style="position:relative;top:-3px;"
                                                                         data-bs-toggle="tooltip"
                                                                         data-bs-placement="top"
                                                                         title="مخالف"></i></button>
                                </div>
                            </td>
                            <td class="text-center cursor-pointer" id="comment_agree" data-bs-target="#VoteDetailModal" data-bs-toggle="modal" onclick="VoteDetailFunction(${comments[i].id}, true)">${comments[i].agreed_count}</td>
                            <td class="text-center cursor-pointer" id="comment_disagree" data-bs-target="#VoteDetailModal" data-bs-toggle="modal" onclick="VoteDetailFunction(${comments[i].id}, false)">${comments[i].disagreed_count}</td>
                            <td class="text-center" id="comment_date" >${comments[i].time}</td>
                         </tr>`
    }
    if (comments.length == 0) {
        table_data = ` <tr>
                            <td class="text-center" id="comment_number">-</td>
                            <td class="text-center" id="comment_first_name">-</td>
                            <td class="text-center" id="follow">-</td>
                            <td class="text-center" id="comment_text">-</td>
                            <td class="text-center">-</td>
                            <td class="text-center" id="comment_agree">-</td>
                            <td class="text-center" id="comment_disagree">-</td>
                            <td class="text-center" id="comment_date">-</td>
                         </tr>`
    }
    document.getElementById('comments_table_body').innerHTML = table_data;
    $('.cm_table').footable({
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
        }
    });
}

async function ShowDocumentNote() {
    const document_id = document.getElementById("document").value
    const username = getCookie("username")

    const request_link = 'http://' + location.host + "/GetDocumentNotes/" + document_id + "/" + username + "/";
    const response = await fetch(request_link).then(response => response.json());
    // const notes = response['notes']
    let notes = response['notes'].sort(function (a, b) {
        if (a.starred == b.starred) {
            return 0;
        } else if (a.starred == true) {
            return -1;
        } else {
            return 1;
        }
    })

    let table_data = ''
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].label === null) {
            notes[i].label = "بدون برچسب"
        }
        if (notes[i].starred) {
            table_data += `<tr>
                                    <td class="text-center" id="note_number_${i + 1}">${i + 1}</td>
                                    <td class="text-center" id="note_text_${i + 1}">${notes[i].note}</td>
                                    <td class="text-center" id="note_time_${i + 1}">${notes[i].time}</td>
                                    <td class="text-center" id="note_label_${i + 1}">${notes[i].label}</td>
                                    <td class="text-center" >
                                        <button value="0" style="border: none;" onclick="ToggleStar('${notes[i].id}','note_starred_${i + 1}')" id="note_starred_${i + 1}">
                                            <span class="fa fa-star checked"></span>
                                        </button>
                                    </td>
                                    <td class="text-center " id="note_download_${i + 1}">
                                        <div class="text-center">
                                            <button type="button" id="document_download" onclick="generatePDFNote('${notes[i].document_name}','${notes[i].time}','${notes[i].note}')"
                                                class="btn d-flex float-center  mr-2 ">
                                                PDF
                                            </button>
                                        </div>
                                    </td>
                            </tr>`
        } else {
            table_data += `<tr>
                                    <td class="text-center" id="note_number_${i + 1}">${i + 1}</td>
                                    <td class="text-center" id="note_text_${i + 1}">${notes[i].note}</td>
                                    <td class="text-center" id="note_time_${i + 1}">${notes[i].time}</td>
                                    <td class="text-center" id="note_label_${i + 1}">${notes[i].label}</td>
                                    <td class="text-center" >
                                        <button value="1" style="border: none;" onclick="ToggleStar('${notes[i].id}','note_starred_${i + 1}')"  id="note_starred_${i + 1}">
                                            <span class="fa fa-star"></span>
                                        </button>
                                    </td>
                                    <td class="text-center " id="note_download_${i + 1}">
                                        <div class="text-center">
                                            <button type="button" id="document_download" onclick="generatePDFNote('${notes[i].document_name}','${notes[i].time}','${notes[i].note}')"
                                                class="btn d-flex float-center  mr-2 ">
                                                PDF
                                            </button>
                                        </div>
                                    </td>
                            </tr>`
        }
    }
    if (notes.length == 0) {
        table_data = `<tr>
                                <td class="text-center" id="note_number">-</td>
                                <td class="text-center" id="note_text">-</td>
                                <td class="text-center" id="note_time">-</td>
                                <td class="text-center" id="note_label">-</td>
                                <td class="text-center" id="note_starred">-</td>
                                <td class="text-center" id="note_download">-</td>
                        </tr>`
    }
    document.getElementById('notes_table_body').innerHTML = table_data;
    $('.note_table').footable({
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
        }
    });
}
