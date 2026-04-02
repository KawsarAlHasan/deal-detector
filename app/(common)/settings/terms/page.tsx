import React from 'react'

const page = () => {
     const sections = [
    {
      title: "Introduction",
      content: "Welcome to DealDetector. By accessing or using our app, you agree to be bound by these Terms and Conditions. Please read them carefully."
    },
    {
      title: "Service Overview",
      content: "Deal Detector allows you to browse products from various shops and brands. We do not sell products directly within the app. When you choose to purchase a product, you will be redirected to the respective shop or will need to visit the shop physically to complete your purchase."
    },
    {
      title: "No Purchase Responsibility",
      content: "Deal Detector does not handle payments, shipping, or delivery for any products displayed in the app. All purchases are made directly between you and the shop or seller. We are not responsible for the quality, availability, delivery, or returns of any products."
    },
    {
      title: "Product Information",
      content: "We strive to display accurate product information, but we do not guarantee that product descriptions, pricing, or other details are complete, current, or error-free. Please verify all product details directly with the shop before making a purchase decision."
    },
    {
      title: "User Responsibilities",
      list: [
        "Use the app only for lawful purposes.",
        "Do not misuse the app or attempt to disrupt its functionality.",
        "Respect the intellectual property rights of product images and information displayed."
      ]
    },
    {
      title: "Changes to Terms",
      content: "We may update these Terms and Conditions from time to time. Any changes will be effective immediately upon posting within the app. Continued use of Deal Detector indicates your acceptance of the revised terms."
    },
    {
      title: "Contact Us",
      content: "If you have any questions about these Terms and Conditions, please contact us at [your contact email]."
    }
  ];

  return (
        <div className="space-y-8 mt-10">
          {sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h2 className="text-xl font-bold text-gray-900">
                {section.title}
              </h2>
              
              {section.content && (
                <p className="text-gray-700 leading-relaxed text-sm">
                  {section.content}
                </p>
              )}
              
              {section.list && (
                <ul className="space-y-2 ml-5">
                  {section.list.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-700 text-sm list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
  )
}

export default page