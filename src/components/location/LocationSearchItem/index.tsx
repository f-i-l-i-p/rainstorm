import { Typography } from "antd";
import { ILocation } from "../../../store/types";
import './style.css';

const { Text } = Typography;

interface Props {
    location: ILocation,
    onSelect: (location: ILocation) => void,
}

const Item = (props: Props) => (
    <button className="location-list-item" onClick={() => props.onSelect(props.location)}>
        <Text strong>{props.location.name}</Text>
        <Text type="secondary">{props.location.country}</Text>
    </button>
);

export default Item;