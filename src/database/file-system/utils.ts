import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { type FileDB } from '../../types/models/db'

const dbPath: string = join(__dirname, 'db.json')

export const readDB = async (): Promise<FileDB> => {
  const data: string = await readFile(dbPath, { encoding: 'utf-8' })
  return JSON.parse(data)
}

export const saveDB = async (db: FileDB): Promise<void> => {
  await writeFile(dbPath, JSON.stringify(db, null, 2), { encoding: 'utf-8' })
}
