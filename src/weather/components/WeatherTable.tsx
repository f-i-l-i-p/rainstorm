import React, { Fragment } from "react";
import CSS from 'csstype';
import { IForecast, ITimePoint, IWeather } from "../../store/weather/types";


const _gridStyle: CSS.Properties = {
    display: 'grid',
    backgroundColor: '#2196F3',
    gridRowGap: '5px',
    gridColumnGap: '5px',
    padding: '10px',
    height: '800px',
    width: '800px',
}

const _cellStyle: CSS.Properties = {
    backgroundColor: "orange",
    width: '100%',
    height: '100%',
}

const _weatherCellStyle: CSS.Properties = {
    ..._cellStyle,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid gray",
    padding: "1ch 5ch",
    whiteSpace: "nowrap"
}

export default function createTable(targetTimes: Date[], forecasts: IForecast[]): JSX.Element {
    const width = targetTimes.length;

    return (
        <div
            style={{
                ..._gridStyle,
                gridTemplateColumns: 'repeat(' + width + ', 150px)',
            }}
        >
            <div style={{ ..._cellStyle, gridRow: 2, gridColumn: 4 }}>TEST</div>
            {createCells(targetTimes, forecasts)}
        </div>
    );
}

function createCells(targetTimes: Date[], forecasts: IForecast[]): JSX.Element[] {
    let cells: JSX.Element[] = []

    for (let t = 0; t < targetTimes.length; t++) {
        const targetTime = targetTimes[t];

        for (let f = 0; f < forecasts.length; f++) {
            const forecast = forecasts[f];

            for (let p = 0; p < forecast.times.length; p++) {
                const timePoint = forecast.times[p];

                if (targetTime.getTime() === timePoint.time.getTime()) {
                    cells.push(createCell(timePoint.weather, t, f))
                }
            }
        }
    }
    return cells;
}

function createCell(weather: IWeather, gridRow: number, gridColumn: number): JSX.Element {
    return (
        <div
            style={{
                ..._weatherCellStyle,
                gridRow: gridRow,
                gridColumn: gridColumn
            }}
        >
            <p>{weather.temperature}°C</p>
            <p>{weather.wind} m/s</p>
            <p>{weather.symbol}</p>
        </div >
    );
}