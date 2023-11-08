<template>
   
   <Transition name="modal-show">
      <div class="modal_bg" v-if="modalState">
         <div class="modal_container">
            <div class="modal_header">
               <h2>Alterar Status</h2>
               <icon class="modal_icon" @click="changeModalState(false)" name="heroicons:x-mark-20-solid" />
            </div>
            
            <div class="modal_body">
               <p>Você tem certeza de que deseja alterar o status do Usuário?!</p>
            </div>
            
            <div class="modal_actions">
               <button class="modal_confirm" @click="changeProductStatus(modalProductId)">Confirmar</button>
               <button class="modal_cancel" @click="changeModalState(false)">Cancelar</button>
            </div>
            
         </div>
      </div>
   </Transition>
   
</template>

<script setup>

   const store = useProducts();
   const {modalState} = storeToRefs(store);
   const {modalProductId} = storeToRefs(store);
   const {changeModalState} = store;
   const {changeProductStatus} = store;

</script>


<style>
   
   .modal_bg {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: #1414142f;
      backdrop-filter: blur(2px);
      z-index: 4;
      transition: .3s;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .modal_container {
      width: 400px;
      background: #222222;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .modal_header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
   }
   
   .modal_header h2 {
      font-size: 18px;
      font-weight: 500;
   }
   
   .modal_header .modal_icon {
      width: 30px;
      height: 30px;
      padding: 3px;
      transition: .3s;
      cursor: pointer;
      border-radius: 5px;
   }
   
   .modal_header .modal_icon:hover {
      background: #2b2b2b;
   }
   
   .modal_body {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      text-align: start;
      margin-bottom: 30px;
   }
   
   .modal_body p {
      font-size: 15px;
      color: #b4b4b4;
   }
   
   .modal_actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 15px;
   }
   
   .modal_actions button {
      width: 50%;
      padding: 13px;
      border-radius: 8px;
      transition: .3s;
      cursor: pointer;
   }
   
   .modal_actions button:hover {
      filter: brightness(1.2);
   }
   
   .modal_actions .modal_confirm {
      background: #224cc1;
   }
   
   .modal_actions .modal_cancel {
      background: #3c3c3c;
   }
   
   /* slide */

   .modal-show-enter-active .modal_container {
      transition: all .3s;
   }

   .modal-show-leave-active .modal_container {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
   }

   .modal-show-enter-from .modal_container,
   .modal-show-leave-to .modal_container {
      transform: scale(0.5);
      opacity: 0;
   }

</style>