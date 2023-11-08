import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { nextTick } from 'vue';


export async function myFetch(request, opts) {
  
  const config = useRuntimeConfig();
  const token = useCookie("token")
  
  const options = {
    baseURL: config.public.baseURL || "http://127.0.0.1:8000/api",
    ...(opts || {}),
  };

  const {status, data, error} = await useFetch(request, options);
  
  if(status.value === 'error') {
    if(error.value.statusCode === 401) {
      toast('Sua sessão expirou..', {
        autoClose: 2000,
        theme: 'dark',
        position: 'bottom-center',
        type: 'error'
      });

      // deleta o cookie / tirar acesso e router para pagina de login :)
    } else {
      toast(error.value.data.message, {
        autoClose: 2000,
        theme: 'dark',
        position: 'bottom-center',
        type: 'error'
      });
    }
  } else {
    return data.value
  }
}

export async function onFetch(request, opts) {
  
  await nextTick();
  
  return myFetch(request, opts)
  
}