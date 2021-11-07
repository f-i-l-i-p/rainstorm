import React from "react";
import { Typography } from "antd";

import './style.css';

const { Text } = Typography;

interface Props {
    time: string
}

const TimeCell = (props: Props) => (
    <div className="time_cell">
        <Text strong>{props.time}</Text>
    </div>
);

export default TimeCell;