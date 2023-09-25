import { getNow, getUUID } from '../../helpers/utils'
import { type FileDB } from '../../types/models/db'
import { type Movie, type NewMovie } from '../../types/models/movie'
import { type GetAllMovies } from '../../types/requests/getAllMovies'
import { MovieBaseModel } from '../base-models/movieBaseModel'
import { readDB, saveDB } from './utils'

export class MovieModel extends MovieBaseModel {
  getAll = async ({ genre }: GetAllMovies): Promise<Movie[]> => {
    const db: FileDB = await readDB()

    if (genre) {
      return db.movies.filter((movie) =>
        movie.genre.some((item) => item.toLowerCase() === genre.toLowerCase())
      )
    }

    return db.movies
  }

  getById = async (id: string): Promise<Movie | null> => {
    const db: FileDB = await readDB()
    return db.movies.find((movie) => movie.id === id) ?? null
  }

  create = async (payload: NewMovie): Promise<Movie | null> => {
    const db: FileDB = await readDB()

    const existsMovieIndex: number = db.movies.findIndex(
      (movie) => movie.title.toLowerCase() === payload.title.toLowerCase()
    )

    if (existsMovieIndex !== -1) {
      return null
    }

    const createdMovie: Movie = {
      id: getUUID(),
      ...payload,
      created_at: getNow(),
      updated_at: getNow()
    }

    db.movies.push(createdMovie)
    await saveDB(db)

    return createdMovie
  }

  update = async (id: string, payload: NewMovie): Promise<Movie | null> => {
    const db: FileDB = await readDB()

    const movieIndex: number = db.movies.findIndex((movie: Movie) => movie.id === id)

    if (movieIndex === -1) {
      return null
    }

    const existsMovieIndex: number = db.movies.findIndex((movie: Movie) => {
      return movie.id !== id && movie.title.toLowerCase() === payload.title?.toLowerCase()
    })

    if (existsMovieIndex !== -1) {
      return null
    }

    const updatedMovie: Movie = {
      ...db.movies[movieIndex],
      ...payload,
      updated_at: getNow()
    }

    db.movies[movieIndex] = updatedMovie
    await saveDB(db)

    return updatedMovie
  }

  delete = async (id: string): Promise<Movie | null> => {
    const db: FileDB = await readDB()

    const movieIndex: number = db.movies.findIndex((movie: Movie) => movie.id === id)

    if (movieIndex === -1) {
      return null
    }

    const deletedMovie: Movie = db.movies[movieIndex]

    db.movies.splice(movieIndex, 1)
    await saveDB(db)

    return deletedMovie
  }
}
