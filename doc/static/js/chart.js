const palette = anychart.palettes.distinctColors();

palette.items(['#488FB8', '#B8A948', '#8FB848', '#CDC37F', '#CD7F8A', '#B1CD7F', '#CD7FB1', '#7FB1CD', '#7F8ACD', '#CDC37F', '#B1CD7F']);

function newBarChart(container_id, options) {
    const {chartContainerId, chartDownloadId} = newChartContainer(container_id, options);

    let data = options.data;
    if (options.sortKeys) {
        data.sort(function (element_a, element_b) {
            return element_a[0] - element_b[0];
        });
    } else {
        data.sort(function (element_a, element_b) {
            return element_a[1] - element_b[1];
        });
    }

    data.sort(function (x, y) {
        return x[0] === 'نامشخص' ? -1 : y[0] === 'نامشخص' ? 1 : 0;
    });

    if (data.length > 0 && data[0][0] == 0) {
        data[0][0] = 'نامشخص'
    }


    data = anychart.data.set(data)


    let chart = anychart.bar();
    document.getElementById(chartDownloadId).onclick = () => {
        chart.saveAsPng(2000, 1000, 1, options.title)
    }
    chart.container(chartContainerId);
    // create a column series and set the data
    let series = chart.bar(data);
    chart.animation(true)
    // .padding([10, 40, 5, 20])

    chart.background().fill('#ffffff');
    // series.normal().fill("#488FB8", 1);
    // series.normal().stroke("#488fb8", 0);
    chart.palette(palette)
    series.rendering().point(roundedBarDrawer);

    // x axix labels font setting
    var xAxisLabels = chart.xAxis().labels();
    xAxisLabels.fontFamily("vazir");
    xAxisLabels.vAlign("middle");
    xAxisLabels.hAlign("end");
    xAxisLabels.height(30);
    xAxisLabels.wordWrap("normal");
    xAxisLabels.wordBreak("keep-all");
    xAxisLabels.textOverflow('...')
    xAxisLabels.fontColor('#6C757D')

    var yAxisLabels = chart.yAxis().labels();
    yAxisLabels.fontFamily("vazir");

    // Not allow labels overlapping
    let xAxis = chart.xAxis();
    xAxis.overlapMode("allowOverlap");
    xAxis.staggerMode(false);
    xAxis.title(options.xAxisTitle);
    xAxis.title().fontFamily('vazir');
    xAxis.title().fontWeight("bold");

    var yAxis = chart.yAxis();
    yAxis.title(options.yAxisTitle);
    yAxis.title().fontFamily('vazir');
    yAxis.title().fontWeight("bold");
    yAxis.title().height(40);


    // tooltip content font setting
    var tooltip = chart.tooltip();
    tooltip.fontFamily("vazir");

    // tooltip title font setting
    var title = chart.tooltip().title();
    title.fontFamily("vazir");

    chart.tooltip().hAlign('center').format("{%value}");

    chart.yAxis().labels().format("{%value}");


    const max = options.data.reduce((max, [_, curr]) => (max > curr ? max : curr), 10)
    chart.yGrid(true);

    chart.xGrid(true);
    chart.xGrid().fill("#EFEFEF99");


    chart.yScale().minimum(0);
    chart.yScale().ticks().interval(Math.ceil(max / 10)).allowFractional(false);

    // initiate drawing the chart
    chart.draw();
    console.log("----------------------------------------------------------------")
    console.log(options.data.length)
    if (data.length == 0) {

        document.getElementById(container_id).innerHTML = "نتیجه‌ای یافت نشد"
    }

    if (options.showLabels) {
        series.labels().enabled(true)
        series.labels().enabled(true)
        series.labels().fontFamily("vazir");
    }

    if (options.onClick) {
        series.listen("mouseOver", function () {
            document.body.style.cursor = "pointer";
        });
        series.listen("mouseOut", function () {
            document.body.style.cursor = "auto";
        });

        chart.listen('Click', (e) => {
            const click_tag = e.domTarget.tag;
            const index = click_tag["index"]
            const text = data.row(index)[0];

            options.onClick(e, data, text)
        })
    }

}

function newStackedColumnChart(container_id, options) {
    const {chartContainerId, chartDownloadId} = newChartContainer(container_id, options);

    let chart = anychart.column();
    document.getElementById(chartDownloadId).onclick = () => {
        chart.saveAsPng(2000, 1000, 1, options.title)
    }
    chart.container(chartContainerId);
    chart.palette(palette);
    let xScaleValues = {}

    Object.entries(options.data).forEach(([key, value]) => {
        let data = anychart.data.set(value);
        let series = chart.column(data);
        series.name(key);

        // series.rendering().point(roundedColumnDrawer);
        value.forEach((v) => {
            xScaleValues[v.x] = v.x
        })

        if (options.onClick) {
            series.listen("mouseOver", function () {
                document.body.style.cursor = "pointer";
            });
            series.listen("mouseOut", function () {
                document.body.style.cursor = "auto";
            });

            // Object.entries(value).forEach(([x, value]) => {
            series.listen('Click', (e) => {
                const click_tag = e.domTarget.tag;
                const index = click_tag["index"]

                options.onClick(e, [key, value.x], [key, value[index].x])
            })
            // })
        }
    })

    chart.animation(true)
    // .padding([10, 40, 5, 20])

    chart.background().fill('#ffffff');


    // x axix labels font setting
    var xAxisLabels = chart.xAxis().labels();
    xAxisLabels.fontFamily("vazir");
    xAxisLabels.textDirection("rtl");
    xAxisLabels.vAlign("middle");
    xAxisLabels.textIndent(0);
    xAxisLabels.hAlign("right");
    xAxisLabels.height(30);
    xAxisLabels.wordWrap("normal");
    xAxisLabels.wordBreak("keep-all");
    xAxisLabels.textOverflow('...')
    xAxisLabels.fontColor('#6C757D')

    var yAxisLabels = chart.yAxis().labels();
    yAxisLabels.fontFamily("vazir");

    // Not allow labels overlapping
    let xAxis = chart.xAxis();
    xAxis.overlapMode("noOverlap");
    xAxis.staggerMode(false);
    xAxis.title(options.xAxisTitle);
    xAxis.title().fontFamily('vazir');
    xAxis.title().fontWeight("bold");

    var yAxis = chart.yAxis();
    yAxis.title(options.yAxisTitle);
    yAxis.title().fontFamily('vazir');
    yAxis.title().fontWeight("bold");
    yAxis.title().height(40);


    // tooltip content font setting
    var tooltip = chart.tooltip();
    tooltip.fontFamily("vazir");

    // tooltip title font setting
    var title = chart.tooltip().title();
    title.fontFamily("vazir");

    chart.tooltip().hAlign('center');

    chart.yAxis().labels().format("{%value}");


    chart.yGrid(true);

    chart.xGrid(true);
    chart.xGrid().fill("#EFEFEF99");
    xScaleValues = Object.values(xScaleValues)
    if (options.sortKeys) {
        xScaleValues = xScaleValues.sort((v1, v2) => {
            return v1 < v2
        })
    }
    chart.xScale().values(xScaleValues)
    chart.yScale().minimum(0);
    /* enable the value stacking mode
    on the default primary value scale*/
    chart.yScale().stackMode("value");
    chart.yScale().ticks().interval(10).allowFractional(false);

    // initiate drawing the chart
    chart.draw();
}

function newDoughnutChart(container_id, options) {
    const {chartContainerId, chartDownloadId} = newChartContainer(container_id, options);

    let chart = anychart.pie(options.data);
    document.getElementById(chartDownloadId).onclick = () => {
        chart.saveAsPng(2000, 1000, 1, options.title)
    }
    chart.innerRadius("30%");
    chart.container(chartContainerId);
    chart.animation(true)
    chart.background().fill('#ffffff');

    // tooltip content font setting
    var tooltip = chart.tooltip();
    tooltip.fontFamily("vazir");
    var title = chart.tooltip().title();
    title.fontFamily("vazir");

    chart.labels().enabled(true);
    chart.labels().fontSize(14);
    chart.labels().fontFamily('vazir');
    // chart.labels().fontWeight(600);

    chart.tooltip().hAlign('center').format("{%value}");

    var legend = chart.legend();
    legend.fontFamily('vazir')

    // set palette to a chart:
    chart.palette(palette);

    // initiate drawing the chart
    chart.draw();

    if (options.onClick) {
        chart.listen("mouseOver", function () {
            document.body.style.cursor = "pointer";
        });
        chart.listen("mouseOut", function () {
            document.body.style.cursor = "auto";
        });

        chart.listen('Click', (e) => {
            const click_tag = e.domTarget.tag;
            const index = click_tag["index"]
            const text = options.data[index][0];

            options.onClick(e, options.data, text)
        })
    }
}

function newBarsChart(container_id, options) {
    const {chartContainerId, chartDownloadId} = newChartContainer(container_id, options);

    let data = options.data;
    data = anychart.data.set(data)
    const dataSeries = []
    for (let i = 0; i < options.bars.length; i++) {
        let serie = data.mapAs({x: 0, value: i + 1});
        dataSeries.push(serie)
    }

    let chart = anychart.bar();
    document.getElementById(chartDownloadId).onclick = () => {
        chart.saveAsPng(2000, 1000, 1, options.title)
    }
    chart.container(chartContainerId);
    chart.palette(palette);

    // create a column series and set the data
    const chartSeries = []
    for (let i = 0; i < options.bars.length; i++) {
        let series = chart.bar(dataSeries[i]);
        chartSeries.push(series)
        // series.normal().fill(options.bars[i].color, 1);
        // series.normal().stroke(options.bars[i].color, 1);
        series.name(options.bars[i].name)
        series.rendering().point(roundedBarDrawer);

        if (options.bars[i].onClick) {
            series.listen("mouseOver", function () {
                document.body.style.cursor = "pointer";
            });
            series.listen("mouseOut", function () {
                document.body.style.cursor = "auto";
            });

            series.listen('Click', (e) => {
                options.bars[i].onClick(e, data)
            })

        }

    }
    chart.animation(true)
    // .padding([10, 40, 5, 20])

    chart.background().fill('#ffffff');


    // x axix labels font setting
    var xAxisLabels = chart.xAxis().labels();
    xAxisLabels.fontFamily("vazir");
    xAxisLabels.vAlign("middle");
    xAxisLabels.hAlign("end");
    xAxisLabels.height(30);
    xAxisLabels.wordWrap("normal");
    xAxisLabels.wordBreak("keep-all");
    xAxisLabels.textOverflow('...')
    xAxisLabels.fontColor('#6C757D')

    var yAxisLabels = chart.yAxis().labels();
    yAxisLabels.fontFamily("vazir");

    // Not allow labels overlapping
    let xAxis = chart.xAxis();
    xAxis.overlapMode("noOverlap");
    xAxis.staggerMode(false);
    xAxis.title(options.xAxisTitle);
    xAxis.title().fontFamily('vazir');
    xAxis.title().fontWeight("bold");

    var yAxis = chart.yAxis();
    yAxis.title(options.yAxisTitle);
    yAxis.title().fontFamily('vazir');
    yAxis.title().fontWeight("bold");
    yAxis.title().height(40);


    // tooltip content font setting
    var tooltip = chart.tooltip();
    tooltip.fontFamily("vazir");

    // tooltip title font setting
    var title = chart.tooltip().title();
    title.fontFamily("vazir");

    chart.tooltip().hAlign('center').format("{%value}");

    chart.yAxis().labels().format("{%value}");


    const max = options.data.reduce((max, [_, curr]) => (max > curr ? max : curr), 10)
    chart.yGrid(true);

    chart.xGrid(true);
    chart.xGrid().fill("#EFEFEF99");


    chart.yScale().minimum(0);
    /* enable the value stacking mode
    on the default primary value scale*/
    chart.yScale().stackMode("value");
    chart.yScale().ticks().interval(Math.ceil(max / 10)).allowFractional(false);

    // enable the legend
    chart.legend(true);

    var legend = chart.legend();
    legend.fontFamily('vazir')


    // set position mode
    legend.positionMode("outside");
    // set the position of the legend
    legend.position("top");
    // set the alignment of the legend
    legend.align("center");

    legend.itemsLayout("horizontalExpandable");

    // initiate drawing the chart
    chart.draw();

}

function newChartContainer(container_id, options) {
    document.getElementById(container_id).classList.add('chart-container');

    let height = document.getElementById(container_id).getAttribute("chart-height");
    if (!height) {
        height = "450px"
    }

    const chartContainerId = `${container_id}_chart`;
    const chartDownloadId = `${chartContainerId}_download_btn`;


    document.getElementById(container_id).innerHTML = `
    <h5 class="chart-title">${options.title}</h5>
    <div id="${chartContainerId}" style="height:${height}" ></div>
    <button id="${chartDownloadId}" class="btn float-right chart-download-btn" style="color: #6C757D"><i class="fa fa-download ml-1" style="font-size: 20px; color: #6C757D"></i>دانلود</button>`
    return {chartContainerId, chartDownloadId};
}

function roundedBarDrawer() {
    // if missing (not correct data), then skipping this point drawing
    if (this.missing) {
        return;
    }
    if (this.value == 0) {
        return;
    }

    // get shapes group
    let shapes = this.shapes || this.getShapesGroup(this.pointState);

    let path = shapes['path'];
    path.clear()
    let leftX = this.x - this.pointWidth / 2;
    rectangle = new acgraph.math.Rect(this.zero, leftX, this.value - this.zero, this.pointWidth);
    acgraph.vector.primitives.roundedRect(path, rectangle, 6)
}

function roundedColumnDrawer() {
    // if missing (not correct data), then skipping this point drawing
    if (this.missing) {
        return;
    }

    if (this.value == 0) {
        return;
    }

    let leftX = this.x - this.pointWidth / 2;
    // get shapes group
    let shapes = this.shapes || this.getShapesGroup(this.pointState);

    let path = shapes['path'];
    path.clear()
    let rectangle = new acgraph.math.Rect(leftX, this.zero - this.value, this.pointWidth, this.value);
    acgraph.vector.primitives.roundedRect(path, rectangle, 6)
}


// added line chart
function newLineChart(container_id, options) {
    const {chartContainerId, chartDownloadId} = newChartContainer(container_id, options);

    let data = options.data;
    if (options.sortKeys) {
        data.sort(function (element_a, element_b) {
            return element_a[0] - element_b[0];
        });
    } else {
        data.sort(function (element_a, element_b) {
            return element_a[1] - element_b[1];
        });
    }

    data.sort(function (x, y) {
        return x[0] === 'نامشخص' ? -1 : y[0] === 'نامشخص' ? 1 : 0;
    });

    if (data.length > 0 && data[0][0] === 0 && options.zero_to_unknown) {
        data[0][0] = 'نامشخص'
    }


    data = anychart.data.set(data)


    let chart = anychart.line();
    document.getElementById(chartDownloadId).onclick = () => {
        chart.saveAsPng(2000, 1000, 1, options.title)
    }
    chart.container(chartContainerId);
    // create a column series and set the data
    let series = chart.line(data);
    chart.animation(true)
    // .padding([10, 40, 5, 20])

    chart.background().fill('#ffffff');
    // series.normal().fill("#488FB8", 1);
    // series.normal().stroke("#488fb8", 0);
    chart.palette(palette)

    // x axix labels font setting
    var xAxisLabels = chart.xAxis().labels();
    xAxisLabels.fontFamily("vazir");
    xAxisLabels.vAlign("middle");
    xAxisLabels.hAlign("end");
    xAxisLabels.height(30);
    xAxisLabels.wordWrap("normal");
    xAxisLabels.wordBreak("keep-all");
    xAxisLabels.textOverflow('...')
    xAxisLabels.fontColor('#6C757D')
    if (options.rotate_x_labels) {
        xAxisLabels.rotation(-90)
    }

    var yAxisLabels = chart.yAxis().labels();
    yAxisLabels.fontFamily("vazir");

    // Not allow labels overlapping
    let xAxis = chart.xAxis();
    xAxis.overlapMode("allowOverlap");
    xAxis.staggerMode(false);
    xAxis.title(options.xAxisTitle);
    xAxis.title().fontFamily('vazir');
    xAxis.title().fontWeight("bold");

    var yAxis = chart.yAxis();
    yAxis.title(options.yAxisTitle);
    yAxis.title().fontFamily('vazir');
    yAxis.title().fontWeight("bold");
    yAxis.title().height(40);


    // tooltip content font setting
    var tooltip = chart.tooltip();
    tooltip.fontFamily("vazir");

    // tooltip title font setting
    var title = chart.tooltip().title();
    title.fontFamily("vazir");

    chart.tooltip().hAlign('center').format("{%value}");

    chart.yAxis().labels().format("{%value}");


    const max = options.data.reduce((max, [_, curr]) => (max > curr ? max : curr), 10)
    chart.yGrid(true);

    chart.xGrid(true);
    chart.xGrid().fill("#EFEFEF99");


    chart.yScale().minimum(0);
    chart.yScale().ticks().interval(Math.ceil(max / 10)).allowFractional(false);

    // initiate drawing the chart
    chart.draw();
    console.log("----------------------------------------------------------------")
    console.log(options.data.length)
    if (data.length == 0) {

        document.getElementById(container_id).innerHTML = "نتیجه‌ای یافت نشد"
    }

    if (options.showLabels) {
        series.labels().enabled(true)
        series.labels().enabled(true)
        series.labels().fontFamily("vazir");
    }

    if (options.onClick) {
        series.listen("mouseOver", function () {
            document.body.style.cursor = "pointer";
        });
        series.listen("mouseOut", function () {
            document.body.style.cursor = "auto";
        });

        chart.listen('Click', (e) => {
            const click_tag = e.domTarget.tag;
            const index = click_tag["index"]
            const text = options.data[click_tag][0];

            options.onClick(e, data, text)
        })
    }

}

function NewGaugeChart(container_id, options) {
    const {chartContainerId, chartDownloadId} = newChartContainer(container_id, options);
    const palette = anychart.palettes.distinctColors();

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
    for (let i = 0; i < names.length; i++) {
        data.push(all_data)
    }

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
            .dataIndex(i + (data.length / 2))
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

        let tooltip = gauge.tooltip();
        tooltip.fontFamily("vazir");
        tooltip.hAlign('center').format(function (e) {
            const allDataValue = `تعداد کل ${options.all_data_tooltip}: ${all_data}`
            let returnValue = ""
            if (e.index >= data.length / 2) {
                let dataIndex = e.index - data.length / 2
                const dataIndexValue = data[dataIndex]
                const dataIndexTitle = names[dataIndex]

                returnValue = `تعداد ${options.data_tooltip} ${dataIndexTitle}: ${dataIndexValue}` + `\n` + allDataValue
            } else {
                const dataIndexValue = data[e.index]
                const dataIndexTitle = names[e.index]

                returnValue = `تعداد ${options.data_tooltip} ${dataIndexTitle}: ${dataIndexValue}` + `\n` + allDataValue
            }
            return returnValue;
        });


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

        const itration = data.length / 2
        let radius = 100;
        let width = 75 / itration
        if (itration === 1) width = 55
        for (let i = 0; i < itration; i++) {
            makeBarWithBar(gauge, radius, i, width);
            radius = radius - (100 / itration)
        }
        gauge.margin(50);

        if (options.onClick) {
            gauge.listen("mouseOver", function () {
                document.body.style.cursor = "pointer";
            });
            gauge.listen("mouseOut", function () {
                document.body.style.cursor = "auto";
            });

            gauge.listen('Click', (e) => {
                const click_tag = e.domTarget.tag;
                let index = click_tag["index"]
                if (index >= options.data.length) {
                    index = index - options.data.length
                }
                options.onClick(e, options.data, options.data[index][0])
            })
        }

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
