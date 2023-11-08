export const optionsMoney = {
   preProcess: val => val.replace(/[$,]/g, ''),
   postProcess: val => {
     if (!val) return ''
 
     const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)
 
     return Intl.NumberFormat('pt-BR', {
       style: 'currency',
       currency: 'BRL'
     }).format(val)
       .slice(0, sub ? -sub : undefined)
   }
 }