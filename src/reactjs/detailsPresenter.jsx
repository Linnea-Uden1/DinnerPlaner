import { observer } from "mobx-react-lite";
import { DetailsView } from '../views/detailsView';

const Details = observer(
    function DetailsRender({ model }) {
        const { currentDishPromiseState, dishes, numberOfGuests, currentDishId } = model;

        // Funktion som anropas när en maträtt ska läggas till i menyn
        function handleAddToMenuACB() {
            if (currentDishPromiseState.data) { // Om data finns för maträtten
                model.addToMenu(currentDishPromiseState.data); // Lägger till maträtten i menyn
            }
        }

        // Om det inte finns något promise för maträtten, visa meddelande om ingen data
        if (!currentDishPromiseState.promise) {
            return <div>No data</div>;
        }

        // Om promise finns men ingen data och inget fel, visa en laddningsbild
        if (currentDishPromiseState.promise && !currentDishPromiseState.data && !currentDishPromiseState.error) {
            return <div>
                <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" /> {/* Visar laddningsbild */}
            </div>;
        }

        // Om det finns ett fel vid hämtning av data, visa ett felmeddelande
        if (currentDishPromiseState.error) {
            return <div>Error: {(currentDishPromiseState.error).toString()}</div>;
        }

        // Om data finns för maträtten, visa detaljer
        if (currentDishPromiseState.data) {
            const dishData = currentDishPromiseState.data; // Hämtar maträttens data
            const guests = numberOfGuests; // Hämtar antal gäster

            // Funktion som kollar om den aktuella maträtten redan finns i menyn
            function isDishInMenuCB(dish) {
                return dish.id === currentDishId; // Jämför maträttens ID med det aktuella ID:et
            }

            // Kollar om maträtten finns i menyn
            const isDishInMenu = dishes.some(isDishInMenuCB);

            // Returnerar DetailsView-komponenten med nödvändiga data som props
            return (
                <DetailsView
                    dishData={dishData}
                    guests={guests}
                    isDishInMenu={isDishInMenu}
                    onAddToMenu={handleAddToMenuACB} // Funktion som anropas när man vill lägga till maträtten i menyn
                />
            );
        }

        return null; // Om inget av de tidigare villkoren är uppfyllda, returnera null
    }
);

export {Details}; // Exporterar Details-komponenten så att den kan användas i andra delar av applikationen
