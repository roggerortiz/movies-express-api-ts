import 'dotenv/config'
import { MongoClient, ServerApiVersion, type Db } from 'mongodb'

export const connect = async (): Promise<Db> => {
  const url: string = process.env.MONGO_URL ?? ''
  const dbName: string = process.env.MONGO_DB_NAME ?? ''

  const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })

  try {
    await client.connect()
    const database = client.db(dbName)
    return database
    // return database.collection(collection)
  } catch (error) {
    await client.close()
    throw error
  }
}
