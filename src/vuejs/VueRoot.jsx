import { Sidebar } from "./sidebarPresenter.jsx";
import { Summary } from "./summaryPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";

import { createRouter, createWebHashHistory, RouterView } from "vue-router";

export function makeRouter(props) {
    return createRouter({
        history: createWebHashHistory(), // Använder hash-baserad historik för navigering
        routes: [
            {
                path: "/", // Startvägen
                component: <Search model={props.model} />, // Renderar sökkomponenten
            },
            {
                path: "/search", // Söksida
                component: <Search model={props.model} />, // Renderar sökkomponenten
            },
            {
                path: "/summary", // Sammanfattningssida
                component: <Summary model={props.model} />, // Renderar sammanfattningskomponenten
            },
            {
                path: "/details", // Detaljvysida
                component: <Details model={props.model} />, // Renderar detaljvykomponenten
            }
        ]
    });
}

// Funktion för huvudkomponenten i Vue-applikationen
function VueRoot(props) {
    if (props.model.ready) { // Kontroll om modellen är redo
        return (
            <div className="flexParent"> {/* Huvudbehållaren med flexlayout */}
                <div className="sidebar"> {/* Behållare för sidomenyn */}
                    <Sidebar model={props.model} /> {/* Renderar sidomenykomponenten */}
                </div>
                <div className="mainContent"> {/* Behållare för huvudinnehållet */}
                    <RouterView model={props.model} /> {/* RouterView hanterar vilken komponent som ska visas baserat på URL */}
                </div>
            </div>
        );
    } else {
        // Om modellen inte är redo, visa en laddningsbild
        return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
    }
}

// Exporterar huvudkomponenten
export { VueRoot };
