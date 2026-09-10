"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === params.id
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <main className="product-page">
        <h1>Product not found</h1>

        <Link href="/">
          ← BACK TO SHOP
        </Link>
      </main>
    );
  }

  // After the check above, TypeScript knows the product exists.
  const currentProduct = product;

  function handleAddToCart() {
    // Check that a size has been selected
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    // Check that a colour has been selected
    if (!selectedColour) {
      alert("Please select a colour.");
      return;
    }

    // Add product to cart
    addToCart({
      id: `${currentProduct.id}-${selectedSize}-${selectedColour}`,
      name: currentProduct.name,
      price: currentProduct.price,
      size: selectedSize,
      colour: selectedColour,
      quantity,
      image: currentProduct.images[0],
    });

    // Show confirmation
    setAddedToCart(true);

    // Move customer to cart after a short delay
    setTimeout(() => {
      router.push("/cart");
    }, 1200);
  }

  return (
    <main className="product-page">

      {/* =========================
          NAVIGATION
      ========================== */}

      <nav className="navbar">

        <Link href="/" className="logo">
          URGENT<span>®</span>
        </Link>

        <Link href="/cart" className="cart-button">
          Cart →
        </Link>

      </nav>


      {/* =========================
          PRODUCT SECTION
      ========================== */}

      <section className="product-detail">


        {/* =========================
            LEFT - PRODUCT IMAGES
        ========================== */}

        <div className="product-gallery">

          {/* MAIN PRODUCT IMAGE */}

          <div className="main-product-image">

            <img
              src={currentProduct.images[selectedImage]}
              alt={currentProduct.name}
            />

          </div>


          {/* PRODUCT THUMBNAILS */}

          <div className="product-thumbnails">

            {currentProduct.images.map((image, index) => (

              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={
                  selectedImage === index
                    ? "thumbnail active"
                    : "thumbnail"
                }
              >

                <img
                  src={image}
                  alt={`${currentProduct.name} ${index + 1}`}
                />

              </button>

            ))}

          </div>

        </div>


        {/* =========================
            RIGHT - PRODUCT DETAILS
        ========================== */}

        <div className="product-details">


          {/* COLLECTION LABEL */}

          <p className="eyebrow">
            URGENT COLLECTION
          </p>


          {/* PRODUCT NAME */}

          <h1>
            {currentProduct.name}
          </h1>


          {/* PRICE */}

          <h2>
            R{currentProduct.price}
          </h2>


          {/* DESCRIPTION */}

          <p className="product-description">
            {currentProduct.description}
          </p>


          {/* =========================
              COLOUR
          ========================== */}

          <div className="product-option">

            <label>
              COLOUR
            </label>

            <div className="option-buttons">

              {currentProduct.colours.map((colour) => (

                <button
                  key={colour}
                  type="button"
                  onClick={() =>
                    setSelectedColour(colour)
                  }
                  className={
                    selectedColour === colour
                      ? "option-button selected"
                      : "option-button"
                  }
                >
                  {colour}
                </button>

              ))}

            </div>

          </div>


          {/* =========================
              SIZE
          ========================== */}

          <div className="product-option">

            <label>
              SIZE
            </label>

            <div className="option-buttons">

              {currentProduct.sizes.map((size) => (

                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setSelectedSize(size)
                  }
                  className={
                    selectedSize === size
                      ? "option-button selected"
                      : "option-button"
                  }
                >
                  {size}
                </button>

              ))}

            </div>

          </div>


          {/* =========================
              QUANTITY
          ========================== */}

          <div className="product-option">

            <label>
              QUANTITY
            </label>

            <div className="quantity-selector">

              <button
                type="button"
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
              >
                −
              </button>

              <span>
                {quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>

            </div>

          </div>


          {/* =========================
              ADD TO CART
          ========================== */}

          <button
            type="button"
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={addedToCart}
          >

            {addedToCart
              ? "ITEM ADDED TO CART ✓"
              : `ADD TO CART — R${currentProduct.price * quantity}`}

          </button>


          {/* =========================
              CONTINUE SHOPPING
          ========================== */}

          <Link
            href="/"
            className="back-to-shop"
          >
            ← CONTINUE SHOPPING
          </Link>

        </div>

      </section>

    </main>
  );
}