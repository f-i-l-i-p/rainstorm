import React from "react";
import CSS from 'csstype'

import './style.css';

interface Props {
    style?: CSS.Properties,
    children: React.ReactNode
}

const Paper = (props: Props) => (
    <div className="paper" style={props.style}>
        {props.children}
    </div>
);

export default Paper;