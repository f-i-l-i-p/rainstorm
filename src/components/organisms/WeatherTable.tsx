import React, { Fragment } from "react";
import CSS from 'csstype';
import { connect } from "react-redux";
import { AppState } from "../../store";
import { Spin, Typography, Divider } from "antd";
import { findByLabelText } from "@testing-library/react";
import { IForecast, IWeatherProvider, IWeather } from "../../store/types";

const { Text } = Typography;

const _gridStyle: CSS.Properties = {
    display: 'grid',
    padding: '10px',
    gridRowGap: "20px",
    gridAutoColumns: '15ch',
    gridTemplateColumns: '25ch',
    overflowX: 'auto',
}

const _rowStyle: CSS.Properties = {
    boxShadow: "0 1px 8px 0 rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    backgroundColor: "#FFF",
}

const _cellStyle: CSS.Properties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: '1ch',
    marginBottom: '1ch',
    flexDirection: "row",
}

const _weatherProviderCellStyle: CSS.Properties = {
    ..._cellStyle,
    margin: '1ch',
}

const _innerCellStyle: CSS.Properties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    whiteSpace: "nowrap",
}

const _weatherIconStyle: CSS.Properties = {
    filter: "drop-shadow(0 3px 5px rgba(0, 0, 0, 0.19))",
}

const _logoStyle: CSS.Properties = {
    maxWidth: '100%',
    maxHeight: '100%',
}

interface IWeatherTableProps {
    targetTimes: Date[],
    forecasts: IForecast[],
    isLoading: boolean[]
}

interface IWeatherTableState {
}

class WeatherTable extends React.Component<IWeatherTableProps, IWeatherTableState> {
    public render() {
        return (
            <div style={_gridStyle}>
                {createCells(this.props.targetTimes, this.props.forecasts, this.props.isLoading)}
            </div>
        );
    }
}

function createCells(targetTimes: Date[], forecasts: IForecast[], isLoading: boolean[]): JSX.Element[] {
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
            if (isLoading[f]) {
                cells.push(<Spin style={{ gridRow: f + 2, gridColumn: t + 2 }} />);
            }
            else {
                const forecast = forecasts[f];

                for (let p = 0; p < forecast.times.length; p++) {
                    const timePoint = forecast.times[p];

                    if (targetTime.getTime() === timePoint.time.getTime()) {
                        cells.push(createWeatherCell(timePoint.weather, f + 2, t + 2))
                    }
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
            <img style={_logoStyle} src={weatherProvider.logo} alt={weatherProvider.name} />
        </div>
    );
}

function createTimeCell(time: Date, gridRow: number, gridColumn: number): JSX.Element {
    return (
        <div
            style={{
                ..._cellStyle,
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
        <div style={{ ..._cellStyle, gridRow: gridRow, gridColumn: gridColumn }}>

            <Divider style={{ height: '100%', margin: '3px', backgroundColor: '#DDD' }} dashed={false} type="vertical" />

            <div style={{ ..._innerCellStyle }}>
                <Text strong>{weather.temperature} °C</Text>
                <div>
                    <Text strong>{weather.wind}</Text>
                    <Text type="secondary"> ({weather.gust}) </Text>
                    <Text strong>m/s</Text>
                </div>
                <Text strong>{weather.symbol}</Text>
                <img style={_weatherIconStyle} src={require("../../icons/weather symbols/4.svg")} />
            </div >
        </div>
    );
}

function mapStateToProps(state: AppState) {
    return {
        selectedLocation: state.locationSearch.selectedLocation,
        forecasts: state.forecasts.forecasts,
        isLoading: state.forecasts.isLoading,
    }
}

export default connect(mapStateToProps)(WeatherTable);