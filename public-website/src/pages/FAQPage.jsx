import Navbar from '../components/Navbar';
import FAQ from '../components/FAQ';
import AppointmentCTA from '../components/AppointmentCTA';
import Footer from '../components/Footer';

function FAQPage() {
  return (
    <>
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