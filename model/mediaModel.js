const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function fetchInfo() {

    const fetchInfoData = {
        baseUrl: 'https://yt-music-api.herokuapp.com/api/yt',
        method: "GET",
        endpoint: "",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        },
        paramName: "",
        paramValue: "",
        requestBody: "",
        page: ""
    };

    return fetchInfoData;
}


function prepareUrl(fetchInfo) {

    let url;

    url = fetchInfo.baseUrl +
        fetchInfo.endpoint + "/";

    if (fetchInfo.paramName)
        url += fetchInfo.paramName + "/";

    if (fetchInfo.paramValue)
        url += fetchInfo.paramValue + "/";

    return url;

}

async function connectTopApi(fetchInfo) {

    const url = prepareUrl(fetchInfo);

    const init = {
        "method": fetchInfo.method,
        "headers": fetchInfo.headers
    }
    // add a body to our request only on POST method otherwise it will throw an exception
    if (fetchInfo.method == "POST")
        init.body = JSON.stringify(fetchInfo.requestBody);

    // exectute the connection to backedn api 

    console.log(url)

    const res = await fetch(
        url,
        init
    );

    // format the reponse as json
    return await res.json()


}
exports.fetchInfo = fetchInfo;
exports.prepareUrl = prepareUrl;
exports.connectTopApi = connectTopApi;

