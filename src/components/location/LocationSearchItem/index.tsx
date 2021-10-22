import { Typography } from "antd";
import { ILocation } from "../../../store/types";
import './style.css';

const { Text } = Typography;

interface Props {
    location: ILocation,
    onSelect: (location: ILocation) => void,
}

const Item = (props: Props) => (
    <a className="item" onClick={() => props.onSelect(props.location)}>
        <div className="container">
            <Text strong>{props.location.name}</Text>
            <Text type="secondary">{props.location.country}</Text>
        </div>
    </a>
);

export default Item;