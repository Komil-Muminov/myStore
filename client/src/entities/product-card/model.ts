export interface IProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  badge?: {
    text: string;
    status: "success" | "warning";
  };
  imageUrl: string;
}
