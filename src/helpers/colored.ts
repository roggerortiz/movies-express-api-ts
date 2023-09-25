import picocolors from 'picocolors'

export const bold = (text: string): string => {
  return picocolors.bold(text)
}

export const url = (url: string): string => {
  return picocolors.cyan(picocolors.bold(picocolors.underline(url)))
}

export const colored = { bold, url }
