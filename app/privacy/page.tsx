import Link from "next/link";

export default function PrivacyPolicy() {
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

        <h1>PRIVACY POLICY</h1>

        <p className="policy-intro">
          At URGENT®, we respect your privacy and are committed to
          protecting the personal information you provide when using
          our website.
        </p>

        <div className="policy-section">
          <h2>1. INFORMATION WE COLLECT</h2>

          <p>
            When you place an order with URGENT®, we may collect
            information such as your name, email address, phone
            number and delivery address.
          </p>

          <p>
            We collect this information so that we can process your
            order, communicate with you and arrange delivery.
          </p>
        </div>

        <div className="policy-section">
          <h2>2. HOW WE USE YOUR INFORMATION</h2>

          <p>Your information may be used to:</p>

          <ul>
            <li>Process and manage your orders.</li>
            <li>Contact you regarding your order.</li>
            <li>Arrange delivery of your purchase.</li>
            <li>Respond to questions or enquiries.</li>
            <li>Improve our website and customer experience.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2>3. PROTECTING YOUR INFORMATION</h2>

          <p>
            We take reasonable steps to protect the personal
            information provided through our website and only use
            it for legitimate business purposes.
          </p>
        </div>

        <div className="policy-section">
          <h2>4. SHARING YOUR INFORMATION</h2>

          <p>
            We do not sell your personal information. Information
            may only be shared with service providers where this is
            necessary to process your order or provide services such
            as delivery or payment processing.
          </p>
        </div>

        <div className="policy-section">
          <h2>5. YOUR INFORMATION</h2>

          <p>
            If you have questions about the personal information we
            hold about you, please contact URGENT® using the contact
            details provided on our website.
          </p>
        </div>

        <div className="policy-section">
          <h2>6. CONTACT US</h2>

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