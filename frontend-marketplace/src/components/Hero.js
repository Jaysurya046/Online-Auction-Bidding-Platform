export default function Hero() {
    return (
        <section className="pt-40 pb-20 px-6 text-center">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                Bid on the <span className="gradient-text">Future.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                The world's most advanced real-time auction platform. Atomic bid validation, sub-millisecond latency, and a premium experience.
            </p>
            <div className="flex gap-4 justify-center">
                <button className="btn-primary text-lg px-8">Explore Auctions</button>
                <button className="glass px-8 py-3 font-semibold rounded-xl hover:bg-white/10 transition-all">How it works</button>
            </div>
        </section>
    );
}
