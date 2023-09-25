import { type NextFunction, type Request, type Response } from 'express'

export const validator = (schema: any, partial: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { data, error } = !partial
      ? schema.safeParse(req.body)
      : schema.partial().safeParse(req.body)

    if (error) {
      return res.status(400).json({ errors: JSON.parse(error.message) })
    }

    req.body = data

    next()
  }
}
