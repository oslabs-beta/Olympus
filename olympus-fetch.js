async function Olympus(options) {
    // define query from options object body
    let query = options.body
    
    // function definition of helper function to set expiration on local storage items
    function setWithExpiry(key, value, ttl) {
        const now = new Date()
        // `item` is an object which contains the original value as well as the time when it's supposed to expire
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        }
        localStorage.setItem(key, JSON.stringify(item))
    }

    // function definition of helper function to get item from local storage while considering expiration
    function getWithExpiry(key) {
        const itemStr = localStorage.getItem(key)
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()
        // compare the expiry time of the item with the current time
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }
        return item.value
    }

    // check if its in local storage
    // let localResponse =  await localStorage.getItem(query)
    return new Promise(async (resolve, reject) => {
    try {
    let localResponse = getWithExpiry(query)
    // if it is return from local storage\
    if(localResponse != null) {
         resolve(localResponse)
     } 
     // else create it in local storage
     else {
         let serverResponse = await fetch('http://localhost:3000/olympus', options);
         serverResponse =  await serverResponse.json();
         const stringResponse = JSON.stringify(serverResponse.result);
         const operationType = serverResponse.operationType
          // localStorage.setItem(query, stringResponse);
          // check if mutatation
          // if so dont run setwithExpiry
         if(operationType === "query") {
         setWithExpiry(query, stringResponse, 1800000); // 1800000 = 30 minutes
         }
          resolve(stringResponse);
     }
    } catch(err) {
        reject(err)
    }
    })
}

// module.exports = Olympus;