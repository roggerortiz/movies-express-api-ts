import { format } from 'date-fns'
import { Router, type Response } from 'express'
import { createApiRouter } from './apiRouter'

export const createRouter = async (): Promise<Router> => {
  const mainRouter = Router()
  const apiRouter: Router = await createApiRouter()

  mainRouter.get('/', (_, res: Response) => {
    res.send(`Sample response - ${format(new Date(), 'yyyy-MM-dd HH:mm')}`)
  })

  mainRouter.use('/api', apiRouter)

  mainRouter.use((_, res: Response) => {
    res.redirect('/')
  })

  return mainRouter
}
