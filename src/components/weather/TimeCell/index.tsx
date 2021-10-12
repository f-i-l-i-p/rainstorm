import React from "react";
import { Typography } from "antd";

import './style.css';

const { Text } = Typography;

interface Props {
    time: Date
}

const TimeCell = (props: Props) => (
    <div className="time_cell">
        <Text strong>{('0' + props.time.getHours()).slice(-2)}</Text>
    </div>
);

export default TimeCell;