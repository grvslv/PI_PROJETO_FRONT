<template>
   
   <div class="login">
      
      <form @submit="login($event)" class="l_card">
         
         <h2>Faça login</h2>
         <p>Faça login para acessar sua conta</p>
         
         <label>Email</label>
         <input type="email" autocomplete="off" name="user_email" v-model="user.email" placeholder="Email">
         <label>Senha</label>
         <input type="password" autocomplete="off" name="user_password" v-model="user.password" placeholder="Senha">
         
         <button type="submit">Fazer Login</button>
      </form>
      
   </div>
   
</template>

<script setup>

   definePageMeta({
      middleware: "auth",
   });

   const {authenticateUser} = useAuth();
   
   const user = ref({
      email: '',
      password: '',
   });
   
   const login = async (event) => {
      event.preventDefault();
      await authenticateUser(user.value);
   };

</script>

<style>

   .login {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-top: 140px;
      padding-bottom: 200px;
   }

   .l_card {      
      border: 1px solid #efefef;
      border-radius: 10px;
      padding: 20px;
      width: 400px;
      height: unset;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .l_card h2 {
      font-size: 25px;
      margin-bottom: 10px;
      color: #1b1b1b;
      font-weight: 700;
   }
   
   .l_card p {
      font-size: 16px;
      font-weight: 300;
      color: #6d6d6d;
      margin-bottom: 20px;
   }
   
   .l_card {
      margin-top: 40px;
      display: flex;
      width: 400px;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .l_card label {
      font-size: 14px;
      color: #444444;
      font-weight: 400;
      margin-bottom: 10px;
   }
   
   .l_card input {
      width: 100%;
      background: none;
      border: 1px solid #efefef;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      transition: .3s;
   }
   
   .l_card input:focus {
      border: 1px solid #c0c0c0;
   }
   
   .l_card button {
      width: 100%;
      padding: 10px;
      margin-top: 20px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #224cc1;
      cursor: pointer;
      transition: .3s;
      font-size: 14px;
      color: white;
      font-weight: 400;
   }
   
   .l_card button:hover {
      filter: brightness(1.2);
   }
   
   @media screen and (max-width: 420px) {
      
      .l_card {      
         border: none;
         padding: 30px;
         width: 400px;
         height: unset;
         display: flex;
         flex-direction: column;
         align-items: flex-start;
      }
      
   }


</style>