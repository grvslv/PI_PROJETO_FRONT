import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export async function myAlert(text, status) {
  
   toast(text, {
      autoClose: 1400,
      theme: 'dark',
      position: 'bottom-center',
      type: status
   });
   
}