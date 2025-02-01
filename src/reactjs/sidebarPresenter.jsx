import { observer, Observer } from "mobx-react-lite";
import { SidebarView } from "../views/sidebarView";
import { sortDishes } from "../utilities";

const Sidebar = observer(
    function SidebarRender(props){
        const dishArray = sortDishes(props.model.dishes);
        function handleNumberChangeACB(newNumber){
            props.model.setNumberOfGuests(newNumber);
        }
        function handleDishCklickedACB(dish){
            props.model.setCurrentDishId(dish.id);
        }
        function handleDishRemovedACB(dish){
            props.model.removeFromMenu(dish);
        }
        return (
            <SidebarView 
            number = {props.model.numberOfGuests} 
            
            dishes = {dishArray} 
            onNumberChange = {handleNumberChangeACB} 
            onDishClick = {handleDishCklickedACB}
            deleteDish = {handleDishRemovedACB}
            />
        );
    }
);

export { Sidebar };