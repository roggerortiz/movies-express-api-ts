import zod from 'zod'

export const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: zod
    .number({
      invalid_type_error: 'Movie year must be a number',
      required_error: 'Movie year is required.'
    })
    .int('Movie year must be an integer')
    .min(1900, 'Movie year must be at least 1900')
    .max(2024, 'Movie year must be less or equal than 2024'),
  director: zod.string({
    invalid_type_error: 'Movie director must be a string',
    required_error: 'Movie director is required.'
  }),
  duration: zod
    .number({
      invalid_type_error: 'Movie duration must be a number',
      required_error: 'Movie duration is required.'
    })
    .int('Movie duration must be an integer')
    .positive('Movie duration must be a positive integer'),
  rate: zod
    .number({
      invalid_type_error: 'Movie rate must be a number',
      required_error: 'Movie rate is required.'
    })
    .min(0, 'Movie rate must be at least 0')
    .max(10, 'Movie rate must be less or equal than 10')
    .default(5),
  poster: zod
    .string({
      invalid_type_error: 'Movie poster must be a string',
      required_error: 'Movie poster is required.'
    })
    .url({
      message: 'Poster must be a valid URL'
    }),
  genre: zod.array(
    zod.enum([
      'Action',
      'Adventure',
      'Crime',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi'
    ]),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})
