"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    loaded,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
  } = useCart();

  if (!loaded) {
    return (
      <main className="cart-page">
        <div className="cart-header">
          <Link href="/">
            ← BACK TO SHOP
          </Link>

          <span>URGENT®</span>

          <span>CART</span>
        </div>

        <section className="cart-content">
          <h1>LOADING CART...</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">

      {/* HEADER */}

      <div className="cart-header">

        <Link href="/">
          ← BACK TO SHOP
        </Link>

        <span>URGENT®</span>

        <span>CART {cartCount}</span>

      </div>


      {/* CONTENT */}

      <section className="cart-content">

        <div className="cart-title">

          <p className="eyebrow">
            URGENT / YOUR SELECTION
          </p>

          <h1>YOUR CART</h1>

        </div>


        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="empty-cart">

            <h2>YOUR CART IS EMPTY</h2>

            <p>
              You haven't added anything yet.
            </p>

            <Link
              href="/"
              className="continue-shopping"
            >
              SHOP THE COLLECTION →
            </Link>

          </div>

        ) : (

          <div className="cart-layout">


            {/* =========================
                CART ITEMS
            ========================== */}

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={`${item.id}-${item.colour}-${item.size}`}
                >


                  {/* PRODUCT IMAGE */}

                  <div className="cart-item-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>


                  {/* PRODUCT DETAILS */}

                  <div className="cart-item-details">

                    <div>

                      <h2>
                        {item.name}
                      </h2>

                      <p>
                        Colour: {item.colour}
                      </p>

                      <p>
                        Size: {item.size}
                      </p>

                      <strong>
                        R{item.price}
                      </strong>

                    </div>


                    {/* ACTIONS */}

                    <div className="cart-item-actions">


                      {/* QUANTITY */}

                      <div className="cart-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.colour,
                              item.size,
                              item.quantity - 1
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.colour,
                              item.size,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>

                      </div>


                      {/* REMOVE */}

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() =>
                          removeFromCart(
                            item.id,
                            item.colour,
                            item.size
                          )
                        }
                      >
                        REMOVE
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* =========================
                ORDER SUMMARY
            ========================== */}

            <div className="cart-summary">

              <p>
                ORDER SUMMARY
              </p>


              {/* ITEMS */}

              <div className="summary-row">

                <span>
                  ITEMS ({cartCount})
                </span>

                <span>
                  R{cartTotal}
                </span>

              </div>


              {/* DELIVERY */}

              <div className="summary-row">

                <span>
                  DELIVERY
                </span>

                <span>
                  CALCULATED AT CHECKOUT
                </span>

              </div>


              {/* TOTAL */}

              <div className="summary-total">

                <span>
                  TOTAL
                </span>

                <strong>
                  R{cartTotal}
                </strong>

              </div>


              {/* CHECKOUT */}

              <Link
                href="/checkout"
                className="checkout-button"
              >
                CHECKOUT
                <span>→</span>
              </Link>


              {/* CONTINUE SHOPPING */}

              <Link
                href="/"
                className="continue-shopping"
              >
                CONTINUE SHOPPING
              </Link>

            </div>

          </div>

        )}

      </section>

    </main>
  );
}