import { observer } from "mobx-react-lite";
import { SearchFormView } from '../views/searchFormView';
import { SearchResultsView } from "/src/views/searchResultsView.jsx";

const Search = observer(function SearchRender({ model }) {
    const dishTypeOptions = ["starter", "main course", "dessert"]; 

    // Hämtar aktuella sökparametrar från modellen
    const text = model.searchParams.query || ""; // Söktexten
    const type = model.searchParams.type || ""; // Söktyp (starter, main course, dessert)

    // Funktion som uppdaterar söktexten i modellen
    function handleSetSearchTextACB(newText) {
        model.setSearchQuery(newText); // Anropar modellen för att sätta ny söktext
    }

    // Funktion som uppdaterar maträttstypen i modellen
    function handleSetSearchDishTypeACB(newType) {
        model.setSearchType(newType); // Anropar modellen för att sätta ny maträttstyp
    }

    // Funktion som triggas när användaren vill göra en sökning
    function handleSearchNowACB() {
        model.doSearch(model.searchParams); // Anropar modellen för att utföra sökningen
    }

    // Funktion som hanterar visning av sökresultaten
    function renderSearchResults() {
        const searchResultsState = model.searchResultsPromiseState; // Hämtar promise-statistik för sökresultaten

        // Om det inte finns något promise, visa "No data"
        if (!searchResultsState || !searchResultsState.promise) {
            return <p>No data</p>;
        }

        // Om det finns ett promise men ingen data och inget fel, visa en laddningsbild
        if (searchResultsState.promise && !searchResultsState.data && !searchResultsState.error) {
            return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
        }

        // Om ett fel uppstod vid hämtning av data, visa felmeddelande
        if (searchResultsState.error) {
            return <p>Error: {(searchResultsState.error).toString()}</p>;
        }

        // Om inga resultat hittades, visa meddelandet "No data available for the search"
        if (searchResultsState.data && searchResultsState.data.length === 0) {
            return <p>No data available for the search.</p>;
        }

        // Om det finns resultat, rendera sökresultatskomponenten
        return (
            <SearchResultsView
                searchResults={searchResultsState.data} // Skickar sökresultaten till SearchResultsView
                onDishClick={handleDishClickACB} // Anropar handleDishClickACB när en maträtt klickas på
            />
        );
    }

    // Funktion som hanterar när en maträtt klickas på
    function handleDishClickACB(dish) {
        model.setCurrentDishId(dish.id); // Sätter id för den valda maträtten i modellen
    }

    return (
        <div>
            {/* Renderar SearchFormView med rätt props */}
            <SearchFormView
                dishTypeOptions={dishTypeOptions} // Sätter maträttstyp-alternativen
                text={text} // Sätter den aktuella söktexten
                type={type} // Sätter den aktuella maträttstypen
                handleTextACB={handleSetSearchTextACB} // Sätt funktion för att uppdatera söktext
                handleTypeACB={handleSetSearchDishTypeACB} // Sätt funktion för att uppdatera maträttstyp
                handleClickedACB={handleSearchNowACB} // Sätt funktion för att utföra sökningen
            />

            {/* Renderar sökresultaten */}
            {renderSearchResults()}
        </div>
    );
});

export { Search }; // Exporterar Search-komponenten för att användas i andra delar av applikationen
