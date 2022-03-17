import axios, { AxiosResponse } from 'axios'

// Assuming that there is a commonly used error type in your backend
// interface MyErrorType {
//   code: string
//   message: string
// }

export const axiosHandler = async <T>(endpoint: string, method: ('GET' | 'POST'), payload?: Object):
  Promise<[T | null, unknown | undefined | null]> => {
  let data: T | null = null
  let error: unknown | undefined | null = null

  try {
    let result: AxiosResponse<T>
    if (method === 'GET') {
      result = await axios.get<T>(`https://pokeapi.co/api/v2/${endpoint}`, payload)
    } else {
      result = await axios.post<T>(`https://pokeapi.co/api/v2/${endpoint}`, payload)
    }

    data = result.data
  } catch (caughtError) {
    error = caughtError
  }
  return [data, error]
}
