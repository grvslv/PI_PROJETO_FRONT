<template>
   
   <div class="admin_order_container">
      <div class="admin_order_card"
         v-for="(item, index) in orders"
         :key="index"
      >
         <h2>Código: {{item.order_code}}</h2>
         <span class="span_adm">Data: {{ item.date }}</span>
         <span class="span_adm">Valor total: {{ formatValue(item.value) }}</span>
         <span class="span_adm">Status: {{ item.status.name }}</span>
         <icon name="ph:arrow-square-out" class="order_adm_icon" />
      </div>   
   </div>
   
</template>

<script setup>

   definePageMeta({
      middleware: "requests",
      layout: 'dashboard'
   });
   
   
   const store = useProfile()
   const {orders} = storeToRefs(store);
   
   
   
   onMounted(async () => {      
      await store.getMyOrders()
   });

</script>

<style scoped>

   .admin_order_container {
      width: 100%;
      display: flex;
      padding: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      row-gap: 20px;
      column-gap: 20px;
      padding-bottom: 600px;
   }

   .admin_order_card {
      width: 300px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 6px;
      border: 1px solid #f0f0f0;
      border-radius: 10px;
   }
   
   .admin_order_card h2 {
      font-size: 18px !important;
   }
   
   .admin_order_card .span_adm {
      font-size: 13px !important;
      font-weight: 300;
      color: #a3a3a3;
   }
   
   .order_adm_icon {
      font-size: 28px;
      padding: 3px;
      border-radius: 4px;
      cursor: pointer;
      transition: .3s;
      color: #666666;
   }
   
   .order_adm_icon:hover {
      background: #f7f7f7;
   }

</style>