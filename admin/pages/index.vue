<template>


</template>

<script></script>

<script setup>

   import { toast } from 'vue3-toastify';
   import 'vue3-toastify/dist/index.css';

   definePageMeta({
      layout: "dashboard",
      middleware: "auth"
   });

</script>