let startTime, endTime;

let first_loading = true;
let loaded_doc = 0
let counter = 0
const load_size = 200;

const ft = FooTable.init('#PopUpTable', {
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
    "empty": "در حال بازیابی اسناد (لطفا صبر نمایید)",
    "columns": [{
        "name": "id",
        "title": "ردیف",
        "breakpoints": "xs sm",
        "type": "number",
        "style": {
            "width": 80,
            "maxWidth": 80
        }
    }, {
        "name": "document_name",
        "title": "نام سند"
    }, {
        "name": "subject",
        "title": "موضوع سند"
    }, {
        "name": "approval_reference",
        "title": "مرجع تصویب"
    }, {
        "name": "approval_date",
        "title": "تاریخ تصویب"
    }, {
        "name": "tag",
        "title": "انتخاب"
    }],
});

$(document).ready(function () {
    $('#ApprovalsDropdown').addClass('active');
    $('#information').addClass('active');
    $('select#language').on('change', function (e) {
            let selected_language = this.value;
            let current_url = window.location.href;
            if (selected_language === 'England') {
                if (selected_language === 'England') {
                    let page_name = current_url.split('/')[3]
                    let requested_url = current_url.replace(page_name, 'en')
                    window.location = requested_url;
                } else if (selected_language === 'Russia') {
                    let page_name = current_url.split('/')[3]
                    let requested_url = current_url.replace(page_name, 'ru')
                    window.location = requested_url;
                }
            }
        }
    )
    ;
});

init();

async function init() {
    await initSearchableSelects();

    /* Get Actors List */
    // let request_link = 'http://' + location.host + "/GetActorsList/";
    // let response = await fetch(request_link).then(response => response.json());
    // actors_list = response["actorsList"]

    const url = new URL(window.location.href);
    var document_id = url.searchParams.get("id");

    if (document_id) {
        // const request_link = 'http://' + location.host + "/GetDocumentById/" + document_id + "/";
        // let response = await fetch(request_link).then(response => response.json());
        // response = response["document_information"][0]
        //
        // document.getElementById("document").innerHTML = "<option value=" + response["id"] + " >" + response["name"] + "</option>";
        //
        // document_select_tag = '<i class="dropdown_icon bi bi-chevron-down ml-2 bold text-black"></i>' + response['name']
        // document.getElementById('document_select').innerHTML = document_select_tag;
        // document.getElementById('document_select').title = response['name'];
        //
        // /* disable country , document */
        // document.getElementById("document_select").disabled = true;
        // document.getElementById("country").disabled = true;
        //
        //
        // const select = document.getElementById("country");
        // let control = select.tomselect;
        // control.setValue(response["country_id"])

        await SelectDocumentFunction(document_id)

    } else {
        const text = "انتخاب نمایید"
        document.getElementById("document").innerHTML = "<option value=" + 0 + " disabled>" + text + "</option>";
        document.getElementById("document_download").disabled = true;
        document.getElementById("pdf_download").disabled = true;
        document.getElementById("document_search").disabled = true;
        document.getElementById("document_subject_btn").disabled = true;

        document.getElementById("document_select").disabled = true;
        const country_name = $("#country option:selected").text();
        document.getElementById('ModalHeader').innerText = 'مجموعه سند: ' + country_name;
        document.getElementById("document_select").disabled = false;

        if ($('.add-row-1').length === 0) {
            window.setTimeout(function () {
                $(".pagination").append("<li class='footable-page visible'><a class='add-row-1' href='#' onclick='loadMoreDoc()'>+</a></li>");
            }, 1000);
        }

        setTimeout(loadMoreDoc, 1000)
    }

    // $("#document_select").click(function () {
    //         if ($('.add-row-1').length === 0) {
    //             window.setTimeout(function () {
    //                 $(".pagination").append("<li class='footable-page visible'><a class='add-row-1' href='#' onclick='loadMoreDoc()'>+</a></li>");
    //             }, 1000);
    //         }
    //
    //     });

    // syncAllSelects(true);

    // user log
    let form_data = new FormData()
    let detail_type = "نمایش پنل"
    form_data.append('detail_type', detail_type);
    UserLog(form_data)


    // const country_id = document.getElementById('country').value
    //
    // request_link = 'http://' + location.host + "/GetTypeByCountryId/" + country_id + "/";
    // response = await fetch(request_link).then(response => response.json());
    // response = response["documents_type_list"]
    // document.getElementById("ColorBox").innerHTML = "";
    // for (var i = 0; i < response.length; i++) {
    //     const type_id = response[i]["id"]
    //     const type_name = response[i]["type"]
    //     const type_color = response[i]["color"]
    //
    //     let tag = '<div class="form-check pt-2 pb-2"> <input type="checkbox" id="' + type_id + '" checked disabled>'
    //     tag += '<label class="form-check-label bold" style="padding: 0px 25px; color: ' + type_color + '" for="flexCheckChecked">' + type_name + '</label></div>'
    //
    //
    //     document.getElementById("ColorBox").innerHTML += tag
    // }


}

async function ShowResult() {
    // await DownloadLinkSet();
    //
    const document_id = document.getElementById("document").value
    const country_id = document.getElementById('country').value

    document.getElementById("document_download").disabled = false;
    document.getElementById("pdf_download").disabled = false;
    document.getElementById("document_search").disabled = false;
    document.getElementById("document_subject_btn").disabled = false;

    getDocumentFullProfileInfo(country_id, document_id)
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

    const approval_reference = "مقام معظم رهبری"
    const approval_date = document.getElementById("document_date").innerText

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

        "<div3 class='d-flex' style='justify-content: space-between;width: 100%'>" + "<div4 > <p>سامانه رهنمود</p> </div4> " +
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

async function CountryChanged() {

    startBlockUI();


    // counter = 0;
    // loaded_doc = 0
    // first_loading = true
    //
    // $(".add-row-1").css('visibility', 'visible');
    //
    // document.getElementById("document_select").disabled = true;
    // await setTimeout(loaddata, 1000)
    // document.getElementById("document_select").disabled = false;
    // // new
    // if ($('.add-row-1').length === 0) {
    //     window.setTimeout(function () {
    //         $(".pagination").append("<li class='footable-page visible'><a class='add-row-1' href='#' onclick='loadMoreDoc()'>+</a></li>");
    //     }, 1000);
    // }
    // stopBlockUI()

    // /******************************** Get Type Color *****************************************/
    // country_id = document.getElementById('country').value
    //
    // request_link = 'http://' + location.host + "/GetTypeByCountryId/" + country_id + "/";
    // response = await fetch(request_link).then(response => response.json());
    // response = response["documents_type_list"]
    // document.getElementById("ColorBox").innerHTML = "";
    // for (var i = 0; i < response.length; i++) {
    //     const type_id = response[i]["id"]
    //     const type_name = response[i]["type"]
    //     const type_color = response[i]["color"]
    //
    //     tag = '<div class="form-check pt-2 pb-2"> <input type="checkbox" id="' + type_id + '" checked disabled>'
    //     tag += '<label class="form-check-label bold" style="padding: 0px 25px; color: ' + type_color + '" for="flexCheckChecked">' + type_name + '</label></div>'
    //
    //
    //     document.getElementById("ColorBox").innerHTML += tag
    // }


}

function startTimer() {
    startTime = new Date();
}

function endTimer() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff);
    console.log(seconds + " seconds");
    return seconds;
}

function startBlockUI() {
    $.blockUI({
        // BlockUI code for element blocking
        message: ("<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div><h6 style = 'font-family:vazir;'>...در حال دریافت اطلاعات<h6>"),
        css: {
            color: 'var(--menu_color)',
            border: 'none',
            borderRadius: '5px',
            borderColor: 'var(--menu_color)',
            paddingTop: '5px'
        }
    });
    startTimer();
}

function stopBlockUI() {
    $.unblockUI();
    elapsed_time = endTimer();
    toast_message = '<span class="text-secondary"> ' + 'زمان سپری شده: ' + '</span>' + '<span class="bold" style="color:var(--menu_color)">' + elapsed_time + ' ثانیه' + '</span>'
}

// function showToastMessage(message_text) {
//     document.getElementById('toast_message').innerHTML = message_text
//     var toastElList = [].slice.call(document.querySelectorAll('.toast'))
//     var toastList = toastElList.map(function (toastEl) {
//         return new bootstrap.Toast(toastEl)
//     });
//     toastList.forEach(toast => toast.show())
// }

// function loaddata() {
//     $('.add-row').trigger('click');
//     stopBlockUI();
// }

async function UserLog(form_data) {
    if (getCookie("username") !== "") {
        const user_name = getCookie("username")
        let page_url = window.location.pathname
        const user_ip = "127.0.0.0"

        page_url = page_url.slice(0, -1);
        if (page_url === "") {
            page_url = "/0";
        }


        let link_request = 'http://' + location.host + "/UserLogSaved/" + user_name + page_url + "/" + user_ip + "/";

        $.ajax({
            url: link_request,
            data: form_data,
            type: 'POST',
            contentType: false,
            processData: false,
            async: true,


        }).done(function (res) {
            console.log("done")

        }).fail(function (res) {
            console.log("fail")
        });

    }
}

async function loadMoreDoc() {
    let start_index = load_size * counter
    let end_index = load_size * (counter + 1)

    const country_id = document.getElementById("country").value

    const request_link = 'http://' + location.host + "/GetDocumentsByCountryId_Modal/" + country_id + "/" + start_index + "/" + end_index + "/"
    let response = await fetch(request_link).then(response => response.json());
    let documentsList = response["documentsList"]
    let all_count = response["document_count"]

    if (first_loading === false)
        ft.rows.load(documentsList, true);
    else {
        ft.rows.load(documentsList);
        document.getElementById("all_doc_count").innerText = all_count.toString()
    }

    loaded_doc += documentsList.length;

    document.getElementById("load_doc_count").innerText = loaded_doc.toString()
    counter += 1
    first_loading = false

    if (loaded_doc === all_count) {
        $(".add-row-1").css('visibility', 'hidden');
    } else {
        window.setTimeout(function () {
            $(".pagination").append("<li class='footable-page visible'><a class='add-row-1' href='#' onclick='loadMoreDoc()'>+</a></li>");
        }, 1000);
    }

}

async function pagingchange() {
    paging_size = $('#LoadCount option:selected').val()
    FooTable.get('#PopUpTable').pageSize(paging_size);
    window.setTimeout(function () {
        $(".pagination").append("<li class='footable-page visible'><a href='#' class='add-row-1' onclick='loadMoreDoc()'>+</a></li>");
    }, 1000);
}

async function SelectDocumentFunction(document_id) {
    const country_id = document.getElementById('country').value
    const request_link = 'http://' + location.host + "/GetRahbariDocumentById/" + country_id + "/" + document_id + "/";
    let response = await fetch(request_link).then(response => response.json());
    const result = response["result"][0]['_source']
    document.getElementById("document").innerHTML = "<option value=" + result["document_id"] + " >" + result["document_name"] + "</option>";

    document_select_tag = '<i class="dropdown_icon bi bi-chevron-down ml-2 bold text-black"></i>' + result['document_name']
    document.getElementById('document_select').innerHTML = document_select_tag;
    document.getElementById('document_select').title = result['document_name'];

    document.getElementById('document_date').innerHTML = result['rahbari_date']
    document.getElementById('document_type').innerHTML = result['type']
    document.getElementById('document_labels').innerHTML = result['labels']
    ShowResult();
}