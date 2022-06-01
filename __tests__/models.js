const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountsSchema = new Schema({ 
    account_id: {type: Number},
    limit: {type: Number},
    products: {type: Array},
})

module.exports = mongoose.model("Accounts", accountsSchema)