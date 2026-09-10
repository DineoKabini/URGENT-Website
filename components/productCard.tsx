import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  colours: string[];
  sizes: string[];
  images: string[];
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`}>
        <div className="product-image">
          <img
            src={product.images[0]}
            alt={product.name}
          />
        </div>
      </Link>

      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>

        <strong>R{product.price}</strong>
      </div>

      <Link
  href={`/product/${product.id}`}
  className="view-product"
>
  VIEW PRODUCT →
</Link>
    </div>
  );
}