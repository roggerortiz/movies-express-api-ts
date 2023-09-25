import { type NextFunction, type Request, type Response } from 'express'
import { fileLogger } from '../helpers/fileLogger'
import { logger } from '../helpers/looger'

const getStack = (error: Error): string | undefined => {
  if (!error.stack?.trim()) {
    return undefined
  }

  const stackParts: string[] = error.stack.split('\n').slice(0, 2)

  if (!stackParts.length) {
    return undefined
  }

  return stackParts
    .map((item: string) => item?.trim() ?? '')
    .filter((item: string) => item)
    .join(', ')
}

const getMessage = (error: Error): string => {
  return error.message || error.toString()
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const message: string = getMessage(error)
  const stack: string | undefined = getStack(error)
  const exception: string = JSON.stringify({ message, stack })

  logger.error(exception)
  fileLogger.error(exception)

  return res.status(400).send(message)
}
