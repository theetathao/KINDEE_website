'use client';

import { useEffect, useRef, useState } from 'react';

const A = '/assets/';
function Arrow() { return <span aria-hidden="true">→</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const storyRef = useRef<HTMLElement>(null);
  const storyStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = storyRef.current;
    const stage = storyStageRef.current;
    if (!section || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stage.dataset.reducedMotion = String(reduceMotion);
    let frame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const ease = (value: number) => {
      const t = clamp(value);
      return t * t * (3 - 2 * t);
    };
    const phase = (progress: number, start: number, end: number) => ease((progress - start) / (end - start));
    const set = (name: string, value: string | number) => stage.style.setProperty(name, String(value));

    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      const spoonIn = phase(progress, 0.002, 0.045);
      const firstFade = 1 - phase(progress, 0.34, 0.44);
      const spoonMorph = phase(progress, 0.42, 0.60);
      const spoonOut = 1 - phase(progress, 0.55, 0.66);
      const bowlIn = phase(progress, 0.50, 0.68);
      const passionLead = phase(progress, 0.018, 0.055) * firstFade;
      const passionBody = phase(progress, 0.035, 0.078) * firstFade;
      const passionNote = phase(progress, 0.065, 0.11) * firstFade;
      const tasteLead = phase(progress, 0.68, 0.77);
      const tasteBody = phase(progress, 0.74, 0.83);
      const tasteNote = phase(progress, 0.84, 0.92);

      set('--spoon-opacity', spoonIn * spoonOut);
      set('--spoon-rise', `${(1 - spoonIn) * 58}svh`);
      set('--spoon-scale', 1 - spoonMorph * 0.58);
      set('--bowl-opacity', bowlIn);
      set('--bowl-scale', 0.45 + bowlIn * 0.55);
      set('--bowl-left', `${50 - bowlIn * 22}%`);
      set('--passion-lead', passionLead);
      set('--passion-lead-y', `${(1 - phase(progress, 0.018, 0.055)) * 42}px`);
      set('--passion-body', passionBody);
      set('--passion-body-y', `${(1 - phase(progress, 0.035, 0.078)) * 42}px`);
      set('--passion-note', passionNote);
      set('--taste-lead', tasteLead);
      set('--taste-lead-y', `${(1 - tasteLead) * 42}px`);
      set('--taste-body', tasteBody);
      set('--taste-body-y', `${(1 - tasteBody) * 42}px`);
      set('--taste-note', tasteNote);
      frame = 0;
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
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
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

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
        <div className="heroCopy" data-reveal><h1>Bringing the best of Southeast Asia to your table</h1><a className="scrollCue" href="#about" aria-label="Scroll down to our story"><img src={`${A}down.svg`} alt="" /></a></div>
      </section>
      <section className="storySequence" id="about" ref={storyRef} aria-label="Our food story">
        <div className="storyStage" ref={storyStageRef}>
          <img className="storySpoon" src={`${A}spoon.png`} alt="Thai curry served on a white spoon" />
          <img className="storyBowl" src={`${A}bowl.png`} alt="A bowl of green curry" />
          <div className="storyLayer passionLayer">
            <div className="copy left">
              <div className="copyLead"><span>01.</span><h2>Passion in<br/>every bite</h2></div>
              <div className="copyBody"><p>In Thai, “Kin Dee” means Eat Well — a phrase that reflects our passion for quality, flavor, health, and care in every bite.</p></div>
            </div>
            <p className="sideCopy">It captures our commitment to providing premium Asian food products that deliver the authentic tastes and culinary heritage of Asia.</p>
            <em className="note perfect">Perfect bite :)</em>
          </div>
          <div className="storyLayer tasteLayer">
            <em className="note authentic"><span className="handArrow" aria-hidden="true"><img src={`${A}handwriting-arrow.svg`} alt="" /></span><span className="handText">Authentic Taste</span></em>
            <div className="copy right">
              <div className="copyLead"><span>02.</span><h2>It begins<br/>with a taste.</h2></div>
              <div className="copyBody"><p>Bringing the authentic flavors and culinary heritage of Southeast Asia to every table.</p><a className="goldBtn" href="#products">Explore Now <Arrow /></a></div>
            </div>
          </div>
        </div>
      </section>
      <section className="products" id="products">
        <div className="productIntro"><div className="sectionHeadingReveal" data-reveal><span>03.</span><h2>Feature Products</h2></div><p className="revealDelay1" data-reveal>From sauces and condiments to coconut milk, rice and ready-to-cook essentials, Kin Dee brings together a wide range of Southeast Asian food products.</p></div>
        <img className="productHero revealDelay1" data-reveal src={`${A}product-main.png`} alt="Kin Dee sauce products" />
        <div className="productCard revealDelay2" data-reveal><strong>Thai Jim Jaew Sauce<br/>(Spicy BBQ Sauce)</strong><small>13.76 oz</small></div><em className="note flavor revealDelay2" data-reveal>Authentic flavor, always.</em>
        <div className="categoryArea revealDelay2" data-reveal><p>Sort by Category</p><div className="categories">{['Honey','Condiments','Ready to cook','Snacks','Coconut Milk','Rice'].map((x,i)=><button className="categoryCard" key={x}><span className="categoryImage" style={{backgroundPosition:`${i * 20}% 15%`}}/><span>{x}<b>›</b></span></button>)}</div></div>
      </section>
      <section className="quality" id="quality">
        <div className="copy left light"><div className="sectionHeadingReveal" data-reveal><span>04.</span><h2>Quality Starts<br/>With What Goes In.</h2></div><p className="revealDelay1" data-reveal>We carefully select ingredients and maintain high standards of food quality and safety — because great flavor begins long before it reaches the table.</p><a className="goldBtn revealDelay2" data-reveal href="#service">Learn more <Arrow /></a></div>
        <img className="revealDelay1" data-reveal src={`${A}ingredients.png`} alt="Fresh lime, garlic, chili and herbs" /><em className="note selected revealDelay2" data-reveal>carefully selected ↑</em>
      </section>
      <section className="service" id="service">
        <div className="serviceCopy"><div className="sectionHeadingReveal" data-reveal><span>05.</span><h2>Every Bite<br/>Tells a Story.</h2></div><p className="revealDelay1" data-reveal>We believe in protecting the environment for future generations by partnering with suppliers who practice sustainable farming.</p><a className="outlineBtn revealDelay2" data-reveal href="#catalog">Our Service <Arrow /></a></div>
        <div className="values revealDelay1" data-reveal>{[["plant.svg","Sustainable Farming","Partnering with suppliers who practice sustainable farming."],["medal.svg","Quality from the Source","Carefully managed from sourcing through processing."],["mountains.svg","Traceable Ingredients","Raw materials can be traced back to their source."]].map(([icon,title,body])=><article key={title}><img src={A+icon} alt=""/><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>
      <section className="catalog" id="catalog"><div className="copy left light"><div className="sectionHeadingReveal" data-reveal><span>04.</span><h2>Bring More to<br/>the Table.</h2></div><p className="revealDelay1" data-reveal>Explore Kin Dee’s complete range of Southeast Asian food products, from everyday essentials to authentic regional flavors.</p><a className="outlineBtn revealDelay2" data-reveal href="#">Download Catalog</a></div><img className="revealDelay1" data-reveal src={`${A}catalog.png`} alt="Kin Dee product catalog and ingredients"/><em className="note discover revealDelay2" data-reveal>there’s always more to discover</em></section>
      <footer><div className="footerMain" data-reveal><div><img className="footerLogo" src={`${A}logo.png`} alt="Kin Dee"/><div className="links"><div><a href="#about">About</a><a href="#products">Products</a><a href="#service">Services</a><a href="#">Recipes</a><a href="#">Contact</a></div><div><a href="#">Terms</a><a href="#">Privacy</a><a href="#">Cookies</a></div></div></div><div className="sealGrid">{Array.from({length:14},(_,i)=><img src={`${A}badge-${String(i+1).padStart(2,'0')}.png`} alt="" key={i}/>)}</div></div><div className="copyright revealDelay1" data-reveal><span>©THE KIN DEE CO., LTD.</span><span className="socials"><img src={`${A}social-fb.svg`} alt="Facebook"/><img src={`${A}social-x.svg`} alt="X"/><img src={`${A}social-linkedin.svg`} alt="LinkedIn"/><img src={`${A}social-ig.svg`} alt="Instagram"/></span></div></footer>
    </main>
  );
}
