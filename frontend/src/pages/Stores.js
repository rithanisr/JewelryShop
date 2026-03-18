import React from "react";
import { useNavigate } from "react-router-dom";

export default function Stores() {
  const navigate = useNavigate();

  const stores = [
    {
      id: 1,
      name: "Aurora Jewels - Coimbatore",
      address: "123 Connaught Place, Coimbatore, Tamil Nadu 110001",
      phone: "+91 98765 43210",
      email: "coimbatore@aurorajewels.com",
      hours: "10:00 AM - 8:00 PM",
      days: "Mon - Sun",
    },
    {
      id: 3,
      name: "Aurora Jewels - Bangalore Forum",
      address: "789 Koramangala, Bangalore, Karnataka 560034",
      phone: "+91 98765 43212",
      email: "bangalore@aurorajewels.com",
      hours: "10:00 AM - 8:30 PM",
      days: "Mon - Sun",
    },
    {
      id: 4,
      name: "Aurora Jewels - Hyderabad Galleria",
      address: "321 Jubilee Hills, Hyderabad, Telangana 500033",
      phone: "+91 98765 43213",
      email: "hyderabad@aurorajewels.com",
      hours: "11:00 AM - 8:00 PM",
      days: "Mon - Sun",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F3EF]">

      {/* Header */}
      <div className="bg-white shadow-sm mb-10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <button
            onClick={() => navigate(-1)}
            className="text-[#6B4F3A] hover:text-[#C79A7B] mb-4 font-semibold transition"
          >
            &larr; Back
          </button>

          <h1 className="text-4xl font-bold text-[#6B4F3A]">
            Our Stores
          </h1>

          <p className="text-gray-600 mt-2">
            Visit Aurora Jewels at our premium showroom locations
          </p>
        </div>
      </div>

      {/* Store Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-[#C79A7B] text-white p-5">
                <h2 className="text-xl font-bold">{store.name}</h2>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">

                <div>
                  <p className="text-sm text-gray-500 font-semibold">📍 Address</p>
                  <p className="text-[#6B4F3A]">{store.address}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-semibold">📞 Phone</p>
                  <a
                    href={`tel:${store.phone}`}
                    className="text-[#C79A7B] hover:text-[#B88A6B] font-medium"
                  >
                    {store.phone}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-semibold">📧 Email</p>
                  <a
                    href={`mailto:${store.email}`}
                    className="text-[#C79A7B] hover:text-[#B88A6B] font-medium"
                  >
                    {store.email}
                  </a>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-semibold">🕒 Hours</p>
                  <p className="text-[#6B4F3A]">{store.hours}</p>
                  <p className="text-gray-600">{store.days}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <a
                    href={`tel:${store.phone}`}
                    className="flex-1 bg-[#C79A7B] hover:bg-[#B88A6B] text-white font-semibold py-2 rounded-xl text-center transition"
                  >
                    Call
                  </a>

                  <a
                    href={`mailto:${store.email}`}
                    className="flex-1 border border-[#C79A7B] text-[#6B4F3A] hover:bg-[#F6F3EF] font-semibold py-2 rounded-xl text-center transition"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-white py-14 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#6B4F3A] mb-4">
            Have Questions?
          </h2>

          <p className="text-gray-600 mb-8">
            Our customer care team is happy to assist you
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-[#C79A7B] hover:bg-[#B88A6B] text-white font-semibold py-3 px-8 rounded-xl transition"
            >
              Call Customer Support
            </a>

            <a
              href="mailto:support@aurorajewels.com"
              className="border border-[#C79A7B] text-[#6B4F3A] hover:bg-[#F6F3EF] font-semibold py-3 px-8 rounded-xl transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}