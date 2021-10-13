import { METHODS } from "http";
import { ILocation } from "../store/types";
import { IForecast, IWeatherProvider } from "./types";
import MET from "./weatherProviders/MET";
import SMHI from "./weatherProviders/SMHI";
import SMHI2 from "./weatherProviders/SMHI2";

const weatherProviders: IWeatherProvider[] = [new SMHI(), new MET(), new SMHI2()]


export function getWeatherProviders(): IWeatherProvider[] {
    return weatherProviders;
}
