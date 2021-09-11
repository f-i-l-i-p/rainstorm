import { ILocation } from "../../store/types";
import { IForecast, IWeatherProvider } from "../types";

export default abstract class AbstractProvider implements IWeatherProvider {
    name: string;
    logo: string;

    constructor(name: string, logo: string) {
        this.name = name;
        this.logo = logo;
    }

    public async fetchForecast(location: ILocation, onSuccess: (result: IForecast) => any, onFailure: (error: Error) => any) {
        let result: IForecast;

        try {
            // Send a request
            let response = await this.requestData(location.lat.toString(), location.long.toString());

            // Format the response 
            result = await this.formatResponse(response);

        } catch (e) {
            onFailure(e);
            return;
        }

        onSuccess(result)
    }

    protected abstract requestData(lat: string, long: string): Promise<Response>;
    protected abstract formatResponse(response: Response): Promise<IForecast>;
}