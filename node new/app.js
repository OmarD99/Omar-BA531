import {getData} from './Service.js';

   

getData('/api/recipes').then((aData) =>{  
    getData('/api/ingredients').then((bData) => {
     return getData('/api/recipes/Drifter').then((cData) => {
       
      })
    })
  })




