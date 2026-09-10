import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="policy-page">
      <div className="policy-header">
        <Link href="/" className="policy-logo">
          URGENT<span>®</span>
        </Link>

        <Link href="/" className="policy-back">
          ← BACK TO SHOP
        </Link>
      </div>

      <section className="policy-content">
        <p className="eyebrow">URGENT / LEGAL</p>

        <h1>TERMS & CONDITIONS</h1>

        <p className="policy-intro">
          By using the URGENT® website or placing an order,
          you agree to the terms and conditions outlined below.
        </p>

        <div className="policy-section">
          <h2>1. ORDERS</h2>

          <p>
            All orders placed through the URGENT® website are
            subject to product availability and confirmation.
          </p>

          <p>
            Once an order has been submitted, you will receive
            confirmation containing your order details and order
            number.
          </p>
        </div>

        <div className="policy-section">
          <h2>2. PRODUCT INFORMATION</h2>

          <p>
            We make every reasonable effort to ensure that product
            descriptions, images, prices and other information on
            the website are accurate.
          </p>

          <p>
            Colours may appear slightly different depending on
            your device or screen settings.
          </p>
        </div>

        <div className="policy-section">
          <h2>3. PRICING</h2>

          <p>
            Product prices are displayed on the website in South
            African Rand (ZAR).
          </p>

          <p>
            URGENT® reserves the right to change product prices
            without prior notice. The price displayed when an order
            is submitted will apply to that order, subject to
            confirmation.
          </p>
        </div>

        <div className="policy-section">
          <h2>4. PAYMENT</h2>

          <p>
            Payment must be made using the payment method provided
            by URGENT® for the relevant order.
          </p>

          <p>
            An order will only be processed once the required
            payment has been successfully confirmed.
          </p>
        </div>

        <div className="policy-section">
          <h2>5. DELIVERY</h2>

          <p>
            Orders will be delivered to the address provided during
            checkout.
          </p>

          <p>
            Delivery times may vary depending on the customer's
            location and the delivery service being used.
          </p>
        </div>

        <div className="policy-section">
          <h2>6. RETURNS & REFUNDS</h2>

          <p>
            Returns and refunds are handled according to the
            URGENT® Returns & Refunds Policy.
          </p>

          <p>
            Customers should review the Returns & Refunds Policy
            before placing an order.
          </p>
        </div>

        <div className="policy-section">
          <h2>7. WEBSITE USE</h2>

          <p>
            You agree to use this website only for lawful purposes
            and in a way that does not interfere with the operation
            or security of the website.
          </p>
        </div>

        <div className="policy-section">
          <h2>8. INTELLECTUAL PROPERTY</h2>

          <p>
            The URGENT® name, branding, images, designs, text and
            other original content on this website belong to
            URGENT® Group.
          </p>

          <p>
            Content may not be copied, reproduced or used for
            commercial purposes without permission.
          </p>
        </div>

        <div className="policy-section">
          <h2>9. CONTACT</h2>

          <p>
            For questions regarding these terms, please contact:
          </p>

          <p>
            Email: urgent20.collect@gmail.com
          </p>
        </div>

        <p className="policy-updated">
          Last updated: September 2026
        </p>
      </section>
    </main>
  );
}