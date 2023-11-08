export const useUser = defineStore('user', {

   state() {
      return {
         modalState: false,
      }
   },

   actions: {
      async changeModalState() {
         this.modalState = !this.modalState;
      },
   },
   
})

