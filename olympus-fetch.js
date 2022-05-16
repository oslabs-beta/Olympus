
async function Olympus(options) {

    // look at request body
    let query = options.body
    console.log("alloptions", options)
    console.log('query inside olympus:', query)
    console.log(typeof query)
    
    // query = JSON.stringify(query)
     // check if its in local storage
     let localResponse =  await localStorage.getItem(query)
     console.log("valuename", localResponse)
     // if it is return from local storage\
     if(localResponse != null) {
         return localResponse
     } else {
         const serverResponse = await fetch('http://localhost:3000/olympus', options)
         stringResponse = JSON.stringify(serverResponse);
         console.log("stringResponse:", stringResponse);
        //  console.log("serverResponse:", serverResponse);
         localStorage.setItem(query, stringResponse);
         return stringResponse;
     }
    
     //if not make a fetch request to /graphql with the request body
     // set key/value into local storage

     // return value (response from graphql)

}

// module.exports = Olympus;