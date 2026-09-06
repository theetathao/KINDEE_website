'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const A = '/assets/';

const categories = [
  ['All Products', 'category-ready-to-cook.png', 'https://www.thekindeeco.com/products/'],
  ['Honey', 'category-honey.png', 'https://www.thekindeeco.com/product_category/honey/'],
  ['Condiments', 'category-condiments.png', '/products/condiments'],
  ['Ready to eat', 'category-ready-to-cook.png', 'https://www.thekindeeco.com/product_category/ready-to-eat/'],
  ['Ready to cook', 'category-ready-to-cook.png', 'https://www.thekindeeco.com/product_category/ready-to-cook/'],
  ['Snacks', 'category-snacks.png', 'https://www.thekindeeco.com/product_category/snacks/'],
  ['Coconut Milk', 'category-coconut-milk.png', 'https://www.thekindeeco.com/product_category/coconut-milk/'],
  ['Rice', 'category-rice.png', 'https://www.thekindeeco.com/product_category/rice/'],
  ['Dried Fruits', 'category-honey.png', 'https://www.thekindeeco.com/product_category/dried-fruits/'],
  ['Beverages', 'category-coconut-milk.png', 'https://www.thekindeeco.com/product_category/beverages/'],
  ['Frozen Foods', 'category-ready-to-cook.png', 'https://www.thekindeeco.com/product_category/frozen-foods/'],
  ['Accessory Items', 'category-condiments.png', 'https://www.thekindeeco.com/product_category/accessory-items/'],
  ['Exclusive Partner', 'product-main.png', 'https://www.thekindeeco.com/product_category/exclusive-partner/'],
  ["Australia's products", 'categories.png', 'https://www.thekindeeco.com/product_category/australia/'],
];

const products = [
  ['Thai Jim Jaew Sauce (Spicy BBQ Sauce)', '13.76 oz'],
  ['Thai Sukiyaki Sauce (Chili Garlic Sauce)', '12.35 oz'],
  ['Thai Chili Lime Sauce (Seafood Dipping Sauce)', '11.64 oz'],
  ['Thai Creamy Seafood Sauce (Creamy Chili Lime Sauce)', '12.35 oz'],
  ['Peanut Satay Sauce', '8 oz. (227 ml.)'],
  ['Chili Crisp', '7 oz (200g)'],
  ['Tamarind Paste', '17.28 oz (490 g)'],
  ['Sweet Chili Sauce', '14.1 fl. oz. (400 g)'],
  ['Organic Coconut Aminos', '8.45 fl oz (250 ml)'],
  ['Organic Teriyaki Coconut Aminos', '8.45 fl oz (250 ml)'],
  ['Smokin’ Sambal Sweet Chili Sauce', '13.8 oz (390 g)'],
  ['Smokin’ Sambal BBQ Sauce', '13.8 oz (390 g)'],
];

export default function CondimentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(9);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const categoryTrackRef = useRef<HTMLElement>(null);
  const filtered = useMemo(() => products.map((product, index) => ({ product, index })).filter(({ product }) => product[0].toLowerCase().includes(query.toLowerCase())), [query]);
  const scrollCategories = (direction: number) => {
    const track = categoryTrackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: 'smooth' });
  };

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.condimentPage [data-reveal]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="condimentPage">
      <section className="condimentHero">
        <img className="condimentHeroImage" src={`${A}condiments/hero.png`} alt="Kin Dee condiments and fresh Thai ingredients" />
        <header className={`nav ${menuOpen ? 'navOpen' : ''}`} data-reveal>
          <a className="outlineBtn" href="/#catalog">Download Catalog</a>
          <a href="/" aria-label="Kin Dee home"><img className="logo" src={`${A}logo.png`} alt="Kin Dee" /></a>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><img src={`${A}${menuOpen ? 'close.svg' : 'menu.svg'}`} alt="" /></button>
          {menuOpen && <div className="menuPanel">
            <div className="productMenu"><h2>Explore Products</h2>{['Honey','Condiments','Ready to cook','Snacks','Coconut milk','Rice','Dried Fruits'].map(item => <a className={item === 'Condiments' ? 'currentProductLink' : ''} href={item === 'Condiments' ? '/products/condiments' : '/#products'} onClick={() => setMenuOpen(false)} key={item}>{item}</a>)}<a className="viewAll" href="/#products">View all <img src={`${A}arrow-right.svg`} alt="" /></a></div>
            <span className="menuDivider" aria-hidden="true" />
            <nav className="mainMenu" aria-label="Main navigation"><a href="/">Home</a><a href="/#about">About</a><a className="active" href="/#products">Product</a><a href="/#service">Services</a><a href="#">Recipes</a><a href="#">Contact</a></nav>
          </div>}
        </header>
        <div className="condimentHeroCopy revealDelay1" data-reveal><span>Products</span><img className="condimentHeroLine" src={`${A}condiments/hero-line.svg`} alt="" /><h1>Condiment</h1><p>Authentic sauces, pastes and seasonings crafted from quality ingredients to bring the true taste of Southeast Asia to your table.</p></div>
        <div className="condimentCategoryCarousel revealDelay2" data-reveal>
          <button type="button" onClick={() => scrollCategories(-1)} aria-label="Previous product categories">‹</button>
          <nav className="condimentCategories" ref={categoryTrackRef} aria-label="Product categories">{categories.map(([name,image,href]) => <a href={href} className={name === 'Condiments' ? 'isCurrent' : ''} key={name}><img src={`${A}${image}`} alt="" /><span>{name}</span></a>)}</nav>
          <button type="button" onClick={() => scrollCategories(1)} aria-label="Next product categories">›</button>
        </div>
      </section>

      <section className="condimentListing">
        <div className="productTools">
          <label className="productSearch"><img src={`${A}condiments/search.svg`} alt="" /><input value={query} onChange={event => { setQuery(event.target.value); setVisible(9); }} placeholder="Search" aria-label="Search condiments" /></label>
          <div className="filterButtons" aria-label="Product filters">{['Product Type','Dietary','Certification','Sort By'].map(label => <button key={label}>{label}<img src={`${A}condiments/caret-down.svg`} alt="" /></button>)}</div>
        </div>
        <div className="listingHeader"><div><h2>All Condiments</h2><p>Showing {Math.min(visible, filtered.length)} of {filtered.length} products</p></div><div className="viewIcons" aria-label="View options"><span>VIEW AS</span><div><button className={viewMode === 'grid' ? 'active' : ''} type="button" onClick={() => setViewMode('grid')} aria-label="Grid view" aria-pressed={viewMode === 'grid'}><img src={`${A}condiments/view-grid.svg`} alt="" /></button><button className={viewMode === 'list' ? 'active' : ''} type="button" onClick={() => setViewMode('list')} aria-label="List view" aria-pressed={viewMode === 'list'}><img src={`${A}condiments/view-list.svg`} alt="" /></button></div></div></div>
        {filtered.length ? <div className={`condimentGrid ${viewMode === 'list' ? 'listView' : ''}`}>{filtered.slice(0, visible).map(({ product, index }) => <article className="condimentCard" key={product[0]}><div><img src={`${A}condiments/product-${String(index + 1).padStart(2, '0')}.png`} alt={product[0]} /></div><h3>{product[0]}</h3><p>{product[1]}</p></article>)}</div> : <p className="noProducts">No condiments match your search.</p>}
        {visible < filtered.length && <button className="loadMore" onClick={() => setVisible(products.length)}>Load More</button>}
      </section>

      <section className="condimentCta" id="catalog"><div data-reveal><h2>Bring More to<br/>the Table.</h2><p>Explore Kin Dee’s complete range of Southeast Asian food products, from everyday essentials to authentic regional flavors.</p><a className="outlineBtn" href="#">Download Catalog</a></div><em className="revealDelay1" data-reveal>there’s always more to discover</em><img className="revealDelay2" data-reveal src={`${A}condiments/catalog-cta.png`} alt="Kin Dee catalog with a curry bowl and ingredients" /></section>
      <footer><div className="footerMain" data-reveal><div><img className="footerLogo" src={`${A}logo.png`} alt="Kin Dee"/><div className="links"><div><a href="/#about">About</a><a href="/#products">Products</a><a href="/#service">Services</a><a href="#">Recipes</a><a href="#">Contact</a></div><div><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Cookies</a></div></div></div><div className="sealGrid">{Array.from({length:14},(_,i)=><img src={`${A}badge-${String(i+1).padStart(2,'0')}.png`} alt="" key={i}/>)}</div></div><div className="copyright revealDelay1" data-reveal><span>©THE KIN DEE CO., LTD.</span><span className="socials"><img src={`${A}social-fb.svg`} alt="Facebook"/><img src={`${A}social-x.svg`} alt="X"/><img src={`${A}social-linkedin.svg`} alt="LinkedIn"/><img src={`${A}social-ig.svg`} alt="Instagram"/></span></div></footer>
    </main>
  );
}
