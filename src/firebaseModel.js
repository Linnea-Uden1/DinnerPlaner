import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import { firebaseConfig } from "./firebaseConfig";

// Add relevant imports here 
import { getMenuDetails } from "./dishSource";

// Initialise firebase app, database, ref
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getDatabase(app)
const PATH = "dinnerModel144";
const someRef = ref(db, PATH);

// set(ref(db, PATH+"/test"), "dummy");

 // refcreates a reference to dinnerModel144/test 
//And set will save the value "dummy" at that place in the database 
//Test the modelToPersistence function 
// set(someRef, modelToPersistence({
//     numberOfGuests:5, 
//     currentDishId:13, 
//     dishes:[{id:13, title:"dummy1"}, 
//             {id:42, title:"dummy2"}]
// }))

// persistenceToModel({
//     guestsCount: 3,
//     selectedDishId: null,
//     menuIDs: [13, 42],
// });


//converts the app model into a format that is suitable for firebase      
function modelToPersistence(model) {
    const dishes = model.dishes;
    const numberOfGuests = model.numberOfGuests; 
    const currentDishId = model.currentDishId || null;

    function transformCB(dish){
        return dish.id;
    }

    // Transform the dishes array to an array of IDs and sort it
    const dishId = dishes.map(transformCB).sort();
    // Return the simplified object structure
    // return guestsCount, dishId, selectedDishId;
    return {
        menuIDs: dishId,             // Custom key for dish IDs
        guestsCount:numberOfGuests,   // Custom key, different from model property names
        selectedDishId: currentDishId// Custom key for the current dish ID
    };
}


function persistenceToModel(cloud, model) {
    // If there's no data in the cloud, use defaults
    const data = cloud || { guestsCount: 2, selectedDishId: null, menuIDs: [] };

    // Ensure that we set a default value for guestsCount if it doesn't exist in the cloud
    const guestsCount = data.guestsCount !== undefined ? data.guestsCount : 2;
    model.setNumberOfGuests(guestsCount);

    // Ensure that we set a default value for selectedDishId if it doesn't exist in the cloud
    const selectedDishId = data.selectedDishId !== undefined ? data.selectedDishId : null;
    model.setCurrentDishId(selectedDishId);

    // Handle the case where there are no menu IDs in the cloud
    if (!data.menuIDs || data.menuIDs.length === 0) {
        model.dishes = [];
        return Promise.resolve(model.dishes);  // Return an empty array if no dishes are available
    }

    // Retrieve the menu details for the dish IDs
    const menuPromise = getMenuDetails(data.menuIDs);

    // Update the model with the dishes once the promise resolves
    menuPromise.then(setDishesCB);

    function setDishesCB(dishes){
        model.dishes = dishes || [];
    }

    // Return the promise so the caller can wait for the result or chain further actions
    return menuPromise;
}




function saveToFirebase(model){
    if(model.ready){
        const persistenceData = modelToPersistence(model);

        set(someRef, persistenceData);
    }
}
async function readFromFirebase(model) {
    model.ready=false;
    const persistenceData = await get(someRef);
    await persistenceToModel(persistenceData.val(), model);
    model.ready=true;

}

function connectToFirebase(model, watchFunction){
    readFromFirebase(model);//Reads form firebse

    function checkACB(){//Callback functions that returns the values we want to check if they have changed 
        return[model.numberOfGuests, model.dishes, model.currentDishId];
    }
    function sideEffect(){//If the values we checked has changed then this side effect will take places
        saveToFirebase(model);
    }

    watchFunction(checkACB, sideEffect);// detect current changes and then let the side effect handle ít

}
// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}
