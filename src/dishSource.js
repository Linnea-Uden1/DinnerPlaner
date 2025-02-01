import { PROXY_KEY, PROXY_URL } from "./apiConfig";

// Funktion för att hantera API-svaret och kontrollera om statusen är 200 (OK)
function gotSomepResponseACB(response) {
    if (response.status !== 200) {
        // Om statusen inte är 200, kasta ett fel
        throw new Error("Could not find dish");
    }
    // Om statusen är OK, returnera JSON-data från svaret
    return response.json();
}

// Funktion för att extrahera endast maträtter från API-svaret
function keepJustDishACB(resp) {
    return resp.results;
}

// Funktion för att söka efter maträtter baserat på sökparametrar
export function searchDishes(searchParams) {
    // Skapa en querystring av sökparametrarna (t.ex. "query=pizza&type=main course")
    const queryString = new URLSearchParams(searchParams).toString();
    // Bygg URL för API-anropet med querystring
    const url = `${PROXY_URL}/recipes/complexSearch?${queryString}`;

    // Gör ett fetch-anrop till API:et med GET-metoden och nödvändiga headers
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY, // API-nyckel för autentisering
            'X-DH2642-Group': 144,    // Gruppnummer
        }
    })
    // Hantera svaret med hjälp av tidigare definierade funktioner
    .then(gotSomepResponseACB)
    .then(keepJustDishACB);
}

// Funktion för att hämta detaljer för flera maträtter baserat på deras ID
export function getMenuDetails(ids_array) {
    // Skapa ett objekt för parametrarna och konvertera till querystring
    const params = { ids: ids_array };
    const queryString = new URLSearchParams(params).toString();
    // Bygg URL för API-anropet
    const url = `${PROXY_URL}/recipes/informationBulk?${queryString}`;

    // Gör ett fetch-anrop till API:et med GET-metoden och nödvändiga headers
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-DH2642-Key': PROXY_KEY, // API-nyckel för autentisering
            'X-DH2642-Group': 144,    // Gruppnummer
        }
    })
    // Hantera svaret med hjälp av tidigare definierad funktion
    .then(gotSomepResponseACB);
}

// Funktion för att hämta detaljer för en enskild maträtt från ett response
function getDishDetailsACB(response) {
    // Returnera den första maträtten från response
    return response[0];
}

// Funktion för att hämta detaljer för en specifik maträtt baserat på dess ID
export function getDishDetails(id) {
    // Skapa en array med bara ett ID
    const idArray = [id];
    // Anropa getMenuDetails med ID-arrayen och hämta detaljer för maträtten
    return getMenuDetails(idArray).then(getDishDetailsACB);
}
