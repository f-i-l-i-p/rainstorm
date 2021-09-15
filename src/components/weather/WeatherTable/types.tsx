import { IWeather, IWeatherProvider } from "../../../weather/types";

export interface ITableColumn {
    date: Date,
    weatherMap: Map<IWeatherProvider, IWeather>,
}

export interface ITableData {
    columns: Map<number, ITableColumn>,
    providers: IWeatherProvider[],
}
