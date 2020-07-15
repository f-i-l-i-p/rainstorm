import React from "react";
import { Button } from "antd";
import { ButtonType } from "antd/lib/button";
import { BaseButtonProps, ButtonShape } from "antd/lib/button/button";

import './style.css';

export interface IToggleButtonOption {
    title: string,
    onClick?: () => void,
    disabled?: boolean,
    icon?: React.ReactNode,
}

interface IToggleButtonProps {
    className?: string,
    type?: ButtonType,
    shape?: ButtonShape,
    options: IToggleButtonOption[],
}

interface IToggleButtonState {
    currentId: number
}

class ToggleButton extends React.Component<IToggleButtonProps, IToggleButtonState> {
    constructor(props: Readonly<IToggleButtonProps>) {
        super(props);

        this.state = {
            currentId: 0
        };
    }

    private clickHandler(onClick: (() => void) | undefined) {
        if (onClick) {
            onClick();
        }

        this.setState({
            ...this.state,
            currentId: this.state.currentId + 1 < this.props.options.length ? this.state.currentId + 1 : 0
        });
    }

    render() {
        const buttonOption = this.props.options[this.state.currentId];

        return <Button
            className={this.props.className}
            type={this.props.type}
            shape={this.props.shape}
            onClick={() => this.clickHandler(buttonOption.onClick)}
            disabled={buttonOption.disabled}
            icon={buttonOption.icon}
        >
            {buttonOption.title}
        </Button>
    }
}

export default ToggleButton;