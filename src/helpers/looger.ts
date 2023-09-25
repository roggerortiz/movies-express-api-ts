import { format } from 'date-fns'
import pc from 'picocolors'

enum Type {
  INFO = 'info',
  READY = 'ready',
  ERROR = 'error'
}

const getColoredType = (type: Type): string => {
  if (type === Type.INFO) {
    return pc.cyan(type)
  }

  if (type === Type.READY) {
    return pc.green(type)
  }

  if (type === Type.ERROR) {
    return pc.red(type)
  }

  return pc.gray(type)
}

const getColoredTime = (): string => {
  return pc.gray(format(new Date(), 'HH:mm:ss'))
}

const consoleLogger = (message: string, type: Type = Type.INFO): void => {
  const coloredLogtype: string = getColoredType(type)
  const coloredTime: string = getColoredTime()

  console.log(`${coloredLogtype} - ${coloredTime} - ${message}`)
}

const info = (message: string): void => {
  consoleLogger(message, Type.INFO)
}

const ready = (message: string): void => {
  consoleLogger(message, Type.READY)
}

const error = (message: string): void => {
  consoleLogger(message, Type.ERROR)
}

export const logger = {
  info,
  ready,
  error
}
