import path from 'path'
import pino, { type LoggerOptions } from 'pino'

const options: LoggerOptions = { name: 'express-api-ts' }
const destination: string = path.join(__dirname, '../../info.log')

export const fileLogger = pino(options, pino.destination(destination))
