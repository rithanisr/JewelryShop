export default function BrandTrust() {
  const items = [
    {
      title: "Certified Quality",
      desc: "Authentic & hallmarked jewelry",
    },
    {
      title: "Handcrafted Design",
      desc: "Made by expert artisans",
    },
    {
      title: "Secure Payments",
      desc: "100% safe checkout",
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free exchange",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className="font-semibold text-lg text-[#6B4F3A]">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}