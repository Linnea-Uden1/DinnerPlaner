/* 
   Modellen (model) håller applikationens tillstånd (Application State).
   Det är ett abstrakt objekt som inte vet något om grafik eller användarinteraktion.
*/

import { resolvePromise } from "./resolvePromise";
import { searchDishes, getDishDetails } from "./dishSource";

const model = {
    numberOfGuests: 2, // Antal gäster
    dishes: [], // Lista som håller alla maträtter som är tillagda till menyn
    currentDishId: null, // ID för den aktuella maträtten, standard är null
    searchParams: {}, // Objekt som håller parametrarna för sökning
    searchResultsPromiseState: {}, // Objekt som håller tillståndet för sökresultatets promise
    currentDishPromiseState: {}, // Objekt som håller tillståndet för den aktuella maträttens detaljer

    // Sätter sökfrågan i modellens sökparametrar
    setSearchQuery(query){
        this.searchParams.query = query;
    },

    // Sätter typ av maträtt i modellens sökparametrar
    setSearchType(type){
        this.searchParams.type = type;
    },

    // Utför en sökning efter maträtter baserat på parametrarna
    doSearch(params) {
        // Anropar sökfunktionen från dishSource och lagrar promise
        const searchPromise = searchDishes(params);

        // Uppdaterar modellen med promise för sökresultaten
        this.searchResultsPromiseState.promise = searchPromise;

        // Hanterar promise med hjälp av resolvePromise
        resolvePromise(searchPromise, this.searchResultsPromiseState);
    },

    // Sätter den aktuella maträttens ID och hämtar detaljer om den maträtten
    setCurrentDishId(dishId){
      if (dishId && dishId !== this.currentDishId) {
        this.currentDishId = dishId; // Uppdaterar ID för den aktuella maträtten

        // Hämtar promise för detaljer om maträtten
        const dishDetailsPromise = getDishDetails(dishId);
        this.currentDishPromiseState.promise = dishDetailsPromise;

        // Hanterar promise för maträttens detaljer
        resolvePromise(dishDetailsPromise, this.currentDishPromiseState);
    }
    },

    // Sätter antal gäster om det är ett positivt heltal
    setNumberOfGuests(number){
        if(Number.isInteger(number) && number > 0){
            this.numberOfGuests = number; // Uppdaterar antal gäster
        }
        else{
            throw new Error("number of guests not a positive integer") // Fel om antal gäster inte är ett positivt heltal
        }
    },

    // Lägger till en maträtt i menyn
    addToMenu(dishToAdd){
        this.dishes = [...this.dishes, dishToAdd]; // Lägger till maträtten i listan
    },

    // Tar bort en maträtt från menyn
    removeFromMenu(dishToRemove){
        // Filtrerar bort maträtten som ska tas bort
        function shouldWeKeepDishCB(dish){
            return dish.id !== dishToRemove.id; // Behåller maträtten om ID inte matchar
        }
        this.dishes = this.dishes.filter(shouldWeKeepDishCB); // Uppdaterar listan utan den borttagna maträtten
    },

};

export {model}; // Exporterar modellen så att den kan användas i andra delar av applikationen
