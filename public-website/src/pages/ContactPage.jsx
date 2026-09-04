import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import AppointmentCTA from '../components/AppointmentCTA';
import Footer from '../components/Footer';

function ContactPage() {
  return (
    <>
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