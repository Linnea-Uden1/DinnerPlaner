import { Sidebar } from "./sidebarPresenter.jsx";
import { Summary } from "./summaryPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { observer } from "mobx-react-lite";

import { createHashRouter, RouterProvider } from "react-router-dom";

// Funktion för att skapa en router med definierade rutter
export function makeRouter(props) {
    return createHashRouter([
        {
            path: "/", // Startvägen
            element: <Search model={props.model} />, // Renderar sökkomponenten
        },
        {
            path: "/search", // Söksida
            element: <Search model={props.model} />, // Renderar sökkomponenten igen
        },
        {
            path: "/summary", // Sammanfattningssida
            element: <Summary model={props.model} />, // Renderar sammanfattningskomponenten
        },
        {
            path: "/details", // Detaljvysida
            element: <Details model={props.model} />, // Renderar detaljvykomponenten
        },
    ]);
}

// Observerbar React-komponent för att visa hela appens struktur
const ReactRoot = observer(

  function ReactRoot(props) {
    if (props.model.ready) { // Kontroll om modellen är redo  
      return (
        <div className="flexParent"> {/* Huvudbehållaren med flexlayout */}
          <div className="sidebar"> {/* Behållare för sidomenyn */}
            <Sidebar model={props.model} /> {/* Renderar sidomenykomponenten */}
          </div>
          <div className="mainContent"> {/* Behållare för huvudinnehållet */}
            <RouterProvider router={makeRouter(props)} /> {/* Routerhanteraren som renderar rätt komponent baserat på URL */}
          </div>
        </div>
      );
    } else {
      // Om modellen inte är redo, visa en laddningsbild
      return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
    }
  }
);

// Exporterar huvudkomponenten
export { ReactRoot };
