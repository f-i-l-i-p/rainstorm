import React from "react";
import './style.css';
import { IWeatherStateForecast } from "../../../store/forecasts/types";
import WeatherTable from "../WeatherTable";
import { getDayOffset, listHoursFromNow } from "../../../helpers/date";
import { ITableData } from "../WeatherTable/types";
import { table } from "console";
import { IWeather } from "../../../weather/types";

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
        // Loop through times
        // Check which day
        // Check is day exists in result
        // Add data

        stateForecasts.forEach(stateForecast => {
            if (!stateForecast.loading) {
                stateForecast.forecast.weatherPoints.forEach((weatherTime) => {
                    
                    // Sometimes the date is a string because the reducer is bad.
                    let date: Date;
                    if (typeof weatherTime.time === 'string')
                        date = new Date(weatherTime.time);
                    else
                        date = weatherTime.time;

                    const dayOffset = getDayOffset(date);

                    if (dayOffset >= 0) {
                        // Create new table if needed
                        if (dayOffset >= result.length) {
                            result.push({
                                columns: new Map(),
                                providers: providers,
                            })
                        }

                        const tableData = result[dayOffset];

                        const time = date.getTime();

                        // Create new column if needed
                        if (!tableData.columns.has(time)) {
                            tableData.columns.set(time, {
                                date: date,
                                weatherMap: new Map(),
                            })
                        }

                        tableData.columns.get(time)?.weatherMap.set(stateForecast.weatherProvider, weatherTime.weather);
                    }
                });
            }
        });

        return result;
    }

    /**
     * Returns the number of time points there should be for a given day.
     * @param dayOffset 
     */
    private getTimePointCount(dayOffset: number): number {
        return 24;
    }

    public render() {
        let tableData = this.getTableData();

        return (
            <div>
                {tableData.map((data, index) =>
                    <WeatherTable key={index} tableData={data} />
                )}
            </div>
        );
    }
}
