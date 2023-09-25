import { type Movie, type NewMovie } from '../../types/models/movie'
import { type GetAllMovies } from '../../types/requests/getAllMovies'

export abstract class MovieBaseModel {
  abstract getAll(params: GetAllMovies): Promise<Movie[]>

  abstract getById(id: string): Promise<Movie | null>

  abstract create(payload: NewMovie): Promise<Movie | null>

  abstract update(id: string, payload: NewMovie): Promise<Movie | null>

  abstract delete(id: string): Promise<Movie | null>
}
