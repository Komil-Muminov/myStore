import { Badge, Button, Card, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import type { IProductCardProps } from "./model";
import "./style.css";

const { Title, Text } = Typography;

export function ProductCard(props: IProductCardProps) {
  const { title, subtitle, price, badge, imageUrl } = props;

  return (
    <Card
      className="product-card"
      hoverable
      cover={<img className="product-card__image" src={imageUrl} alt={title} />}
    >
      <div className="product-card__header">
        <Title level={5} className="product-card__title">
          {title}
        </Title>
        <Text className="product-card__subtitle">{subtitle}</Text>
      </div>
      <div className="product-card__footer">
        <Text className="product-card__price">{price}</Text>
        {badge ? (
          <Badge
            color={badge.status === "success" ? "green" : "orange"}
            text={badge.text}
            className="product-card__badge"
          />
        ) : null}
      </div>
      <div className="product-card__actions">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          className="product-card__add"
        />
      </div>
    </Card>
  );
}
