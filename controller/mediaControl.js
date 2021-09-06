const { fetchInfo, connectTopApi } = require('../model/mediaModel')

// a controle to search for a song/artist...
// request body as json :{
//      {
//			"searchType": "search" || "suggestions" || "albums" || ... // visit https://yt-music-api.herokuapp.com/ for more types
//			"keyWord": "laura" //
//		}
//} 
async function searchMedia(request, response) {

  let result = null;

  let fetchInfoObj = fetchInfo()

  try {

    let req = request.body;


    console.log(req.searchType)

    // check if search type is missing in the request json body then the default is search 
    fetchInfoObj.paramName = (!req.searchType) ? "search" : req.searchType


    console.log("Search Type: " + fetchInfoObj.paramName)

    if (!req.keyWord)
      throw Error("Keyword is required!")

    fetchInfoObj.paramValue = req.keyWord

    console.log(fetchInfoObj)

    let data = await connectTopApi(fetchInfoObj)

    console.log('Search result: ' + data)

    result = data


    // catch any throwable error 
  } catch (e) {
    // log error to server  
    console.log(e.message);

    // assign catched error as json obj
    result = {
      "error": e.name,
      "message": e.message
    };

  }
  // return result
  response.json(result);

}

module.exports.searchMedia = searchMedia;





