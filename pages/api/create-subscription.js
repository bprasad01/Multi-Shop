import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    try {
        if(req.method !== 'POST') return res.status(400);
        const { name, paymentMethod } = req.body;
        // Create a Customer
        const customer = await stripe.customers.create({
            name,
            email : "payment@gmail.com",
            payment_method : paymentMethod,
            invoice_settings : { default_payment_method : paymentMethod }
        });

        // Creating a product
        const product = await stripe.products.create({
            name : "Monthly Subscription",
        });

        // Creating a Subscription
        const subscription = await stripe.subscriptions.create({
            customer : customer.id,
            items : [
                {
                    price_data : {
                        currency : 'INR',
                        product : product.id,
                        unit_amount : '1000',
                        recurring : {
                            interval : 'month'
                        }
                    }
                }
            ],
            payment_settings : {
                payment_method_types : ['card'],
                save_default_payment_method : 'on_subscription'
            },
            expand : ['latest_invoice.payment_intent']
        });

        // send back to the client secret
        res.json({
            message : 'Subscription Successfull',
            clientSecret : subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId : subscription.id
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : "Internal Server Error"});
    }
}
  