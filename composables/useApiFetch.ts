import type {UseFetchOptions} from "nuxt/app";
const headers = {
  Accept: "application/json"
}
export const useApiFetch = <T>(path: string, options: UseFetchOptions<T>) => {
  return  useFetch('http://localhost:80/api' + path, {
    credentials: "include",
    headers: {
      Accept: "application/json"
    },
    ...options
  })
}
