import { Typography } from "antd";
import './style.css';
import { SunTimes } from "../../../weather/sunrise";
import { AppState } from "../../../store";
import { connect } from "react-redux";

const { Text } = Typography;

interface Props {
    sunTimes: SunTimes,
}

const SunTimesText = (props: Props) => (
    <div className="sun-times-container">
        <div className="sun-times-column">
            <img className="sun-times-icon" alt="Sunrise" src={require("../../../icons3/" + "clear_sky_day" + ".svg").default} />
            <Text type="secondary">{formatTime(props.sunTimes.sunrise)}</Text>
        </div>
        <div className="sun-times-column">
            <img className="sun-times-icon" alt="Sunrise" src={require("../../../icons3/" + "clear_sky_day" + ".svg").default} />
            <Text type="secondary">{formatTime(props.sunTimes.sunset)}</Text>
        </div>
    </div >
);

function formatTime(time: Date): string {
    return time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0');
}

function mapStateToProps(state: AppState) {
    return {
        sunTimes: state.forecasts.forecast.sunTimes,
    }
}

export default connect(mapStateToProps)(SunTimesText);