async function Olympus(options) {

    // look at request body
    let query = options.body
        
    // query = JSON.stringify(query)
     // check if its in local storage
     let localResponse =  await localStorage.getItem(query)
     // if it is return from local storage\
     if(localResponse != null) {
         console.log("from localStorage", localResponse)
         return localResponse
     } else {
         let serverResponse = await fetch('http://localhost:3000/olympus', options)
          serverResponse =  await serverResponse.json()
          stringResponse = JSON.stringify(serverResponse);
          localStorage.setItem(query, stringResponse);
          return stringResponse;
     }
    
     //if not make a fetch request to /graphql with the request body
     // set key/value into local storage

     // return value (response from graphql)

}

// module.exports = Olympus;