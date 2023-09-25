import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { colored } from './helpers/colored'
import { logger } from './helpers/looger'
import { cors } from './middlewares/cors'
import { errorHandler } from './middlewares/errorHandler'
import { queryParams } from './middlewares/queryParams'
import { createRouter } from './routes/mainRouter'

const app = express()
const PORT = process.env.PORT ?? 3000
const MODEL = process.env.MODEL ?? 'file-system'

logger.info(`using database model: ${colored.bold(MODEL)}`)

const startServer = async (): Promise<void> => {
  const mainRouter: express.Router = await createRouter()

  app.use(cors())
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(queryParams)
  app.use('/', mainRouter)
  app.use(errorHandler)

  app.listen(PORT, () => {
    const coloredUrl: string = colored.url(`http://localhost:${PORT}`)
    logger.ready(`started server, url: ${coloredUrl}`)
  })
}

void startServer()
