import React, { Fragment } from "react";
import CSS from 'csstype';
import { IForecast, ITimePoint, IWeather, IWeatherProvider } from "../../store/weather/types";
import { ReactComponent as TestSvg } from "../../icons/1.svg";

const _gridStyle: CSS.Properties = {
    display: 'grid',
    padding: '10px',
    gridRowGap: "20px",
}

const _rowStyle: CSS.Properties = {
    boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    backgroundColor: "#FFF",
}

const _cellStyle: CSS.Properties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const _weatherProviderCellStyle: CSS.Properties = {
    ..._cellStyle,
    paddingLeft: "20px",
    paddingRight: "20px",
}

const _timeCellStyle: CSS.Properties = {
    ..._cellStyle,
}

const _weatherCellStyle: CSS.Properties = {
    ..._cellStyle,
    flexDirection: "column",
    padding: "1ch 5ch",
    whiteSpace: "nowrap",
}

const _weatherIconStyle: CSS.Properties = {
    filter: "drop-shadow(0 3px 5px rgba(0, 0, 0, 0.19))",
}


export default function createTable(targetTimes: Date[], forecasts: IForecast[]): JSX.Element {
    return (
        <div style={_gridStyle}>
            {createCells(targetTimes, forecasts)}
        </div>
    );
}

function createCells(targetTimes: Date[], forecasts: IForecast[]): JSX.Element[] {
    let cells: JSX.Element[] = []

    // Crete row backgrounds
    for (let i = 0; i < forecasts.length + 1; i++) {
        cells.push(
            <div
                style={{
                    ..._rowStyle,
                    gridRow: i + 1,
                    gridColumnStart: i === 0 ? 2 : 1,
                    gridColumnEnd: targetTimes.length + 2
                }}
            >
            </div>)
    }

    // Create weather provider cells
    for (let i = 0; i < forecasts.length; i++) {
        cells.push(createWeatherProviderCell(forecasts[i].weatherProvider, i + 2, 1))
    }

    // Create time and weather cells
    for (let t = 0; t < targetTimes.length; t++) {
        const targetTime = targetTimes[t];

        cells.push(createTimeCell(targetTime, 1, t + 2));

        for (let f = 0; f < forecasts.length; f++) {
            const forecast = forecasts[f];

            for (let p = 0; p < forecast.times.length; p++) {
                const timePoint = forecast.times[p];

                if (targetTime.getTime() === timePoint.time.getTime()) {
                    cells.push(createWeatherCell(timePoint.weather, f + 2, t + 2))
                }
            }
        }
    }
    return cells;
}

function createWeatherProviderCell(weatherProvider: IWeatherProvider, gridRow: number, gridColumn: number): JSX.Element {
    return (
        <div
            style={{
                ..._weatherProviderCellStyle,
                gridRow: gridRow,
                gridColumn: gridColumn,
            }}
        >
            {weatherProvider.name}
        </div>
    );
}

function createTimeCell(time: Date, gridRow: number, gridColumn: number): JSX.Element {
    return (
        <div
            style={{
                ..._timeCellStyle,
                gridRow: gridRow,
                gridColumn: gridColumn,
            }}
        >
            {time.getHours()}
        </div>
    );
}

function createWeatherCell(weather: IWeather, gridRow: number, gridColumn: number): JSX.Element {
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
            <img style={_weatherIconStyle} src={require("../../icons/4.svg")}/>
        </div >
    );
}