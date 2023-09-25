import crypto from 'node:crypto'

export const getNow = (): string => {
  return new Date().toLocaleString('en-US', { timeZone: 'UTC' })
}

export const getUUID = (separate: boolean = false): string => {
  if (!separate) {
    return crypto.randomUUID().split('-').join('')
  }

  return crypto.randomUUID()
}
