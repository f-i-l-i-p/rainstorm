import React from "react";

import './style.css';

interface Props {
    children: React.ReactNode
}

const Paper = (props: Props) => (
    <div className="paper">
        {props.children}
    </div>
);

export default Paper;