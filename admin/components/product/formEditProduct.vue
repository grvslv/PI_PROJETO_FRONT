<template>
   
   <div class="product_new_form_background" v-if="formEditState">
      
      <div class="product_new_form_container">
         
         <div class="product_new_form_header">
            <h2>Formulário de Edição de Produto</h2>
            <p>Formulário para editar Produtos</p>
         </div>
         
         <div class="product_new_form_body">
            
            <template v-if="permission">
               <span>Título</span>
               <input required type="text" v-model="productToEdit.name" placeholder="Título">
               <span>Descrição</span>
               <textarea required v-model="productToEdit.description" placeholder="Descrição"></textarea>
               <span>Valor</span>
               <input required v-model.lazy="productToEdit.price" v-money3="config" />
            </template>
            
            <span>Quantidade</span>
            <input required type="text" v-model="productToEdit.stock" @keyup="restrictToNumbers" placeholder="Quantidade">
            
            <template v-if="permission">
               
               <span>Imagens</span>
               <div class="product_new_form_images">
                  <input type="file" hidden id="fileInput" @change="addImages" ref="fileInput" accept="image/png, image/jpeg, image/jpg, image/svg" />
                  
                  <!-- imagens antigas -->
                  <div v-for="(image, index) in productToEdit.images" :key="index" class="product_new_form_images_item">
                     <img :src="getImage + productToEdit.id + '/' + image.path" alt="Imagem" width="100" height="100" />

                     <div class="p_n_bg">
                        <icon @click="deleteImages(image)" name="carbon:trash-can" class="p_n_item" />
                        <icon @click="setDefaultImage(image)" :name="image.isDefault ? 'carbon:checkbox-checked' : 'carbon:checkbox'" class="p_n_item" />
                     </div>
                  </div>
                  
                  <!-- novas imagens -->
                  <div v-for="(image, index) in productToEdit.newImages" :key="index" class="product_new_form_images_item">
                     <img :src="image.path" alt="Imagem" width="100" height="100" />

                     <div class="p_n_bg">
                        <icon @click="deleteNewImages(image)" name="carbon:trash-can" class="p_n_item" />
                        <icon @click="setDefaultNewImage(image)" :name="image.isDefault ? 'carbon:checkbox-checked' : 'carbon:checkbox'" class="p_n_item" />
                     </div>
                  </div>
                  
                  <label for="fileInput" class="p_n_label">
                     <icon name="carbon:folder-add" />
                  </label>
                  
               </div>
               
            </template>
            
         </div>
         
         <div class="product_new_form_footer">
            <button class="product_new_form_confirm" @click="sendData()">Confirmar</button>
            <button class="product_new_form_cancel" @click="closeForm()">Cancelar</button>
         </div>
      
      </div>   

   </div>
   
</template>

<script setup>


   
   const {formEditState} = storeToRefs(useProducts());
   const store = useProducts();
   
   const permission = validateRole('Admin');
   
   const configRoute = useRuntimeConfig();
   
   const getImage = configRoute.public.baseURL + '/getImage/';
   
   const {productToEdit} = storeToRefs(useProducts());
   
   const imageInput = ref('');
   
   const config = {
      masked: false,
      prefix: 'R$ ',
      suffix: '',
      thousands: '.',
      decimal: ',',
      precision: 2,
      disableNegative: false,
      disabled: false,
      min: null,
      max: null,
      allowBlank: false,
      minimumNumberOfCharacters: 0,
      shouldRound: true,
      focusOnRight: false
   };
   
   function addImages(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          productToEdit.value.newImages.push({
            path: reader.result,
            isDefault: false
          });
        };
        reader.readAsDataURL(files[i]);
      }
      // Limpar o input de arquivo para permitir mais seleções
      event.target.value = '';
   };
   
   function setDefaultImage (selectedImage) {
      
      for (const image of productToEdit.value.newImages) {
         image.isDefault = false;
      }
      
      for (const image of productToEdit.value.images) {
         if (image === selectedImage) {
            image.isDefault = true; // Defina a imagem selecionada como padrão
         } else {
            image.isDefault = false; // Defina todas as outras imagens como não padrão
         }
      }
   };
   
   function setDefaultNewImage (selectedImage) {
      
      for (const image of productToEdit.value.images) {
         image.isDefault = false;
      }
      
      for (const image of productToEdit.value.newImages) {
         if (image === selectedImage) {
            image.isDefault = true; // Defina a imagem selecionada como padrão
         } else {
            image.isDefault = false; // Defina todas as outras imagens como não padrão
         }
      }
   };
   
   function deleteImages(image) {
      
      productToEdit.value.imagesToDelete.push(image);
      productToEdit.value.images =  productToEdit.value.images.filter(item => item !== image);
   }
   
   function deleteNewImages(image) {
      productToEdit.value.newImages =  productToEdit.value.newImages.filter(item => item !== image);
   }
   
   function restrictToNumbers() {
      // Remove todos os caracteres que não são dígitos
      return productToEdit.value.stock = productToEdit.value.stock.replace(/\D/g, '');
   }
   
   function sendData() {      
      if(validateForm()) {
         store.updateProduct(productToEdit.value.id, productToEdit.value)
         closeForm();
      } else {
         myAlert('Ocorreu um erro.', 'error');
      }
   }
   
   function resetForm() {
      productToEdit.value = {
         name: '',
         description: '',
         price: '',
         stock: '',
         images: [],
         imagesToDelete: [],
         newImages: []
      };
   }
   
   function closeForm() {
      resetForm();
      store.changeFormEditState(false);
   }
   
   function validateForm() {
      if(productToEdit.value.name && productToEdit.value.description && productToEdit.value.stock && productToEdit.value.price) {
         if(productToEdit.value.images.length > 0 || productToEdit.value.newImages.length > 0) {
            const hasDefaultImage = productToEdit.value.images.some(image => image.isDefault === true || image.isDefault === 1);
            const hasDefaultImageNew = productToEdit.value.newImages.some(image => image.isDefault === true || image.isDefault === 1);
            if (hasDefaultImage || hasDefaultImageNew) {
               return true;
            } else {
               myAlert('Ao menos uma imagem deve ser setada como Padrão..!', 'error');
               return false;
            }
         } else {
            myAlert('Você precisa adicionar ao menos uma imagem..!', 'error');            
            return false;
         }
      } else {
         myAlert('Você precisa preencher todos os campos..!', 'error');            
         return false;
      }
   }
   
</script>

<style>

   .product_new_form_background {
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
   
   .product_new_form_container {
      width: 400px;
      height: 100vh;
      position: fixed;
      top: 0;
      right: 0;
      background: #141414;
      border-left: 1px solid #1b1b1b;      
      z-index: 4;
      animation: .9s from-right ease-in-out;
      padding: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 30px;
   }
   
   .product_new_form_header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
   
   .product_new_form_header h2 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 5px;
   }
   
   .product_new_form_header p {
      font-size: 14px;
      color: #a3a3a3;
   }
   
   .product_new_form_body {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      overflow-x: scroll;
      padding-bottom: 20px;
   }
   
   .product_new_form_body span {
      font-size: 13px;
      color: #e4e4e4;
      margin-bottom: 5px;
   }
   
   .product_new_form_body input {
      width: 100%;
      background: none;
      border: 1px solid #252525;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      transition: .3s;
   }
   
   .product_new_form_body input:focus {
      border: 1px solid #444444;
   }
   
   .product_new_form_body select {
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
   
   .product_new_form_body select option {
      background: #141414;
   }
   
   .product_new_form_body select::placeholder {
      color: #808080;
   }
   
   .product_new_form_body select:hover {
      border: 1px solid #444444;
   }
   
   .product_new_form_body textarea {
      width: 100%;
      min-height: 140px;
      background: none;
      border: 1px solid #252525;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
      transition: .3s;
      resize: none;
   }
   
   .product_new_form_body textarea:focus {
      border: 1px solid #444444;
   }
   
   .product_new_form_footer {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 15px;
   }
   
   .product_new_form_footer button {
      width: 50%;
      padding: 13px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: .3s;
   }
   
   .product_new_form_footer button:hover {
      filter: brightness(1.2);
   }
   
   .product_new_form_images {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      column-gap: 10px;
      row-gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
   }
   
   .product_new_form_images_item {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      position: relative;
      border-radius: 6px;
   }
   
   .p_n_bg {
      width: 100%;
      height: 100%;
      background: rgba(25, 25, 25, 0.484);
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
   }
   
   .p_n_item {
      font-size: 30px;
      padding: 4px;
      cursor: pointer;
      border-radius: 4px;
   }
   
   .p_n_label {
      width: 100px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-radius: 6px;
      background: #252525;
      font-size: 30px;
      cursor: pointer;
      transition: .3s;
   }
   
   .p_n_label:hover {
      background: #343434;
   }
   
   
   
   .p_n_item:hover {
      background: rgba(118, 118, 118, 0.397);
   }
   
   .product_new_form_footer  .product_new_form_confirm {
      background: #1b1b1b;
      color: #fff;
   }
   
   .product_new_form_footer  .product_new_form_cancel {
      background: #1b1b1b;
      color: #fff;
   }
   
   
   
   
   
   /* keyframes */
   
   @keyframes from-right {
      0% {
         right: -500px;
      } 100% {
         right: 0px;
      }
   }
   
   
   @media screen and (max-width: 540px) {
      
      .product_new_form_container {
         width: 100%;
      }
      
   }
   
   

</style>