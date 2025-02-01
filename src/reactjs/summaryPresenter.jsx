import { SummaryView } from "../views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "../utilities.js";

const Summary = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function SummaryRender(props){
        const ingredient = shoppingList(props.model.dishes);
        return <SummaryView people={props.model.numberOfGuests} ingredients={ingredient}/>;
    }
);

export { Summary };