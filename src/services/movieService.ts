import { type MovieBaseModel } from '../database/base-models/movieBaseModel'
import { type Movie, type NewMovie } from '../types/models/movie'
import { type GetAllMovies } from '../types/requests/getAllMovies'

export class MovieService {
  movieModel: MovieBaseModel

  constructor(movieModel: MovieBaseModel) {
    this.movieModel = movieModel
  }

  getAll = async (params: GetAllMovies): Promise<Movie[]> => {
    return await this.movieModel.getAll(params)
  }

  getById = async (id: string): Promise<Movie | null> => {
    return await this.movieModel.getById(id)
  }

  create = async (payload: NewMovie): Promise<Movie | null> => {
    return await this.movieModel.create(payload)
  }

  update = async (id: string, payload: NewMovie): Promise<Movie | null> => {
    return await this.movieModel.update(id, payload)
  }

  delete = async (id: string): Promise<Movie | null> => {
    return await this.movieModel.delete(id)
  }
}
