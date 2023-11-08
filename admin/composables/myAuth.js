export function validateRole(role) {
  
  const getRole = useCookie("role");
  if(getRole.value != role) {
   return false;
  } else {
   return true;
  }
  
}
