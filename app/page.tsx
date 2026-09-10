import Link from "next/link";
import ProductCard from "@/components/productCard";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main>
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="logo">
          URGENT<span>®</span>
        </div>

        <div className="nav-links">
          <a href="#shop">Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <Link href="/cart" className="cart-button">
          Cart <span>→</span>
        </Link>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">NEW COLLECTION — 2026</p>

          <h1>
            WEAR
            <br />
            <span>URGENT.</span>
          </h1>

          <p className="hero-text">
            Premium everyday essentials designed for people
            who refuse to blend in.
          </p>

          <a href="#shop" className="shop-button">
            SHOP THE COLLECTION
            <span>→</span>
          </a>
        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>
          <div className="hero-label">URGENT / 2020</div>
        </div>
      </section>

      <section className="new-collection">
  <div className="section-heading">
    <div>
      <p className="eyebrow">NEW DROP</p>
      <h2>NEW ED COLLECTION</h2>
    </div>

    <p>04 IMAGES</p>
  </div>

  <div className="new-collection-grid">
    <div className="new-collection-image">
      <img
        src="/products/newEdBB.jpeg"
        alt="New Ed Black Back"
      />
    </div>

    <div className="new-collection-image">
      <img
        src="/products/newEdBF.jpeg"
        alt="New Ed Black Front"
      />
    </div>

    <div className="new-collection-image">
      <img
        src="/products/newEdWB.jpeg"
        alt="New Ed White Back"
      />
    </div>

    <div className="new-collection-image">
      <img
        src="/products/newEdWF.jpeg"
        alt="New Ed White Front"
      />
    </div>
  </div>
</section>

      {/* BRAND STATEMENT */}
      <section className="statement" id="about">
        <p>THE BRAND</p>

        <h2>
          SIMPLE.
          <br />
          <span>CONFIDENT.</span>
          <br />
          URGENT.
        </h2>

        <div className="statement-text">
          <p>
            URGENT is a local clothing brand focused on creating
            timeless T-shirts with a modern edge.
          </p>

          <p>
            No unnecessary noise. Just quality pieces designed
            to become part of your everyday uniform.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="collection" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SHOP</p>
            <h2>THE COLLECTION</h2>
          </div>

          <p>03 PRODUCTS</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <p className="eyebrow">YOUR EVERYDAY UNIFORM</p>

        <h2>
          MAKE IT
          <br />
          <span>URGENT.</span>
        </h2>

        <a href="#shop" className="shop-button light">
          SHOP T-SHIRTS
          <span>→</span>
        </a>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-logo">URGENT®</div>

<div className="footer-links">
  <a href="#">Instagram</a>
  <a href="#">TikTok</a>

  <a
    href="https://wa.me/27664332445?text=Hi%20URGENT%2C%20I%27d%20like%20to%20enquire%20about%20your%20T-shirts."
    target="_blank"
    rel="noopener noreferrer"
  >
    WhatsApp Me
  </a>
</div>

        <p>© 2026 URGENT. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}