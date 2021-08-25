import { ILocation } from "../../store/types";
import { IForecast, IWeatherProvider } from "../types";

export default abstract class AbstractProvider implements IWeatherProvider {
    name: string;
    logo: string;

    constructor(name: string, logo: string) {
        this.name = name;
        this.logo = logo;
    }

    async fetchForecast(location: ILocation): Promise<IForecast> {
        // TODO: Handle errors
        let response = await this.requestData(location.lat.toString(), location.long.toString());

        // TODO: Handle errors
        let result = await this.formatResponse(response);

        return result;
    }

    protected abstract requestData(lat: string, long: string): Promise<Response>;
    protected abstract formatResponse(response: Response): Promise<IForecast>;
}