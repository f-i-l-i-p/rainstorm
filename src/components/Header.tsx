import React from "react";
import Title from "antd/lib/typography/Title";

interface IHeaderProps {
    title: string,
    items?: JSX.Element[],
}

interface IHeaderState {

}

export default class Header extends React.Component<IHeaderProps, IHeaderState>{
    render() {
        return (
            <div className="header" style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "5px 15px", boxShadow: "0 4px 15px 0 rgba(0, 0, 0, 0.12)" }}>
                <Title style={{ margin: 0 }}>{this.props.title}</Title>

                {this.props.items &&
                    <div style={{ paddingLeft: "20px", display: "flex", flexDirection: "row", alignItems: "center"}}>
                        {this.props.items.map((item, index) => (
                            <React.Fragment key={index}>
                                {item}
                            </React.Fragment>
                        ))}
                    </div>
                }
            </div>
        )
    }
}