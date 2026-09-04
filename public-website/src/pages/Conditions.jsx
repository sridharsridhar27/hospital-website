import Navbar from '../components/Navbar';
import AppointmentCTA from '../components/AppointmentCTA';
import Footer from '../components/Footer';
import Conditions from '../components/Conditions';

function ConditionsPage() {
  return (
    <>
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