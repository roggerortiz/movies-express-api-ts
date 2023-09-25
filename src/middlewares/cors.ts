import corsDep from 'cors'
import { type RequestHandler } from 'express'

const ACCEPTED_ORIGINS: string[] = ['http://localhost:8080', 'https://movies.com']

export const cors = (acceptedOrigins: string[] = ACCEPTED_ORIGINS): RequestHandler => {
  return corsDep({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    }
  })
}
