'use client';

import { useState } from 'react';

const A = '/assets/';
function Arrow() { return <span aria-hidden="true">→</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main>
      <section className="hero" id="home">
        <header className={`nav ${menuOpen ? 'navOpen' : ''}`}>
          <a className="outlineBtn" href="#catalog">Download Catalog</a>
          <a href="#home" aria-label="Kin Dee home"><img className="logo" src={`${A}logo.png`} alt="Kin Dee" /></a>
          <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><img src={`${A}${menuOpen ? 'close.svg' : 'menu.svg'}`} alt="" /></button>
          {menuOpen && (
            <div className="menuPanel">
              <div className="productMenu">
                <h2>Explore Products</h2>
                {['Honey','Condiments','Ready to cook','Snacks','Coconut milk','Rice','Dried Fruits'].map(item => <a href="#products" onClick={() => setMenuOpen(false)} key={item}>{item}</a>)}
                <a className="viewAll" href="#products" onClick={() => setMenuOpen(false)}>View all <img src={`${A}arrow-right.svg`} alt="" /></a>
              </div>
              <span className="menuDivider" aria-hidden="true" />
              <nav className="mainMenu" aria-label="Main navigation">
                <a className="active" href="#home" onClick={() => setMenuOpen(false)}>Home</a>
                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#products" onClick={() => setMenuOpen(false)}>Product</a>
                <a href="#service" onClick={() => setMenuOpen(false)}>Services</a>
                <a href="#" onClick={() => setMenuOpen(false)}>Recipes</a>
                <a href="#" onClick={() => setMenuOpen(false)}>Contact</a>
              </nav>
            </div>
          )}
        </header>
        <div className="heroCopy"><h1>Bringing the best of Southeast Asia to your table</h1><a href="#about" aria-label="Continue"><img src={`${A}down.svg`} alt="" /></a></div>
      </section>
      <section className="story passion" id="about">
        <div className="copy left"><span>01.</span><h2>Passion in<br/>every bite</h2><p>In Thai, “Kin Dee” means Eat Well — a phrase that reflects our passion for quality, flavor, health, and care in every bite.</p></div>
        <img className="spoon" src={`${A}spoon.png`} alt="Thai curry served on a white spoon" />
        <p className="sideCopy">It captures our commitment to providing premium Asian food products that deliver the authentic tastes and culinary heritage of Asia.</p>
        <em className="note perfect">Perfect bite :)</em>
      </section>
      <section className="story taste">
        <img className="bowl" src={`${A}bowl.png`} alt="A bowl of green curry" /><em className="note authentic">Authentic Taste</em>
        <div className="copy right"><span>02.</span><h2>It begins<br/>with a taste.</h2><p>Bringing the authentic flavors and culinary heritage of Southeast Asia to every table.</p><a className="goldBtn" href="#products">Explore Now <Arrow /></a></div>
      </section>
      <section className="products" id="products">
        <div className="productIntro"><span>03.</span><h2>Feature Products</h2><p>From sauces and condiments to coconut milk, rice and ready-to-cook essentials, Kin Dee brings together a wide range of Southeast Asian food products.</p></div>
        <img className="productHero" src={`${A}product-main.png`} alt="Kin Dee sauce products" />
        <div className="productCard"><strong>Thai Jim Jaew Sauce<br/>(Spicy BBQ Sauce)</strong><small>13.76 oz</small></div><em className="note flavor">Authentic flavor, always.</em>
        <div className="categoryArea"><p>Sort by Category</p><div className="categories">{['Honey','Condiments','Ready to cook','Snacks','Coconut Milk','Rice'].map((x,i)=><button className="categoryCard" key={x}><span className="categoryImage" style={{backgroundPosition:`${i * 20}% 15%`}}/><span>{x}<b>›</b></span></button>)}</div></div>
      </section>
      <section className="quality" id="quality">
        <div className="copy left light"><span>04.</span><h2>Quality Starts<br/>With What Goes In.</h2><p>We carefully select ingredients and maintain high standards of food quality and safety — because great flavor begins long before it reaches the table.</p><a className="goldBtn" href="#service">Learn more <Arrow /></a></div>
        <img src={`${A}ingredients.png`} alt="Fresh lime, garlic, chili and herbs" /><em className="note selected">carefully selected ↑</em>
      </section>
      <section className="service" id="service">
        <div className="serviceCopy"><span>05.</span><h2>Every Bite<br/>Tells a Story.</h2><p>We believe in protecting the environment for future generations by partnering with suppliers who practice sustainable farming.</p><a className="outlineBtn" href="#catalog">Our Service <Arrow /></a></div>
        <div className="values">{[["plant.svg","Sustainable Farming","Partnering with suppliers who practice sustainable farming."],["medal.svg","Quality from the Source","Carefully managed from sourcing through processing."],["mountains.svg","Traceable Ingredients","Raw materials can be traced back to their source."]].map(([icon,title,body])=><article key={title}><img src={A+icon} alt=""/><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>
      <section className="catalog" id="catalog"><div className="copy left light"><span>04.</span><h2>Bring More to<br/>the Table.</h2><p>Explore Kin Dee’s complete range of Southeast Asian food products, from everyday essentials to authentic regional flavors.</p><a className="outlineBtn" href="#">Download Catalog</a></div><img src={`${A}catalog.png`} alt="Kin Dee product catalog and ingredients"/><em className="note discover">there’s always more to discover</em></section>
      <footer><div className="footerMain"><div><img className="footerLogo" src={`${A}logo.png`} alt="Kin Dee"/><div className="links"><div><a href="#about">About</a><a href="#products">Products</a><a href="#service">Services</a><a href="#">Recipes</a><a href="#">Contact</a></div><div><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Cookies</a></div></div></div><div className="sealGrid">{Array.from({length:14},(_,i)=><img src={`${A}badge-${String(i+1).padStart(2,'0')}.png`} alt="" key={i}/>)}</div></div><div className="copyright"><span>©THE KIN DEE CO., LTD.</span><span className="socials"><img src={`${A}social-fb.svg`} alt="Facebook"/><img src={`${A}social-x.svg`} alt="X"/><img src={`${A}social-linkedin.svg`} alt="LinkedIn"/><img src={`${A}social-ig.svg`} alt="Instagram"/></span></div></footer>
    </main>
  );
}
