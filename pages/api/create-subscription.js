import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    const { email, items } = req.body;
    console.log(items)
    let price;
    let duration;
    items.products.map(item => {
        price = item.price;
        duration = item.duration;
        return {price, duration};
    })
    console.log(price);
    try {
        if(req.method !== 'POST') return res.status(400);
        const { name, paymentMethod } = req.body;
        // Create a Customer
        const customer = await stripe.customers.create({
            name,
            email : email,
            payment_method : paymentMethod,
            invoice_settings : { default_payment_method : paymentMethod }
        });

        // Creating a product
        const product = await stripe.products.create({
            name : "Subscription",
        });

        // Creating a Subscription
        const subscription = await stripe.subscriptions.create({
            customer : customer.id,
            items : [
                {
                    price_data : {
                        currency : 'INR',
                        product : product.id,
                        unit_amount : price * '1000',
                        recurring : {
                            interval : duration
                        }
                    }
                }
            ],
            payment_settings : {
                payment_method_types : ['card'],
                save_default_payment_method : 'on_subscription'
            },
            expand : ['latest_invoice.payment_intent'],
            
        });
        
        // send back to the client secret
        res.json({
            message : 'Subscription Successfull',
            clientSecret : subscription.latest_invoice.payment_intent.client_secret,
            subscriptionId : subscription.id,
            success_url: "http://localhost:3000/success"
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : "Internal Server Error"});
    }
}
  