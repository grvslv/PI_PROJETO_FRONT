import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export async function myAlert(text, status) {
  
   toast(text, {
      transition: 'slide',
      autoClose: 2000,
      theme: 'light',
      position: 'bottom-center',
      type: status
   });
   
}