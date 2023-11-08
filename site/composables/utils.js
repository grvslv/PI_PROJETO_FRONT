import { useSign } from '~/store/sign.store';



export function formatValue(value) {
   let val = (value/1).toFixed(2).replace('.', ',');
   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

 
export function validateName() {
   
   const store = useSign();
   const {client} = storeToRefs(store);
   
   const regex = /[^a-zà-úA-ZÀ-Ú\s]/g;
   client.value.name = client.value.name.replace(regex, "");
   client.value.name = client.value.name.replace(/\s/g, ""); 

}
 
export function validateSurname() {
   
   const store = useSign();
   const {client} = storeToRefs(store);
   
   const regex = /[^a-zà-úA-ZÀ-Ú\s]/g;
   client.value.surname = client.value.surname.replace(regex, "");
   client.value.surname = client.value.surname.replace(/\s/g, ""); 

}



export function validateNameProfile() {
   
   const store = useProfile();
   const {client} = storeToRefs(store);
   
   const regex = /[^a-zà-úA-ZÀ-Ú\s]/g;
   client.value.name = client.value.name.replace(regex, "");
   client.value.name = client.value.name.replace(/\s/g, ""); 

}

export function validateSurnameProfile() {
   
   const store = useProfile();
   const {client} = storeToRefs(store);
   
   const regex = /[^a-zà-úA-ZÀ-Ú\s]/g;
   client.value.surname = client.value.surname.replace(regex, "");
   client.value.surname = client.value.surname.replace(/\s/g, ""); 

}