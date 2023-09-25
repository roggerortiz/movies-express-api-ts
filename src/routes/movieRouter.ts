import { Router } from 'express'
import { MovieController } from '../controllers/movieController'
import { type MovieBaseModel } from '../database/base-models/movieBaseModel'
import { validator } from '../middlewares/validator'
import { movieSchema } from '../schemas/movieSchema'

export const createMovieRouter = (movieModel: MovieBaseModel): Router => {
  const movieRouter = Router()
  const movieController = new MovieController(movieModel)

  movieRouter.get('/', movieController.getAll)
  movieRouter.post('/', validator(movieSchema), movieController.create)

  movieRouter.get('/:id', movieController.getById)
  movieRouter.patch('/:id', validator(movieSchema, true), movieController.update)
  movieRouter.delete('/:id', movieController.delete)

  return movieRouter
}
