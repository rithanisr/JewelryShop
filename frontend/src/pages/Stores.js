import React from "react";
import { useNavigate } from "react-router-dom";

export default function Stores() {
  const navigate = useNavigate();

  const stores = [
    {
      id: 1,
      name: "JewelShop - Downtown Coimbatore",
      address: "123 Connaught Place, Coimbatore,Tamil Nadu 110001",
      phone: "+91 98765 43210",
      email: "coimbatore@jewelshop.com",
      hours: "10:00 AM - 8:00 PM",
      days: "Mon - Sun",
    },
    {
      id: 3,
      name: "JewelShop - Bangalore Forum",
      address: "789 Koramangala, Bangalore, Karnataka 560034",
      phone: "+91 98765 43212",
      email: "bangalore@jewelshop.com",
      hours: "10:00 AM - 8:30 PM",
      days: "Mon - Sun",
    },
    {
      id: 4,
      name: "JewelShop - Hyderabad Galleria",
      address: "321 Jubilee Hills, Hyderabad, Telangana 500033",
      phone: "+91 98765 43213",
      email: "hyderabad@jewelshop.com",
      hours: "11:00 AM - 8:00 PM",
      days: "Mon - Sun",
    },
    {
      id: 5,
      name: "JewelShop - Jaipur City",
      address: "654 MI Road, Jaipur, Rajasthan 302001",
      phone: "+91 98765 43214",
      email: "jaipur@jewelshop.com",
      hours: "10:30 AM - 7:30 PM",
      days: "Mon - Sun",
    },
    {
      id: 6,
      name: "JewelShop - Kolkata South",
      address: "987 Park Street, Kolkata, West Bengal 700016",
      phone: "+91 98765 43215",
      email: "kolkata@jewelshop.com",
      hours: "10:00 AM - 7:00 PM",
      days: "Mon - Sat",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white shadow-md mb-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline mb-4 font-semibold"
          >
            &larr; Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900">Our Stores</h1>
          <p className="text-gray-600 mt-2">Visit us at any of our premium jewelry showrooms</p>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">

              <div className="bg-yellow-500 text-white p-4">
                <h2 className="text-xl font-bold">{store.name}</h2>
              </div>


              <div className="p-6">

                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">📍 Address</p>
                  <p className="text-gray-800">{store.address}</p>
                </div>


                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">📞 Phone</p>
                  <a
                    href={`tel:${store.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {store.phone}
                  </a>
                </div>


                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">📧 Email</p>
                  <a
                    href={`mailto:${store.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {store.email}
                  </a>
                </div>


                <div className="mb-4">
                  <p className="text-sm text-gray-600 font-semibold mb-1">🕒 Hours</p>
                  <p className="text-gray-800">{store.hours}</p>
                  <p className="text-gray-700">{store.days}</p>
                </div>


                <div className="flex gap-3 mt-6">
                  <a
                    href={`tel:${store.phone}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded text-center transition"
                  >
                    Call
                  </a>
                  <a
                    href={`mailto:${store.email}`}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded text-center transition"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-6">Contact our customer support team</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Call Customer Support
            </a>
            <a
              href="mailto:support@jewelshop.com"
              className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
