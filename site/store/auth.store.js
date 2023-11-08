import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { useRoute } from 'vue-router'

export const useAuth = defineStore('useAuth', {

   state() {
      return {
         cookie: useCookie("token").value,
         role: useCookie("role").value,
         id: useCookie("id").value
      }
   },

   actions: {
      async authenticateUser({email, password}) {
         
         const config = useRuntimeConfig();
         
         await $fetch(config.public.baseURL + '/login', {
            method: 'POST',
            body: {
               email: email,
               password: password
            }
         }).then((response) => {
            
            // alerta login efetuado
            toast('Login efetuado com sucesso!!', {
               autoClose: 2000,
               theme: 'light',
               position: 'bottom-center',
               type: 'success'
            });
            // seta um timeout pra poder exibir o alerta
            setTimeout(() => {
               // seta o token
               const token = useCookie("token");
               token.value = response.access_token;
               
               const role = useCookie("role");
               role.value = response.role;
               
               const id = useCookie("id");
               id.value = response.id;
               
               const router = useRouter();
               router.push('/');
               window.location.reload();
               
            }, 2000);
         }, (error) => {
            toast('Dados de login incorretos..!', {
               autoClose: 3000,
               theme: 'light',
               position: 'bottom-center',
               type: 'error'
            });
         });
         
      },
      userLogout() {
         
         toast('Logout efetuado com sucesso!!', {
            autoClose: 1400,
            theme: 'light',
            position: 'bottom-center',
            type: 'success'
         });
         
         setTimeout(() => {
            
            const token = useCookie("token");
            token.value = null;
            
            const role = useCookie("role");
            role.value = null;
            
            const id = useCookie("id");
            id.value = null;
            
            const router = useRouter();
            router.push('/');
            window.location.reload();
            
         }, 1400);
      }
   },

})

