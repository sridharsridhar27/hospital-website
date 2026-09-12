import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import AppointmentCTA from '../components/AppointmentCTA';
import Footer from '../components/Footer';

function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Swasthik Healthcare | Kodungaiyur, Chennai"
        description="Contact Swasthik Healthcare in Kodungaiyur, Chennai for general consultations, specialist healthcare services, appointments, and patient care."
        path="/contact"
      />

      <Navbar />

      <main>
        <Contact />

        <AppointmentCTA />
      </main>

      <Footer />
    </>
  );
}

export default ContactPage;