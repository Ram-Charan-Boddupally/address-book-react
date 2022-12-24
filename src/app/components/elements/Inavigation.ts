import { NavigateFunction, Location } from "react-router"

export default interface INavigationProps{
    navigate?: NavigateFunction;
    location?: Location;
}