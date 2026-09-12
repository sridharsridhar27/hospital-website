import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import AppointmentCTA from '../components/AppointmentCTA';
import Footer from '../components/Footer';
import Conditions from '../components/Conditions';

function ConditionsPage() {
  return (
    <>
      <SEO
        title="Health Conditions We Treat | Swasthik Healthcare Chennai"
        description="Explore health conditions treated at Swasthik Healthcare in Kodungaiyur, Chennai. Learn about symptoms, conditions, and available specialist care options."
        path="/conditions"
      />

      <Navbar />

      <main>
        <Conditions />
        <AppointmentCTA />
      </main>

      <Footer />
    </>
  );
}

export default ConditionsPage;