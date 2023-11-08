export default defineNuxtRouteMiddleware((to) => {
   const role = useCookie('role');
 
   if (role.value != 'Admin') {
     return navigateTo('/');
   }
 
});