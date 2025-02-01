import { sortDishes, menuPrice, dishType } from "../utilities";
import "../style.css";

export function SidebarView(props) {

    // Säkerställer att dishes är en array, annars används en tom array
    const dishes = Array.isArray(props.dishes) ? props.dishes : [];

    // Sorterar maträtterna i en specifik ordning med hjälp av en utility-funktion
    const sortedDishes = sortDishes([...dishes]);

    // Beräknar totalpriset för menyn baserat på antalet gäster
    const totalPrice = menuPrice(sortedDishes) * props.number;

    // Funktion som hanterar klick för att öka antalet gäster
    function increButtonClickedACB() {
        console.log(`Incrementing number of guests to: ${props.number + 1}`);
        const updatedNumber = props.number + 1;
        props.onNumberChange(updatedNumber); // Anropar funktionen för att uppdatera antal gäster
    }

    // Funktion som hanterar klick för att minska antalet gäster
    function decreButtonClickedACB() {
        console.log(`Decreasing number of guests to: ${props.number - 1}`);
        const updatedNumber = props.number - 1;
        props.onNumberChange(updatedNumber); // Anropar funktionen för att uppdatera antal gäster
    }

    // Returnerar JSX-strukturen för sidpanelen
    return (
        <div>
            {/* Knappkontroller för antal gäster */}
            <div className="guestButton">
                <button
                    type="button"
                    disabled={props.number == 1} // Inaktiverar minus-knappen om antalet gäster är 1
                    onClick={decreButtonClickedACB}
                >
                    -
                </button>
                <span title="nr guests">{props.number}</span> {/* Visar antal gäster */}
                <button
                    type="button"
                    onClick={increButtonClickedACB}
                >
                    +
                </button>
            </div>

            {/* Tabell för maträtter */}
            <table>
                <tbody>
                    {/* Renderar en rad för varje maträtt med hjälp av en callback-funktion */}
                    {sortedDishes.map(dishRowCB)}
                    <tr className="totalPrice">
                        <td></td>
                        <td>Total:</td>
                        <td></td>
                        <td className="price">{totalPrice.toFixed(2)}</td> {/* Visar totalpriset */}
                    </tr>
                </tbody>
            </table>
        </div>
    );

    // Funktion som renderar en rad i tabellen för en maträtt
    function dishRowCB(dish) {

        // Funktion som hanterar borttagning av en maträtt
        function xClickedACB() {
            props.deleteDish(dish); // Anropar funktionen för att ta bort maträtten
            console.log('Removed dish id is: ' + dish.id);
        }

        // Funktion som hanterar klick på maträttens namn (för att visa detaljer)
        function linkClickedACB() {
            props.onDishClick(dish); // Anropar funktionen för att visa maträttens detaljer
        }

        // Returnerar en tabellrad för maträtten
        return (
            <tr key={dish.id}>
                <td>
                    <button onClick={xClickedACB}>X</button> {/* Knapp för att ta bort maträtten */}
                </td>
                <td>
                    <a href="#/details" onClick={linkClickedACB}>{dish.title}</a> {/* Länk till maträttens detaljer */}
                </td>
                <td>{dishType(dish)}</td> {/* Visar maträttens typ */}
                <td className="price">
                    {(dish.pricePerServing * props.number).toFixed(2)} {/* Visar priset för maträtten baserat på antal gäster */}
                </td>
            </tr>
        );
    }
}
