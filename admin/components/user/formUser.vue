<template>
   
   <Transition name="slide-fade">
   
      <div class="user_form_background" v-if="formState">
         
         <div class="user_form_container">
            
            <div class="user_form_header">
               <h2>Formulário de Usuário</h2>
               <p>Formulário para adicionar usuários.</p>
            </div>
            
            <div class="user_form_body">
               
               <span>Nome</span>
               <input type="text" v-model="user.name" placeholder="Nome">
               <template v-if="!isUpdate">
                  <span>Email</span>
                  <input type="email" :required="!isUpdate" v-model="user.email" placeholder="Email">
               </template>

               <span>Senha</span>
               <input type="password" :required="!isUpdate" v-model="user.password" placeholder="Senha">
               <span>Confirmar Senha</span>
               <input type="password" v-model="user.confirmPassword" placeholder="Confirmar Senha">


               
               <span>CPF</span>
               <input type="text" v-model="user.cpf" v-maska data-maska="###.###.###-##" placeholder="CPF">
               

               <span>Cargo</span>
               <select :disabled="userId == user.id" required v-model="user.role_id">
                  <option value="" selected disabled>Selecionar Cargo</option>
                  <option
                     v-for="role in roles"
                     :key="role"
                     :value="role.id"
                  >{{ role.name }}</option>
               </select>

               
               
            </div>
            
            <div class="user_form_footer">
               <button class="user_form_confirm" @click="setContent()">Confirmar</button>
               <button class="user_form_cancel" @click="closeForm()">Cancelar</button>
            </div>
         
         </div>   

      </div>
   </Transition>
   
</template>

<script setup>

   const store = useUser();
   const {formState} = storeToRefs(store);
   const {changeFormState} = store;
   const {isUpdate} = storeToRefs(store);
   const {roles} = storeToRefs(store);
   const {user} = storeToRefs(store);
   const {storeUser} = store;
   
   const userId = useCookie("id");
   
   function resetForm() {
      user.value = {};
   }
   
   function closeForm() {
      resetForm();
      isUpdate.value = false
      changeFormState(false);
   }
   
   function validateForm() {
      
      if(isUpdate.value == true) {
         if(user.value.name && user.value.cpf && user.value.role_id){
            if(user.value.password) {
               if(user.value.password == user.value.confirmPassword) {
                  return true;
               } else {
                  myAlert('As senhas digitadas não são iguais', 'error');
                  return false;
               }
            } else {
               return true;
            }
         } else {
            myAlert('Preencha todos os campos', 'error');
            return false   
         }
      } else {
         if(user.value.name && user.value.password && user.value.cpf && user.value.email && user.value.role_id){
            if(user.value.password == user.value.confirmPassword) {
               
               if(!validateCpf(user.value.cpf)) {
                  myAlert('O CPF informado é inválido', 'error');
                  return false;                  
               } else {
                  return true;
               }
            } else {
               myAlert('As senhas digitadas não são iguais', 'error');
               return false;
            }
         } else {
            myAlert('Preencha todos os campos', 'error');
            return false;
         }
      }
      
   };
   
   function validateCpf(cpf) {
      var sum = 0;
      var i;
      var rest;
      var inputCPF = cpf.replace(/\D/g, '');

      if (inputCPF == "00000000000") return false;
      
      if (/(\d)\1{10}/.test(inputCPF)) {
         return false;
      }
      
      for (i = 1; i <= 9; i++)
        sum = sum + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
      rest = (sum * 10) % 11;

      if (rest == 10 || rest == 11) rest = 0;
      if (rest != parseInt(inputCPF.substring(9, 10))) return false;

      sum = 0;
      for (i = 1; i <= 10; i++)
        sum = sum + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
      rest = (sum * 10) % 11;

      if (rest == 10 || rest == 11) rest = 0;
      if (rest != parseInt(inputCPF.substring(10, 11))) return false;
      return true;
   };
   
   function setContent() {
      if(validateForm()) {
         if(isUpdate.value == true) {
            store.updateUser(user.value.id, user.value);
         } else {
            store.storeUser(user.value);
         }
      }
   };
   
   onMounted(async () => {
      await store.getRoles()
   });
   
   
   

</script>

<style>

   .user_form_background {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: #1414142f;
      backdrop-filter: blur(2px);
      z-index: 3;
      transition: .3s;
   }
   
   .user_form_container {
      width: 400px;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      background: #141414;
      border-left: 1px solid #1b1b1b;      
      z-index: 4;
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 30px;
   }
   
   .user_form_header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .user_form_header h2 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 5px;
   }
   
   .user_form_header p {
      font-size: 14px;
      color: #a3a3a3;
   }
   
   .user_form_body {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      overflow: auto;
   }
   
   .user_form_body span {
      font-size: 13px;
      color: #e4e4e4;
      margin-bottom: 5px;
   }
   
   .user_form_body input {
      width: 100%;
      background: none;
      border: 1px solid #252525;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      transition: .3s;
   }
   
   .user_form_body input:focus {
      border: 1px solid #444444;
   }
   
   .user_form_body select {
      width: 100%;
      background: none;
      border: 1px solid #252525;
      padding: 10px;
      border-radius: 5px;
      color: #878787;
      transition: .3s;
      margin-bottom: 15px;
      cursor: pointer;
   }
   
   .user_form_body select option {
      background: #141414;
   }
   
   .user_form_body select::placeholder {
      color: #808080;
   }
   
   .user_form_body select:hover {
      border: 1px solid #444444;
   }
   
   .user_form_footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 15px;
   }
   
   .user_form_footer button {
      width: 50%;
      padding: 13px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: .3s;
   }
   
   .user_form_footer button:hover {
      filter: brightness(1.2);
   }
   
   .user_form_footer  .user_form_confirm {
      background: #1b1b1b;
      color: #fff;
   }
   
   .user_form_footer  .user_form_cancel {
      background: #1b1b1b;
      color: #fff;
   }
   
   
   /* slide */

   .slide-fade-enter-active .user_form_container {
      transition: all .4s;
   }

   .slide-fade-leave-active .user_form_container {
      transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }

   .slide-fade-enter-from .user_form_container,
   .slide-fade-leave-to .user_form_container {
      transform: translateX(100px);
      opacity: 0;
   }
   
   @media screen and (max-width: 540px) {
      
      .user_form_container {
         width: 100%;
      }
      
   }
   
</style>