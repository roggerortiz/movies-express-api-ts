import { type NextFunction, type Request, type Response } from 'express'
import { type MovieBaseModel } from '../database/base-models/movieBaseModel'
import { MovieService } from '../services/movieService'
import { type Movie, type NewMovie } from '../types/models/movie'

export class MovieController {
  movieService: MovieService

  constructor(movieModel: MovieBaseModel) {
    this.movieService = new MovieService(movieModel)
  }

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { genre } = req.query
      const movies: Movie[] = await this.movieService.getAll({ genre: genre?.toString() })

      res.status(200).json(movies)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const movie: Movie | null = await this.movieService.getById(id)

      if (!movie) {
        res.status(404).json({ message: 'Movie not found' })
        return
      }

      res.status(200).json(movie)
    } catch (error) {
      next(error)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: NewMovie = req.body
      const createdMovie: Movie | null = await this.movieService.create(payload)

      if (!createdMovie) {
        res.status(400).json({ message: 'Movie could not be created' })
        return
      }

      res.status(201).json(createdMovie)
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const payload: NewMovie = req.body
      const updatedMovie: Movie | null = await this.movieService.update(id, payload)

      if (!updatedMovie) {
        res.status(404).json({ message: 'Movie could not be updated' })
        return
      }

      res.status(200).json(updatedMovie)
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const deletedMovie: Movie | null = await this.movieService.delete(id)

      if (!deletedMovie) {
        res.status(404).json({ message: 'Movie not found' })
        return
      }

      res.status(200).json(deletedMovie)
    } catch (error) {
      next(error)
    }
  }
}
