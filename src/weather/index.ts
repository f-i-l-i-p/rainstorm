import { METHODS } from "http";
import { ILocation } from "../store/types";
import { IForecast, IWeatherProvider } from "./types";
import MET from "./weatherProviders/MET";
import SMHI from "./weatherProviders/SMHI";

const weatherProviders: IWeatherProvider[] = [new SMHI(), new MET()]


export function getWeatherProviders(): IWeatherProvider[] {
    return weatherProviders;
}
