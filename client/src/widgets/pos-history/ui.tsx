import { Button, DatePicker, Input, List, Space, Tag, Typography } from "antd";
import {
  ClockCircleOutlined,
  DownloadOutlined,
  FilterOutlined,
  PrinterOutlined,
  ReloadOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import { historyMock } from "./model";
import "./style.css";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface IProps {
  onNavigate?: (view: "pos" | "history") => void;
}

export function PosHistory({ onNavigate }: IProps) {
  return (
    <section className="pos-history">
      <header className="pos-history__header">
        <div className="pos-history__title-wrap">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => onNavigate?.("pos")}
            className="pos-history__back"
          />
          <Title level={3} className="pos-history__title">
            История продаж
          </Title>
        </div>
        <div className="pos-history__filters">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Найти чек или кассира"
            allowClear
          />
          <RangePicker />
          <Button icon={<FilterOutlined />}>Фильтры</Button>
          <Button icon={<ReloadOutlined />} />
        </div>
      </header>

      <div className="pos-history__body">
        <List
          className="pos-history__list"
          dataSource={historyMock}
          renderItem={(order) => (
            <List.Item>
              <div className="pos-history__meta">
                <Space direction="vertical" size={2}>
                  <Text strong>{order.id}</Text>
                  <Text type="secondary">
                    <ClockCircleOutlined /> {order.time}
                  </Text>
                </Space>
                <Space direction="vertical" size={2}>
                  <Text strong>{order.total}</Text>
                  <Text type="secondary">{order.items}</Text>
                </Space>
                <Space direction="vertical" size={2}>
                  <Text>Кассир: {order.cashier}</Text>
                  <Tag color="blue">{order.method.toUpperCase()}</Tag>
                </Space>
                <Space className="pos-history__action">
                  <span
                    className={`pos-history__status pos-history__status--${order.status}`}
                  >
                    {order.status}
                  </span>
                  <Button icon={<PrinterOutlined />} />
                  <Button icon={<DownloadOutlined />} />
                </Space>
              </div>
            </List.Item>
          )}
        />
      </div>
    </section>
  );
}
