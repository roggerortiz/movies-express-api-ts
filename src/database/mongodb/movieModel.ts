import { ObjectId, type Collection, type Db } from 'mongodb'
import { getNow } from '../../helpers/utils'
import { type Movie, type NewMovie } from '../../types/models/movie'
import { type GetAllMovies } from '../../types/requests/getAllMovies'
import { MovieBaseModel } from '../base-models/movieBaseModel'
import { connect } from './utils'

const getCollection = async (): Promise<Collection<NewMovie>> => {
  const db: Db = await connect()
  return db.collection<NewMovie>('movies')
}

export class MovieModel extends MovieBaseModel {
  projection: any = {
    _id: 0,
    id: '$_id',
    title: 1,
    year: 1,
    director: 1,
    duration: 1,
    poster: 1,
    genre: 1,
    rate: 1,
    created_at: 1,
    updated_at: 1
  }

  getAll = async ({ genre }: GetAllMovies): Promise<Movie[]> => {
    const collection = await getCollection()

    if (genre) {
      const filter: any = {
        genre: {
          $elemMatch: {
            $regex: genre,
            $options: 'i'
          }
        }
      }

      return await collection.find<Movie>(filter, { projection: this.projection }).toArray()
    }

    return await collection.find<Movie>({}, { projection: this.projection }).toArray()
  }

  getById = async (id: string): Promise<Movie | null> => {
    const collection = await getCollection()
    return await collection.findOne<Movie>(
      { _id: new ObjectId(id) },
      { projection: this.projection }
    )
  }

  create = async (payload: NewMovie): Promise<Movie | null> => {
    const collection = await getCollection()
    const foundMovie = await collection.findOne({ title: payload.title })

    if (foundMovie) {
      return null
    }

    payload.created_at = getNow()
    payload.updated_at = getNow()
    const { insertedId } = await collection.insertOne({ ...payload })

    const createdMovie: Movie = {
      id: insertedId.toString(),
      ...payload
    }

    return createdMovie
  }

  update = async (id: string, payload: NewMovie): Promise<Movie | null> => {
    const collection = await getCollection()
    const existsMovie = await collection.findOne<Movie>(
      { _id: new ObjectId(id) },
      { projection: this.projection }
    )

    if (!existsMovie) {
      return null
    }

    const foundMovie = await collection.findOne({
      _id: { $ne: new ObjectId(id) },
      title: payload.title
    })

    if (foundMovie) {
      return null
    }

    payload.updated_at = getNow()
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { ...payload } })

    const updatedMovie: Movie = {
      ...existsMovie,
      ...payload
    }

    return updatedMovie
  }

  delete = async (id: string): Promise<Movie | null> => {
    const collection: Collection<NewMovie> = await getCollection()
    const existsMovie = await collection.findOne<Movie>(
      { _id: new ObjectId(id) },
      { projection: this.projection }
    )

    if (!existsMovie) {
      return null
    }

    const { deletedCount } = await collection.deleteOne({ _id: new ObjectId(id) })

    if (deletedCount <= 0) {
      return null
    }

    return existsMovie
  }
}
