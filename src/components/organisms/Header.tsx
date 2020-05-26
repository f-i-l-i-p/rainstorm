import React from "react";
import logo from '../../icons/temp.png';

interface IHeaderProps {
    items?: JSX.Element[],
}

interface IHeaderState {

}

export default class Header extends React.Component<IHeaderProps, IHeaderState>{
    render() {
        return (
            <div className="header" style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "5px 15px"}}>
                
                <img src={logo} height='60ch'/>
                
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