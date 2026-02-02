import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass mt-4 mx-auto max-w-7xl left-0 right-0 px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold gradient-text">AuctionNode</div>
            <div className="flex gap-8 items-center">
                <Link href="/" className="hover:text-indigo-400 transition-colors">Marketplace</Link>
                <Link href="/auctions" className="hover:text-indigo-400 transition-colors">Live Auctions</Link>
                <Link href="/sell" className="hover:text-indigo-400 transition-colors">Sell</Link>
                <div className="h-6 w-[1px] bg-white/20"></div>
                <Link href="/login" className="hover:text-indigo-400 transition-colors">Login</Link>
                <Link href="/register" className="btn-primary">Get Started</Link>
            </div>
        </nav>
    );
}
