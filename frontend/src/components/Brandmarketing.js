export default function MarketingBanner() {
  return (
    <section className="py-16 px-4">
      <div
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1602173574767-37ac01994b2a')",
        }}
      >
        <div className="bg-black/40 text-center text-white p-16">
          <h2 className="text-4xl font-bold mb-4">
            Celebrate Timeless Elegance
          </h2>

          <p className="mb-6">
            Discover handcrafted luxury pieces designed for every moment.
          </p>

          <a
            href="/products"
            className="bg-[#C79A7B] px-8 py-3 rounded-full font-semibold hover:bg-[#B88A6B]"
          >
            Shop Collection
          </a>
        </div>
      </div>
    </section>
  );
}