export function DetailsView(props) {
    // Destructuring av props för att få tillgång till de nödvändiga värdena
    const { dishData, guests, isDishInMenu, onAddToMenu } = props;

    // Funktion för att beräkna det totala priset baserat på pris per portion och antal gäster
    function calculateTotalPrice() {
        return (dishData.pricePerServing * guests).toFixed(2); // Multiplicerar priset per portion med antal gäster och formaterar till två decimaler
    }

    // Callback-funktion för att rendera varje ingrediens i en lista
    function ingredientsCB(ingredient) {
        return (
            <li key={ingredient.id}>
                {/* Visar mängd, enhet och namn på ingrediensen */}
                {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
        );
    }

    // Hanterar händelsen för att lägga till maträtten i menyn och navigera tillbaka till söksidan
    function handleAddToMenuAndNavigateACB() {
        onAddToMenu(); // Anropar funktionen för att lägga till maträtten i menyn
        window.location.hash = "#/search"; // Navigerar tillbaka till söksidan
    }

    // Hanterar händelsen för att avbryta och gå tillbaka till söksidan
    function handleBackToSearchACB() {
        window.location.hash = "#/search"; // Navigerar tillbaka till söksidan
    }

    return (
        <div>
            {/* Maträttens bild */}
            <img src={dishData.image} alt={dishData.title} />

            {/* Maträttens titel */}
            <h2>{dishData.title}</h2>

            {/* Pris per portion och totalt pris för alla gäster */}
            <div>
                <p>Price per serving: {dishData.pricePerServing.toFixed(2)} kr</p>
                <p>Total price for {guests} guests: {calculateTotalPrice()} kr</p>
            </div>

            {/* Lista över ingredienser */}
            <div>
                <h3>Ingredients</h3>
                <ul>
                    {/* Genererar en lista av ingredienser genom att mappa över extendedIngredients */}
                    {dishData.extendedIngredients.map(ingredientsCB)}
                </ul>
            </div>

            {/* Tillagningsinstruktioner */}
            <div>
                <h3>Instructions</h3>
                <p>{dishData.instructions}</p> {/* Visar instruktionerna för maträtten */}
            </div>

            {/* Länk till det fullständiga receptet */}
            <div>
                <a href={dishData.sourceUrl}>
                    View full recipe {/* Länktext som leder till maträttens receptsida */}
                </a>
            </div>

            {/* Knapp för att lägga till maträtten i menyn och en avbrytknapp */}
            <div className="detailViewButtons">
                <button
                    onClick={handleAddToMenuAndNavigateACB}
                    disabled={isDishInMenu} // Inaktiverar knappen om maträtten redan är i menyn
                >
                    {isDishInMenu ? "Already in Menu" : "Add to Menu"} {/* Ändrar knapptext baserat på om maträtten är i menyn */}
                </button>
                <button onClick={handleBackToSearchACB}>Cancel</button> {/* Avbrytknapp som navigerar tillbaka till söksidan */}
            </div>
        </div>
    );
}
