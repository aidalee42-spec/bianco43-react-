"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ChefHat,
  Wine,
  Users,
  Utensils,
  CalendarCheck,
  Sparkles,
  PartyPopper,
  Truck,
  ArrowRight,
  Star,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Clock,
  Quote,
  ChevronLeft,
  ChevronRight,
  Award,
  Shield,
  CheckCircle,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Fade-in-up scroll reveal
   ───────────────────────────────────────────── */
function FadeInUp({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section label
   ───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-px bg-muted-gold" />
      <span className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-gold font-medium">
        {children}
      </span>
    </div>
  );
}

/* ═════════════════════════════════════════════
   HOME PAGE
   ═════════════════════════════════════════════ */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── FAQ accordion ── */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ── Testimonial carousel ── */
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  /* ── Before/After slider ── */
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      handleSliderMove(clientX);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [isDragging, handleSliderMove]);

  /* ── Form ── */
  const [formState, setFormState] = useState({
    name: "", email: "", phone: "", eventDate: "", guestCount: "", serviceType: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sub = encodeURIComponent("Booking & Catering Enquiry — Bianco43");
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nDate: ${formState.eventDate}\nGuests: ${formState.guestCount}\nService: ${formState.serviceType}\nMessage: ${formState.message}`
    );
    window.location.href = `mailto:info@bianco43.com?subject=${sub}&body=${body}`;
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  /* ── Services ── */
  const services = [
    {
      title: "Fine Dining",
      tagline: "An evening to remember",
      desc: "Experience modern Italian cuisine at its finest. Every dish is crafted by Chef Fabrizio Margarita using the freshest seasonal ingredients from Italy and the British Isles.",
      features: [
        { icon: ChefHat, text: "Michelin-level technique" },
        { icon: Wine, text: "Curated Italian wine cellar" },
        { icon: Users, text: "Intimate atmosphere" },
      ],
    },
    {
      title: "Corporate Catering",
      tagline: "Impress every guest",
      desc: "From boardroom lunches to grand galas, our premium catering service transforms your corporate event into an unforgettable culinary experience.",
      features: [
        { icon: Truck, text: "London-wide delivery & setup" },
        { icon: CalendarCheck, text: "Full event coordination" },
        { icon: Sparkles, text: "Bespoke menu design" },
      ],
    },
    {
      title: "Private Events",
      tagline: "Celebrate with elegance",
      desc: "Whether a wedding reception, milestone birthday, or exclusive dinner party, we bring the Bianco43 experience to your chosen venue.",
      features: [
        { icon: PartyPopper, text: "Weddings & celebrations" },
        { icon: Utensils, text: "Custom multi-course menus" },
        { icon: Users, text: "Dedicated event manager" },
      ],
    },
  ];

  /* ── Pricing ── */
  const plans = [
    {
      name: "Essential Buffet",
      price: "£45",
      period: "/person",
      desc: "Perfect for casual corporate events and celebrations",
      popular: false,
      features: [
        "Selection of 4 antipasti",
        "Choice of 2 primi piatti",
        "Seasonal dessert station",
        "Coffee & tea service",
        "Standard service staff",
      ],
    },
    {
      name: "Premium Plated",
      price: "£85",
      period: "/person",
      desc: "Our most popular tier for weddings and galas",
      popular: true,
      features: [
        "Welcome prosecco reception",
        "3-course plated menu",
        "Wine pairing (2 glasses)",
        "Chef's amuse-bouche",
        "Dedicated event manager",
        "Custom menu consultation",
      ],
    },
    {
      name: "Elite Private Chef",
      price: "£150",
      period: "/person",
      desc: "The ultimate white-glove dining experience",
      popular: false,
      features: [
        "Champagne reception",
        "6-course degustation menu",
        "Full sommelier wine pairing",
        "Private chef tableside service",
        "Bespoke menu & table styling",
        "Complimentary digestivo bar",
        "Post-event photography",
      ],
    },
  ];

  /* ── Testimonials ── */
  const testimonials = [
    {
      name: "Sophie Harrington",
      role: "Corporate Events Director, Barclays",
      text: "Bianco43 catered our annual gala for 200 guests. The attention to detail was extraordinary — from the menu design to the table presentation. Truly world-class.",
    },
    {
      name: "James Montague",
      role: "Food Critic, London Review",
      text: "Chef Margarita's tasting menu is a masterclass in modern Italian cuisine. Every element tells a story. This is dining as theatre.",
    },
    {
      name: "Elena & Marco Rossi",
      role: "Wedding Client",
      text: "Our wedding reception was flawless. Bianco43's team handled everything with grace and professionalism. Our guests are still raving about the food months later.",
    },
  ];

  /* ── FAQ ── */
  const faqs = [
    {
      q: "What is your minimum guest count for catering?",
      a: "Our corporate catering service requires a minimum of 20 guests. For private events and intimate dining, we can accommodate smaller parties starting from 10 guests. Contact us for bespoke arrangements.",
    },
    {
      q: "How far in advance should I book?",
      a: "We recommend booking at least 3–4 weeks in advance for corporate events and 6–8 weeks for wedding receptions. For intimate dining reservations, 2 weeks' notice is preferred.",
    },
    {
      q: "Do you accommodate dietary restrictions?",
      a: "Absolutely. Our chefs are experienced in catering to vegetarian, vegan, gluten-free, and allergen-specific requirements. We'll work with you to create a menu that suits all your guests.",
    },
    {
      q: "What areas do you service for catering?",
      a: "We provide premium catering across Greater London, with a focus on Westminster, the City, Canary Wharf, and surrounding areas. For events outside London, please enquire for a custom quote.",
    },
    {
      q: "Can I arrange a tasting before booking?",
      a: "Yes. For our Premium Plated and Elite Private Chef packages, we offer a complimentary tasting session for the hosting party (up to 4 guests) at our Northumberland Avenue venue.",
    },
  ];

  return (
    <>
      {/* ════════════════════════════════════
          HEADER
          ════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-header scrolled" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl tracking-[0.04em] text-warm-cream">
              Bianco<span className="text-muted-gold">43</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-[0.12em] uppercase text-warm-cream/60 hover:text-muted-gold transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-muted-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-muted-gold hover:bg-muted-gold-dark text-near-black text-xs tracking-[0.15em] uppercase font-medium px-6 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              Book a Table
            </a>
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
            <a
              href="#contact"
              className="bg-muted-gold text-near-black text-[0.65rem] tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-sm"
            >
              Book
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-warm-cream p-1"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-16 bg-near-black z-40 flex flex-col items-center justify-center gap-8 transition-all duration-400 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl tracking-[0.15em] uppercase text-warm-cream/70 hover:text-muted-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="bg-muted-gold text-near-black text-sm tracking-[0.15em] uppercase font-medium px-8 py-3 rounded-sm mt-4"
          >
            Book a Table
          </a>
        </div>
      </header>

      <main>
        {/* ════════════════════════════════════
            HERO
            ════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
              alt=""
              fill
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/95 via-dark-bg/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-24 md:pt-40 md:pb-32">
            <FadeInUp>
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-muted-gold/80 border border-muted-gold/20 px-3 py-1.5 rounded-sm">
                  <Award size={10} className="text-muted-gold" /> Award-Winning Catering
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-muted-gold/80 border border-muted-gold/20 px-3 py-1.5 rounded-sm">
                  <Shield size={10} className="text-muted-gold" /> Michelin Recommended
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-muted-gold/80 border border-muted-gold/20 px-3 py-1.5 rounded-sm">
                  <CheckCircle size={10} className="text-muted-gold" /> 500+ Events
                </span>
              </div>
            </FadeInUp>

            <FadeInUp>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-warm-cream leading-[1.1] max-w-4xl mb-6">
                Authentic Italian{" "}
                <span className="gold-gradient">Fine Dining</span>{" "}
                & Premium Catering
              </h1>
            </FadeInUp>

            <FadeInUp>
              <p className="text-lg md:text-xl text-warm-grey max-w-2xl mb-10 leading-relaxed">
                Experience the artistry of Chef Fabrizio Margarita at 7 Northumberland Avenue.
                From intimate dinners to grand corporate events — every moment is crafted with passion.
              </p>
            </FadeInUp>

            <FadeInUp>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#contact"
                  className="bg-muted-gold hover:bg-muted-gold-dark text-near-black text-sm tracking-[0.15em] uppercase font-medium px-8 py-3.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.5)] inline-flex items-center gap-2 shadow-lg shadow-muted-gold/20"
                >
                  Book a Table <ArrowRight size={14} />
                </a>
                <a
                  href="#pricing"
                  className="border border-warm-cream/15 text-warm-cream/70 hover:text-muted-gold hover:border-muted-gold/40 text-sm tracking-[0.15em] uppercase font-medium px-8 py-3.5 rounded-sm transition-all duration-300"
                >
                  View Catering Packages
                </a>
              </div>
            </FadeInUp>

            <FadeInUp>
              <div className="mt-16 flex flex-wrap items-center gap-8 text-warm-cream/30 text-xs tracking-[0.12em] uppercase">
                <span>Trusted by</span>
                <span className="text-warm-cream/50 font-serif text-lg italic">Barclays</span>
                <span className="w-px h-4 bg-warm-cream/10" />
                <span className="text-warm-cream/50 font-serif text-lg italic">The Ritz</span>
                <span className="w-px h-4 bg-warm-cream/10" />
                <span className="text-warm-cream/50 font-serif text-lg italic">Bloomberg</span>
                <span className="w-px h-4 bg-warm-cream/10" />
                <span className="text-warm-cream/50 font-serif text-lg italic">LSE</span>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ════════════════════════════════════
            ABOUT US
            ════════════════════════════════════ */}
        <section id="about" className="py-24 md:py-32 bg-near-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <FadeInUp>
                <SectionLabel>About Us</SectionLabel>
                <h2 className="font-serif text-4xl md:text-5xl text-warm-cream leading-[1.15] mb-8">
                  The Man Behind{" "}
                  <span className="gold-gradient">Bianco43</span>
                </h2>
                <div className="space-y-5 text-warm-cream/55 leading-relaxed">
                  <p>
                    <strong className="text-warm-cream/80 font-medium">Fabrizio Margarita</strong> is the heart and soul
                    of Bianco43. With over 25 years of culinary mastery — from Michelin-starred kitchens in Milan to
                    London&apos;s most prestigious venues — he brings an uncompromising commitment to quality.
                  </p>
                  <p>
                    Every dish that leaves our kitchen reflects a philosophy rooted in simplicity and respect for
                    the ingredient. We source the finest seasonal produce from small-batch Italian producers and
                    artisan British growers, ensuring each bite tells a story of provenance and passion.
                  </p>
                  <p>
                    Whether you&apos;re joining us for an intimate dinner or entrusting us with your company&apos;s
                    most important celebration, Fabrizio and his team deliver an experience that transcends
                    expectations. This isn&apos;t just food — it&apos;s our legacy.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-8">
                  <div>
                    <p className="text-2xl font-serif text-muted-gold">25+</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-warm-grey mt-1">Years Experience</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif text-muted-gold">500+</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-warm-grey mt-1">Events Catered</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif text-muted-gold">★ 4.9</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-warm-grey mt-1">Average Rating</p>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted-gold hover:text-muted-gold-light font-medium transition-colors"
                >
                  Meet Chef Fabrizio <ArrowRight size={14} />
                </a>
              </FadeInUp>

              <FadeInUp>
                <div className="relative">
                  <div className="relative overflow-hidden rounded-sm">
                    <Image
                      src="/about-chef.jpg"
                      alt="Chef Fabrizio Margarita — Owner & Managing Director of Bianco43"
                      width={640}
                      height={800}
                      className="w-full h-[550px] md:h-[650px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-near-black/50 to-transparent" />
                  </div>
                  <div className="absolute -bottom-5 -left-5 bg-dark-bg border border-light-border text-warm-cream p-5 rounded-sm max-w-[200px]">
                    <p className="text-xs tracking-[0.15em] uppercase text-muted-gold mb-1">Owner / MD</p>
                    <p className="font-serif text-lg text-warm-cream">Fabrizio Margarita</p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            SERVICES GRID
            ════════════════════════════════════ */}
        <section id="services" className="py-24 md:py-32 bg-dark-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <SectionLabel>Our Services</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-warm-cream leading-[1.15] mb-6">
                Three Pillars of{" "}
                <span className="gold-gradient">Excellence</span>
              </h2>
              <p className="max-w-2xl mx-auto text-warm-cream/50 leading-relaxed">
                Whether dining in, catering out, or celebrating big — we deliver an uncompromising standard of quality.
              </p>
            </FadeInUp>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <FadeInUp key={service.title}>
                  <div className="group bg-dark-bg border border-light-border hover:border-muted-gold/30 rounded-sm p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-muted-gold/5">
                    <div className="w-12 h-12 rounded-sm border border-light-border group-hover:border-muted-gold/30 flex items-center justify-center mb-6 transition-colors">
                      <ChefHat size={20} className="text-muted-gold" />
                    </div>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-gold font-medium mb-2">
                      {service.tagline}
                    </p>
                    <h3 className="font-serif text-2xl text-warm-cream mb-4">{service.title}</h3>
                    <p className="text-sm text-warm-cream/50 leading-relaxed mb-6">{service.desc}</p>
                    <ul className="space-y-2.5">
                      {service.features.map((feat) => {
                        const Icon = feat.icon;
                        return (
                          <li key={feat.text} className="flex items-center gap-3 text-sm text-warm-cream/45">
                            <Icon size={14} className="text-muted-gold shrink-0" />
                            <span>{feat.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            PORTFOLIO — Before/After Slider
            ════════════════════════════════════ */}
        <section id="portfolio" className="py-24 md:py-32 bg-near-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-warm-cream leading-[1.15] mb-6">
                From Empty Space to{" "}
                <span className="gold-gradient">Extraordinary Event</span>
              </h2>
              <p className="max-w-2xl mx-auto text-warm-cream/50 leading-relaxed">
                Drag the slider to reveal how we transform any venue into a stunning culinary experience.
              </p>
            </FadeInUp>

            <FadeInUp>
              <div
                ref={sliderRef}
                className="relative w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden cursor-ew-resize select-none"
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
              >
                {/* After image (full) */}
                <Image
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80"
                  alt="Transformed event setup"
                  fill
                  className="object-cover pointer-events-none"
                  draggable={false}
                />
                {/* Before image (clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80"
                    alt="Empty venue before setup"
                    fill
                    className="object-cover pointer-events-none"
                    draggable={false}
                  />
                </div>
                {/* Labels */}
                <div className="absolute top-4 left-4 bg-near-black/80 text-warm-cream text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm pointer-events-none">
                  Empty Venue
                </div>
                <div className="absolute top-4 right-4 bg-near-black/80 text-muted-gold text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm pointer-events-none">
                  Transformed
                </div>
                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-muted-gold cursor-ew-resize pointer-events-none"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-muted-gold flex items-center justify-center shadow-lg pointer-events-none">
                    <span className="text-near-black text-xs font-bold">&larr;&rarr;</span>
                  </div>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp>
              <div className="mt-12 text-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase text-muted-gold hover:text-muted-gold-light font-medium transition-colors"
                >
                  See Our Full Portfolio <ArrowRight size={14} />
                </a>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ════════════════════════════════════
            PRICING / CATERING TIERS
            ════════════════════════════════════ */}
        <section id="pricing" className="py-24 md:py-32 bg-dark-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <SectionLabel>Catering Packages</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-warm-cream leading-[1.15] mb-6">
                Choose Your{" "}
                <span className="gold-gradient">Experience</span>
              </h2>
              <p className="max-w-2xl mx-auto text-warm-cream/50 leading-relaxed">
                From elegant buffets to white-glove private chef service — find the perfect tier for your event.
              </p>
            </FadeInUp>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <FadeInUp key={plan.name}>
                  <div
                    className={`relative rounded-sm border ${
                      plan.popular
                        ? "border-muted-gold/40 scale-[1.02] bg-dark-bg shadow-xl shadow-muted-gold/5"
                        : "border-light-border bg-dark-bg"
                    } p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-muted-gold text-near-black text-[0.55rem] tracking-[0.2em] uppercase font-semibold px-4 py-1 rounded-sm">
                        Most Popular
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="font-serif text-2xl text-warm-cream mb-2">{plan.name}</h3>
                      <p className="text-sm text-warm-cream/45">{plan.desc}</p>
                    </div>

                    <div className="mb-8">
                      <span className="font-serif text-4xl text-muted-gold">{plan.price}</span>
                      <span className="text-sm text-warm-cream/40 ml-1">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-warm-cream/55">
                          <CheckCircle size={14} className="text-muted-gold shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#contact"
                      className={`block w-full text-center text-sm tracking-[0.15em] uppercase font-medium py-3 rounded-sm transition-all duration-300 ${
                        plan.popular
                          ? "bg-muted-gold text-near-black hover:bg-muted-gold-dark hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          : "border border-warm-cream/15 text-warm-cream/70 hover:bg-muted-gold hover:text-near-black hover:border-muted-gold"
                      }`}
                    >
                      {plan.popular ? "Get a Quote" : "Enquire Now"}
                    </a>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FAQ & SOCIAL PROOF
            ════════════════════════════════════ */}
        <section id="faq" className="py-24 md:py-32 bg-near-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* FAQ */}
            <FadeInUp className="text-center mb-16">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-warm-cream leading-[1.15] mb-6">
                Questions?{" "}
                <span className="gold-gradient">Answered.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-warm-cream/50 leading-relaxed">
                Everything you need to know before booking. Don&apos;t see your question? Reach out.
              </p>
            </FadeInUp>

            <FadeInUp>
              <div className="max-w-3xl mx-auto space-y-3 mb-24">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`rounded-sm border ${
                      openFaq === i ? "border-muted-gold/30" : "border-light-border"
                    } transition-all duration-300`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm md:text-base font-medium text-warm-cream pr-4">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-muted-gold shrink-0 transition-transform duration-300 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-400 ${
                        openFaq === i ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-6 pb-5 text-sm text-warm-cream/55 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeInUp>

            {/* SOCIAL PROOF — Testimonial Carousel */}
            <FadeInUp className="text-center mb-14">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-warm-cream leading-[1.15]">
                What Our{" "}
                <span className="gold-gradient">Clients Say</span>
              </h2>
            </FadeInUp>

            <FadeInUp>
              <div className="max-w-3xl mx-auto relative">
                <div className="bg-dark-bg border border-light-border rounded-sm p-8 md:p-12 min-h-[220px]">
                  <Quote size={32} className="text-muted-gold/30 mb-6" />
                  <div key={testimonialIndex} className="animate-slide-in">
                    <p className="text-lg md:text-xl text-warm-cream/70 leading-relaxed italic mb-8">
                      &ldquo;{testimonials[testimonialIndex].text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted-gold/20 flex items-center justify-center text-muted-gold font-serif text-xl">
                        {testimonials[testimonialIndex].name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-warm-cream">{testimonials[testimonialIndex].name}</p>
                        <p className="text-xs text-warm-grey">{testimonials[testimonialIndex].role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={14} className="fill-muted-gold text-muted-gold" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Carousel controls */}
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded-full border border-light-border hover:border-muted-gold/40 flex items-center justify-center text-warm-cream/50 hover:text-muted-gold transition-all"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === testimonialIndex ? "bg-muted-gold w-6" : "bg-warm-cream/20"
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded-full border border-light-border hover:border-muted-gold/40 flex items-center justify-center text-warm-cream/50 hover:text-muted-gold transition-all"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ════════════════════════════════════
            LEAD CAPTURE — Booking Form
            ════════════════════════════════════ */}
        <section id="contact" className="py-24 md:py-32 bg-dark-bg">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-5 gap-12 md:gap-20">
              {/* Left — Text (2/5) */}
              <FadeInUp className="md:col-span-2">
                <SectionLabel>Reservations</SectionLabel>
                <h2 className="font-serif text-4xl md:text-5xl text-warm-cream leading-[1.15] mb-8">
                  Book Your{" "}
                  <span className="gold-gradient">Experience</span>
                </h2>
                <p className="text-warm-cream/55 leading-relaxed mb-10">
                  Ready to create an unforgettable event? Tell us about your plans and we&apos;ll craft
                  a bespoke menu and experience tailored to your needs.
                </p>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-muted-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warm-cream">Address</p>
                      <p className="text-sm text-warm-grey">
                        7 Northumberland Avenue<br />
                        London, WC2N 5BY, United Kingdom
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={18} className="text-muted-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warm-cream">Phone</p>
                      <p className="text-sm text-warm-grey">+44 20 7946 0430</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-muted-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warm-cream">Email</p>
                      <p className="text-sm text-warm-grey">info@bianco43.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={18} className="text-muted-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-warm-cream">Opening Hours</p>
                      <p className="text-sm text-warm-grey">Mon—Sat: 12:00—22:30 | Sun: 12:00—21:00</p>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-10">
                  <p className="text-xs tracking-[0.2em] uppercase text-warm-cream/40 mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    {["Instagram", "Facebook", "Twitter", "LinkedIn"].map((name) => (
                      <a
                        key={name}
                        href="#"
                        className="w-9 h-9 rounded-sm border border-light-border flex items-center justify-center text-warm-cream/30 hover:text-muted-gold hover:border-muted-gold/30 transition-all duration-300"
                        aria-label={name}
                      >
                        {name.charAt(0)}
                      </a>
                    ))}
                  </div>
                </div>
              </FadeInUp>

              {/* Right — Form (3/5) */}
              <FadeInUp className="md:col-span-3">
                <form
                  onSubmit={handleSubmit}
                  className="bg-dark-bg border border-light-border rounded-sm p-8 md:p-10"
                >
                  <h3 className="font-serif text-2xl text-warm-cream mb-6">Request a Booking or Catering Quote</h3>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs tracking-[0.15em] uppercase text-warm-grey mb-1.5">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full bg-near-black border border-light-border rounded-sm px-4 py-2.5 text-sm text-warm-cream placeholder:text-warm-cream/20 focus:outline-none focus:border-muted-gold/50 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs tracking-[0.15em] uppercase text-warm-grey mb-1.5">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full bg-near-black border border-light-border rounded-sm px-4 py-2.5 text-sm text-warm-cream placeholder:text-warm-cream/20 focus:outline-none focus:border-muted-gold/50 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs tracking-[0.15em] uppercase text-warm-grey mb-1.5">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full bg-near-black border border-light-border rounded-sm px-4 py-2.5 text-sm text-warm-cream placeholder:text-warm-cream/20 focus:outline-none focus:border-muted-gold/50 transition-colors"
                          placeholder="+44"
                        />
                      </div>
                      <div>
                        <label htmlFor="eventDate" className="block text-xs tracking-[0.15em] uppercase text-warm-grey mb-1.5">
                          Event Date *
                        </label>
                        <input
                          id="eventDate"
                          name="eventDate"
                          type="date"
                          required
                          value={formState.eventDate}
                          onChange={handleChange}
                          className="w-full bg-near-black border border-light-border rounded-sm px-4 py-2.5 text-sm text-warm-cream focus:outline-none focus:border-muted-gold/50 transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="guestCount" className="block text-xs tracking-[0.15em] uppercase text-warm-grey mb-1.5">
                          Guest Count *
                        </label>
                        <select
                          id="guestCount"
                          name="guestCount"
                          value={formState.guestCount}
                          onChange={handleChange}
                          required
                          className="w-full bg-near-black border border-light-border rounded-sm px-4 py-2.5 text-sm text-warm-cream focus:outline-none focus:border-muted-gold/50 transition-colors"
                        >
                          <option value="">Select...</option>
                          {[10, 20, 30, 40, 50, 75, 100, 150, 200].map((n) => (
                            <option key={n} value={n}>{n} Guests</option>
                          ))}
                          <option value="200+">200+ Guests</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="serviceType" className="block text-xs tracking-[0.15em] uppercase text-warm-grey mb-1.5">
                          Service Desired *
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formState.serviceType}
                          onChange={handleChange}
                          required
                          className="w-full bg-near-black border border-light-border rounded-sm px-4 py-2.5 text-sm text-warm-cream focus:outline-none focus:border-muted-gold/50 transition-colors"
                        >
                          <option value="">Select...</option>
                          <option value="fine-dining">Fine Dining Reservation</option>
                          <option value="corporate-catering">Corporate Catering</option>
                          <option value="private-event">Private Event</option>
                          <option value="wedding">Wedding Reception</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs tracking-[0.15em] uppercase text-warm-grey mb-1.5">
                        Additional Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full bg-near-black border border-light-border rounded-sm px-4 py-2.5 text-sm text-warm-cream placeholder:text-warm-cream/20 focus:outline-none focus:border-muted-gold/50 transition-colors resize-none"
                        placeholder="Dietary requirements, special requests, venue details..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-muted-gold hover:bg-muted-gold-dark text-near-black text-sm tracking-[0.15em] uppercase font-medium py-3.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.3)] inline-flex items-center justify-center gap-2 shadow-lg shadow-muted-gold/10"
                    >
                      <Mail size={14} />
                      Send Enquiry
                    </button>
                    <p className="text-[0.65rem] text-warm-cream/30 text-center">
                      We&apos;ll respond within 24 hours. No obligation — let&apos;s discuss your vision.
                    </p>
                  </div>
                </form>
              </FadeInUp>
            </div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════
          FOOTER
          ════════════════════════════════════ */}
      <footer className="bg-near-black border-t border-light-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <span className="font-serif text-2xl tracking-[0.04em] text-warm-cream">
                Bianco<span className="text-muted-gold">43</span>
              </span>
              <p className="mt-4 text-sm leading-relaxed text-warm-cream/35 max-w-xs">
                Authentic Italian fine dining and premium catering in the heart of Westminster, London.
                Founded by Chef Fabrizio Margarita.
              </p>
              <div className="flex gap-3 mt-6">
                {["Instagram", "Facebook", "Twitter", "LinkedIn"].map((name) => (
                  <a
                    key={name}
                    href="#"
                    className="w-9 h-9 rounded-sm border border-light-border flex items-center justify-center text-warm-cream/25 hover:text-muted-gold hover:border-muted-gold/30 transition-all duration-300 text-xs"
                    aria-label={name}
                  >
                    {name.charAt(0)}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-warm-cream/60 font-medium mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "About", "Services", "Portfolio", "Pricing", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase() === "home" ? "hero" : link.toLowerCase()}`}
                      className="text-sm text-warm-cream/35 hover:text-muted-gold transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-warm-cream/60 font-medium mb-5">Contact</h4>
              <ul className="space-y-3 text-sm text-warm-cream/35">
                <li>7 Northumberland Avenue</li>
                <li>City of Westminster</li>
                <li>London, WC2N 5BY</li>
                <li className="pt-2">
                  <a href="tel:+442079460430" className="hover:text-muted-gold transition-colors">
                    +44 20 7946 0430
                  </a>
                </li>
                <li>
                  <a href="mailto:info@bianco43.com" className="hover:text-muted-gold transition-colors">
                    info@bianco43.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-warm-cream/60 font-medium mb-5">Opening Hours</h4>
              <ul className="space-y-3 text-sm text-warm-cream/35">
                <li><span className="text-warm-cream/50">Mon—Thu:</span> 12:00—22:30</li>
                <li><span className="text-warm-cream/50">Fri—Sat:</span> 12:00—23:00</li>
                <li><span className="text-warm-cream/50">Sunday:</span> 12:00—21:00</li>
              </ul>
              <p className="mt-4 text-xs text-warm-cream/20 italic">Last seating 45 min before close</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-light-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-cream/20">
            <p>&copy; {new Date().getFullYear()} Bianco43. All rights reserved. City of Westminster, London.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-warm-cream/40 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-warm-cream/40 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
