import "/src/style.css";

export function SearchResultsView(props) {

    // Funktion för att hantera klick på en specifik maträtt och anropa en användardefinierad eventfunktion om den är definierad
    function handleDishClickedACB(dish) {
        if (props.onDishClick) {
            props.onDishClick(dish); // Anropar användardefinierad funktion och skickar vidare maträttsdata
        }
    }

    // Funktion för att rendera varje maträtt som ett SPAN-element med bild och namn
    function dishItemCB(dish) {

        // Funktion som hanterar klick på en specifik maträtt
        function onDishClickACB() {
            handleDishClickedACB(dish); // Kallar på handleDishClickedACB när maträtten klickas
            window.location.hash = "#/details"
        }

        // Returnerar ett SPAN-element som representerar maträtten, med en bild och namn
        return (
            <span
                key={dish.id}                    // Unik identifierare för varje maträtt för att optimera rendering
                className="dish-item"             // CSS-klass för styling
                onClick={onDishClickACB}          // Klickhändelse för maträtten
            >
                <img src={dish.image} alt={dish.name} height="100" /> {/* Bild på maträtten */}
                <div className="dish-name">{dish.title}</div>        {/* Maträttens namn */}
            </span>
        );
    }

    // Returnerar en div som innehåller alla sökresultat, där varje maträtt renderas med dishItemCB
    return (
        <div className="search-results">
            {props.searchResults.map(dishItemCB)}
        </div>
    );
}