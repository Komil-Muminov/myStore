import { Badge, Button, Divider, Input, Layout, Space, Tabs, Typography } from "antd";
import {
  BellOutlined,
  HistoryOutlined,
  HomeOutlined,
  PrinterOutlined,
  ShoppingCartOutlined,
  TagOutlined,
} from "@ant-design/icons";

import { CartItem } from "@/entities/cart-item";
import { ProductCard } from "@/entities/product-card";
import type { IPosCashierProps } from "./model";
import { posMockState } from "./model";
import "./style.css";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export function PosCashier({ onNavigate }: IPosCashierProps) {
  const state = posMockState;

  return (
    <Layout className="pos">
      <Header className="pos__header">
        <div className="pos__brand">
          <ShoppingCartOutlined className="pos__brand-icon" />
          <Title level={4} className="pos__brand-name">
            Phenomen
          </Title>
        </div>
        <Space size={18} className="pos__nav" wrap={false}>
          <button
            type="button"
            className="pos__nav-link pos__nav-link--active"
            onClick={(event) => {
              event.preventDefault();
              onNavigate?.("pos");
            }}
          >
            <HomeOutlined /> Продажи
          </button>
          <button
            type="button"
            className="pos__nav-link pos__nav-link--muted"
            onClick={(event) => {
              event.preventDefault();
              onNavigate?.("history");
            }}
          >
            <HistoryOutlined /> История
          </button>
        </Space>
        <div className="pos__actions">
          <Input.Search
            placeholder="Найти товар (F1)…"
            allowClear
            className="pos__search"
            size="large"
          />
          <Space size={12}>
            <Badge dot offset={[-2, 2]}>
              <Button shape="circle" icon={<BellOutlined />} />
            </Badge>
            <Button shape="circle" icon={<TagOutlined />} />
            <Button shape="circle" icon={<ShoppingCartOutlined />} />
          </Space>
        </div>
      </Header>

      <Layout className="pos__body">
        <Content className="pos__products">
          <Tabs
            defaultActiveKey="all"
            items={state.categories.map((category) => ({
              key: category.key,
              label: category.label,
            }))}
            className="pos__tabs"
          />
          <div className="pos__grid">
            {state.products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </Content>

        <Sider width={360} className="pos__cart">
          <div className="pos__cart-header">
            <Title level={4} className="pos__cart-title">
              Корзина
            </Title>
            <Button type="link" danger>
              Очистить
            </Button>
          </div>

          <Space direction="vertical" size={12} className="pos__cart-list">
            {state.cartItems.map((item) => (
              <CartItem key={item.title} {...item} />
            ))}
          </Space>

          <Divider />

          <div className="pos__summary">
            <div className="pos__summary-row">
              <Text>Итого товаров</Text>
              <Text strong>$10.89</Text>
            </div>
            <div className="pos__summary-row">
              <Text>Налог (8%)</Text>
              <Text strong>$0.87</Text>
            </div>
            <div className="pos__summary-total">
              <Text>Итого</Text>
              <Title level={3} className="pos__summary-amount">
                $11.76
              </Title>
            </div>
            <Space size="middle">
              <Button icon={<PrinterOutlined />} ghost>
                Чек
              </Button>
              <Button icon={<TagOutlined />} ghost>
                Промо
              </Button>
            </Space>
            <Button
              type="primary"
              size="large"
              block
              icon={<ShoppingCartOutlined />}
            >
              Оплатить
            </Button>
          </div>
        </Sider>
      </Layout>

      <footer className="pos__footer">
        <Space size={12}>
          <span className="pos__shortcut">F1: Поиск</span>
          <span className="pos__shortcut">F2: Кол-во</span>
          <span className="pos__shortcut">F12: Оплата</span>
          <span className="pos__shortcut">ESC: Отмена</span>
        </Space>
        <Text className="pos__footer-meta">Precision POS v4.2.1 | TX-842</Text>
      </footer>
    </Layout>
  );
}
