import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AuctionCard from '@/components/AuctionCard';

export default function Home() {
  const mockAuctions = [
    { id: 1, title: "Cyber-Punk Watch V1", price: "1,200", timeLeft: "3h 24m" },
    { id: 2, title: "Neural Link Console", price: "5,500", timeLeft: "12m 45s" },
    { id: 3, title: "Virtual Real Estate #402", price: "12,000", timeLeft: "1h 05m" },
    { id: 4, title: "Void Space Sneakers", price: "850", timeLeft: "5h 12m" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <Hero />

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Auctions</h2>
            <p className="text-gray-400">Handpicked items for serious bidders.</p>
          </div>
          <button className="text-indigo-400 font-semibold hover:underline">View All</button>
        </div>

        <div className="auction-grid">
          {mockAuctions.map(auction => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </section>
    </main>
  );
}
