import React, { useState, useMemo } from "react";
import {
  Search, Heart, ShoppingBag, User, Menu, X, Star, ChevronRight,
  ChevronLeft, Plus, Minus, Leaf, Truck, ShieldCheck, RotateCcw,
  Instagram, Facebook, Twitter, Mail, MapPin, Package, ChevronDown
} from "lucide-react";

/* ---------------------------------- DATA ---------------------------------- */

const CATEGORIES = ["Skincare", "Makeup", "Haircare", "Body"];
const SKIN_TYPES = ["Dry", "Oily", "Combination", "Sensitive", "All Types"];

const PRODUCTS = [
  { id: 1, name: "Bloomwater Cream Cleanser", cat: "Skincare", skin: "Dry", price: 28, badge: "Bestseller", tone: "rose", rating: 4.8, reviews: 214, size: "150ml", desc: "A milk-soft cleanser infused with rose water and oat extract that lifts away the day without stripping the skin's natural barrier." },
  { id: 2, name: "Verdant Clay Purifying Mask", cat: "Skincare", skin: "Oily", price: 34, badge: "New", tone: "sage", rating: 4.6, reviews: 98, size: "75ml", desc: "French green clay and willowbark draw out congestion while chamomile keeps the process calm, not stripped." },
  { id: 3, name: "Golden Hour Vitamin C Serum", cat: "Skincare", skin: "All Types", price: 46, badge: "Bestseller", tone: "gold", rating: 4.9, reviews: 342, size: "30ml", desc: "15% stabilised vitamin C brightens tone and softens fine lines over eight weeks of nightly use." },
  { id: 4, name: "Hush Barrier Repair Balm", cat: "Skincare", skin: "Sensitive", price: 32, tone: "ivory", rating: 4.7, reviews: 156, size: "50ml", desc: "Ceramides and squalane rebuild a compromised barrier for skin that flushes, stings, or reacts easily." },
  { id: 5, name: "Petal Silk Blush Duo", cat: "Makeup", skin: "All Types", price: 24, badge: "New", tone: "rose", rating: 4.5, reviews: 87, size: "8g", desc: "Two blendable cream shades that mimic the flush of skin warmed by sun, not powder." },
  { id: 6, name: "Understated Tinted Balm", cat: "Makeup", skin: "All Types", price: 22, tone: "gold", rating: 4.4, reviews: 63, size: "12ml", desc: "Sheer, buildable coverage with a satin finish and jojoba oil that treats lips as it colours them." },
  { id: 7, name: "Botanical Root Repair Oil", cat: "Haircare", skin: "All Types", price: 38, badge: "Bestseller", tone: "sage", rating: 4.8, reviews: 201, size: "100ml", desc: "Rosemary, biotin, and argan oil work into the scalp to encourage stronger growth from the root." },
  { id: 8, name: "Silt & Salt Volumising Spray", cat: "Haircare", skin: "All Types", price: 26, tone: "ivory", rating: 4.3, reviews: 74, size: "150ml", desc: "A sea-mineral texturiser for soft, undone waves without the crunch of traditional salt sprays." },
  { id: 9, name: "Fig Milk Body Polish", cat: "Body", skin: "Dry", price: 30, tone: "gold", rating: 4.6, reviews: 129, size: "220g", desc: "Fine sugar crystals and fig extract buff away rough patches, leaving skin softened, not raw." },
  { id: 10, name: "Warm Clay Hand & Body Wash", cat: "Body", skin: "All Types", price: 20, tone: "sage", rating: 4.5, reviews: 91, size: "300ml", desc: "A low-lather, pH-balanced wash scented with cedar and clay for skin that never feels tight after." },
  { id: 11, name: "Quiet Hours Overnight Mask", cat: "Skincare", skin: "Combination", price: 40, badge: "New", tone: "rose", rating: 4.7, reviews: 118, size: "50ml", desc: "A weightless gel-cream that works while you sleep, delivering peptides and hyaluronic acid till morning." },
  { id: 12, name: "Terracotta Cream Bronzer", cat: "Makeup", skin: "All Types", price: 26, tone: "gold", rating: 4.6, reviews: 145, size: "10g", desc: "A cream-to-powder bronzer that melts into skin for warmth that looks earned, not applied." },
];

const TONE_STYLES = {
  rose: { bg: "linear-gradient(155deg,#eecdd0,#dba3a8)", cap: "#4a3b3c" },
  sage: { bg: "linear-gradient(155deg,#c7d3bd,#94a984)", cap: "#33402c" },
  gold: { bg: "linear-gradient(155deg,#ecd9ae,#cfa863)", cap: "#4a3a1c" },
  ivory: { bg: "linear-gradient(155deg,#f6f0e4,#e3d7c0)", cap: "#4a4436" },
};

const BLOG_POSTS = [
  { id: 1, title: "The Case for a Slower Skincare Routine", excerpt: "Why fewer steps, done with attention, tend to outperform a crowded shelf of actives.", tag: "Ritual" },
  { id: 2, title: "Reading Your Skin Barrier Like a Map", excerpt: "Redness, tightness, and breakouts are signals, not flaws — here's how to read them.", tag: "Skin Science" },
  { id: 3, title: "What 'Clean' Actually Means on Our Labels", excerpt: "A plain-language walkthrough of how we vet every ingredient before it reaches a bottle.", tag: "Inside Bloomwood" },
];

/* --------------------------------- HELPERS --------------------------------- */

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={13} className={n <= Math.round(rating) ? "fill-current" : ""}
          style={{ color: "#B98A4A", opacity: n <= Math.round(rating) ? 1 : 0.3 }} />
      ))}
    </div>
  );
}

function Bottle({ tone, badge, size = 1 }) {
  const t = TONE_STYLES[tone] || TONE_STYLES.ivory;
  return (
    <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: "4/5" }}>
      {badge && (
        <span className="absolute top-3 left-3 z-10 text-[10px] tracking-[0.12em] uppercase px-2 py-1"
          style={{ background: "#2B2420", color: "#FAF6EF", fontFamily: "'Space Mono', monospace" }}>
          {badge}
        </span>
      )}
      <div style={{ width: `${58 * size}%`, height: `${72 * size}%` }} className="relative flex flex-col items-center">
        <div style={{ width: "34%", height: "9%", background: t.cap, borderRadius: "3px 3px 0 0" }} />
        <div style={{ width: "100%", height: "91%", background: t.bg, borderRadius: "14px", boxShadow: "inset -8px 0 16px rgba(0,0,0,0.08), 0 12px 24px -12px rgba(43,36,32,0.35)" }}
          className="relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-x-[14%] top-[30%] bottom-[30%] border border-current opacity-30 flex items-center justify-center"
            style={{ color: t.cap }}>
            <Leaf size={16} style={{ color: t.cap, opacity: 0.6 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- HEADER --------------------------------- */

function Header({ view, setView, cartCount, wishCount, search, setSearch, menuOpen, setMenuOpen }) {
  const nav = [
    { key: "home", label: "Home" },
    { key: "catalog", label: "Shop" },
    { key: "about", label: "About" },
    { key: "blog", label: "Journal" },
  ];
  return (
    <header className="sticky top-0 z-40" style={{ background: "#FAF6EF", borderBottom: "1px solid #E4DAC8" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <button onClick={() => setView("home")} className="tracking-[0.08em]" style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: "#2B2420" }}>
          Bloomwood
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <button key={n.key} onClick={() => setView(n.key)}
              className="text-[13px] tracking-[0.04em] uppercase pb-1"
              style={{ color: "#2B2420", borderBottom: view === n.key ? "1.5px solid #B98A4A" : "1.5px solid transparent", fontFamily: "'Space Mono', monospace" }}>
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5" style={{ background: "#F1E9DA", borderRadius: "999px" }}>
            <Search size={14} style={{ color: "#7A6E5B" }} />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setView("catalog"); }}
              placeholder="Search products" className="bg-transparent outline-none text-[13px] w-32" style={{ color: "#2B2420" }} />
          </div>
          <button onClick={() => setView("wishlist")} className="relative" aria-label="Wishlist">
            <Heart size={19} style={{ color: "#2B2420" }} />
            {wishCount > 0 && <span className="absolute -top-2 -right-2 text-[9px] w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#B98A4A", color: "#FAF6EF" }}>{wishCount}</span>}
          </button>
          <button onClick={() => setView("cart")} className="relative" aria-label="Cart">
            <ShoppingBag size={19} style={{ color: "#2B2420" }} />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 text-[9px] w-4 h-4 rounded-full flex items-center justify-center" style={{ background: "#B98A4A", color: "#FAF6EF" }}>{cartCount}</span>}
          </button>
          <button onClick={() => setView("account")} aria-label="Account">
            <User size={19} style={{ color: "#2B2420" }} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col px-5 pb-4 gap-3">
          {nav.map((n) => (
            <button key={n.key} onClick={() => { setView(n.key); setMenuOpen(false); }} className="text-left text-sm uppercase tracking-wide" style={{ color: "#2B2420" }}>{n.label}</button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- HOME ---------------------------------- */

function Hero({ setView }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "#1F2E22" }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center relative z-10">
        <div>
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#C9A876", fontFamily: "'Space Mono', monospace" }}>Batch No. 026 — Autumn Ritual</span>
          <h1 className="mt-4 leading-[1.05]" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(38px,5vw,64px)", color: "#FAF6EF" }}>
            Skincare that reads like a quiet morning.
          </h1>
          <p className="mt-5 max-w-md" style={{ color: "#CBD3C2", fontSize: "15px", lineHeight: 1.7 }}>
            Small-batch formulas made with botanical actives and none of the noise. Built for skin, not for shelves.
          </p>
          <div className="mt-8 flex gap-4">
            <button onClick={() => setView("catalog")} className="px-6 py-3 text-[13px] uppercase tracking-[0.08em]" style={{ background: "#C9A876", color: "#1F2E22", fontFamily: "'Space Mono', monospace" }}>
              Shop the Edit
            </button>
            <button onClick={() => setView("about")} className="px-6 py-3 text-[13px] uppercase tracking-[0.08em] border" style={{ borderColor: "#4A5D45", color: "#FAF6EF", fontFamily: "'Space Mono', monospace" }}>
              Our Story
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto md:ml-auto">
          <div className="mt-8"><Bottle tone="rose" size={0.92} /></div>
          <div><Bottle tone="gold" size={0.92} /></div>
        </div>
      </div>
      <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: "40px" }}>
        <path d="M0,32 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FAF6EF" />
      </svg>
    </section>
  );
}

function CategoryStrip({ setView, setCatFilter }) {
  const icons = { Skincare: "🌿", Makeup: "🌸", Haircare: "🌾", Body: "🫙" };
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => { setCatFilter(c); setView("catalog"); }}
            className="flex flex-col items-center gap-3 py-8 transition-transform hover:-translate-y-1"
            style={{ background: "#F1E9DA", borderRadius: "18px" }}>
            <span style={{ fontSize: "28px" }}>{icons[c]}</span>
            <span className="text-[13px] uppercase tracking-[0.06em]" style={{ fontFamily: "'Space Mono', monospace", color: "#2B2420" }}>{c}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p, onOpen, wishlist, toggleWish, addToCart }) {
  return (
    <div className="group">
      <button onClick={() => onOpen(p)} className="w-full text-left relative block" style={{ background: "#F1E9DA", borderRadius: "16px", overflow: "hidden" }}>
        <Bottle tone={p.tone} badge={p.badge} />
        <button onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{ background: "rgba(250,246,239,0.9)" }} aria-label="Toggle wishlist">
          <Heart size={15} style={{ color: "#B98A4A" }} className={wishlist.includes(p.id) ? "fill-current" : ""} />
        </button>
      </button>
      <div className="pt-3 px-1">
        <p className="text-[11px] uppercase tracking-[0.08em]" style={{ color: "#9A8D74", fontFamily: "'Space Mono', monospace" }}>{p.cat}</p>
        <button onClick={() => onOpen(p)} className="block text-left mt-1" style={{ fontFamily: "'Fraunces', serif", fontSize: "17px", color: "#2B2420" }}>{p.name}</button>
        <div className="mt-1 flex items-center gap-2"><Stars rating={p.rating} /><span className="text-[11px]" style={{ color: "#9A8D74" }}>({p.reviews})</span></div>
        <div className="mt-2 flex items-center justify-between">
          <span style={{ color: "#2B2420", fontWeight: 500 }}>${p.price}</span>
          <button onClick={() => addToCart(p)} className="text-[11px] uppercase tracking-[0.06em] px-3 py-1.5"
            style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function BestSellers({ onOpen, wishlist, toggleWish, addToCart }) {
  const items = PRODUCTS.filter((p) => p.badge === "Bestseller").slice(0, 4);
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16">
      <div className="flex items-end justify-between mb-6">
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", color: "#2B2420" }}>The Bestsellers</h2>
        <span className="text-[11px] uppercase tracking-[0.08em]" style={{ color: "#9A8D74", fontFamily: "'Space Mono', monospace" }}>Reordered weekly</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
        {items.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />)}
      </div>
    </section>
  );
}

function IngredientSpotlight() {
  return (
    <section style={{ background: "#33402C" }} className="py-20">
      <div className="max-w-5xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#C9A876", fontFamily: "'Space Mono', monospace" }}>Ingredient Focus</span>
          <h3 className="mt-3" style={{ fontFamily: "'Fraunces', serif", fontSize: "34px", color: "#FAF6EF" }}>Rosemary, root to bottle.</h3>
          <p className="mt-4 max-w-md" style={{ color: "#D6DECA", fontSize: "14.5px", lineHeight: 1.8 }}>
            We trace every rosemary batch to a single co-op in the Peloponnese, cold-pressed within a day of harvest to hold onto the compounds that actually support scalp circulation — not just the scent.
          </p>
          <div className="mt-6 flex gap-8">
            {[["Sourced", "Greece"], ["Batches", "Small, seasonal"], ["Tested", "8-week clinical"]].map(([k, v]) => (
              <div key={k}><p className="text-[11px] uppercase tracking-[0.06em]" style={{ color: "#93A186", fontFamily: "'Space Mono', monospace" }}>{k}</p><p style={{ color: "#FAF6EF", fontSize: "14px", marginTop: "4px" }}>{v}</p></div>
            ))}
          </div>
        </div>
        <div className="mx-auto"><Bottle tone="sage" size={0.85} /></div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="max-w-4xl mx-auto px-5 md:px-8 py-20 text-center">
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", color: "#2B2420" }}>Join the mailing list</h3>
      <p className="mt-2 text-[14px]" style={{ color: "#7A6E5B" }}>New formulas, restock notes, and 10% off your first order.</p>
      {sent ? (
        <p className="mt-6 text-[14px]" style={{ color: "#4A5D45" }}>You're on the list — check your inbox for the code.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} className="mt-6 flex max-w-sm mx-auto">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
            className="flex-1 px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "999px 0 0 999px", color: "#2B2420" }} />
          <button type="submit" className="px-5 py-3 text-[12px] uppercase tracking-[0.06em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "0 999px 999px 0", fontFamily: "'Space Mono', monospace" }}>Join</button>
        </form>
      )}
    </section>
  );
}

/* --------------------------------- CATALOG --------------------------------- */

function Catalog({ search, setSearch, catFilter, setCatFilter, onOpen, wishlist, toggleWish, addToCart }) {
  const [skinFilter, setSkinFilter] = useState("All");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (catFilter !== "All") list = list.filter((p) => p.cat === catFilter);
    if (skinFilter !== "All") list = list.filter((p) => p.skin === skinFilter || p.skin === "All Types");
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [search, catFilter, skinFilter, sort]);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "34px", color: "#2B2420" }}>Shop the Edit</h1>
      <p className="text-[13px] mt-1" style={{ color: "#9A8D74" }}>{filtered.length} products</p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 sm:hidden" style={{ background: "#F1E9DA", borderRadius: "999px" }}>
          <Search size={14} style={{ color: "#7A6E5B" }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="bg-transparent outline-none text-[13px] w-full" />
        </div>
        <button onClick={() => setCatFilter("All")} className="text-[11px] uppercase tracking-[0.06em] px-3 py-1.5" style={{ background: catFilter === "All" ? "#2B2420" : "#F1E9DA", color: catFilter === "All" ? "#FAF6EF" : "#2B2420", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCatFilter(c)} className="text-[11px] uppercase tracking-[0.06em] px-3 py-1.5" style={{ background: catFilter === c ? "#2B2420" : "#F1E9DA", color: catFilter === c ? "#FAF6EF" : "#2B2420", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>{c}</button>
        ))}
        <div className="ml-auto flex items-center gap-3">
          <select value={skinFilter} onChange={(e) => setSkinFilter(e.target.value)} className="text-[12px] px-3 py-2 outline-none" style={{ background: "#F1E9DA", borderRadius: "8px", color: "#2B2420" }}>
            <option value="All">All Skin Types</option>
            {SKIN_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-[12px] px-3 py-2 outline-none" style={{ background: "#F1E9DA", borderRadius: "8px", color: "#2B2420" }}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: "#2B2420" }}>No products match yet.</p>
          <p className="text-[13px] mt-2" style={{ color: "#9A8D74" }}>Try clearing a filter or searching a different term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7 mt-8">
          {filtered.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />)}
        </div>
      )}
    </div>
  );
}

/* ------------------------------ PRODUCT DETAIL ------------------------------ */

function ProductDetail({ product, setView, addToCart, wishlist, toggleWish }) {
  const [qty, setQty] = useState(1);
  if (!product) return null;
  const related = PRODUCTS.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <button onClick={() => setView("catalog")} className="flex items-center gap-1 text-[12px] mb-6" style={{ color: "#7A6E5B" }}>
        <ChevronLeft size={14} /> Back to shop
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <div style={{ background: "#F1E9DA", borderRadius: "20px" }}><Bottle tone={product.tone} badge={product.badge} size={1.05} /></div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em]" style={{ color: "#9A8D74", fontFamily: "'Space Mono', monospace" }}>{product.cat} · {product.size}</p>
          <h1 className="mt-2" style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: "#2B2420" }}>{product.name}</h1>
          <div className="flex items-center gap-2 mt-2"><Stars rating={product.rating} /><span className="text-[12px]" style={{ color: "#9A8D74" }}>{product.rating} ({product.reviews} reviews)</span></div>
          <p className="mt-5 text-[15px]" style={{ color: "#4A4436", lineHeight: 1.8 }}>{product.desc}</p>
          <p className="mt-6 text-[24px]" style={{ color: "#2B2420", fontFamily: "'Fraunces', serif" }}>${product.price}</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center" style={{ background: "#F1E9DA", borderRadius: "999px" }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Minus size={14} /></button>
              <span className="w-6 text-center text-[14px]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3"><Plus size={14} /></button>
            </div>
            <button onClick={() => { addToCart(product, qty); }} className="flex-1 py-3 text-[13px] uppercase tracking-[0.08em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>
              Add to Bag — ${(product.price * qty).toFixed(2)}
            </button>
            <button onClick={() => toggleWish(product.id)} className="p-3 rounded-full" style={{ background: "#F1E9DA" }}>
              <Heart size={17} className={wishlist.includes(product.id) ? "fill-current" : ""} style={{ color: "#B98A4A" }} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 pt-6" style={{ borderTop: "1px solid #E4DAC8" }}>
            {[[Truck, "Free shipping $50+"], [ShieldCheck, "Dermat. tested"], [RotateCcw, "30-day returns"]].map(([Icon, label]) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <Icon size={18} style={{ color: "#4A5D45" }} /><span className="text-[10.5px]" style={{ color: "#7A6E5B" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6" style={{ fontFamily: "'Fraunces', serif", fontSize: "24px", color: "#2B2420" }}>You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {related.map((p) => <ProductCard key={p.id} p={p} onOpen={(pp) => setView("detail", pp)} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- CART ---------------------------------- */

function CartPage({ cart, setCart, setView }) {
  const updateQty = (id, delta) => setCart((c) => c.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i).filter((i) => i.qty > 0));
  const remove = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-5 py-24 text-center">
        <ShoppingBag size={32} style={{ color: "#C9BBA0", margin: "0 auto" }} />
        <p className="mt-4" style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: "#2B2420" }}>Your bag is empty.</p>
        <button onClick={() => setView("catalog")} className="mt-6 px-6 py-3 text-[13px] uppercase tracking-[0.08em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>Browse Products</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-12">
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: "#2B2420" }}>Your Bag</h1>
      <div className="mt-8 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 flex flex-col gap-5">
          {cart.map((i) => (
            <div key={i.id} className="flex gap-4 items-center pb-5" style={{ borderBottom: "1px solid #E4DAC8" }}>
              <div style={{ width: 72, background: "#F1E9DA", borderRadius: "10px" }}><Bottle tone={i.tone} /></div>
              <div className="flex-1">
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: "16px", color: "#2B2420" }}>{i.name}</p>
                <p className="text-[12px] mt-0.5" style={{ color: "#9A8D74" }}>${i.price} each</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center" style={{ background: "#F1E9DA", borderRadius: "999px" }}>
                    <button onClick={() => updateQty(i.id, -1)} className="p-1.5"><Minus size={12} /></button>
                    <span className="w-5 text-center text-[13px]">{i.qty}</span>
                    <button onClick={() => updateQty(i.id, 1)} className="p-1.5"><Plus size={12} /></button>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-[11px] underline" style={{ color: "#9A8D74" }}>Remove</button>
                </div>
              </div>
              <p style={{ color: "#2B2420", fontFamily: "'Fraunces', serif" }}>${(i.price * i.qty).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="p-6 h-fit" style={{ background: "#F1E9DA", borderRadius: "16px" }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: "#2B2420" }}>Order Summary</h3>
          <div className="mt-4 flex justify-between text-[13px]" style={{ color: "#4A4436" }}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="mt-2 flex justify-between text-[13px]" style={{ color: "#4A4436" }}><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
          <div className="mt-4 pt-4 flex justify-between text-[15px]" style={{ borderTop: "1px solid #E4DAC8", color: "#2B2420", fontWeight: 500 }}><span>Total</span><span>${(subtotal + shipping).toFixed(2)}</span></div>
          <button onClick={() => setView("checkout")} className="mt-6 w-full py-3 text-[13px] uppercase tracking-[0.08em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>Secure Checkout</button>
        </div>
      </div>
    </div>
  );
}

function Checkout({ cart, setView, setCart, setOrders }) {
  const [step, setStep] = useState(1);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + (subtotal >= 50 || subtotal === 0 ? 0 : 6);

  const placeOrder = (e) => {
    e.preventDefault();
    setOrders((o) => [{ id: "BW" + Math.floor(1000 + Math.random() * 9000), items: cart, total, status: "Processing", date: new Date().toLocaleDateString() }, ...o]);
    setCart([]);
    setView("orderSuccess");
  };

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-12">
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "30px", color: "#2B2420" }}>Checkout</h1>
      <div className="flex gap-6 mt-4 text-[11px] uppercase tracking-[0.06em]" style={{ fontFamily: "'Space Mono', monospace", color: "#9A8D74" }}>
        <span style={{ color: step >= 1 ? "#2B2420" : "#9A8D74" }}>1. Shipping</span>
        <span style={{ color: step >= 2 ? "#2B2420" : "#9A8D74" }}>2. Payment</span>
        <span style={{ color: step >= 3 ? "#2B2420" : "#9A8D74" }}>3. Review</span>
      </div>

      <form onSubmit={step < 3 ? (e) => { e.preventDefault(); setStep(step + 1); } : placeOrder} className="mt-8 space-y-4">
        {step === 1 && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full name" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
              <input required placeholder="Phone number" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
            </div>
            <input required placeholder="Street address" className="w-full px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
            <div className="grid sm:grid-cols-3 gap-4">
              <input required placeholder="City" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
              <input required placeholder="State" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
              <input required placeholder="PIN Code" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <input required placeholder="Card number" className="w-full px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="MM / YY" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
              <input required placeholder="CVC" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
            </div>
            <p className="text-[11px]" style={{ color: "#9A8D74" }}>This is a prototype — no real payment is processed.</p>
          </>
        )}
        {step === 3 && (
          <div className="p-5" style={{ background: "#F1E9DA", borderRadius: "12px" }}>
            {cart.map((i) => (
              <div key={i.id} className="flex justify-between text-[13px] py-1" style={{ color: "#4A4436" }}><span>{i.name} × {i.qty}</span><span>${(i.price * i.qty).toFixed(2)}</span></div>
            ))}
            <div className="mt-3 pt-3 flex justify-between text-[15px]" style={{ borderTop: "1px solid #E4DAC8", color: "#2B2420" }}><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        )}
        <div className="flex gap-3 pt-2">
          {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-5 py-3 text-[12px] uppercase tracking-[0.06em]" style={{ border: "1px solid #C9BBA0", borderRadius: "999px", color: "#2B2420", fontFamily: "'Space Mono', monospace" }}>Back</button>}
          <button type="submit" className="flex-1 py-3 text-[13px] uppercase tracking-[0.08em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>
            {step < 3 ? "Continue" : `Place Order — $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
}

function OrderSuccess({ orders, setView }) {
  const order = orders[0];
  return (
    <div className="max-w-md mx-auto px-5 py-24 text-center">
      <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center" style={{ background: "#33402C" }}>
        <Package size={22} style={{ color: "#FAF6EF" }} />
      </div>
      <h1 className="mt-6" style={{ fontFamily: "'Fraunces', serif", fontSize: "26px", color: "#2B2420" }}>Order placed.</h1>
      <p className="mt-2 text-[13px]" style={{ color: "#7A6E5B" }}>Confirmation <strong>{order?.id}</strong> is on its way to your inbox.</p>
      <div className="flex gap-3 justify-center mt-8">
        <button onClick={() => setView("orders")} className="px-5 py-3 text-[12px] uppercase tracking-[0.06em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>Track Order</button>
        <button onClick={() => setView("catalog")} className="px-5 py-3 text-[12px] uppercase tracking-[0.06em] border" style={{ borderColor: "#C9BBA0", color: "#2B2420", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>Keep Shopping</button>
      </div>
    </div>
  );
}

/* ------------------------------ ACCOUNT / AUTH ------------------------------ */

function AuthPage({ setView, setUser }) {
  const [mode, setMode] = useState("login");
  const submit = (e) => {
    e.preventDefault();
    const name = e.target.name?.value || "Guest";
    setUser({ name: name || "Guest", email: e.target.email.value });
    setView("account");
  };
  return (
    <div className="grid md:grid-cols-2 min-h-[560px]">
      <div className="hidden md:flex items-center justify-center p-10" style={{ background: "#1F2E22" }}>
        <div className="text-center">
          <Bottle tone="rose" size={0.9} />
          <p className="mt-6 max-w-xs mx-auto" style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: "#FAF6EF" }}>
            "The best routine is the one you actually finish."
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", color: "#2B2420" }}>{mode === "login" ? "Welcome back" : "Create account"}</h1>
          <p className="text-[13px] mt-1" style={{ color: "#9A8D74" }}>{mode === "login" ? "Log in to track orders and manage your wishlist." : "Join for early access to new formulas."}</p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "signup" && <input name="name" required placeholder="Full name" className="w-full px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />}
            <input name="email" required type="email" placeholder="Email address" className="w-full px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
            <input name="password" required type="password" placeholder="Password" className="w-full px-4 py-3 outline-none text-[13px]" style={{ background: "#F1E9DA", borderRadius: "10px" }} />
            <button type="submit" className="w-full py-3 text-[13px] uppercase tracking-[0.08em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>
          <p className="mt-6 text-[13px] text-center" style={{ color: "#7A6E5B" }}>
            {mode === "login" ? "New here?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="underline" style={{ color: "#2B2420" }}>
              {mode === "login" ? "Create one" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function AccountPage({ user, setView, setUser }) {
  if (!user) return <AuthPage setView={setView} setUser={setUser} />;
  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-14">
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "30px", color: "#2B2420" }}>Hi, {user.name}</h1>
      <p className="text-[13px] mt-1" style={{ color: "#9A8D74" }}>{user.email}</p>
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[["orders", "Track Orders", Package], ["wishlist", "Wishlist", Heart], ["catalog", "Continue Shopping", ShoppingBag]].map(([key, label, Icon]) => (
          <button key={key} onClick={() => setView(key)} className="p-6 flex flex-col items-center gap-3 text-center" style={{ background: "#F1E9DA", borderRadius: "16px" }}>
            <Icon size={20} style={{ color: "#4A5D45" }} />
            <span className="text-[12px] uppercase tracking-[0.06em]" style={{ fontFamily: "'Space Mono', monospace", color: "#2B2420" }}>{label}</span>
          </button>
        ))}
      </div>
      <div className="mt-10 p-6" style={{ background: "#F1E9DA", borderRadius: "16px" }}>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "16px", color: "#2B2420" }}>Profile details</h3>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <input defaultValue={user.name} placeholder="Full name" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#FAF6EF", borderRadius: "10px" }} />
          <input defaultValue={user.email} placeholder="Email" className="px-4 py-3 outline-none text-[13px]" style={{ background: "#FAF6EF", borderRadius: "10px" }} />
          <input placeholder="Shipping address" className="px-4 py-3 outline-none text-[13px] sm:col-span-2" style={{ background: "#FAF6EF", borderRadius: "10px" }} />
        </div>
        <button className="mt-4 px-5 py-2.5 text-[12px] uppercase tracking-[0.06em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>Save Changes</button>
      </div>
      <button onClick={() => { setUser(null); setView("home"); }} className="mt-6 text-[12px] underline" style={{ color: "#9A8D74" }}>Log out</button>
    </div>
  );
}

function OrdersPage({ orders, setView }) {
  const statusColor = { Processing: "#B98A4A", Shipped: "#4A5D45", Delivered: "#33402C" };
  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-14">
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", color: "#2B2420" }}>Your Orders</h1>
      {orders.length === 0 ? (
        <p className="mt-4 text-[13px]" style={{ color: "#9A8D74" }}>No orders yet. <button onClick={() => setView("catalog")} className="underline">Start shopping</button></p>
      ) : (
        <div className="mt-6 flex flex-col gap-4">
          {orders.map((o) => (
            <div key={o.id} className="p-5" style={{ background: "#F1E9DA", borderRadius: "14px" }}>
              <div className="flex justify-between items-center">
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "16px", color: "#2B2420" }}>#{o.id}</span>
                <span className="text-[11px] uppercase tracking-[0.06em] px-2 py-1" style={{ background: statusColor[o.status], color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>{o.status}</span>
              </div>
              <p className="text-[12px] mt-1" style={{ color: "#9A8D74" }}>{o.date} · {o.items.length} item(s) · ${o.total.toFixed(2)}</p>
              <div className="mt-3 flex gap-2">
                {["Processing", "Shipped", "Delivered"].map((s, idx) => {
                  const reached = ["Processing", "Shipped", "Delivered"].indexOf(o.status) >= idx;
                  return <div key={s} className="flex-1 h-1.5 rounded-full" style={{ background: reached ? "#4A5D45" : "#E4DAC8" }} />;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- WISHLIST --------------------------------- */

function WishlistPage({ wishlist, toggleWish, setView, onOpen, addToCart }) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "30px", color: "#2B2420" }}>Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="py-16 text-center">
          <Heart size={28} style={{ color: "#C9BBA0", margin: "0 auto" }} />
          <p className="mt-4 text-[14px]" style={{ color: "#9A8D74" }}>Save products you love for later.</p>
          <button onClick={() => setView("catalog")} className="mt-5 px-5 py-2.5 text-[12px] uppercase tracking-[0.06em]" style={{ background: "#2B2420", color: "#FAF6EF", borderRadius: "999px", fontFamily: "'Space Mono', monospace" }}>Browse Products</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7 mt-8">
          {items.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />)}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- ABOUT ---------------------------------- */

function About() {
  return (
    <div>
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-16 text-center">
        <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "#B98A4A", fontFamily: "'Space Mono', monospace" }}>Est. 2019</span>
        <h1 className="mt-3" style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(30px,4vw,44px)", color: "#2B2420" }}>Made slowly, on purpose.</h1>
        <p className="mt-5 max-w-xl mx-auto text-[15px]" style={{ color: "#4A4436", lineHeight: 1.8 }}>
          Bloomwood started in a rented kitchen with three formulas and a conviction that skincare didn't need forty ingredients to work. Every product we ship today still goes through the same small-batch process — mixed, tested, and bottled in runs of under 500.
        </p>
      </section>
      <section style={{ background: "#F1E9DA" }} className="py-16">
        <div className="max-w-5xl mx-auto px-5 md:px-8 grid sm:grid-cols-3 gap-8 text-center">
          {[["Sourcing", "We work directly with growers and name them on every label."], ["Testing", "Every formula runs an 8-week independent efficacy trial."], ["Packaging", "Glass and aluminium first, recyclable everywhere else."]].map(([t, d]) => (
            <div key={t}>
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "19px", color: "#2B2420" }}>{t}</h3>
              <p className="mt-2 text-[13.5px]" style={{ color: "#7A6E5B", lineHeight: 1.7 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <IngredientSpotlight />
    </div>
  );
}

/* ---------------------------------- BLOG ---------------------------------- */

function Blog() {
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-14">
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: "#2B2420" }}>The Journal</h1>
      <p className="text-[13px] mt-1" style={{ color: "#9A8D74" }}>Notes on skin, formulation, and slower routines.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((b) => (
          <article key={b.id} className="p-6" style={{ background: "#F1E9DA", borderRadius: "16px" }}>
            <span className="text-[10.5px] uppercase tracking-[0.08em]" style={{ color: "#B98A4A", fontFamily: "'Space Mono', monospace" }}>{b.tag}</span>
            <h2 className="mt-3" style={{ fontFamily: "'Fraunces', serif", fontSize: "19px", color: "#2B2420", lineHeight: 1.3 }}>{b.title}</h2>
            <p className="mt-2 text-[13.5px]" style={{ color: "#7A6E5B", lineHeight: 1.7 }}>{b.excerpt}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-[12px]" style={{ color: "#2B2420" }}>Read more <ChevronRight size={13} /></span>
          </article>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- FOOTER --------------------------------- */

function Footer({ setView }) {
  return (
    <footer style={{ background: "#1F2E22" }} className="mt-auto">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: "#FAF6EF" }}>Bloomwood</p>
          <p className="mt-3 text-[13px]" style={{ color: "#9AA791", lineHeight: 1.7 }}>Small-batch skincare and cosmetics, formulated with restraint.</p>
          <div className="flex gap-3 mt-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => <Icon key={i} size={16} style={{ color: "#C9D3BE" }} />)}
          </div>
        </div>
        {[["Shop", ["Skincare", "Makeup", "Haircare", "Body"]], ["Company", ["About", "Journal", "Careers"]], ["Support", ["Contact", "Shipping", "Returns", "FAQ"]]].map(([h, links]) => (
          <div key={h}>
            <p className="text-[11px] uppercase tracking-[0.08em]" style={{ color: "#C9A876", fontFamily: "'Space Mono', monospace" }}>{h}</p>
            <div className="mt-3 flex flex-col gap-2">
              {links.map((l) => <button key={l} onClick={() => setView(h === "Shop" ? "catalog" : h === "Company" && l === "About" ? "about" : h === "Company" && l === "Journal" ? "blog" : "home")} className="text-left text-[13px]" style={{ color: "#C9D3BE" }}>{l}</button>)}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t px-5 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2" style={{ borderColor: "#3A4636" }}>
        <span className="text-[11.5px]" style={{ color: "#8A9682" }}>© 2026 Bloomwood Cosmetics. All rights reserved.</span>
        <span className="text-[11.5px] flex items-center gap-1" style={{ color: "#8A9682" }}><Mail size={12} /> hello@bloomwood.co</span>
      </div>
    </footer>
  );
}

/* ---------------------------------- APP ---------------------------------- */

export default function App() {
  const [view, _setView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const setView = (v, product) => {
    if (v === "detail" && product) setSelectedProduct(product);
    _setView(v);
    setMenuOpen(false);
    window.scrollTo?.(0, 0);
  };

  const addToCart = (p, qty = 1) => {
    setCart((c) => {
      const existing = c.find((i) => i.id === p.id);
      if (existing) return c.map((i) => i.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { ...p, qty }];
    });
  };
  const toggleWish = (id) => setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  const openProduct = (p) => setView("detail", p);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FAF6EF", minHeight: "100vh" }} className="flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
      `}</style>
      <Header view={view} setView={setView} cartCount={cartCount} wishCount={wishlist.length} search={search} setSearch={setSearch} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {view === "home" && (
        <>
          <Hero setView={setView} />
          <CategoryStrip setView={setView} setCatFilter={setCatFilter} />
          <BestSellers onOpen={openProduct} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />
          <IngredientSpotlight />
          <Newsletter />
        </>
      )}
      {view === "catalog" && <Catalog search={search} setSearch={setSearch} catFilter={catFilter} setCatFilter={setCatFilter} onOpen={openProduct} wishlist={wishlist} toggleWish={toggleWish} addToCart={addToCart} />}
      {view === "detail" && <ProductDetail product={selectedProduct} setView={setView} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish} />}
      {view === "cart" && <CartPage cart={cart} setCart={setCart} setView={setView} />}
      {view === "checkout" && <Checkout cart={cart} setView={setView} setCart={setCart} setOrders={setOrders} />}
      {view === "orderSuccess" && <OrderSuccess orders={orders} setView={setView} />}
      {view === "wishlist" && <WishlistPage wishlist={wishlist} toggleWish={toggleWish} setView={setView} onOpen={openProduct} addToCart={addToCart} />}
      {view === "account" && <AccountPage user={user} setView={setView} setUser={setUser} />}
      {(view === "login" || view === "signup") && <AuthPage setView={setView} setUser={setUser} />}
      {view === "orders" && <OrdersPage orders={orders} setView={setView} />}
      {view === "about" && <About />}
      {view === "blog" && <Blog />}

      <Footer setView={setView} />
    </div>
  );
}
