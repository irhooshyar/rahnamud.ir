const LOADED_SIZE = 200

let source_country_code = ""
let destination_country_code = ""
let loaded_doc = 0

let search_curr_page = 1;

init()

const notyf = new Notyf({position: {x: 'left', y: 'bottom'}});
const ft = FooTable.init('#PopUpTable', {
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
        "name": "country_name",
        "title": "مرجع اسناد"
    }, {
        "name": "document_date",
        "title": "تاریخ انتشار"
    }, {
        "name": "tag",
        "title": "انتخاب"
    }],
});
$("#SearchBox").keyup(function (event) {
    if (event.keyCode === 13) {
        Search_Document_ByName();
    }
});

function init() {
    source_country_code = document.getElementById("source_country").value;
    destination_country_code = document.getElementById("destination_country").value;
    document.getElementById("show_result_button").disabled = true

    search_document_name()
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function process_search() {
    debounce(() => Search_Document_ByName(), 500);
}

async function search_document_name(is_push = true) {
    let search_name = document.getElementById("SearchBox").value
    if (!search_name) {
        search_name = "empty"
    }
    const request_link = 'http://' + location.host + "/full_adaption_search/" + source_country_code + "/" + search_name + "/" + search_curr_page + "/";
    const response = await fetch(request_link).then(response => response.json());
    const document_count = response["total_hits"]

    const results = []
    for (let doc of response['result']) {
        const id = doc["document_id"]
        const name = doc["document_name"]
        let tag = `<button type='button' class='btn modal_btn' data-bs-toggle='modal' onclick='select_document(${id} , "${name}")'>انتخاب</button>`
        const row = {
            "id": id,
            "document_name": name,
            "country_name": doc["country_name"],
            "document_date": doc["document_date"],
            "tag": tag
        }
        results.push(row)
    }


    ft.rows.load(results, is_push);
    loaded_doc = is_push ? loaded_doc + results.length : results.length;


    document.getElementById("load_doc_count").innerText = loaded_doc.toString()
    document.getElementById("all_doc_count").innerText = document_count.toString()

    add_load_more_doc_button(loaded_doc, document_count)
}

function add_load_more_doc_button(loaded_doc, all_docs) {
    if (loaded_doc >= all_docs)
        $(".add-row-1").css('visibility', 'hidden');
    else {
        if (document.getElementsByClassName("add-row-1")[0]) {
            return
        }
        window.setTimeout(function () {
            $(".pagination").append("<li class='visible'><a href='#' class='add-row-1' onclick='load_more_doc()'>+</a></li>");
        }, 1000);
    }
}

function load_more_doc() {
    search_curr_page += 1;
    search_document_name();
}

async function paging_change() {
    // paging_size = $('#LoadCount option:selected').val()
    // FooTable.get('#PopUpTable').pageSize(paging_size);
    // window.setTimeout(function () {
    //     $(".pagination").append("<li class='footable-page visible'><a href='#' class='add-row-1' onclick='loadMoreDoc()'>+</a></li>");
    // }, 1000);
}

function parameter_reload() {
    document.getElementById("SearchBox").value = ""
    document.getElementById("show_result_button").disabled = true
    document.getElementById("document_select").innerHTML = '<i class="dropdown_icon bi bi-chevron-down ml-2 bold text-black"></i> انتخاب نمایید'
    search_curr_page = 1;
    loaded_doc = 0
}

async function reload() {
    // startBlockUI();
    ft.rows.load([]);
    parameter_reload();
    search_document_name()
    // counter = 0;
    // loaded_doc = 0
    // first_loading = true
    //
    // $(".add-row-1").css('visibility', 'visible');
    //
    // document.getElementById("SearchBox").value = ""
    //
    // document.getElementById("document_select").disabled = true;
    // setTimeout(loadMoreDoc, 1000)
    // document.getElementById("document_select").disabled = false;
    // // new
    // if ($('.add-row-1').length === 0) {
    //     window.setTimeout(function () {
    //         $(".pagination").append("<li class='footable-page visible'><a class='add-row-1' href='#' onclick='load_more_doc()'>+</a></li>");
    //     }, 1000);
    // }
    // stopBlockUI()
}

function source_country_changed() {
    ft.rows.load([]);
    parameter_reload();
    source_country_code = document.getElementById("source_country").value;
    search_document_name();
}

function destination_country_changed() {
    destination_country_code = document.getElementById("destination_country").value;
}

