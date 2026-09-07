
'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const propertyTypes = ['Individual House', 'Land', 'Apartment']
const areas = ['Chennai', 'Kanchipuram', 'Chengalpattu']

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [intent, setIntent] = useState<'Buy' | 'Sell'>('Buy')
  const [propertyType, setPropertyType] = useState('Land')
  const [submitted, setSubmitted] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const isLand = propertyType === 'Land'

  // =========================================================
  // REQUIREMENT FORM → DATABASE
  // =========================================================

  const handleRequirementSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      name: formData.get('name')?.toString().trim(),
      phone: formData.get('phone')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),

      intent,

      propertyType,

      area: formData.get('area')?.toString().trim() || null,

      location: formData.get('location')?.toString().trim() || null,

      budget: formData.get('budget')?.toString().trim() || null,

      bhk: formData.get('bhk')?.toString().trim() || null,

      message: formData.get('message')?.toString().trim() || null,
    }

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit requirement')
      }

      console.log('Lead submitted:', result)

      setSubmitted(true)

      form.reset()
    } catch (error) {
      console.error('Requirement submission error:', error)

      alert(
        'Unable to submit your requirement right now. Please try again or call us directly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // =========================================================
  // CONTACT FORM
  // =========================================================

  const handleContactSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault()

  if (isContactSubmitting) return

  setIsContactSubmitting(true)

  const form = e.currentTarget
  const formData = new FormData(form)

  const data = {
    name: formData.get('name')?.toString().trim(),
    phone: formData.get('phone')?.toString().trim() || null,
    email: formData.get('email')?.toString().trim(),
    subject: formData.get('subject')?.toString().trim() || null,
    message: formData.get('message')?.toString().trim(),
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(
        result.message || 'Failed to send message'
      )
    }

    console.log('Contact message submitted:', result)

    setContactSubmitted(true)

    form.reset()
  } catch (error) {
    console.error('Contact submission error:', error)

    alert(
      'Unable to send your message right now. Please try again or call us directly.'
    )
  } finally {
    setIsContactSubmitting(false)
  }
}

  return (
    <main className="site-shell">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="site-header">

        <a
          className="brand"
          href="#home"
          aria-label="Kumaran Real Estate home"
        >
          <img
            className="brand-logo"
            src="/images/kumaran-logo.png"
            alt="Kumaran Real Estate logo"
          />

          <span>
            <strong>KUMARAN</strong>
            <small>REAL ESTATE</small>
          </span>
        </a>

        <nav
          className={`desktop-nav ${
            mobileOpen ? 'mobile-nav-open' : ''
          }`}
          aria-label="Main navigation"
        >
          <a
            href="#home"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </a>

          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
          >
            About us
          </a>

          <a
            href="#requirement"
            onClick={() => setMobileOpen(false)}
          >
            Requirement
          </a>

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>

          <a
            className="nav-cta"
            href="#requirement"
            onClick={() => setMobileOpen(false)}
          >
            Book now
            <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="hero section-pad"
      >

        <div className="hero-copy reveal-up">

          <p className="eyebrow">
            <span className="eyebrow-line" />

            Chennai · Kanchipuram · Chengalpattu
          </p>

          <h1>
            Your property needs.
            <em> Our local expertise.</em>
          </h1>

          <p className="hero-intro">
            Real estate decisions feel better when they are guided
            by someone who knows the land, the people and the
            possibilities.
          </p>

          <div className="hero-actions">

            <a
              className="button button-primary"
              href="#requirement"
            >
              Book your requirement
              <ArrowUpRight size={17} />
            </a>

          </div>

          <div className="hero-proof">

            <div>
              <strong>
                1000<span>+</span>
              </strong>

              <small>Happy clients</small>
            </div>

            <div>
              <strong>
                20<span>+</span>
              </strong>

              <small>Years of experience</small>
            </div>

            <div>
              <strong>3</strong>

              <small>Cities served</small>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-image-wrap">
            <img
              src="/images/kumaran-hero.png"
              alt="Contemporary home surrounded by greenery"
            />
          </div>

          <div className="hero-caption">
            <span>01</span>

            <p>
              Spaces chosen with care.
              <br />
              Guidance that feels personal.
            </p>
          </div>

          <div className="hero-stamp">

            <span>
              TRUSTED
              <br />
              LOCALLY
            </span>

            <Sparkles size={17} />

          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICE RIBBON
      ===================================================== */}

      <section className="service-ribbon">

        <p>
          We help you find the right place for your next chapter.
        </p>

        <div className="service-tags">

          {propertyTypes.map((type) => (
            <span key={type}>
              {type}
            </span>
          ))}

        </div>

      </section>

      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section
        id="about"
        className="about section-pad"
      >

        <div className="section-kicker">
          Why Kumaran <span>—</span>
        </div>

        <div className="about-grid">

          <div className="about-title">

            <h2>
              A local lens.
              <br />
              <em>A lasting relationship.</em>
            </h2>

          </div>

          <div className="about-copy">

            <p className="lead">
              Property is more than a transaction. It is where
              plans take shape, families grow and futures begin.
            </p>

            <p>
              At Kumaran Real Estate, we combine deep local
              knowledge with an honest, considered approach.
              From the first conversation to the final signature,
              we make every step clear, calm and tailored to you.
            </p>

            <a
              className="text-link"
              href="#founder"
            >
              Meet our founder
              <ChevronRight size={16} />
            </a>

          </div>

        </div>

        <div className="feature-grid">

          {[
            [
              '01',
              'Local knowledge',
              'On-the-ground insight across the places we call home.',
            ],
            [
              '02',
              'Clear guidance',
              'No jargon, no pressure. Just thoughtful advice at every turn.',
            ],
            [
              '03',
              'People first',
              'A relationship built on listening, trust and showing up.',
            ],
          ].map(([number, title, copy]) => (

            <article
              className="feature-card"
              key={number}
            >

              <span className="feature-number">
                {number}
              </span>

              <ShieldCheck size={22} />

              <h3>{title}</h3>

              <p>{copy}</p>

            </article>

          ))}

        </div>

      </section>

      {/* =====================================================
          AREAS
      ===================================================== */}

      <section className="areas-section section-pad">

        <div>

          <div className="section-kicker light">
            Where we work <span>—</span>
          </div>

          <h2>
            Rooted in the
            <br />
            <em>places we know.</em>
          </h2>

        </div>

        <div className="area-list">

          {areas.map((area, index) => (

            <div
              className="area-row"
              key={area}
            >

              <span>
                0{index + 1}
              </span>

              <strong>{area}</strong>

              <MapPin size={17} />

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          FOUNDER
      ===================================================== */}

      <section
        id="founder"
        className="founder section-pad"
      >

        <div className="founder-image">

          <img
            src="/images/ceo.jpg"
            alt="S. Manivasahan, Founder and CEO"
          />

          <span className="image-label">
            S. MANIVASAHAN
            <br />
            <small>FOUNDER &amp; CEO</small>
          </span>

        </div>

        <div className="founder-copy">

          <Quote
            size={32}
            className="quote-icon"
          />

          <p className="founder-quote">
            “The right property journey starts with the right conversation.”
          </p>

          <p>
            For over two decades, I have had the privilege of
            helping people turn a property search into a place
            they are proud to call their own. Kumaran was founded
            on a simple belief: honest local expertise can make
            a meaningful difference.
          </p>

          <p>
            We are here to understand what matters to you, and
            to make the way forward feel certain.
          </p>

          <span className="signature">
            S. Manivasahan
          </span>

        </div>

      </section>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="process-section section-pad">

        <div className="process-heading">

          <div className="section-kicker">
            How it works <span>—</span>
          </div>

          <h2>
            From intention
            <br />
            <em>to address.</em>
          </h2>

        </div>

        <div className="process-list">

          {[
            [
              '01',
              'Tell us what matters',
              'Share your hopes, needs and the details that will help us understand your search.',
            ],
            [
              '02',
              'We do the groundwork',
              'Our local team filters, checks and brings you considered options — never a random list.',
            ],
            [
              '03',
              'Move forward with confidence',
              'With every detail clear, you can make your decision feeling informed and ready.',
            ],
          ].map(([n, title, copy]) => (

            <div
              className="process-item"
              key={n}
            >

              <span>{n}</span>

              <div>

                <h3>{title}</h3>

                <p>{copy}</p>

              </div>

              <ChevronRight size={19} />

            </div>

          ))}

        </div>

      </section>

      {/* =====================================================
          REQUIREMENT FORM
      ===================================================== */}

      <section
        id="requirement"
        className="requirement section-pad"
      >

        <div className="requirement-intro">

          <div className="section-kicker light">
            Start here <span>—</span>
          </div>

          <h2>
            Let&apos;s find
            <br />
            <em>your place.</em>
          </h2>

          <p>
            Tell us a little about what you are looking for.
            We&apos;ll take it from there, thoughtfully.
          </p>

          <div className="quick-contact">

            <a href="tel:+919176260156">
              <Phone size={17} />
              +91 9176260156
            </a>

            <a href="https://wa.me/919176260156">
              <MessageCircle size={17} />
              WhatsApp us
            </a>

          </div>

        </div>

        <form
          className="requirement-form"
          onSubmit={handleRequirementSubmit}
        >

          {submitted ? (

            <SuccessMessage
              text="Thank you. We have received your requirement and will be in touch shortly."
            />

          ) : (

            <>

              <div className="intent-switch">

                <button
                  type="button"
                  className={intent === 'Buy' ? 'active' : ''}
                  onClick={() => setIntent('Buy')}
                >
                  I want to buy
                </button>

                <button
                  type="button"
                  className={intent === 'Sell' ? 'active' : ''}
                  onClick={() => setIntent('Sell')}
                >
                  I want to sell
                </button>

              </div>

              <div className="form-grid">

                <label>
                  Name

                  <input
                    required
                    name="name"
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  Phone

                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                  />
                </label>

                <label>
                  Email

                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                  />
                </label>

                <label>
                  Property type

                  <select
                    name="propertyType"
                    value={propertyType}
                    onChange={(e) =>
                      setPropertyType(e.target.value)
                    }
                  >
                    {propertyTypes.map((t) => (
                      <option key={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                {intent === 'Sell' ? (

                  <label>
                    {propertyType === 'Apartment'
                      ? 'House area'
                      : 'Area'}

                    <input
                      name="area"
                      placeholder="e.g. 1200 sq.ft"
                    />
                  </label>

                ) : (

                  <label>
                    Preferred location

                    <input
                      name="location"
                      placeholder="e.g. Tambaram"
                    />
                  </label>

                )}

                <label>
                  {intent === 'Sell'
                    ? 'Location'
                    : 'Budget'}

                  <input
                    name="budget"
                    placeholder={
                      intent === 'Sell'
                        ? 'Where is it located?'
                        : 'e.g. ₹75 lakhs'
                    }
                  />
                </label>

                {!isLand && (

                  <label>
                    BHK

                    <select name="bhk">

                      <option value="">
                        Select BHK
                      </option>

                      <option>
                        1 BHK
                      </option>

                      <option>
                        2 BHK
                      </option>

                      <option>
                        3 BHK
                      </option>

                      <option>
                        4+ BHK
                      </option>

                    </select>

                  </label>

                )}

                <label className="full-field">
                  Additional requirements

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Anything else we should know?"
                  />

                </label>

              </div>

              <button
                className="button button-orange"
                type="submit"
                disabled={isSubmitting}
              >

                {isSubmitting
                  ? 'Sending...'
                  : 'Send my requirement'}

                {!isSubmitting && (
                  <ArrowUpRight size={17} />
                )}

              </button>

              <p className="form-note">
                Your details are kept private and only used to
                help with your enquiry.
              </p>

            </>

          )}

        </form>

      </section>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section
        id="contact"
        className="contact section-pad"
      >

        <div className="contact-header">

          <div className="section-kicker">
            Contact <span>—</span>
          </div>

          <h2>
            We&apos;re here
            <br />
            <em>to listen.</em>
          </h2>

        </div>

        <div className="contact-grid">

          <div className="contact-details">

            <a href="tel:+919176260156">

              <span>
                <Phone size={18} />
              </span>

              <div>

                <small>Call us</small>

                <strong>
                  +91 9176260156
                </strong>

              </div>

            </a>

            <a href="mailto:kumaranrealestate42@gmail.com">

              <span>
                <Mail size={18} />
              </span>

              <div>

                <small>Email us</small>

                <strong>
                  kumaranrealestate42@gmail.com
                </strong>

              </div>

            </a>

            <div>

              <span>
                <MapPin size={18} />
              </span>

              <div>

                <small>Our office</small>

                <strong>
                  Chennai, Tamil Nadu
                  <br />
                  By appointment
                </strong>

              </div>

            </div>

            <div className="contact-areas">

              <small>Serving</small>

              <p>

                {areas.map((a) => (
                  <span key={a}>
                    {a}
                  </span>
                ))}

              </p>

            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >

            {contactSubmitted ? (

              <SuccessMessage
                text="Message received. We will get back to you soon."
              />

            ) : (

              <>

                <label>
                  Name

                  <input
                    required
                    name="name"
                    placeholder="Your name"
                  />
                </label>

                <label>
                  Phone

                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                  />
                </label>

                <label>
                  Email

                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                  />
                </label>

                <label>
                  Subject

                  <input
                    name="subject"
                    placeholder="How can we help?"
                  />
                </label>

                <label>
                  Message

                  <textarea
                    required
                    name="message"
                    rows={4}
                    placeholder="Write your message..."
                  />

                </label>

                <button
  className="button button-primary"
  type="submit"
  disabled={isContactSubmitting}
>
  {isContactSubmitting ? 'Sending...' : 'Send message'}

  {!isContactSubmitting && (
    <ArrowUpRight size={17} />
  )}
</button>

              </>

            )}

          </form>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="footer">

        <a
          className="brand footer-brand"
          href="#home"
        >

          <img
            className="brand-logo"
            src="/images/kumaran-logo.png"
            alt="Kumaran Real Estate logo"
          />

          <span>
            <strong>KUMARAN</strong>
            <small>REAL ESTATE</small>
          </span>

        </a>

        <p>
          Property needs, locally understood.
        </p>

        <div className="footer-social">

          <a
            href="#home"
            aria-label="Social profile"
          >
            <Sparkles size={17} />
          </a>

          <a
            href="#home"
            aria-label="Professional profile"
          >
            <ShieldCheck size={17} />
          </a>

          <a
            href="https://wa.me/919176260156" 
            aria-label="WhatsApp" 
          > 
            <MessageCircle size={17} /> 
          </a> 
 
        </div> 
 
        <small className="copyright"> 
          © 2026 Kumaran Real Estate 
        </small> 
 
      </footer> 
 
    </main> 
  ) 
} 
 
// ========================================================= 
// SUCCESS MESSAGE 
// ========================================================= 
 
function SuccessMessage({ 
  text, 
}: { 
  text: string 
}) { 
  return ( 
    <div className="success-message"> 
 
      <span> 
        <Check size={21} /> 
      </span> 
 
      <h3>Thank you</h3> 
 
      <p>{text}</p> 
 
      <a 
        className="text-link" 
        href="#home" 
      > 
        Back to home 
        <ChevronRight size={16} /> 
      </a> 
 
    </div> 
  ) 
} 
