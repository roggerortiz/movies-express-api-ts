import { type NextFunction, type Request, type Response } from 'express'

export const queryParams = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const keys: string[] = Object.keys(req.query)

  keys.forEach((key: string) => {
    const value: any = req.query[key]
    Reflect.deleteProperty(req.query, key)
    req.query[key.toLowerCase()] = value
  })

  next()
}
