import type { ICartItemProps } from "@/entities/cart-item";
import type { IProductCardProps } from "@/entities/product-card";

export interface ICategory {
  key: string;
  label: string;
}

export interface IPosState {
  categories: ICategory[];
  products: IProductCardProps[];
  cartItems: ICartItemProps[];
}

export interface IPosCashierProps {
  onNavigate?: (view: "pos" | "history") => void;
}

export const posMockState: IPosState = {
  categories: [
    { key: "all", label: "Все товары" },
    { key: "fresh", label: "Свежие" },
    { key: "dairy", label: "Молочка" },
    { key: "bakery", label: "Выпечка" },
    { key: "beverages", label: "Напитки" },
    { key: "snacks", label: "Снеки" },
  ],
  products: [
    {
      title: "Organic Bananas",
      subtitle: "Per lb",
      price: "$0.89",
      badge: { text: "В наличии", status: "success" },
      imageUrl:
        "https://images.unsplash.com/photo-1574227493420-1ac96a0bf66b?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Whole Milk 1L",
      subtitle: "Bottle",
      price: "$3.50",
      badge: { text: "В наличии", status: "success" },
      imageUrl:
        "https://images.unsplash.com/photo-1582719478248-54e9f2ac1e28?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Artisan Sourdough",
      subtitle: "Unit",
      price: "$5.25",
      badge: { text: "Мало", status: "warning" },
      imageUrl:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Fuji Apples",
      subtitle: "Per lb",
      price: "$1.99",
      badge: { text: "В наличии", status: "success" },
      imageUrl:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Ripe Avocados",
      subtitle: "Unit",
      price: "$1.45",
      badge: { text: "В наличии", status: "success" },
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Dark Roast Beans",
      subtitle: "250g",
      price: "$8.90",
      badge: { text: "В наличии", status: "success" },
      imageUrl:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Vanilla Pint",
      subtitle: "Pint",
      price: "$4.75",
      badge: { text: "В наличии", status: "success" },
      imageUrl:
        "https://images.unsplash.com/photo-1589712186075-25304ce21250?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Greek Yogurt",
      subtitle: "500g",
      price: "$2.20",
      badge: { text: "В наличии", status: "success" },
      imageUrl:
        "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80",
    },
  ],
  cartItems: [
    {
      title: "Organic Bananas",
      details: "2.4 lb x $0.89",
      price: "$2.14",
      quantity: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1574227493420-1ac96a0bf66b?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Whole Milk 1L",
      details: "1 x $3.50",
      price: "$3.50",
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1582719478248-54e9f2ac1e28?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Artisan Sourdough",
      details: "1 x $5.25",
      price: "$5.25",
      quantity: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80",
    },
  ],
};
