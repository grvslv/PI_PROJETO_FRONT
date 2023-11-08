<template>
   
   <main class="l_container">
      
      <div class="l_card">
         
         <h2>Fazer Login</h2>
         <p>Faça login para acessar o sistema</p>
         
         <form @submit="login($event)" class="l_inputs">
            
            <span>Email</span>
            <input type="email" autocomplete="off" name="user_email" v-model="user.email" placeholder="Email">
            <span>Senha</span>
            <input type="password" autocomplete="off" name="user_password" v-model="user.password" placeholder="Senha">
            
            <button type="submit">Fazer Login</button>
         </form>
         
      </div>
      
   </main>
   
</template>

<script setup>

   definePageMeta({
      middleware: "auth"
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

   .l_container {
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .l_card {      
      border: 2px solid #1b1b1b;
      border-radius: 10px;
      padding: 20px;
      width: 400px;
      height: unset;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .l_card h2 {
      font-size: 20px;
      margin-bottom: 5px;
      color: #ececec;
      font-weight: 500;
   }
   
   .l_card p {
      font-size: 14px;
      color: #9d9d9d;
   }
   
   .l_card .l_inputs {
      margin-top: 40px;
      display: flex;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .l_card .l_inputs span {
      font-size: 14px;
      margin-bottom: 5px;
      color: #ececec;
      font-weight: 400;
      margin-bottom: 5px;
   }
   
   .l_card .l_inputs input {
      width: 100%;
      background: none;
      border: 1px solid #252525;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      transition: .3s;
   }
   
   .l_card .l_inputs input:focus {
      border: 1px solid #444444;
   }
   
   .l_card button {
      width: 100%;
      padding: 10px;
      margin-top: 30px;
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