import {sortIngredients} from "/src/utilities.js";
import "/src/style.css";

export function SummaryView(props) {
    console.log("SummaryView props:", props);

    // Funktion som navigerar tillbaka till söksidan
    function handleBackToSearchACB() {
        window.location.hash = "#/search"; // Uppdaterar URL-hashen för att gå till söksidan
    }

    // Returnerar JSX-strukturen för SummaryView-komponenten
    return (
        <div className="debug">
            {/* Visar en sammanfattning med antal gäster */}
            Summary for <span title="nr guests">{props.people}</span> persons:
            <button onClick={handleBackToSearchACB} className="button">Back to Search</button>
            {/* Knapp som navigerar tillbaka till söksidan */}

            {/* Tabell som visar en lista över ingredienser */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Aisle</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {  //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript
                    // Here Array Rendering is used to generate a table row for each element of the ingredients prop (an array) 
                    // props.ingredients.map(ingredientTableRowCB)
                               sortIngredients(props.ingredients).map(ingredientTableRowCB)
                                       }
                                   </tbody>
                               </table>
                           </div>
                       );

                       // Funktion som renderar en tabellrad för en enskild ingrediens
                       function ingredientTableRowCB(ingr) {
                           return (
                               <tr key={ingr.id /* Använder ingr.id som en unik nyckel för varje rad i array-renderingen */}>
                                   <td>{ingr.name}</td> {/* Ingrediensens namn */}
                                   <td>{ingr.aisle}</td> {/* Avdelningen där ingrediensen finns */}
                                   <td className="align-right">{(ingr.amount * props.people).toFixed(2)}</td>
                                   {/* Mängden av ingrediensen multiplicerat med antalet personer */}
                                   <td>{ingr.unit}</td> {/* Enheten för ingrediensen */}
                               </tr>
                           );
                       }
                   }