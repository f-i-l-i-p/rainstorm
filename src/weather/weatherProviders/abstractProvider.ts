import { ILocation } from "../../location/types";
import { IWeatherForecast } from "../types";

export default abstract class AbstractProvider {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    public async fetchForecast(location: ILocation, onSuccess: (result: IWeatherForecast) => any, onFailure: (error: Error) => any) {
        let result: IWeatherForecast;

        try {
            // Send a request
            let response = await this.requestData(location.lat.toString(), location.long.toString());

            // Format the response 
            result = await this.formatResponse(response);

        } catch (e: any) {
            console.error(e)
            onFailure(e);
            return;
        }

        onSuccess(result)
    }

    protected abstract requestData(lat: string, long: string): Promise<Response>;
    protected abstract formatResponse(response: Response): Promise<IWeatherForecast>;
}