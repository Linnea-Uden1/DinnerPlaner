/* uncomment the export below to enable the 1.1.2 test suite! */
export function compareIngredientsCB(ingredientA, ingredientB){
    if(ingredientA.aisle < ingredientB.aisle){
        return -1
    }
    if(ingredientA.aisle > ingredientB.aisle){
        return 1;
    }
    if(ingredientA.name < ingredientB.name){
        return -1;
    }
    if(ingredientA.name > ingredientB.name){
        return 1;
    }

    return 0;
}

export function sortIngredients(ingredients){
    const ingredientsCopy = [...ingredients];
    return ingredientsCopy.sort(compareIngredientsCB);

}

export  function isKnownTypeCB(type){
    if (type === "starter" || type === "main course" || type === "dessert") {
        return type;
    }
    return "";
}

export function dishType(dish){
    if (Array.isArray(dish.dishTypes)) {
        // Check each type in dish.dishTypes to see if it's known
        for (const type of dish.dishTypes) {
            const knownType = isKnownTypeCB(type);
            if (knownType) {
                return knownType;  // Return the first match
            }
        }
    }
    // If no known type is found, return an empty string
    return "";

}

export function compareDishesCB(dishA, dishB){
        //Maps each dish type to a number 
        const typeOrder = {
            "": 0, 
            "starter": 1,
            "main course": 2,
            "dessert":3, 
        }
    
        //Get the type of dishes 
        const typeA = dishType(dishA);
        const typeB = dishType(dishB);
        // Map each type to its priority value, defaultning to 0 is a type is missing 
        const typeAValue = typeOrder[typeA] || 0; 
        const typeBValue = typeOrder[typeB] || 0;
    
        return typeAValue - typeBValue;
    /*CompareDishesCB will give us a
    -Negative number if  dishA should come before dishB 
    -Positive number if dishA should come after dishB
    -Zero if they are the same type of dish
    */
}


export function sortDishes(dishes){
    const dishesCopy = [...dishes]; //Copy the array so the original remains unchanged 
    return dishesCopy.sort(compareDishesCB);//The sort method will call the callback function on paris of elemets until the entier element is sorted 
}

export function sumCB(acc,dish){
    return acc  + dish.pricePerServing;
}
export function menuPrice(dishesArray){
    const sum = dishesArray.reduce(sumCB, 0); //the reduce will invoke the callback function sumCB when needed, 

    return sum;
}

/* 
  This function is already implemented as it is more JavaScript + algorithms than interaction programming

   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
export function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB);

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}

