import Stripe from "stripe";
// đoạn sau giúp code ko bị báo lỗi
export const stripe = new Stripe(process.env.STRIPE_API_KEY!,{
    apiVersion: "2022-11-15",
    typescript: true
});

