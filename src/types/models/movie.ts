export interface Movie {
  id: string
  title: string
  year: number
  director: string
  duration: number
  poster: string
  genre: string[]
  rate: number
  created_at: string
  updated_at: string
}

export type NewMovie = Omit<Movie, 'id'>
