import {buildschema} from 'graphql';

const schema = buildschema(`
  type Account {
    _id: ID
    account_id: Int
    limit: Int
    products: [String]
  }

  type Query {
    getAccount(account_id: Int): Account
  }

`)

export default schema