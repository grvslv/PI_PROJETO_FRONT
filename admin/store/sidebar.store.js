export const useSidebar = defineStore('sidebar', {

   state() {
      return {
         sidebarState: false,
      }
   },

   actions: {
      async changeSidebarStatus(state) {
         this.sidebarState = state;
      },
   },
   
})

