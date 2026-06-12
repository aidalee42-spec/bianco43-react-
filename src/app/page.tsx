"use client";

import { useState, useEffect, useRef } from "react";
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
  Globe,
  Share,
  MapPin,
  Phone,
  Mail,
  Clock,
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
   Section label  e.g. "OUR MENU"
   ───────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-8 h-px bg-gold" />
      <span className="text-[0.65rem] tracking-[0.22em] uppercase text-gold font-medium">
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
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", date: "", guests: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, date, guests, message } = formState;
    const sub = encodeURIComponent("Booking Enquiry — Bianco43");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nGuests: ${guests}\nMessage: ${message}`
    );
    window.location.href = `mailto:info@bianco43.com?subject=${sub}&body=${body}`;
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  /* ── Services data ── */
  const services = [
    {
      title: "Private Dining",
      tagline: "An intimate culinary journey",
      desc: "Reserve our private dining room for an unforgettable evening. Each course is paired with the finest Italian wines from our cellar.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      features: [
        { icon: ChefHat, text: "Michelin-trained chef" },
        { icon: Wine, text: "Curated wine pairings" },
        { icon: Users, text: "Up to 40 guests" },
      ],
    },
    {
      title: "Premium Catering",
      tagline: "Exceptional cuisine, anywhere",
      desc: "From corporate galas to intimate celebrations, our catering service brings the Bianco43 experience to your venue across London.",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
      features: [
        { icon: Truck, text: "London-wide delivery" },
        { icon: CalendarCheck, text: "Full event planning" },
        { icon: Sparkles, text: "Bespoke menus" },
      ],
    },
    {
      title: "Private Events",
      tagline: "Celebrate in style",
      desc: "Host your wedding reception, milestone birthday, or corporate event at our stunning Northumberland Avenue venue or your chosen location.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      features: [
        { icon: PartyPopper, text: "Celebrations & weddings" },
        { icon: Utensils, text: "Custom multi-course menu" },
        { icon: Users, text: "Dedicated event team" },
      ],
    },
  ];

  /* ── Gallery images ── */
  const gallery = [
    { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80", alt: "Plated dish", span: "row-span-2" },
    { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80", alt: "Pizza", span: "" },
    { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80", alt: "Salad", span: "" },
    { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80", alt: "Dessert", span: "" },
    { src: "https://images.unsplash.com/photo-1539735257881-5b7e1e8ee9f8?w=600&q=80", alt: "Pasta", span: "" },
    { src: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80", alt: "Wine", span: "row-span-2" },
  ];

  /* ── Pricing plans ── */
  const plans = [
    {
      name: "Intimo",
      price: "£65",
      period: "/person",
      desc: "An intimate tasting experience",
      popular: false,
      features: [
        { icon: Utensils, text: "3-course set menu" },
        { icon: Wine, text: "1 glass of prosecco" },
        { icon: ChefHat, text: "Chef's amuse-bouche" },
        { icon: Users, text: "Standard seating" },
      ],
    },
    {
      name: "Signatura",
      price: "£95",
      period: "/person",
      desc: "Our most requested experience",
      popular: true,
      features: [
        { icon: Utensils, text: "5-course tasting menu" },
        { icon: Wine, text: "Wine pairing (3 glasses)" },
        { icon: ChefHat, text: "Chef's table visit" },
        { icon: Sparkles, text: "Welcome cocktail" },
        { icon: Users, text: "Premium seating" },
      ],
    },
    {
      name: "Esclusivo",
      price: "£165",
      period: "/person",
      desc: "The ultimate Bianco43 experience",
      popular: false,
      features: [
        { icon: Utensils, text: "8-course degustation" },
        { icon: Wine, text: "Full wine pairing" },
        { icon: ChefHat, text: "Private chef's table" },
        { icon: Sparkles, text: "Champagne reception" },
        { icon: CalendarCheck, text: "Priority booking" },
        { icon: PartyPopper, text: "Complimentary dessert" },
      ],
    },
  ];

  /* ── Testimonials ── */
  const testimonials = [
    {
      name: "Sophie Harrington",
      role: "Corporate Events Director",
      text: "Bianco43 catered our annual gala for 200 guests. The attention to detail and quality of the food was extraordinary. Truly a world-class experience.",
    },
    {
      name: "James Montague",
      role: "Food Critic, London Review",
      text: "The tasting menu at Bianco43 is a masterclass in modern Italian cuisine. Every dish tells a story. This is dining as theatre.",
    },
    {
      name: "Elena Rossi",
      role: "Private Client",
      text: "We booked Bianco43 for our wedding reception. From the first consultation to the last course, everything was flawless. Our guests are still talking about it.",
    },
  ];

  /* ── FAQ data ── */
  const faqs = [
    {
      q: "How do I make a reservation?",
      a: "You can book directly through our online form, call us at +44 20 7946 0430, or visit us at 7 Northumberland Avenue. We recommend booking at least two weeks in advance for weekend dining.",
    },
    {
      q: "Do you accommodate dietary restrictions?",
      a: "Absolutely. Our chefs are happy to accommodate vegetarian, vegan, gluten-free, and other dietary requirements. Please inform us at least 48 hours before your reservation.",
    },
    {
      q: "What is your cancellation policy?",
      a: "We require 24 hours' notice for cancellations. Late cancellations may incur a charge of £25 per person. Private event cancellations require 7 days' notice.",
    },
    {
      q: "Do you offer private dining for large groups?",
      a: "Yes. Our private dining room accommodates up to 40 guests, and we can host larger events of up to 200 guests through our premium catering service. Contact our events team for a custom quote.",
    },
    {
      q: "What is the dress code?",
      a: "We maintain a smart-casual dress code. For evening dining and special events, we recommend cocktail attire. We want you to feel elegant and comfortable.",
    },
  ];

  return (
    <>
      {/* ════════════════════════════════════
          HEADER
          ════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-header scrolled shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-serif text-xl md:text-2xl tracking-[0.04em] text-charcoal">
              Bianco<span className="text-gold">43</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-[0.12em] uppercase text-charcoal/70 hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-gold hover:bg-gold-dark text-charcoal text-xs tracking-[0.15em] uppercase font-medium px-6 py-2.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
            >
              Reserve a Table
            </a>
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <a
              href="#contact"
              className="bg-gold text-charcoal text-[0.65rem] tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-sm"
            >
              Book
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-charcoal p-1"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile overlay */}
        <div
          className={`lg:hidden fixed inset-0 top-16 bg-cream-light z-40 flex flex-col items-center justify-center gap-8 transition-all duration-400 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-xl tracking-[0.15em] uppercase text-charcoal/80 hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="bg-gold text-charcoal text-sm tracking-[0.15em] uppercase font-medium px-8 py-3 rounded-sm mt-4"
          >
            Reserve a Table
          </a>
        </div>
      </header>

      <main>
        {/* ════════════════════════════════════
            HERO
            ════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center bg-charcoal overflow-hidden"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
              alt=""
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-24 md:pt-40 md:pb-32">
            <FadeInUp>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 mb-8">
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-gold/80 border border-gold/20 px-3 py-1.5 rounded-sm">
                  <Star size={10} className="fill-gold text-gold" /> Michelin Recommended
                </span>
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-gold/80 border border-gold/20 px-3 py-1.5 rounded-sm">
                  <Star size={10} className="fill-gold text-gold" /> Award-Winning Catering
                </span>
              </div>
            </FadeInUp>

            <FadeInUp>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.1] max-w-4xl mb-6">
                Authentic Italian{" "}
                <span className="gold-gradient">Fine Dining</span>{" "}
                in the Heart of Westminster
              </h1>
            </FadeInUp>

            <FadeInUp>
              <p className="text-lg md:text-xl text-cream/60 max-w-2xl mb-10 leading-relaxed font-light">
                Experience the artistry of modern Italian cuisine at 7 Northumberland Avenue.
                From intimate dinners to grand celebrations, every moment is crafted with passion.
              </p>
            </FadeInUp>

            <FadeInUp>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#contact"
                  className="bg-gold hover:bg-gold-dark text-charcoal text-sm tracking-[0.15em] uppercase font-medium px-8 py-3.5 rounded-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(201,168,76,0.5)] inline-flex items-center gap-2"
                >
                  Reserve Your Experience <ArrowRight size={14} />
                </a>
                <a
                  href="#menu"
                  className="border border-cream/20 text-cream/80 hover:text-gold hover:border-gold/50 text-sm tracking-[0.15em] uppercase font-medium px-8 py-3.5 rounded-sm transition-all duration-300 inline-flex items-center gap-2"
                >
                  Explore Our Menu
                </a>
              </div>
            </FadeInUp>

            {/* Trust line */}
            <FadeInUp>
              <div className="mt-16 flex flex-wrap items-center gap-8 text-cream/40 text-xs tracking-[0.12em] uppercase">
                <span>Featured in</span>
                <span className="text-cream/60 font-serif text-lg italic">The Times</span>
                <span className="w-px h-4 bg-cream/10" />
                <span className="text-cream/60 font-serif text-lg italic">Michelin Guide</span>
                <span className="w-px h-4 bg-cream/10" />
                <span className="text-cream/60 font-serif text-lg italic">Tatler</span>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ════════════════════════════════════
            ABOUT
            ════════════════════════════════════ */}
        <section id="about" className="py-24 md:py-32 bg-cream-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              {/* Image side */}
              <FadeInUp>
                <div className="relative">
                  <div className="relative overflow-hidden rounded-sm">
                    <Image
                      src="/about-chef.jpg"
                      alt="Chef Fabrizio Margarita at Bianco43"
                      width={640}
                      height={800}
                      className="w-full h-[500px] md:h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
                  </div>
                  {/* Floating stat card */}
                  <div className="absolute -bottom-6 -right-6 bg-charcoal text-cream p-6 rounded-sm max-w-[180px] shadow-xl">
                    <p className="text-3xl font-serif text-gold mb-1">25+</p>
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-cream/60 leading-relaxed">
                      Years of culinary excellence
                    </p>
                  </div>
                </div>
              </FadeInUp>

              {/* Text side */}
              <FadeInUp>
                <SectionLabel>Our Story</SectionLabel>
                <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.15] mb-8">
                  Where Italian Heritage Meets{" "}
                  <span className="gold-gradient">Modern Luxury</span>
                </h2>
                <div className="space-y-5 text-charcoal/65 leading-relaxed">
                  <p>
                    Founded by acclaimed chef <strong className="text-charcoal/85 font-medium">Fabrizio Margarita</strong>,
                    Bianco43 brings the soul of authentic Italian cuisine to one of London&apos;s most prestigious addresses.
                    Every dish is a celebration of tradition, reimagined through a contemporary lens.
                  </p>
                  <p>
                    Our kitchen sources the finest seasonal ingredients from small-batch producers across Italy and
                    the British Isles. From hand-rolled pasta in Emilia-Romagna to organic herbs from our own rooftop
                    garden — every element tells a story of provenance and passion.
                  </p>
                  <p>
                    Whether you join us for an intimate dinner or trust us to cater your most important celebration,
                    you&apos;ll experience the same dedication: flawless technique, bold flavours, and genuine hospitality.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-8">
                  <div>
                    <p className="text-2xl font-serif text-gold">10,000+</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-charcoal/50 mt-1">Guests Served</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif text-gold">150+</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-charcoal/50 mt-1">Events Catered</p>
                  </div>
                  <div>
                    <p className="text-2xl font-serif text-gold">★4.9</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-charcoal/50 mt-1">Guest Rating</p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            MENU / SERVICES
            ════════════════════════════════════ */}
        <section id="menu" className="py-24 md:py-32 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <SectionLabel>Our Services</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.15] mb-6">
                A Complete{" "}
                <span className="gold-gradient">Culinary Experience</span>
              </h2>
              <p className="max-w-2xl mx-auto text-charcoal/65 leading-relaxed">
                From our dining room to your venue, every experience is crafted with the same
                dedication to quality, elegance, and authentic Italian flavour.
              </p>
            </FadeInUp>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <FadeInUp key={service.title}>
                  <div className="group bg-white rounded-sm overflow-hidden border border-border-light transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-gold/30 hover:shadow-gold/5">
                    {/* Image header */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                    </div>
                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-1">
                        {service.tagline}
                      </p>
                      <h3 className="font-serif text-2xl text-charcoal mb-3">{service.title}</h3>
                      <p className="text-sm text-charcoal/65 leading-relaxed mb-6">{service.desc}</p>
                      {/* Features */}
                      <div className="space-y-2.5 mb-6">
                        {service.features.map((feat) => {
                          const Icon = feat.icon;
                          return (
                            <div key={feat.text} className="flex items-center gap-3 text-sm text-charcoal/60">
                              <Icon size={14} className="text-gold shrink-0" />
                              <span>{feat.text}</span>
                            </div>
                          );
                        })}
                      </div>
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-charcoal/70 hover:text-gold font-medium transition-colors"
                      >
                        Enquire Now <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            GALLERY
            ════════════════════════════════════ */}
        <section id="gallery" className="py-24 md:py-32 bg-cream-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <SectionLabel>Gallery</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.15] mb-6">
                A Feast for the{" "}
                <span className="gold-gradient">Eyes</span>
              </h2>
              <p className="max-w-2xl mx-auto text-charcoal/65 leading-relaxed">
                Every dish at Bianco43 is a work of art. Browse our visual journey through
                flavours, textures, and unforgettable moments.
              </p>
            </FadeInUp>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
              {gallery.map((item) => (
                <FadeInUp key={item.alt}>
                  <div className={`relative overflow-hidden rounded-sm group cursor-pointer ${item.span || ""}`}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-cream text-sm tracking-[0.15em] uppercase transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        View
                      </span>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            PRICING
            ════════════════════════════════════ */}
        <section id="pricing" className="py-24 md:py-32 bg-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.15] mb-6">
                Choose Your{" "}
                <span className="gold-gradient">Experience</span>
              </h2>
              <p className="max-w-2xl mx-auto text-charcoal/65 leading-relaxed">
                From an intimate tasting to a grand degustation — find the perfect menu for your evening.
              </p>
            </FadeInUp>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => {
                const Icon = plan.features[0]?.icon || Utensils;
                return (
                  <FadeInUp key={plan.name}>
                    <div
                      className={`relative bg-white rounded-sm border ${
                        plan.popular ? "border-gold/40 shadow-lg shadow-gold/5" : "border-border-light"
                      } p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-charcoal text-[0.55rem] tracking-[0.2em] uppercase font-semibold px-4 py-1 rounded-sm">
                          Most Popular
                        </div>
                      )}

                      <div className="mb-6">
                        <Icon size={22} className="text-gold mb-4" />
                        <h3 className="font-serif text-2xl text-charcoal mb-2">{plan.name}</h3>
                        <p className="text-sm text-charcoal/55">{plan.desc}</p>
                      </div>

                      <div className="mb-8">
                        <span className="font-serif text-4xl text-charcoal">{plan.price}</span>
                        <span className="text-sm text-charcoal/45 ml-1">{plan.period}</span>
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feat) => {
                          const FIcon = feat.icon;
                          return (
                            <li key={feat.text} className="flex items-start gap-3 text-sm text-charcoal/65">
                              <FIcon size={14} className="text-gold shrink-0 mt-0.5" />
                              <span>{feat.text}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <a
                        href="#contact"
                        className={`block w-full text-center text-sm tracking-[0.15em] uppercase font-medium py-3 rounded-sm transition-all duration-300 ${
                          plan.popular
                            ? "bg-green hover:bg-green-light text-cream"
                            : "border border-charcoal/15 text-charcoal/70 hover:bg-green hover:text-cream hover:border-green"
                        }`}
                      >
                        {plan.popular ? "Book Now" : "Select Experience"}
                      </a>
                    </div>
                  </FadeInUp>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            TESTIMONIALS — Marquee
            ════════════════════════════════════ */}
        <section className="py-24 md:py-32 bg-cream-light overflow-hidden relative">
          {/* SVG pattern background */}
          <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="testimonial-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#1a1c1e" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#testimonial-dots)" />
            </svg>
          </div>

          <div className="relative z-10">
            <FadeInUp className="text-center mb-14 px-6">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.15]">
                What Our <span className="gold-gradient">Guests Say</span>
              </h2>
            </FadeInUp>

            <div className="group">
              <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
                {/* Triplicated for seamless loop */}
                {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                  <div
                    key={`${t.name}-${i}`}
                    className="w-[340px] md:w-[400px] shrink-0 bg-white rounded-sm p-6 md:p-8 border border-border-light flex flex-col"
                  >
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} size={12} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <blockquote className="text-sm md:text-base text-charcoal/70 leading-relaxed flex-1 italic">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <div className="mt-5 pt-5 border-t border-border-light">
                      <p className="text-sm font-medium text-charcoal">{t.name}</p>
                      <p className="text-xs text-charcoal/45 tracking-[0.1em]">{t.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FAQ
            ════════════════════════════════════ */}
        <section id="faq" className="py-24 md:py-32 bg-cream">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <FadeInUp className="text-center mb-16">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.15] mb-6">
                Questions?{" "}
                <span className="gold-gradient">We&apos;ve Answers</span>
              </h2>
              <p className="max-w-2xl mx-auto text-charcoal/65 leading-relaxed">
                Everything you need to know before your visit. If you don&apos;t see your question here,
                please don&apos;t hesitate to contact us.
              </p>
            </FadeInUp>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FadeInUp key={i}>
                  <div
                    className={`bg-white rounded-sm border ${
                      openFaq === i ? "border-gold/40" : "border-border-light"
                    } transition-all duration-300`}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm md:text-base font-medium text-charcoal pr-4">{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gold shrink-0 transition-transform duration-300 ${
                          openFaq === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-400 ${
                        openFaq === i ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-6 pb-5 text-sm text-charcoal/65 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            BOOKING / CONTACT FORM
            ════════════════════════════════════ */}
        <section id="contact" className="py-24 md:py-32 bg-cream-light">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
              {/* Left — Text */}
              <FadeInUp>
                <SectionLabel>Reservations</SectionLabel>
                <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-[1.15] mb-8">
                  Reserve Your{" "}
                  <span className="gold-gradient">Table</span>
                </h2>
                <p className="text-charcoal/65 leading-relaxed mb-10">
                  Whether it&apos;s an intimate dinner for two or a celebration with friends,
                  we look forward to welcoming you. Fill in the form and our team will confirm
                  your reservation within 24 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Address</p>
                      <p className="text-sm text-charcoal/55">7 Northumberland Avenue, London, WC2N 5BY</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone size={18} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Phone</p>
                      <p className="text-sm text-charcoal/55">+44 20 7946 0430</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Email</p>
                      <p className="text-sm text-charcoal/55">info@bianco43.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock size={18} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-charcoal">Opening Hours</p>
                      <p className="text-sm text-charcoal/55">Mon—Sat: 12:00—22:30 | Sun: 12:00—21:00</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>

              {/* Right — Form */}
              <FadeInUp>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-sm border border-border-light p-8 md:p-10"
                >
                  <h3 className="font-serif text-2xl text-charcoal mb-6">Make a Reservation</h3>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs tracking-[0.15em] uppercase text-charcoal/60 mb-1.5">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full border border-border-light bg-cream-light rounded-sm px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs tracking-[0.15em] uppercase text-charcoal/60 mb-1.5">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full border border-border-light bg-cream-light rounded-sm px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50 transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-xs tracking-[0.15em] uppercase text-charcoal/60 mb-1.5">
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          className="w-full border border-border-light bg-cream-light rounded-sm px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50 transition-colors"
                          placeholder="+44"
                        />
                      </div>
                      <div>
                        <label htmlFor="guests" className="block text-xs tracking-[0.15em] uppercase text-charcoal/60 mb-1.5">
                          Guests
                        </label>
                        <select
                          id="guests"
                          name="guests"
                          value={formState.guests}
                          onChange={handleChange}
                          required
                          className="w-full border border-border-light bg-cream-light rounded-sm px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold/50 transition-colors"
                        >
                          <option value="">Select...</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                          ))}
                          <option value="10+">10+ Guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="date" className="block text-xs tracking-[0.15em] uppercase text-charcoal/60 mb-1.5">
                        Preferred Date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={formState.date}
                        onChange={handleChange}
                        className="w-full border border-border-light bg-cream-light rounded-sm px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-gold/50 transition-colors [color-scheme:light]"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs tracking-[0.15em] uppercase text-charcoal/60 mb-1.5">
                        Special Requests
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formState.message}
                        onChange={handleChange}
                        className="w-full border border-border-light bg-cream-light rounded-sm px-4 py-2.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                        placeholder="Dietary requirements, occasion, etc."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green hover:bg-green-light text-cream text-sm tracking-[0.15em] uppercase font-medium py-3.5 rounded-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <Mail size={14} />
                      Send Reservation Request
                    </button>
                    <p className="text-[0.65rem] text-charcoal/40 text-center">
                      We&apos;ll confirm your booking within 24 hours. No payment is required to reserve.
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
      <footer className="bg-charcoal text-cream/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <span className="font-serif text-2xl tracking-[0.04em] text-cream">
                Bianco<span className="text-gold">43</span>
              </span>
              <p className="mt-4 text-sm leading-relaxed text-cream/45 max-w-xs">
                Authentic Italian fine dining and premium catering in the heart of Westminster, London.
              </p>
              <div className="flex gap-3 mt-6">
                {[Globe, Share].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-sm border border-cream/10 flex items-center justify-center text-cream/30 hover:text-gold hover:border-gold/30 transition-all duration-300"
                    aria-label={`Social link ${i}`}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-cream/70 font-medium mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "About", "Menu", "Gallery", "Pricing", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-cream/45 hover:text-gold transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-cream/70 font-medium mb-5">Contact</h4>
              <ul className="space-y-3 text-sm text-cream/45">
                <li>7 Northumberland Ave</li>
                <li>London, WC2N 5BY</li>
                <li>
                  <a href="tel:+442079460430" className="hover:text-gold transition-colors">
                    +44 20 7946 0430
                  </a>
                </li>
                <li>
                  <a href="mailto:info@bianco43.com" className="hover:text-gold transition-colors">
                    info@bianco43.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-cream/70 font-medium mb-5">Opening Hours</h4>
              <ul className="space-y-3 text-sm text-cream/45">
                <li>
                  <span className="text-cream/60">Mon—Thu:</span> 12:00—22:30
                </li>
                <li>
                  <span className="text-cream/60">Fri—Sat:</span> 12:00—23:00
                </li>
                <li>
                  <span className="text-cream/60">Sunday:</span> 12:00—21:00
                </li>
              </ul>
              <p className="mt-4 text-xs text-cream/30 italic">Last seating 45 min before close</p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-cream/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/30">
            <p>&copy; {new Date().getFullYear()} Bianco43. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cream/50 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cream/50 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
