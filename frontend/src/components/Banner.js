import React from "react";

const InspireCollection = () => {
  return (
    <section className="bg-[#F6F3EF] py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Small Image & Text */}
        <div className="md:col-span-4 flex flex-col justify-between h-full">
          <div className="mb-8">
            <img 
              src="https://images.pexels.com/photos/5358919/pexels-photo-5358919.jpeg" 
              alt="Gold Ring Detail" 
              className="w-48 h-auto shadow-sm"
            />
          </div>
          <div className="mt-auto">
            <h2 className="text-6xl md:text-7xl font-serif text-[#1A1A1A] leading-tight">
              Inspire to Be <br /> Collection
            </h2>
            <p className="text-sm text-gray-600 mt-6 max-w-xs uppercase tracking-widest">
              Modern jewelry is made of gold, silver or platinum
            </p>
          </div>
        </div>

        {/* Middle Column: Main Lifestyle Image */}
        <div className="md:col-span-5">
          <img 
            src="https://images.pexels.com/photos/22475819/pexels-photo-22475819.jpeg" 
            alt="Model wearing necklace" 
            className="w-full h-[600px] object-cover shadow-lg"
          />
        </div>

        {/* Right Column: Arched Image */}
        <div className="md:col-span-3 flex justify-center items-center">
          <div className="relative">
            {/* The Arch Shape */}
            <div className="overflow-hidden rounded-t-full bg-white shadow-md">
                <img 
                  src="https://images.pexels.com/photos/885218/pexels-photo-885218.jpeg" 
                  alt="Jewelry on hand" 
                  className="w-64 h-96 object-cover"
                />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InspireCollection;