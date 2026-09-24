import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateOrderNumber() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `URG-${year}${month}${day}-${randomNumber}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      address,
      city,
      province,
      postal,
      cart,
      cartCount,
      cartTotal,
    } = body;

    // =========================
    // REQUIRED INFORMATION
    // =========================

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !province ||
      !postal ||
      !cart ||
      cart.length === 0
    ) {
      return Response.json(
        {
          error: "Missing required order information.",
        },
        { status: 400 }
      );
    }

    // =========================
    // EMAIL VALIDATION
    // =========================

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      typeof email !== "string" ||
      !emailPattern.test(email.trim())
    ) {
      return Response.json(
        {
          error: "Invalid email address.",
        },
        { status: 400 }
      );
    }

    const customerEmailAddress = email.trim();

    // =========================
    // QUANTITY VALIDATION
    // =========================

    const invalidQuantity = cart.some(
      (item: { quantity: number }) =>
        typeof item.quantity !== "number" ||
        item.quantity <= 0 ||
        !Number.isInteger(item.quantity)
    );

    if (invalidQuantity) {
      return Response.json(
        {
          error: "Invalid product quantity.",
        },
        { status: 400 }
      );
    }

    // =========================
    // GENERATE ORDER NUMBER
    // =========================

    const orderNumber = generateOrderNumber();

    // =========================
    // GOOGLE MAPS ADDRESS LINK
    // =========================

    const fullAddress = `${address}, ${city}, ${province}, ${postal}`;

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      fullAddress
    )}`;

    // =========================
    // ORDER ITEMS
    // =========================

    const orderItems = cart
      .map(
        (item: {
          name: string;
          colour: string;
          size: string;
          quantity: number;
          price: number;
        }) => `
          <li style="margin-bottom: 15px;">
            <strong>${item.name}</strong><br />
            Colour: ${item.colour}<br />
            Size: ${item.size}<br />
            Quantity: ${item.quantity}<br />
            Price: R${item.price * item.quantity}
          </li>
        `
      )
      .join("");

    // =========================
    // OWNER EMAIL
    // =========================

    const ownerEmail = await resend.emails.send({
      from: "URGENT® <orders@urgentcollect.co.za>",
      to: process.env.ORDER_EMAIL!,
      subject: `New URGENT® Order ${orderNumber}`,
      html: `
        <h1>New URGENT® Order</h1>

        <h2>Order Number</h2>

        <p>
          <strong>${orderNumber}</strong>
        </p>

        <h2>Customer Information</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${customerEmailAddress}</p>
        <p><strong>Phone:</strong> ${phone}</p>

        <h2>Delivery Address</h2>

        <p>
          <a
            href="${mapsUrl}"
            target="_blank"
            style="color: #000000; text-decoration: underline;"
          >
            ${address}<br />
            ${city}<br />
            ${province}<br />
            ${postal}
          </a>
        </p>

        <p style="font-size: 13px; color: #666666;">
          Click the address above to open it in Google Maps.
        </p>

        <h2>Order</h2>

        <ul>
          ${orderItems}
        </ul>

        <h2>Total</h2>

        <p>
          <strong>R${cartTotal}</strong>
        </p>

        <p>
          Total items: ${cartCount}
        </p>

        <hr />

        <p>
          URGENT® Order Management
        </p>
      `,
    });

    if (ownerEmail.error) {
      console.error("Owner email error:", ownerEmail.error);

      return Response.json(
        {
          error: "Could not send owner email.",
        },
        { status: 500 }
      );
    }

    // =========================
    // CUSTOMER EMAIL
    // =========================

    const customerEmail = await resend.emails.send({
      from: "URGENT® <orders@urgentcollect.co.za>",
      to: customerEmailAddress,
      subject: `URGENT® Order Confirmation — ${orderNumber}`,
      html: `
        <h1>Thank you, ${name}.</h1>

        <p>
          We have received your URGENT® order.
          Please use your Order Number as reference for your EFT payment.
        </p>

        <h2>Order Number</h2>

        <p>
          <strong>${orderNumber}</strong>
        </p>

        <h2>Your Order</h2>

        <ul>
          ${orderItems}
        </ul>

        <h2>Total</h2>

        <p>
          <strong>R${cartTotal}</strong>
        </p>

        <h2>Delivery Address</h2>

        <p>
          <a
            href="${mapsUrl}"
            target="_blank"
            style="color: #000000; text-decoration: underline;"
          >
            ${address}<br />
            ${city}<br />
            ${province}<br />
            ${postal}
          </a>
        </p>

        <p>
          We will contact you shortly regarding your delivery.
        </p>

        <p>
          Please keep your order number
          <strong>${orderNumber}</strong>
          for reference.
        </p>

        <p>
          Thank you for choosing URGENT®.
        </p>
      `,
    });

    if (customerEmail.error) {
      console.error(
        "Customer email error:",
        customerEmail.error
      );

      return Response.json(
        {
          error: "Could not send customer email.",
        },
        { status: 500 }
      );
    }

    // =========================
    // SUCCESS
    // =========================

    return Response.json({
      success: true,
      orderNumber,
    });
  } catch (error) {
    console.error("Order error:", error);

    return Response.json(
      {
        error: "Could not process order.",
      },
      { status: 500 }
    );
  }
}