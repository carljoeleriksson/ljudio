// check if an obj has an empty property value 
function isEmpty(data = {}) {

    let result = false
  
    Object.keys(data).map((m) => {
  
      if (data[m] == null || data[m] == "") {
  
        result = true;
  
      }
  
    })
  
    if (result) {
  
      return true
  
    } else {
  
      return false
  
    }
  }
  
  exports.isEmpty = isEmpty;