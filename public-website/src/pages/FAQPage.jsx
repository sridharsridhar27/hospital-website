import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import FAQ from '../components/FAQ';
import AppointmentCTA from '../components/AppointmentCTA';
import Footer from '../components/Footer';

function FAQPage() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions | Swasthik Healthcare Chennai"
        description="Find answers to frequently asked questions about Swasthik Healthcare in Kodungaiyur, Chennai, including consultations, specialist services, appointments, and patient care."
        path="/faq"
      />

      <Navbar />

      <main>
        <FAQ />

        <AppointmentCTA />
      </main>

      <Footer />
    </>
  );
}

export default FAQPage;