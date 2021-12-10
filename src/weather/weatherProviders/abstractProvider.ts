import { ILocation } from "../../location/types";
import { SunTimes } from "../sunrise";
import { IWeatherForecast } from "../types";

export default abstract class AbstractProvider {
    public name: string;

    protected responseJson: any;

    constructor(name: string) {
        this.name = name;
    }

    public canFillForecast(): boolean {
        return this.responseJson !== undefined;
    }

    public async fetchForecast(location: ILocation, onSuccess: () => any, onFailure: (error: Error) => any) {
        try {
            // Send a request
            let response = await this.requestData(location.lat.toString(), location.long.toString());

            this.responseJson = await response.json();

        } catch (e: any) {
            this.responseJson = undefined;
            
            console.error(e)
            onFailure(e);
            return;
        }

        onSuccess()
    }

    public abstract fillForecast(forecast: IWeatherForecast, sunTimes: SunTimes): void;

    protected abstract requestData(lat: string, long: string): Promise<Response>;
}