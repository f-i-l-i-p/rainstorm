import { ILocation } from "../store/types";
import { IForecast, IWeatherProvider } from "./types";
import SMHI from "./weatherProviders/SMHI";

const weatherProviders: IWeatherProvider[] = [new SMHI()]


export function getWeatherProviders(): IWeatherProvider[] {
    return weatherProviders;
}
