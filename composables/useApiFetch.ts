import type {UseFetchOptions} from "nuxt/app";
export const useApiFetch = <T>(path: string, options: UseFetchOptions<T>) => {
  return  useFetch('http://localhost:8080/api' + path, {
    credentials: "include",
    ...options
  })
}
