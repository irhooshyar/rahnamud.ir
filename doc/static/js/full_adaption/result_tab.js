let selected_document_id = -1;
const result_ft = FooTable.init('#adaptionTable', {
    "paging": {
        "enabled": true,
        strings: {
            first: '«',
            prev: '‹',
            next: '›',
            last: '»'
        }
    },
    "filtering": {
        "enabled": false
    },
    "sorting": {
        "enabled": true
    },
    "empty": "سندی یافت نشد",
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
        "name": "country_name",
        "title": "مرجع اسناد"
    }, {
        "name": "document_date",
        "title": "تاریخ انتشار"
    }, {
        "name": "BM25_score",
        "title": "امتیاز شباهت براساس bm25"
    }, {
        "name": "tag",
        "title": "جزییات"
    }],
});

async function select_document(id, name) {
    selected_document_id = id;
    document.getElementById("show_result_button").disabled = false
    document.getElementById("document_select").title = name
    document.getElementById("document_select").innerHTML = '<i class="dropdown_icon bi bi-chevron-down ml-2 bold text-black"></i>' + name
}

async function click_show_result() {
    startBlockUI();
    result_ft.rows.load([]);
    const request_link = 'http://' + location.host + "/get_full_adaption/" + selected_document_id + "/" + source_country_code + "/" + destination_country_code + "/";
    const response = await fetch(request_link).then(response => response.json());

    const results = []
    for (let doc of response['docs']) {
        const id = doc["document_id"]
        const name = doc["document_name"]
        let tag = `<button type='button' class='btn modal_btn' data-bs-toggle='modal' onclick='detail(${id} , "${name}")'>جزییات</button>`
        const row = {
            "id": id,
            "document_name": name,
            "country_name": doc["country_name"],
            "document_date": doc["document_date"],
            "BM25_score": parseFloat(doc["BM25_score"]).toFixed(2),
            "tag": tag
        }
        results.push(row)
    }

    const form_data = new FormData()
    const detail_type = "انطباق‌سنجی بین سامانه‌ای"
    form_data.append('detail_type', detail_type);
    form_data.append('source_country_name', source_country_code);
    form_data.append('destination_country_name', destination_country_code);
    form_data.append('document_select_name', name);
    UserLog(form_data)

    result_ft.rows.load(results);
    stopBlockUI()
}

async function detail(id, name) {
    startBlockUI()
    document.getElementById("BM25_dest_document").innerHTML = ""
    document.getElementById("BM25_source_document").innerHTML = ""
    const error_child = document.getElementById("error_child")
    if (error_child) error_child.remove()


    const header = document.getElementById("document_similarity_detail_ModalHeader");
    const main_document_name = document.getElementById('document_select').title
    const main_document_id = document.getElementById("document").value

    header.innerText = `جزییات شباهت سند «${main_document_name}» و «${name}»`

    const BM25_request_link = 'http://' + location.host + "/full_adaption_similarity_detail/" + selected_document_id + "/" + id + "/" + source_country_code + "/" + destination_country_code + "/";
    let BM25_response = await fetch(BM25_request_link).then(response => response.json());
    if (BM25_response["error"]) {
        let child = document.createElement("p")
        child.id = "error_child"
        child.style.textAlign = "center"
        child.innerText = BM25_response["error"]

        document.getElementById("BM25_pane").appendChild(child)
        stopBlockUI()
        $("#document_similarity_detail_modal_btn").click()
        return
    }

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


    source_html = "<p class=\"text-center\">«" + main_document_name + "»</p>" + source_html
    document.getElementById("BM25_dest_document").innerHTML = "<p class=\"text-center\">«" + name + "»</p>" + document.getElementById("BM25_dest_document").innerHTML
    document.getElementById("BM25_source_document").innerHTML = source_html

    stopBlockUI()
    $("#document_similarity_detail_modal_btn").click()
}

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
    startTime = new Date();
}

function stopBlockUI() {
    $.unblockUI();
    elapsed_time = endTimer();
    toast_message = '<span class="text-secondary"> ' + 'زمان سپری شده: ' + '</span>' + '<span class="bold" style="color:var(--menu_color)">' + elapsed_time + ' ثانیه' + '</span>'
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