
async function Olympus(options:any) {
    // define query from options object body
    let query = options.body;
    
    // function definition of helper function to set expiration on local storage items
    function setWithExpiration(key:string, value:string|number, ttl:number) {
        const now = new Date();
        // 'item' is an object which contains the original value as well as the time when it's supposed to expire
        const item = {
            value: value,
            expiration: now.getTime() + ttl,
        };
        // invoke localStorage.setItem method to store k/v pair
        localStorage.setItem(key, JSON.stringify(item));
    };

    // function definition of helper function to get item from local storage while considering expiration
    function getWithExpiration(key:string) {
        // retrieve value of argument key in localStorage
        const itemStr = localStorage.getItem(key);
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        };
        // parse item to separate value from expiration
        const item = JSON.parse(itemStr);
        // set now variable to current date
        const now = new Date();
        // compare the expiration time of the item with the current time
        if (now.getTime() > item.expiration) {
        // If the item is expired, delete the item from storage
        // and return null
        // localStorage.removeItem(key);
        return null;
        }
        // if not expired, return the value of the key without the expiration
        return item.value;
    };

    // check if passed in query exists as key in local storage
    return new Promise(async (resolve, reject) => {
        try {
            let localResponse = getWithExpiration(query)
            // if it exists, return from local storage
            if(localResponse != null) {
                console.log('LocalStorage HIT');
                resolve(localResponse);
            }
            // else create it in local storage
            else {
                // make async request to olympus endpoint passing in options object
                let serverResponse:any = await fetch('http://localhost:3000/olympus', options);
                // json the response
                serverResponse =  await serverResponse.json();
                // stringify the response
                const stringResponse = JSON.stringify(serverResponse.result);
                // keep track of the operation type (query or mutation)
                const operationType = serverResponse.operationType;
                // check if the operation type is mutation
                // if so dont run setWithExpiration
                // only setWithExpiration if operation type is query
                if(operationType === "query") {
                setWithExpiration(query, stringResponse, 600000); // 600000 milliseconds = 10 minutes
                }
                resolve(stringResponse);
            } // add a ')' for testing
        } catch(err) {
            reject(err)
        }
    })
}

module.exports = Olympus;