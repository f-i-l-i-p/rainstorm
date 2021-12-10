import { Typography } from "antd";
import Icon from "@ant-design/icons";
import {ReactComponent as SunRise} from "../../../icons3/sunrise.svg";
import {ReactComponent as SunSet} from "../../../icons3/sunset.svg";
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
            <Icon className="sun-time-icon" component={SunRise}/>
            <Text type="secondary">{formatTime(props.sunTimes.sunrise)}</Text>
        </div>
        <div className="sun-times-column">
            <Icon className="sun-time-icon" component={SunSet}/>
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