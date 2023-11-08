<template>
   
   
   
<!--    
   <div class="product"
      v-for="(product, index) in products"
      :key="index + '_product'"
      
   >{{ product }}</div> -->
   
   <button @click="show = !show">Toggle</button>
   <Transition>
      <p v-if="show">hello</p>
   </Transition>
   
</template>

<script setup>

   const show = ref(false)

   // criar variaveis
   
   // variaveis estaticas 
   const name = 'davi';
   // variaveis que mudam -> two way data binding
   const idade = ref(21);
   

   
   // digo que minha variavel está estanciando meu storeProduct
   const store = useProducts();
   // obtenho os products, sendo que a variavel que eu crio tem que ter o nome da variavel dentro do store
   const {products} = storeToRefs(store)
   // retorna os produtos
   
   
   // metodos novos
   const teste = (() => {
      return alert('oiii')
   })
   // funcao padrao
   function teste2() {
      return alert('oiii')
   }
   
   // on mounted
   
   onMounted(() => {
      // teste2();
   })
   
   
   

</script>

<style>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>