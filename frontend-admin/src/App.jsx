import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Gavel,
    Users,
    TrendingUp,
    PlusCircle,
    LogOut,
    Bell
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active }) => (
    <div className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors rounded-lg mb-1 ${active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </div>
);

const StatCard = ({ label, value, trend, icon: Icon }) => (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-800 rounded-xl text-indigo-400">
                <Icon size={24} />
            </div>
            <span className={`text-sm font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trend}
            </span>
        </div>
        <div className="text-3xl font-black mb-1">{value}</div>
        <div className="text-slate-500 text-sm font-medium">{label}</div>
    </div>
);

function App() {
    const [bids, setBids] = useState([
        { id: 1, item: "Futuristic Desk", bidder: "user_021", amount: "$1,250", time: "2 mins ago" },
        { id: 2, item: "E-Sports Chair", bidder: "admin_pro", amount: "$450", time: "5 mins ago" },
        { id: 3, item: "RGB Mech Keyboard", bidder: "gamer_01", amount: "$180", time: "12 mins ago" },
    ]);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 p-6 flex flex-col">
                <div className="text-2xl font-black text-indigo-500 mb-10 px-4">BIDDLY ADMIN</div>

                <nav className="flex-1">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                    <SidebarItem icon={Gavel} label="Auctions" />
                    <SidebarItem icon={Users} label="Users" />
                    <SidebarItem icon={TrendingUp} label="Analytics" />
                </nav>

                <div className="mt-auto">
                    <SidebarItem icon={LogOut} label="Logout" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black mb-1">Dashboard</h1>
                        <p className="text-slate-500">Welcome back, Seller Admin.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 cursor-pointer">
                            <Bell size={20} />
                        </div>
                        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all">
                            <PlusCircle size={20} />
                            Create Auction
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard label="Total Revenue" value="$42,500" trend="+12.5%" icon={TrendingUp} />
                    <StatCard label="Active Auctions" value="18" trend="+2" icon={Gavel} />
                    <StatCard label="Total Bidders" value="1,240" trend="+154" icon={Users} />
                    <StatCard label="Success Rate" value="94%" trend="+0.5%" icon={TrendingUp} />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        <h2 className="text-xl font-bold mb-6">Recent Bidding Activity</h2>
                        <div className="space-y-4">
                            {bids.map(bid => (
                                <div key={bid.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-800">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center font-bold">
                                            {bid.item[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.item}</div>
                                            <div className="text-sm text-slate-500">by {bid.bidder}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-black text-indigo-400">{bid.amount}</div>
                                        <div className="text-xs text-slate-500">{bid.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
                        <h2 className="text-2xl font-black mb-4 relative z-10">Real-time Insights</h2>
                        <p className="text-indigo-100 mb-6 relative z-10">Bids are currently 15% higher than last week. Great time to list new premium items!</p>
                        <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold relative z-10">View Report</button>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
