import React from "react";
import './style.css';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Typography } from "antd";

const { Title } = Typography;

interface IHeaderProps {
    backButton?: () => void,
    backButtonName?: string;
    title: string;
}

export default class Header extends React.Component<IHeaderProps>{
    render() {
        return (
            <div className="header-container">
                <div className="header-grid">
                    <Title className="header-title" level={5}>
                        {this.props.title}
                    </Title>
                    {this.props.backButton &&
                        <Button
                            className="header-back-button"
                            onClick={() => this.props.backButton ? this.props.backButton() : {}}
                            size="large"
                            ghost
                        >
                            {this.props.backButtonName}
                        </Button>
                    }
                </div>
                <Divider className="header-divider" />
            </div>
        );
    }
}
