import React from "react";
import './style.css';
import { IWeatherStateForecast } from "../../../store/forecasts/types";
import WeatherTable from "../WeatherTable";
import { getDayOffset, listHoursFromNow } from "../../../helpers/date";
import { ITableData } from "../WeatherTable/types";
import { table } from "console";
import { IWeather } from "../../../weather/types";
import { resolveSoa } from "dns/promises";

interface IWeatherTableListProps {
    weatherStateForecasts: IWeatherStateForecast[],
}

export default class WeatherTableList extends React.Component<IWeatherTableListProps> {

    /**
     * Converts the data from props to data accepted by the weather tables.
     * @returns Array with table data.
     */
    private getTableData(): ITableData[] {
        const result: ITableData[] = [];

        const stateForecasts = this.props.weatherStateForecasts;
        const providers = stateForecasts.map(stateForecast => { return stateForecast.weatherProvider });

        // For every provider
        for (let i = 0; i < stateForecasts.length; i++) {
            const stateForecast = stateForecasts[i];

            if (stateForecast.loading) {
                continue;
            }

            // For every weather point
            for (let j = 0; j < stateForecast.forecast.weatherPoints.length; j++) {
                const weatherPoint = stateForecast.forecast.weatherPoints[j];

                // Sometimes the date is a string because the reducer is bad.
                let weatherPointDate: Date;
                if (typeof weatherPoint.time === 'string')
                    weatherPointDate = new Date(weatherPoint.time);
                else
                    weatherPointDate = weatherPoint.time

                const dayOffset = getDayOffset(weatherPointDate);

                if (dayOffset < 0) {
                    console.warn("Old weather data");
                    continue;
                }

                // Create new table if needed
                if (dayOffset >= result.length) {
                    result.push({
                        columns: [],
                        providers: providers,
                    })
                }

                const tableData = result[dayOffset];
                const time = weatherPointDate.getTime();

                // If no columns, add one
                if (tableData.columns.length === 0) {
                    tableData.columns.push({
                        date: weatherPointDate,
                        weatherMap: new Map(),
                    })
                }

                // Create new column if needed, and add data.
                for (let k = tableData.columns.length - 1; k >= 0; k--) {
                    const column = tableData.columns[k];
                    const columnTime = column.date.getTime();

                    // Column already exists
                    if (columnTime === time) {
                        // Add data
                        column.weatherMap.set(stateForecast.weatherProvider, weatherPoint.weather);
                        break;
                    }
                    // Column should be after this column
                    else if (columnTime < time) {
                        // Add column
                        tableData.columns.splice(k + 1, 0, {
                            date: weatherPointDate,
                            weatherMap: new Map(),
                        })

                        // Make sure that the data gets added in the next loop.
                        k += 2;
                    }
                }
            }
        }

        return result;
    }

    private getTableName(index: number, date: Date | undefined): string {
        let result = "";

        if (!date) return result;

        switch (index) {
            case 0:
                result += "Idag, ";
                break;
            case 1:
                result += "Imorgon, "
        }

        switch (date.getDay()) {
            case 1:
                result += "Måndag";
                break;
            case 2:
                result += "Tisdag";
                break;
            case 3:
                result += "Onsdag";
                break;
            case 4:
                result += "Torsdag";
                break;
            case 5:
                result += "Fredag";
                break;
            case 6:
                result += "Lördag";
                break;
            case 0:
                result += "Söndag";
                break;
        }

        return result;
    }

    public render() {
        let tableData = this.getTableData();

        return (
            <div className="list">
                {tableData.map((data, index) =>
                    <WeatherTable key={index} tableData={data} justifyRight={index==0}  name={this.getTableName(index, data.columns.length ? data.columns[0].date : undefined)} />
                )}
            </div>
        );
    }
}
