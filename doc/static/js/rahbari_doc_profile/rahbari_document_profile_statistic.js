function doc_showChart(chart_data, container, tab_name, sortKeys, xAxisTitle, title, yAxisTitle = "تعداد پاراگراف") {

    let data = []
    for (column of chart_data) {
        key = column["key"]
        // key = column["key"] != 0 ? column["key"] : 'نامشخص'
        value = column["doc_count"]

        if (key !== "بدون شخص حقیقی" && key !== "بدون موقعیت مکانی" && key !== "بدون ذکر سازمان") {
            data.push([key, value])
        }
    }

    const options = {
        data,
        sortKeys,
        xAxisTitle,
        title,
        yAxisTitle: yAxisTitle,
        onClick: async function (event, data) {

            const click_tag = event.domTarget.tag;
            const index = click_tag["index"]
            const text = data.row(index)[0];

            if (tab_name == "doc_charts") {
                await GetClickedColumnDocuments(container, text)
                $("#ChartModalBtn").click();

            } else if (tab_name == "paragraph_charts") {


                let field_value = text
                let field_name = CHART_FIELD_DICT[container] + ".keyword"
                let chart_name = CHART_NAME_DICT[container]
                console.log(field_name)
                console.log(field_value)

                await GetClickedColumnParagraphs(chart_name, field_name, field_value)
                $("#ChartModalBtn_2").click();


            }


        }
    };

    newBarChart(container, options)


}

async function getDocumentFullProfileInfo(country_id, document_id) {
    const rahbari_type = 0
    const request_link = 'http://' + location.host + "/rahbari_document_get_full_profile_analysis/" + country_id + "/" + document_id + "/";

    startBlockUI();
    let response = await fetch(request_link).then(response => response.json());

    console.log("__", response)

    /*  Show Table Result */
    total_hits = response["total_hits"]
    // ES_SearchResult = response["result"]
    ES_Aggregations = response["aggregations"]

    // const paragraph_tab = document.getElementById("paragraph_info_tab")
    // if (paragraph_tab.classList.contains("active")) {
    //     document.getElementById("SearchResultLable").innerText = "تعداد کل نتایج: " + total_hits + " حکم"
    // }
    // paragraph_tab.addEventListener("click", () => {
    //     document.getElementById("SearchResultLable").innerText = "تعداد کل نتایج: " + total_hits + " حکم"
    // })

    // let sentiment_chart = ES_Aggregations['rahbari-sentiment-agg']['buckets']
    // let classification_chart = ES_Aggregations['rahbari-classification-subject-agg']['buckets']
    let persons_chart = ES_Aggregations['rahbari-person-agg']['buckets']
    let locations_chart = ES_Aggregations['rahbari-location-agg']['buckets']
    let organizations_chart = ES_Aggregations['rahbari-organization-agg']['buckets']

    // sentiment_chart.sort((a, b) => {
    //     return getCharAtCode(a['key']) - getCharAtCode(b['key'])
    // })
    // classification_chart.sort((a, b) => {
    //     return getCharAtCode(a['key'][0]) - getCharAtCode(b['key'][0])
    // })


    // showChartData(sentiment_chart, "sentiment_container", "paragraph_charts", [], undefined, "احساس", "توزیع احکام براساس احساسات", "تعداد احکام")
    // doc_showChart(classification_chart, "subject_container", "", undefined, "موضوع", "توزیع بندها براساس موضوع", "تعداد بندها")
    doc_showChart(persons_chart, "person_container", "", undefined, "شخص", "توزیع بیانات براساس اشخاص حقیقی")
    doc_showChart(locations_chart, "location_container", "", undefined, "موقعیت مکانی", "توزیع بیانات براساس موقعیت مکانی")
    doc_showChart(organizations_chart, "organization_container", "", undefined, "سازمان", "توزیع بیانات  براساس سازمان‌ها")

    stopBlockUI('paragraph_info_pane', 'داشبورد آماری احکام');
}

function stackBasedChartData(data, container, xAxisTitle, title, chooseFirst30 = false, showItemsTable = false) {
    const dataArray = []

    const sentiment_words = ["احساس بسیار منفی", "بدون ابراز احساسات", "احساس منفی", "احساس خنثی یا ترکیبی از مثبت و منفی", "احساس مثبت", "احساس بسیار مثبت"]
    const differentValues = []
    for (let info of data) {
        const key = info.key[0]

        if (key === "بدون شخص حقیقی" || key === "بدون موقعیت مکانی" || key === "بدون ذکر سازمان") {
            continue
        }

        if (differentValues.includes(key)) {
            continue
        }
        differentValues.push(key)
    }

    const items = []
    for (const value of differentValues) {
        const item = {}
        item['key'] = value
        item['value'] = {}

        for (const info of data) {
            const key = info.key

            if (key[0] === value && !item['value'][key[1]]) {
                item['value'][key[1]] = info

                if (Object.keys(item['value']).length === 6) {
                    break
                }
            }
        }
        items.push(item)
    }

    if (showItemsTable) {
        get_real_persons(items)
    }
    console.log(items)

    for (const item of items) {
        const dataRow = []
        dataRow.push(item['key'])
        dataRow.push(item['value']['احساس بسیار مثبت'] ? item['value']['احساس بسیار مثبت']['doc_count'] : 0)
        dataRow.push(item['value']['احساس مثبت'] ? item['value']['احساس مثبت']['doc_count'] : 0)
        dataRow.push(item['value']['احساس خنثی یا ترکیبی از مثبت و منفی'] ? item['value']['احساس خنثی یا ترکیبی از مثبت و منفی']['doc_count'] : 0)
        dataRow.push(item['value']['احساس منفی'] ? item['value']['احساس منفی']['doc_count'] : 0)
        dataRow.push(item['value']['احساس بسیار منفی'] ? item['value']['احساس بسیار منفی']['doc_count'] : 0)
        dataRow.push(item['value']['بدون ابراز احساسات'] ? item['value']['بدون ابراز احساسات']['doc_count'] : 0)

        dataArray.push(dataRow)

        if (chooseFirst30 && dataArray.length === 30) {
            break
        }
    }


    showStackBasedChart(dataArray, container, xAxisTitle, title)
}


function showStackBasedChart(data, container, xAxisTitle, title) {
    const onClick = async function (event) {

        const click_tag = event.domTarget.tag;
        const index = click_tag["index"]
        const text = data[index][0];
        const sentiment = click_tag["X"]["iV"]["seriesName"]

        let filtered_result = []
        let header = ""
        let save_file_name = document.getElementById("SearchBox").value;

        let field_value = text.replaceAll("#", "*")
        let field_name = CHART_FIELD_DICT[container] + ".keyword"
        let chart_name = CHART_NAME_DICT[container]

        await GetClickedColumnParagraphs(chart_name, field_name, field_value, false, false, "", sentiment)
        $("#ChartModalBtn_2").click();

    }
    const options = {
        data,
        xAxisTitle,
        yAxisTitle: 'تعداد احکام',
        title,
        bars: [
            {
                name: "احساس بسیار مثبت",
                onClick
            },
            {
                name: "احساس مثبت",
                onClick
            },
            {
                name: "احساس خنثی یا ترکیبی از مثبت و منفی",
                onClick
            },
            {
                name: "احساس منفی",
                onClick
            },
            {
                name: "احساس بسیار منفی",
                onClick
            },
            {
                name: "بدون ابراز احساسات",
                onClick
            }
        ]
    };

    newBarsChart(container, options)

}

function getCharAtCode(str) {
    let sum = 0
    for (let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }

    return sum
}

