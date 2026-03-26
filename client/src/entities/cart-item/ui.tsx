import { Button, Space, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import type { ICartItemProps } from "./model";
import "./style.css";

const { Text } = Typography;

export function CartItem(props: ICartItemProps) {
  const { title, details, price, quantity, imageUrl } = props;

  return (
    <div className="cart-item">
      <div className="cart-item__preview">
        <img className="cart-item__image" src={imageUrl} alt={title} />
        <div className="cart-item__info">
          <Text className="cart-item__title">{title}</Text>
          <Text className="cart-item__details">{details}</Text>
        </div>
      </div>
      <div className="cart-item__controls">
        <Text className="cart-item__price">{price}</Text>
        <Space size={8}>
          <Button
            size="small"
            type="text"
            shape="circle"
            icon={<MinusOutlined />}
            className="cart-item__control-btn"
          />
          <Text className="cart-item__qty">{quantity}</Text>
          <Button
            size="small"
            type="text"
            shape="circle"
            icon={<PlusOutlined />}
            className="cart-item__control-btn"
          />
        </Space>
      </div>
    </div>
  );
}
