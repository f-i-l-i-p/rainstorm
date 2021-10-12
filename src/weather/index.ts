import { ILocation } from "../store/types";
import { IForecast, IWeatherProvider } from "./types";
import SMHI from "./weatherProviders/SMHI";
import SMHI2 from "./weatherProviders/SMHI2";

const weatherProviders: IWeatherProvider[] = [new SMHI(), new SMHI2()]


export function getWeatherProviders(): IWeatherProvider[] {
    return weatherProviders;
}
