export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token');

  if (!token.value && to.path.startsWith('/admin/perfil')) {
    return navigateTo('/');
  }
  
});