import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

type Place = { category: string; title: string; description: string; image: string };
const slides = [
  { title: 'ძველი თბილისი', caption: 'ხის აივნები და ვიწრო ქუჩები.', image: 'photo-oldtown' },
  { title: 'ნარიყალა', caption: 'ქალაქი ზემოდან.', image: 'photo-narikala' },
  { title: 'მშვიდობის ხიდი', caption: 'თანამედროვე თბილისის სიმბოლო.', image: 'photo-bridge' },
];
const places: Place[] = [
  { category: 'ისტორია', title: 'ძველი თბილისი', description: 'ვიწრო ქუჩები, ხის აივნები და ქალაქის ცნობილი ხედები.', image: 'photo-oldtown' },
  { category: 'ხედები', title: 'ნარიყალა', description: 'ქალაქის პანორამა მაღლიდან.', image: 'photo-narikala' },
  { category: 'არქიტექტურა', title: 'მშვიდობის ხიდი', description: 'თანამედროვე თბილისის გამორჩეული სიმბოლო.', image: 'photo-bridge' },
];
const route = [
  ['10:00', 'თავისუფლების მოედანი', 'დაიწყე ცენტრალური მოედნიდან და გაუყევი ძველ ქუჩებს.'],
  ['11:00', 'აბანოთუბანი', 'დაათვალიერე აგურის გუმბათები და მშვიდი ეზოები.'],
  ['12:00', 'ნარიყალას ხედები', 'აირჩიე საბაგირო ან ფეხით ასვლა, ამინდის მიხედვით.'],
  ['13:00', 'მშვიდობის ხიდი', 'დაასრულე გასეირნება მტკვრის სანაპიროსთან.'],
];

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container nav-wrap"><a className="logo" href="#home">თბილისი<span>.</span></a><button className="menu-toggle" aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><span/><span/><span/></button><nav id="main-nav" className={`main-nav ${open ? 'open' : ''}`} aria-label="მთავარი ნავიგაცია">{[['#gallery','ხედები'],['#places','ადგილები'],['#route','მარშრუტი'],['#tips','რჩევები'],['#contact','გზამკვლევის მიღება']].map(([href,label]) => <a key={href} className={href === '#contact' ? 'nav-cta' : ''} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav></div></header>;
}
function Slider() {
  const [index, setIndex] = useState(0); const [playing, setPlaying] = useState(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setIndex(i => (i + 1) % slides.length), 5000); return () => window.clearInterval(timer); }, [playing]);
  const change = (step: number) => setIndex(i => (i + step + slides.length) % slides.length);
  return <div className="slider" role="region" aria-roledescription="კარუსელი" aria-label="თბილისის ხედები"><div className="slides" aria-live="polite"><figure className="slide is-active"><div className={`slide-art ${slides[index].image}`} role="img" aria-label={`${slides[index].title} — დეკორატიული ილუსტრაცია`}/><figcaption><strong>{slides[index].title}</strong> — {slides[index].caption}</figcaption></figure></div><div className="slider-controls"><button className="slider-btn" onClick={() => change(-1)} aria-label="წინა სლაიდი">←</button><div className="dots" role="group" aria-label="სლაიდის არჩევა">{slides.map((s,i) => <button key={s.title} className={`dot ${i === index ? 'active' : ''}`} aria-label={`სლაიდი ${i+1}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)}/>)}</div><button className="slider-btn" onClick={() => change(1)} aria-label="შემდეგი სლაიდი">→</button><button className="slider-btn slider-play" aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? 'პაუზა' : 'გაგრძელება'}</button></div></div>;
}
function ContactForm() {
  const [message, setMessage] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const name = String(data.get('name') ?? '').trim(); const email = String(data.get('email') ?? '').trim(); if (!name) { setMessage('გთხოვ, შეიყვანე სახელი.'); return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMessage('გთხოვ, შეიყვანე სწორი ელფოსტა.'); return; } setMessage(`მადლობა, ${name}! ფორმა წარმატებით შემოწმდა. ეს დემო ფორმაა და მონაცემები არ იგზავნება.`); event.currentTarget.reset(); }
  return <form className="guide-form" onSubmit={submit} noValidate><label htmlFor="name">სახელი</label><input id="name" name="name" type="text" autoComplete="name" placeholder="შენი სახელი" required/><label htmlFor="email">ელფოსტა</label><input id="email" name="email" type="email" autoComplete="email" placeholder="name@example.com" required/><button className="button button-light" type="submit">გაგზავნა ↗</button><p className="form-message" role="status" aria-live="polite">{message}</p></form>;
}
export default function App() {
  return <><a className="skip-link" href="#main">მთავარ შინაარსზე გადასვლა</a><Header/><main id="main">
    <section className="hero" id="home" aria-labelledby="hero-title"><div className="hero-art" aria-hidden="true"><span className="sun"/><span className="hill hill-back"/><span className="hill hill-front"/><span className="city-shape"/></div><div className="container hero-content"><p className="eyebrow">ქალაქი, რომელიც არასდროს ჩერდება</p><h1 id="hero-title">აღმოაჩინე<br/><em>თბილისი</em></h1><p className="hero-copy">ძველი ქუჩები, ახალი ენერგია და ისტორიები, რომლებიც ყოველ კუთხეში გელოდება.</p><a className="button button-light" href="#places">დაიწყე აღმოჩენა <span aria-hidden="true">↗</span></a></div><div className="hero-note">თბილისი · საქართველო</div></section>
    <section className="intro section container" aria-labelledby="intro-title"><div className="section-label">01 / ქალაქის ხასიათი</div><div><h2 id="intro-title">ერთი ქალაქი,<br/><span>ათასი ამბავი.</span></h2><p>თბილისი კონტრასტების ქალაქია — აივნებიანი ძველი უბნებიდან თანამედროვე არქიტექტურამდე. ეს გზამკვლევი დაგეხმარება პირველი ნაბიჯების დაგეგმვაში.</p></div></section>
    <section className="gallery section container" id="gallery" aria-labelledby="gallery-title"><div className="section-heading"><div><div className="section-label">02 / ქალაქის ხედები</div><h2 id="gallery-title">თბილისი სხვადასხვა კუთხით</h2></div></div><Slider/></section>
    <section className="places section" id="places" aria-labelledby="places-title"><div className="container"><div className="section-heading"><div><div className="section-label">03 / აუცილებლად სანახავი</div><h2 id="places-title">ქალაქის რჩეული ადგილები</h2></div><p>აირჩიე ადგილი და შექმენი საკუთარი მარშრუტი.</p></div><div className="place-grid">{places.map((place,i) => <article className={`place-card ${i === 0 ? 'place-large' : ''}`} key={place.title}><div className={`place-photo ${place.image}`} role="img" aria-label={`${place.title} — დეკორატიული ილუსტრაცია`}/><div className="card-content"><span className="tag">{place.category}</span><h3>{place.title}</h3><p>{place.description}</p><a href="#route" className="text-link">მარშრუტის ნახვა ↗</a></div></article>)}</div></div></section>
    <section className="route-section section" id="route" aria-labelledby="route-title"><div className="container route-layout"><div><div className="section-label">04 / ნახევარი დღის გეგმა</div><h2 id="route-title">თბილისი<br/><span>ფეხით</span></h2><p className="route-intro">მარტივი მარშრუტი მათთვის, ვისაც ქალაქის ცენტრის გაცნობა სურს.</p><a className="button button-dark" href="#contact">გზამკვლევის მიღება ↗</a></div><ol className="timeline">{route.map(([time,title,desc]) => <li key={time}><span className="time">{time}</span><div><h3>{title}</h3><p>{desc}</p></div></li>)}</ol></div></section>
    <section className="tips section container" id="tips" aria-labelledby="tips-title"><div className="section-heading"><div><div className="section-label">05 / სასარგებლო რჩევები</div><h2 id="tips-title">მცირე რჩევები,<br/>უკეთესი მოგზაურობა.</h2></div></div><div className="tip-grid"><article><span className="tip-number">01</span><h3>კომფორტული ფეხსაცმელი</h3><p>ძველი ქალაქის ქუჩები ზოგან ქვაფენილია და აღმართებიც შეგხვდება.</p></article><article><span className="tip-number">02</span><h3>დატოვე დრო აღმოჩენისთვის</h3><p>საინტერესო ეზოები და კაფეები ხშირად მთავარ ქუჩებს მიღმაა.</p></article><article><span className="tip-number">03</span><h3>შეამოწმე ამინდი</h3><p>განსაკუთრებით თუ საბაგიროთი ან ღია სივრცეებში გეგმავ გადაადგილებას.</p></article></div></section>
    <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-wrap"><div><div className="section-label">06 / შენი მოგზაურობა</div><h2 id="contact-title">დაგეგმე შენი<br/><em>თბილისი.</em></h2><p>შეავსე ფორმა და მიიღე გზამკვლევის დემო-დადასტურება.</p></div><ContactForm/></div></section>
  </main><footer className="site-footer"><div className="container footer-inner"><a className="logo" href="#home">თბილისი<span>.</span></a><p>სასწავლო ვებპროექტი · Front-end პროგრამირება</p><a href="#home" className="back-top">ზემოთ ↑</a></div></footer></>;
}
