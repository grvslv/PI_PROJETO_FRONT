<template>
   
   <h2>Teste - {{ routers.params.user }}</h2>
   
</template>

<script setup>

   import { useRoute } from 'vue-router'

   const routers = useRoute()
   
   const users = ref([
      
      {
         name: 'davi',
         imagem: 'https://www.petz.com.br/blog/wp-content/uploads/2019/05/cachorro-independente-1.jpg'
      },
      {
         name: 'eduardo',
         imagem: 'https://www.florence.edu.br/wp-content/uploads/2022/08/Imagem-Materia_Dia-do-Cachorro.png'
      }
   
   ]);
   
   useHead({
      title: routers.params.user,
      meta: [{
         name: 'description',
         content: 'ablubleeeeeee'
      }]
   })

</script>