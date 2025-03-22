import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { car } = req.body; // Get car details from frontend

    if (!car) {
      return res.status(400).json({ error: "Car details are required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: car.pricing_info.currency || "usd",
            product_data: {
              name: car.vehicle_info.v_name,
              images: [car.vehicle_info.image_url],
            },
            unit_amount: car.pricing_info.price * 100, // Convert price to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url }); // Return session URL
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
};
