import { SummaryView } from "../views/summaryView.jsx"; //Import component summaryView 
import { shoppingList } from "../utilities.js";
function Summary(props){
    const ingredient = shoppingList(props.model.dishes);
    return <SummaryView people={props.model.numberOfGuests} ingredients={ingredient}/>;
}

export { Summary }