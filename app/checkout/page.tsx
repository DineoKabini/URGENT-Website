"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const {
    cart,
    cartCount,
    cartTotal,
    loaded,
    clearCart,
  } = useCart();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  // Wait for cart to load from localStorage
  if (!loaded) {
    return (
      <main className="checkout-page">
        <section className="checkout-content">
          <h1>LOADING CHECKOUT...</h1>
        </section>
      </main>
    );
  }

  // =========================
  // SUBMIT ORDER
  // =========================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const orderData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      city: formData.get("city"),
      province: formData.get("province"),
      postal: formData.get("postal"),
      cart,
      cartCount,
      cartTotal,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong."
        );
      }

      // Save order number
      setOrderNumber(data.orderNumber);

      // Clear cart after successful order
      clearCart();

      // Show confirmation
      setSubmitted(true);

    } catch (error) {
      console.error(
        "Order submission error:",
        error
      );

      setError(
        "We couldn't place your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0 && !submitted) {
    return (
      <main className="checkout-page">

        <div className="checkout-header">

          <Link href="/">
            ← BACK TO SHOP
          </Link>

          <span>
            URGENT®
          </span>

          <span>
            CART 0
          </span>

        </div>

        <section className="checkout-content">

          <p className="eyebrow">
            URGENT / CHECKOUT
          </p>

          <h1>
            YOUR CART IS EMPTY
          </h1>

          <p>
            Add something to your cart before checking out.
          </p>

          <Link
            href="/"
            className="checkout-back"
          >
            SHOP THE COLLECTION →
          </Link>

        </section>

      </main>
    );
  }

  // =========================
  // SUCCESSFUL ORDER
  // =========================

  if (submitted) {
    return (
      <main className="checkout-page">

        <div className="checkout-header">

          <Link href="/">
            URGENT®
          </Link>

          <span>
            ORDER CONFIRMATION
          </span>

          <span>
            ✓
          </span>

        </div>

        <section className="order-success">

          <p className="eyebrow">
            URGENT / ORDER RECEIVED
          </p>

          <h1>
            THANK YOU.
          </h1>

          <h2>
            Please use your Order Number as reference when paying
          </h2>

          <p>
            Your order has been received successfully.
          </p>

          {/* ORDER NUMBER */}

          <p>
            Your order number is:
          </p>

          <h2 className="order-number">
            {orderNumber}
          </h2>

         <p>
  We have also sent your order confirmation
  to your email address.
</p>

<div className="whatsapp-order-box">
  <p className="whatsapp-title">
    NEED HELP WITH YOUR ORDER?
  </p>

  <p className="whatsapp-message">
    After placing your order, send us a WhatsApp
    message for any questions or order updates.
  </p>

  <a
    href={`https://wa.me/27664332445?text=${encodeURIComponent(
      `Hi URGENT®, I have just placed order #${orderNumber}. I'd like to enquire about my order.`
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="whatsapp-order-button"
  >
    WHATSAPP US →
  </a>
</div>

<p>
  Please keep your order number for future
  reference.
</p>

          <Link
            href="/"
            className="checkout-back"
          >
            BACK TO SHOP →
          </Link>

        </section>

      </main>
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================

  return (
    <main className="checkout-page">

      {/* HEADER */}

      <div className="checkout-header">

        <Link href="/cart">
          ← BACK TO CART
        </Link>

        <span>
          URGENT®
        </span>

        <span>
          CART {cartCount}
        </span>

      </div>


      {/* CHECKOUT CONTENT */}

      <section className="checkout-content">

        <div className="checkout-title">

          <p className="eyebrow">
            URGENT / CHECKOUT
          </p>

          <h1>
            CHECKOUT
          </h1>

        </div>


        <div className="checkout-layout">


          {/* =========================
              CUSTOMER DETAILS
          ========================= */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            {/* CONTACT INFORMATION */}

            <div className="form-section">

              <h2>
                CONTACT INFORMATION
              </h2>

              <div className="form-field">

                <label htmlFor="name">
                  FULL NAME
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                />

              </div>


              <div className="form-field">

                <label htmlFor="email">
                  EMAIL ADDRESS
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />

              </div>


              <div className="form-field">

                <label htmlFor="phone">
                  PHONE NUMBER
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  required
                />

              </div>

            </div>


            {/* DELIVERY ADDRESS */}

            <div className="form-section">

              <h2>
                DELIVERY ADDRESS
              </h2>


              <div className="form-field">

                <label htmlFor="address">
                  STREET ADDRESS
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Street address"
                  required
                />

              </div>


              <div className="form-row">

                <div className="form-field">

                  <label htmlFor="city">
                    CITY
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                  />

                </div>


                <div className="form-field">

                  <label htmlFor="province">
                    PROVINCE
                  </label>

                  <select
                    id="province"
                    name="province"
                    defaultValue=""
                    required
                  >

                    <option
                      value=""
                      disabled
                    >
                      Select province
                    </option>

                    <option value="Gauteng">
                      Gauteng
                    </option>

                    <option value="Western Cape">
                      Western Cape
                    </option>

                    <option value="KwaZulu-Natal">
                      KwaZulu-Natal
                    </option>

                    <option value="Eastern Cape">
                      Eastern Cape
                    </option>

                    <option value="Free State">
                      Free State
                    </option>

                    <option value="Limpopo">
                      Limpopo
                    </option>

                    <option value="Mpumalanga">
                      Mpumalanga
                    </option>

                    <option value="Northern Cape">
                      Northern Cape
                    </option>

                    <option value="North West">
                      North West
                    </option>

                  </select>

                </div>

              </div>


              <div className="form-field">

                <label htmlFor="postal">
                  POSTAL CODE
                </label>

                <input
                  id="postal"
                  name="postal"
                  type="text"
                  placeholder="Postal code"
                  required
                />

              </div>

            </div>


            {/* ERROR MESSAGE */}

            {error && (
              <p className="checkout-error">
                {error}
              </p>
            )}


            {/* PLACE ORDER */}

            <button
              type="submit"
              className="place-order-button"
              disabled={loading}
            >

              {loading
                ? "PLACING ORDER..."
                : "PLACE ORDER"}

              <span>
                →
              </span>

            </button>

          </form>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <aside className="checkout-summary">

            <p>
              ORDER SUMMARY
            </p>


            {/* PRODUCTS */}

            {cart.map((item) => (

              <div
                className="checkout-item"
                key={`${item.id}-${item.colour}-${item.size}`}
              >

                {/* PRODUCT IMAGE */}

                <div className="checkout-item-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="checkout-item-info">

                  <strong>
                    {item.name}
                  </strong>

                  <small>
                    {item.colour} / {item.size}
                  </small>

                  <small>
                    Quantity: {item.quantity}
                  </small>

                </div>


                {/* PRICE */}

                <strong className="checkout-item-price">
                  R{item.price * item.quantity}
                </strong>

              </div>

            ))}


            {/* TOTAL */}

            <div className="checkout-total">

              <span>
                TOTAL ({cartCount} ITEMS)
              </span>

              <strong>
                R{cartTotal}
              </strong>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}