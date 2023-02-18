
async function BM25Similarity() {
    try {
        const document_id = document.getElementById("document").value;
        request_link = 'http://' + location.host + "/GetBM25Similarity/" + document_id + "/";
        response = await fetch(request_link).then(response => response.json());
        response = response["docs"]
        similrity_result = []

        document.getElementById("SimilarityTable").innerHTML = "";
        for (let i = 0; i < response.length; i++) {
            const index = i + 1;

            const curr_document_id = response[i]['_source']["document_id"]
            const document_name = response[i]['_source']["name"]
            const approval_date = response[i]['_source']["approval_date"]
            const subject_name = response[i]['_source']["subject_name"]
            const BM25_similarity = Math.round(response[i]["_score"] * 100) / 100

            const book_link = 'http://' + location.host + "/document_profile?id=" + curr_document_id
            const name = "<a target='_blank' href=" + book_link + ">" + document_name + "</a>"

            const row = {
                "index": index,
                "document_name": name,
                "approval_date": approval_date,
                "subject_name": subject_name,
                "BM25_similarity": BM25_similarity
            }

            similrity_result.push(row)
        }

        $('#SimilarityTable').empty();
        $('.SimilarityTable').footable({
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
                "name": "document_name",
                "title": "نام سند",
                "style": {
                    "width": "30%"
                }
            }, {
                "name": "approval_date",
                "title": "تاریخ تصویب",
                "style": {
                    "width": "10%"
                }
            }, {
                "name": "subject_name",
                "title": "موضوع براساس کلیدواژه",
                "style": {
                    "width": "10%"
                }
            }, {
                "name": "BM25_similarity",
                "title": "مشابهت بر اساس BM25",
                "style": {
                    "width": "10%"
                }
            }
            ],
            "rows": similrity_result
        });
    } catch (e) {
        console.log(e)
    }
}