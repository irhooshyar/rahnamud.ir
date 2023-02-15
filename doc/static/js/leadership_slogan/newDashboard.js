MAX_RESULT_WINDOW = 5000
SEARCH_RESULT_SIZE = 100


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

async function new_prof_slogan_year_changed(year) {
    const request_link = 'http://' + location.host + "/slogan_get_chart/" + year + "/"

    let response = await fetch(request_link).then(response => response.json());

    console.log(response)
    const data = []
    let all_data = 0
    for (let buc of response['with_word_year_agg']['approval-year-content-agg']['buckets']) {
        all_data += buc['doc_count']
    }
    for (let item of Object.keys(response.keyword_repeat)) {
        data.push([item, response.keyword_repeat[item]])
    }
    NewGaugeChart("word_count_container", {
        data: data,
        all_data: all_data,
        title: 'توزیع کلیدواژه ها در اسناد حاوی واژه',
        all_data_tooltip: "تعداد کل اسناد حاوی حداقل واژه",
        data_tooltip: "اسناد حاوی کلمه",
        size: "full",
        onClick: (e, data, text) => {
            click_guage_column(text)
        }
    })
    create_bars_chart_data(response['year_agg']['approval-year-agg']['buckets'],
        response['with_word_year_agg']['approval-year-content-agg']['buckets'])
}

function create_bars_chart_data(all_year, keyword_all_year) {
    all_year = all_year.sort((a, b) => a['key'] - b['key'])

    let data = {}
    data["اسناد بدون واژه"] = []
    data["اسناد حاوی حداقل واژه"] = []
    for (let year_bucket of all_year) {
        let is_have_keyword = false;
        for (let keyword_bucket of keyword_all_year) {
            if (year_bucket['key'] === keyword_bucket['key']) {
                data["اسناد بدون واژه"].push({
                    x: year_bucket["key"],
                    value: year_bucket["doc_count"] - keyword_bucket["doc_count"]
                })
                data["اسناد حاوی حداقل واژه"].push({x: year_bucket["key"], value: keyword_bucket["doc_count"]})
                is_have_keyword = true
                break
            }
        }
        if (!is_have_keyword) {
            data["اسناد بدون واژه"].push({
                x: year_bucket["key"],
                value: year_bucket["doc_count"]
            })
            data["اسناد حاوی حداقل واژه"].push({x: year_bucket["key"], value: 0})
        }
        // if (row.length === 2) row[2] = 0
    }

    console.log(data)

    const options = {
        data: data,
        xAxisTitle: 'سال',
        title: 'توزیع اسناد حاوی حداقل یک واژه به تفکیک سال',
        size: "full",
        yAxisTitle: "تعداد کل اسناد",
        onClick: (e, junk_data, data) => {
            const key = data[0] === "اسناد حاوی حداقل واژه" ? 1 : 0;
            const year = data[1]
            const slogan_year = document.getElementById("slogan").value;

            click_stack_based_column(key, slogan_year, year, data[0])
        }
    };


    newStackedColumnChart("doc_count_container", options)
}

async function click_stack_based_column(key, slogan_year, selected_year, chart_name) {
    startBlockUI("کلیک روی نمودار")
    const request_link = 'http://' + location.host + "/slogan_stackBased_get_information/" + key + "/" + slogan_year + "/" + selected_year + "/";

    document.getElementById("ChartModalBodyText_2").innerHTML = ""
    document.getElementById("ChartModalHeader_2").innerHTML = ""


    // set modal header
    modal_header = chart_name + " در سال " + selected_year
    document.getElementById("ChartModalHeader_2").innerHTML = modal_header
    // define request link without curr_page & search_result_size

    request_configs = {
        "link": request_link,
        "search_result_size": SEARCH_RESULT_SIZE,
        "max_result_window": MAX_RESULT_WINDOW,
        "data_type": "url_parameters",
        "form_data": null
    }

    export_link = 'http://' + location.host + "/slogan_stackBased_information_export/" + key + "/" + slogan_year + "/" + selected_year + "/";

    export_configs = {
        "link": export_link,
        "btn_id": "ExportExcel_2"
    }

    highlight_configs = {
        "parameters": null,
        "highlight_enabled": false,
        "custom_function": null
    }

    modal_configs = {
        "body_id": "ChartModalBodyText_2",
        "modal_load_more_btn_id": "LoadMoreDocuments_2",
        "result_size_container_id": "DocsCount_2",
        "result_size_message": "سند",
        "list_type": "ordered",
        "custom_body_function": null,
        "body_parameters": null,
        "link_page": "information",

    }

    segmentation_config = {
        "parameters": ["احساس بسیار منفی", "بدون ابراز احساسات", "احساس منفی", "احساس خنثی یا ترکیبی از مثبت و منفی", "احساس مثبت", "احساس بسیار مثبت"],
        "keyword": "sentiment",
        "enable": false,
        "aggregation_keyword": "rahbari-sentiment-agg"
    }


    column_interactivity_obj = new ColumnInteractivity("documents",
        request_configs, export_configs, modal_configs, highlight_configs, segmentation_config)

    result = await column_interactivity_obj.load_content();
    console.log(result)

    $('#ChartModalBtn_2').click()
    stopBlockUI('کلیک روی نمودار');

    $('#ExportExcel_2').on('click', async function () {
        await column_interactivity_obj.download_content();
    })
}

async function click_guage_column(key) {
    startBlockUI("کلیک روی نمودار")
    const request_link = 'http://' + location.host + "/slogan_gauge_get_information/" + key + "/";

    document.getElementById("ChartModalBodyText_2").innerHTML = ""
    document.getElementById("ChartModalHeader_2").innerHTML = ""


    // set modal header
    modal_header = "اسناد حاوی کلمه " + key + " از سال 1375"
    document.getElementById("ChartModalHeader_2").innerHTML = modal_header
    // define request link without curr_page & search_result_size

    request_configs = {
        "link": request_link,
        "search_result_size": SEARCH_RESULT_SIZE,
        "max_result_window": MAX_RESULT_WINDOW,
        "data_type": "url_parameters",
        "form_data": null
    }

    export_link = 'http://' + location.host + "/slogan_gauge_information_export/" + key + "/";

    export_configs = {
        "link": export_link,
        "btn_id": "ExportExcel_2"
    }

    highlight_configs = {
        "parameters": null,
        "highlight_enabled": false,
        "custom_function": null
    }

    modal_configs = {
        "body_id": "ChartModalBodyText_2",
        "modal_load_more_btn_id": "LoadMoreDocuments_2",
        "result_size_container_id": "DocsCount_2",
        "result_size_message": "سند",
        "list_type": "ordered",
        "custom_body_function": null,
        "body_parameters": null,
        "link_page": "information",

    }

    segmentation_config = {
        "parameters": ["احساس بسیار منفی", "بدون ابراز احساسات", "احساس منفی", "احساس خنثی یا ترکیبی از مثبت و منفی", "احساس مثبت", "احساس بسیار مثبت"],
        "keyword": "sentiment",
        "enable": false,
        "aggregation_keyword": "rahbari-sentiment-agg"
    }


    column_interactivity_obj = new ColumnInteractivity("documents",
        request_configs, export_configs, modal_configs, highlight_configs, segmentation_config)

    result = await column_interactivity_obj.load_content();
    console.log(result)

    $('#ChartModalBtn_2').click()
    stopBlockUI('کلیک روی نمودار');

    $('#ExportExcel_2').on('click', async function () {
        await column_interactivity_obj.download_content();
    })
}