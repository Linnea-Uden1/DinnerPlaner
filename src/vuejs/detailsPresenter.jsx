import { DetailsView } from '../views/detailsView';

function Details({ model }) {
    const { currentDishPromiseState, dishes, numberOfGuests, currentDishId } = model;

    // Funktion som anropas när en maträtt ska läggas till i menyn
    function handleAddToMenuACB() {
        if (currentDishPromiseState.data) { // Kollar att det finns data för den aktuella maträtten
            model.addToMenu(currentDishPromiseState.data); // Lägger till maträtten i menyn
        }
    }

    // Om det inte finns något promise för den aktuella maträtten, visa ett meddelande
    if (!currentDishPromiseState.promise) {
        return <div>No data</div>;
    }

    // Om promise för den aktuella maträtten inte har lyckats och ingen data finns, visa en laddningsbild
    if (currentDishPromiseState.promise && !currentDishPromiseState.data && !currentDishPromiseState.error) {
        return <div>
            <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." /> {/* Visar en laddningsbild */}
        </div>;
    }

    // Om det finns ett fel vid hämtning av data, visa ett felmeddelande
    if (currentDishPromiseState.error) {
        return <div>Error: {(currentDishPromiseState.error).toString()}</div>;
    }

    // Om data finns för den aktuella maträtten, visa detaljerna
    if (currentDishPromiseState.data) {
        const dishData = currentDishPromiseState.data; // Hämtar maträttens data
        const guests = numberOfGuests; // Hämtar antal gäster

        // Funktion som kollar om den aktuella maträtten redan finns i menyn
        function isDishInMenuCB(dish) {
            return dish.id === currentDishId; // Jämför maträttens ID med det aktuella ID:et
        }

        // Kollar om maträtten finns i menyn
        const isDishInMenu = dishes.some(isDishInMenuCB);

        // Returnerar komponenten DetailsView och skickar med all relevant data som props
        return (
            <DetailsView
                dishData={dishData}
                guests={guests}
                isDishInMenu={isDishInMenu}
                onAddToMenu={handleAddToMenuACB}
            />
        );
    }

    return null; // Om inget av de tidigare villkoren är uppfyllda, returnera null
}

export { Details }; // Exporterar Details-komponenten så att den kan användas i andra delar av applikationen
