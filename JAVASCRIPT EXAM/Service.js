import http from 'http';
import promise from 'promise';

let recipes = [];
let ingredients = [];
let recipe = {};
let sum=0;

const host = 'git.ucc.uwm.edu';
const options = {
    host: host,
    path: '',
    method: 'GET'
}

 const getData = (endpoint) => {
    options.path = endpoint;
    
    return new promise(function(resolve, reject) {
        var req = https.request(options, function(res) {
            // reject on bad status
           
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            // cumulate data
           var array=[];
            res.on('data', function(response) {
                array = JSON.parse(response);
            });
            // resolve on end
            res.on('end', function() {
                try {
                   
                    if(endpoint=='orders')
                    {
                        recipes = array;
                       
                        for(var i =0 ;i<recipes.length;i++)
                         console.log(recipes[i]);
                         resolve(recipes[i]);
                    }
                    else if (endpoint=='/api/ingredients'){
                        ingredients = array;
                        console.log(ingredients);
                        resolve(ingredients);
                    }
                    else if(endpoint == '/api/recipes/Drifter')
                    {
                         
                        recipe = array;
                         recipes=recipe.ingredients;
                         if(ingredients.length>0){
                            for(let i=0;i<recipes.length;i++)
                            {
                                const result = ingredients.filter(ing =>ing.name == recipes[i].name);
                                sum += (recipes[i].quantity *result[0].MaxPPG)
                               
                            }
                         }
                        
                          console.log("Max PPG of Drifter is :"+ sum);
                          resolve(sum);
                    }
                       
                  
                } catch(e) {
                    console.log(e);
                }
                
               
            });
        });
        // reject on request error
        req.on('error', function(err) {  
            console.log(err);         
          //  reject(err);
        });
    
        // IMPORTANT
        req.end();
    });

    
}

export {
    getData
}