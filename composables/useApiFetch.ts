import type { UseFetchOptions } from "nuxt/app";
const useApiFetch = <T>(path: string, options: UseFetchOptions<T> = {}) => {
  const token = useCookie("XSRF-TOKEN");
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL; 
  
  let headers : any = {};
  headers["Accept"] = "application/json";
  if(token.value){
    headers['X-XSRF-TOKEN'] = token.value as string
  }

  return useFetch(`${API_URL}${path}`, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options.headers
    },    
  });
};

export { useApiFetch };
