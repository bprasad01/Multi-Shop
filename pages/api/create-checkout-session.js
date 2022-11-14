const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email, firstName, lastName, phone, address, country, state, city, zipcode } = req.body;

  const transformedItems = items.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name,
        description: item.description,
      },
      unit_amount: item.prices.price * 100,
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/cancel",
    metadata: {
      email,
      firstName,
      lastName,
      phone,
      address,  
      country,
      state,
      city,
      zipcode
    },
  });

  

  res.status(200).json({ id: session.id });
};
