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
    document.getElementById("document_select").innerHTML = '<i class="dropdown_icon bi bi-chevron-down ml-2 bold text-black"></i>' + name
}

async function click_show_result() {
    const request_link = 'http://' + location.host + "/get_full_adaption/" + id + "/" + source_country_code + "/" + destination_country_code + "/";
    const response = await fetch(request_link).then(response => response.json());

    const results = []
    for (let doc of response['docs']) {
        const id = doc["document_id"]
        const name = doc["document_name"]
        let tag = `<button type='button' class='btn modal_btn' data-bs-toggle='modal' onclick='select_document(${id} , "${name}")'>جزییات</button>`
        const row = {
            "id": id,
            "document_name": name,
            "country_name": doc["country_name"],
            "document_date": doc["document_date"],
            "BM25_score": doc["BM25_score"],
            "tag": tag
        }
        results.push(row)
    }
}
