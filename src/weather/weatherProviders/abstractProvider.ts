import { ILocation } from "../../location/types";
import { IWeatherForecast } from "../types";

export default abstract class AbstractProvider {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public async fetchForecast(forecast: IWeatherForecast, location: ILocation, onSuccess: () => any, onFailure: (error: Error) => any) {
        try {
            // Send a request
            let response = await this.requestData(location.lat.toString(), location.long.toString());

            const json = await response.json();

            // Format the response 
            await this.fillForecast(json, forecast);

        } catch (e: any) {
            console.error(e)
            onFailure(e);
            return;
        }

        onSuccess()
    }

    protected abstract requestData(lat: string, long: string): Promise<Response>;
    protected abstract fillForecast(json: any, forecast: IWeatherForecast): void;
}