const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  const {
    query: { session_id },
  } = req;
  
  if (req.method === "GET") {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);``
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

