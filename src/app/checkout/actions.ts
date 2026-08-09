import { clientStripe } from "@/stripe/clients";




async function checkoutSession(){

    try {

        const response = clientStripe.checkout.sessions.create({
          line_items: [
            {
                price_data: {
                currency: "eur",
                unit_amount: 0.5 * 100,
                product_data: {
                    //images: [`${siteUrl}/images/product-image.jpeg`],
                    name: "BeyondNorms — Full Evening Access",
                    description:
                    "Soul Speed Dating + Dinner Show & Surprise Artists — one individual ticket.",
                },
                },
                quantity: 1,
            },
    ],
        })

    } catch(err)
}