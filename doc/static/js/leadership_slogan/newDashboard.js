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
    guage_chart("word_count_container", {
        data: data,
        all_data: all_data,
        title: 'توزیع کلیدواژه ها در اسناد حاوی واژه',
        size: "full",
    })
    create_bars_chart_data(response['year_agg']['approval-year-agg']['buckets'],
        response['with_word_year_agg']['approval-year-content-agg']['buckets'])
}

function create_bars_chart_data(all_year, keyword_all_year) {
    // let data = []
    // for (let year_bucket of all_year) {
    //     const row = []
    //     row[0] = year_bucket['key']
    //     row[1] = year_bucket['doc_count']
    //
    //     for (let keyword_bucket of keyword_all_year) {
    //         if (row[0] === keyword_bucket['key']) {
    //             row[2] = keyword_bucket['doc_count']
    //             break
    //         }
    //     }
    //     if (row.length === 2) row[2] = 0
    //
    //     data.push(row)
    //
    // }

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
    };


    newStackedColumnChart("doc_count_container", options)
}

function guage_chart(container_id, options) {
    const {chartContainerId, chartDownloadId} = newChartContainer(container_id, options);
    const palette = anychart.palettes.distinctColors();

    palette.items(['#488FB8', '#B8A948', '#8FB848', '#CDC37F', '#CD7F8A', '#B1CD7F', '#CD7FB1', '#7FB1CD', '#7F8ACD', '#CDC37F', '#B1CD7F']);

    let all_data = options.all_data
    let chart_data = options.data

    if (chart_data.length === 0) {
        document.getElementById(chartContainerId).innerText = "هیچ داده ای وجود ندارد"
        return;
    }

    let names = [];
    let data = [];
    for (let item of chart_data) {
        names.push(item[0])
        data.push(item[1])
    }
    data.push(all_data)

    var dataSet = anychart.data.set(data);
    var makeBarWithBar = function (gauge, radius, i, width) {
        var stroke = null;
        gauge
            .label(i)
            .text(names[i] + ' ' + Math.ceil(((data[i] / all_data) * 100)) + '%') // color: #7c868e
            .textDirection("rtl")
            .fontFamily("vazir")
            .fontColor('#6C757D')
        gauge
            .label(i)
            .hAlign('center')
            .vAlign('middle')
            .anchor('right-center')
            .padding(0, 10)
            .height(width / 2 + '%')
            .offsetY(radius + '%')
            .offsetX(0)
            .fontFamily("vazir");

        gauge
            .bar(i)
            .dataIndex(i)
            .radius(radius)
            .width(width)
            .fill(palette.itemAt(i))
            .stroke(null)
            .zIndex(5);
        gauge
            .bar(i + 100)
            .dataIndex(data.length - 1)
            .radius(radius)
            .width(width)
            .fill('#F5F4F4')
            .stroke(stroke)
            .zIndex(4);

        return gauge.bar(i);
    };

    anychart.onDocumentReady(function () {
        var gauge = anychart.gauges.circular();
        gauge.data(dataSet);
        gauge
            .fill('#fff')
            .stroke(null)
            .padding(0)
            .margin(100)
            .startAngle(0)
            .sweepAngle(270);

        var axis = gauge.axis().radius(100).width(1).fill(null);
        axis
            .scale()
            .minimum(0)
            .maximum(all_data)
            .ticks({interval: 1})
            .minorTicks({interval: 1});
        axis.labels().enabled(false);
        axis.ticks().enabled(false);
        axis.minorTicks().enabled(false);

        let radius = 100;
        let width = 85 / (data.length - 1)
        if(data.length === 2) width = 65
        for (let i = 0; i < data.length - 1; i++) {
            makeBarWithBar(gauge, radius, i, width);
            radius = radius - (100 / (data.length - 1))
        }
        gauge.margin(50);
        // gauge
        //     .title()
        //     .text(
        //         options.title
        //     )
        //     .useHtml(true);
        // gauge
        //     .title()
        //     .enabled(true)
        //     .hAlign('center')
        //     .padding(0)
        //     .margin([0, 0, 20, 0]);

        gauge.container(chartContainerId);
        gauge.draw();
    });
}