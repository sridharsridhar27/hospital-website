import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Bone,
  HeartPulse,
  Stethoscope,
  HelpCircle,
  Image as ImageIcon,
  ArrowUpRight,
  Users,
} from 'lucide-react';

import Appointment from '../components/Appointment';

/* ------------------------------------------------------------------ */
/* Submenu Data Sets                                                  */
/* ------------------------------------------------------------------ */

const ABOUT = [
  {
    href: '/team',
    label: 'Our Team',
    desc: 'Meet our doctors & specialists',
    Icon: Users,
  },
];

const SERVICES = [
  {
    href: '/services/general',
    label: 'General Services',
    desc: 'Everyday care, done right',
    Icon: Stethoscope,
  },
  {
    href: '/services/orthopaedic',
    label: 'Orthopaedic Services',
    desc: 'Joints, bones & mobility',
    Icon: Bone,
  },
  {
    href: '/services/obstetrics-gynaecology',
    label: 'Obstetrics & Gynaecology',
    desc: "Women's health, every stage",
    Icon: HeartPulse,
  },
];

const RESOURCES = [
  {
    href: '/faq',
    label: 'FAQ',
    desc: 'Common questions answered',
    Icon: HelpCircle,
  },
  {
    href: '/gallery',
    label: 'Gallery',
    desc: 'Inside the clinic',
    Icon: ImageIcon,
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const location = useLocation();
  const navRef = useRef(null);

  // Layout & Interaction States
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  // Dropdown Management
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  /* ---------------------------------------------------------------- */
  /* Callbacks & Handlers                                             */
  /* ---------------------------------------------------------------- */

  const closeAllDropdowns = useCallback(() => {
    setAboutOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    closeAllDropdowns();
  }, [closeAllDropdowns]);

  const openAppointment = useCallback(() => {
    closeMobileMenu();
    setAppointmentOpen(true);
  }, [closeMobileMenu]);

  /* ---------------------------------------------------------------- */
  /* Side Effects (Scroll, Click Outside, Keyboard, Route Change)    */
  /* ---------------------------------------------------------------- */

  // Handle route navigation cleanup
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Handle scroll detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click & Keyboard Escape key binding
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAllDropdowns();
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeAllDropdowns]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        .swc-scope {
          --swc-primary: #0E5C4E;
          --swc-primary-dark: #0A4A3F;
          --swc-accent: #FF6B45;
          --swc-accent-soft: #FFE7DE;
          --swc-bg: #FFFFFF;
          --swc-mint: #F1F8F5;
          --swc-text: #16241F;
          --swc-muted: #62726C;
          --swc-border: #E5E9E5;

          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          color: var(--swc-text);
        }

        .swc-display {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }

        .swc-underline {
          position: relative;
        }

        .swc-underline::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 0%;
          height: 2px;
          background: var(--swc-accent);
          transition: width 0.25s ease, left 0.25s ease;
          border-radius: 2px;
        }

        .swc-underline:hover::after {
          width: 100%;
          left: 0%;
        }

        @keyframes swc-drop {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .swc-panel {
          animation: swc-drop 0.18s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .swc-underline::after,
          .swc-panel,
          .swc-header {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>

      <header
        ref={navRef}
        className={`swc-scope swc-header sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? 'border-[var(--swc-border)] shadow-[0_4px_24px_-8px_rgba(14,92,78,0.15)]'
            : 'border-transparent'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex flex-col leading-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)] rounded-sm"
            onClick={closeMobileMenu}
          >
            <span className="swc-display text-base font-semibold tracking-tight text-[var(--swc-text)] sm:text-lg">
              Swasthik{' '}
              <span className="text-[var(--swc-primary)]">Healthcare</span>
            </span>
            <span className="mt-1.5 text-[8px] font-semibold tracking-[0.22em] text-[var(--swc-accent)] sm:text-[10px]">
              MOVE BETTER &middot; LIVE PAINLESS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main Navigation">
            {/* About Menu Dropdown */}
            <div
              className="group relative flex h-full items-center"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={aboutOpen}
                onClick={() => {
                  setAboutOpen((v) => !v);
                  setServicesOpen(false);
                  setResourcesOpen(false);
                }}
                className="flex items-center gap-1 py-2 text-sm font-medium text-[var(--swc-text)] transition hover:text-[var(--swc-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)] rounded-md"
              >
                About
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    aboutOpen ? 'rotate-180 text-[var(--swc-accent)]' : ''
                  }`}
                />
              </button>

              {aboutOpen && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                  <div className="swc-panel w-72 rounded-2xl border border-[var(--swc-border)] bg-white p-2 shadow-xl shadow-[rgba(14,92,78,0.12)]">
                    {ABOUT.map(({ href, label, desc, Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={closeAllDropdowns}
                        className="group/item flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-[var(--swc-mint)] outline-none focus-visible:bg-[var(--swc-mint)]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--swc-mint)] text-[var(--swc-primary)] transition group-hover/item:bg-[var(--swc-primary)] group-hover/item:text-white">
                          <Icon size={17} />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--swc-text)]">
                            {label}
                          </span>
                          <span className="text-xs text-[var(--swc-muted)]">
                            {desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Services Menu Dropdown */}
            <div
              className="group relative flex h-full items-center"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => {
                  setServicesOpen((v) => !v);
                  setAboutOpen(false);
                  setResourcesOpen(false);
                }}
                className="flex items-center gap-1 py-2 text-sm font-medium text-[var(--swc-text)] transition hover:text-[var(--swc-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)] rounded-md"
              >
                Services
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-[var(--swc-accent)]' : ''
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                  <div className="swc-panel w-80 rounded-2xl border border-[var(--swc-border)] bg-white p-2 shadow-xl shadow-[rgba(14,92,78,0.12)]">
                    {SERVICES.map(({ href, label, desc, Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={closeAllDropdowns}
                        className="group/item flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-[var(--swc-mint)] outline-none focus-visible:bg-[var(--swc-mint)]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--swc-mint)] text-[var(--swc-primary)] transition group-hover/item:bg-[var(--swc-primary)] group-hover/item:text-white">
                          <Icon size={17} />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--swc-text)]">
                            {label}
                          </span>
                          <span className="text-xs text-[var(--swc-muted)]">
                            {desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Page Links */}
            <Link
              to="/conditions"
              onClick={closeAllDropdowns}
              className="swc-underline text-sm font-medium text-[var(--swc-text)] transition hover:text-[var(--swc-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)] rounded-sm"
            >
              Conditions
            </Link>

            {/* Resources Dropdown */}
            <div
              className="group relative flex h-full items-center"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
                onClick={() => {
                  setResourcesOpen((v) => !v);
                  setAboutOpen(false);
                  setServicesOpen(false);
                }}
                className="flex items-center gap-1 py-2 text-sm font-medium text-[var(--swc-text)] transition hover:text-[var(--swc-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)] rounded-md"
              >
                Resources
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    resourcesOpen ? 'rotate-180 text-[var(--swc-accent)]' : ''
                  }`}
                />
              </button>

              {resourcesOpen && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2">
                  <div className="swc-panel w-64 rounded-2xl border border-[var(--swc-border)] bg-white p-2 shadow-xl shadow-[rgba(14,92,78,0.12)]">
                    {RESOURCES.map(({ href, label, desc, Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={closeAllDropdowns}
                        className="group/item flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-[var(--swc-mint)] outline-none focus-visible:bg-[var(--swc-mint)]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--swc-mint)] text-[var(--swc-primary)] transition group-hover/item:bg-[var(--swc-primary)] group-hover/item:text-white">
                          <Icon size={17} />
                        </span>
                        <span className="flex flex-col">
                          <span className="text-sm font-semibold text-[var(--swc-text)]">
                            {label}
                          </span>
                          <span className="text-xs text-[var(--swc-muted)]">
                            {desc}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              onClick={closeAllDropdowns}
              className="swc-underline text-sm font-medium text-[var(--swc-text)] transition hover:text-[var(--swc-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)] rounded-sm"
            >
              Contact Us
            </Link>

            <a
              href="tel:+919884507412"
              className="flex items-center gap-1.5 text-sm font-semibold text-[var(--swc-primary)] transition hover:text-[var(--swc-primary-dark)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)] rounded-md px-1"
            >
              <Phone size={15} />
              Call Us
            </a>

            <button
              type="button"
              onClick={openAppointment}
              className="group flex items-center gap-1.5 rounded-full bg-[var(--swc-accent)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[rgba(255,107,69,0.35)] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(255,107,69,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)]"
            >
              Book an Appointment
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--swc-border)] text-[var(--swc-primary)] transition hover:bg-[var(--swc-mint)] lg:hidden outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileOpen && (
          <div className="swc-panel border-t border-[var(--swc-border)] bg-white lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile Navigation">
              {/* Mobile About */}
              <div className="border-b border-[var(--swc-border)]">
                <button
                  type="button"
                  onClick={() => {
                    setAboutOpen(!aboutOpen);
                    setServicesOpen(false);
                    setResourcesOpen(false);
                  }}
                  className="flex w-full items-center justify-between py-4 text-sm font-medium text-[var(--swc-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)]"
                >
                  About
                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-200 ${
                      aboutOpen ? 'rotate-180 text-[var(--swc-accent)]' : ''
                    }`}
                  />
                </button>
                {aboutOpen && (
                  <div className="flex flex-col gap-1 pb-3">
                    {ABOUT.map(({ href, label, Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-[var(--swc-muted)] transition hover:bg-[var(--swc-mint)] hover:text-[var(--swc-primary)]"
                      >
                        <Icon size={16} className="text-[var(--swc-primary)]" />
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Services */}
              <div className="border-b border-[var(--swc-border)]">
                <button
                  type="button"
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                    setAboutOpen(false);
                    setResourcesOpen(false);
                  }}
                  className="flex w-full items-center justify-between py-4 text-sm font-medium text-[var(--swc-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)]"
                >
                  Services
                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-200 ${
                      servicesOpen ? 'rotate-180 text-[var(--swc-accent)]' : ''
                    }`}
                  />
                </button>
                {servicesOpen && (
                  <div className="flex flex-col gap-1 pb-3">
                    {SERVICES.map(({ href, label, Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-[var(--swc-muted)] transition hover:bg-[var(--swc-mint)] hover:text-[var(--swc-primary)]"
                      >
                        <Icon size={16} className="text-[var(--swc-primary)]" />
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Conditions Link */}
              <Link
                to="/conditions"
                onClick={closeMobileMenu}
                className="border-b border-[var(--swc-border)] py-4 text-sm font-medium text-[var(--swc-text)]"
              >
                Conditions
              </Link>

              {/* Mobile Resources */}
              <div className="border-b border-[var(--swc-border)]">
                <button
                  type="button"
                  onClick={() => {
                    setResourcesOpen(!resourcesOpen);
                    setAboutOpen(false);
                    setServicesOpen(false);
                  }}
                  className="flex w-full items-center justify-between py-4 text-sm font-medium text-[var(--swc-text)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--swc-primary)]"
                >
                  Resources
                  <ChevronDown
                    size={17}
                    className={`transition-transform duration-200 ${
                      resourcesOpen ? 'rotate-180 text-[var(--swc-accent)]' : ''
                    }`}
                  />
                </button>
                {resourcesOpen && (
                  <div className="flex flex-col gap-1 pb-3">
                    {RESOURCES.map(({ href, label, Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-[var(--swc-muted)] transition hover:bg-[var(--swc-mint)] hover:text-[var(--swc-primary)]"
                      >
                        <Icon size={16} className="text-[var(--swc-primary)]" />
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Direct Links & Action Callout */}
              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="border-b border-[var(--swc-border)] py-4 text-sm font-medium text-[var(--swc-text)]"
              >
                Contact Us
              </Link>

              <a
                href="tel:+919884507412"
                onClick={closeMobileMenu}
                className="flex items-center gap-1.5 border-b border-[var(--swc-border)] py-4 text-sm font-semibold text-[var(--swc-primary)]"
              >
                <Phone size={15} />
                Call Us
              </a>

              <button
                type="button"
                onClick={openAppointment}
                className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-[var(--swc-accent)] px-5 py-3 text-center text-sm font-semibold text-white shadow-md shadow-[rgba(255,107,69,0.35)]"
              >
                Book an Appointment
                <ArrowUpRight size={15} />
              </button>

            </nav>
          </div>
        )}
      </header>

      {/* Modal Integration */}
      <Appointment
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
    </>
  );
}