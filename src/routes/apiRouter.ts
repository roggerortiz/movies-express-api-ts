import 'dotenv/config'
import { Router } from 'express'
import { createMovieRouter } from './movieRouter'

export const createApiRouter = async (): Promise<Router> => {
  const model: string = process.env.MODEL ?? 'file-system'
  const { MovieModel } = await import(`../database/${model}/movieModel.ts`)

  const apiRouter = Router()

  apiRouter.use('/movies', createMovieRouter(new MovieModel()))

  return apiRouter
}
