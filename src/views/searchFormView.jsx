export function SearchFormView(props) {

    // Funktion för att hantera ändringar i sökfältets text
    function handleTextChangeACB(evt) {
        props.handleTextACB(evt.target.value);
        // Anropar en funktion från props som skickar in det nya textvärdet
    }

    // Funktion för att hantera val i dropdown-menyn (val av maträttstyp)
    function handleChoosenTypeACB(evt) {
        props.handleTypeACB(evt.target.value);
        // Anropar en funktion från props som skickar in den valda typen
    }

    // Funktion för att hantera klick på sökknappen
    function handleSearchClickACB(evt) {
        props.handleClickedACB();
        // Anropar en funktion från props för att starta sökningen
    }

    // Funktion för att navigera till sammanfattningssidan
    function toSummaryACB() {
        window.location.hash = "#/summary";
        // Ändrar URL:en för att navigera till "summary"-vyn
    }

    // Returnerar JSX-strukturen för sökformuläret
    return (
        <div>
            <input
                type="text"                    // Textfält för användarens sökord
                value={props.text || ""}       // Visar aktuell text från props eller en tom sträng som standard
                placeholder="pizza"            // Platshållartext för att ge användaren en ledtråd
                onChange={handleTextChangeACB} // Anropar funktionen vid varje ändring i textfältet
            />
            <select
                value={props.type || ""}       // Visar aktuell typ från props eller tom som standard
                onChange={handleChoosenTypeACB} // Anropar funktionen vid val av maträttstyp
            >
                {/* Förvalsalternativ */}
                <option value={props.type}>Choose:</option>
                {/* Dynamiskt genererade alternativ från props.dishTypeOptions */}
                {props.dishTypeOptions.map(renderOptionCB)}
            </select>
            <button onClick={handleSearchClickACB}>search</button>
            {/* Knapp som anropar sökfunktionen */}
            <button onClick={toSummaryACB}>Summary</button>
            {/* Knapp som navigerar till sammanfattningssidan */}
        </div>
    );

    // Funktion för att rendera varje alternativ i dropdown-menyn
    function renderOptionCB(optionObj) {
        return <option key={optionObj.value} value={optionObj.value}> {optionObj} </option>;
        // Returnerar en JSX-<option> med värde och text baserat på objektet i listan
    }
}
