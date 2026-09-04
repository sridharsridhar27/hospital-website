
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { useState } from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurInstitute from './components/OurInstitute';
import PatientReviews from './components/PatientReviews';
import AppointmentCTA from './components/AppointmentCTA';
import Appointment from './components/Appointment';
import Footer from './components/Footer';

import Team from './pages/Team';
import Services from './components/Services';

import ConditionsPage from './pages/Conditions';
import ConditionDetailsPage from './pages/ConditionDetailsPage';
import FAQPage from './pages/FAQPage';
import Gallery from './pages/Gallery';
import ContactPage from './pages/ContactPage';


/*
 * ============================================================
 * HOME / LANDING PAGE
 * ============================================================
 */

function Home({ onBookAppointment }) {
  return (
    <>
      <Navbar
        onBookAppointment={onBookAppointment}
      />

      <main>
        <Hero />

        <OurInstitute />
        <PatientReviews />

        <AppointmentCTA
          onBookAppointment={onBookAppointment}
        />
      </main>

      <Footer />
    </>
  );
}


/*
 * ============================================================
 * OUR TEAM PAGE
 * ============================================================
 */

function TeamPage({ onBookAppointment }) {
  return (
    <>
      <Navbar
        onBookAppointment={onBookAppointment}
      />

      <main>
        <Team />

        <AppointmentCTA
          onBookAppointment={onBookAppointment}
        />
      </main>

      <Footer />
    </>
  );
}


/*
 * ============================================================
 * GENERAL SERVICES PAGE
 * ============================================================
 */

function GeneralServicesPage({
  onBookAppointment,
}) {
  return (
    <>
      <Navbar
        onBookAppointment={onBookAppointment}
      />

      <main>
        <Services category="GENERAL" />

        <AppointmentCTA
          onBookAppointment={onBookAppointment}
        />
      </main>

      <Footer />
    </>
  );
}


/*
 * ============================================================
 * ORTHOPAEDIC SERVICES PAGE
 * ============================================================
 */

function OrthopaedicServicesPage({
  onBookAppointment,
}) {
  return (
    <>
      <Navbar
        onBookAppointment={onBookAppointment}
      />

      <main>
        <Services category="ORTHOPAEDIC" />

        <AppointmentCTA
          onBookAppointment={onBookAppointment}
        />
      </main>

      <Footer />
    </>
  );
}


/*
 * ============================================================
 * OBSTETRICS & GYNAECOLOGY SERVICES PAGE
 * ============================================================
 */

function ObstetricsGynaecologyServicesPage({
  onBookAppointment,
}) {
  return (
    <>
      <Navbar
        onBookAppointment={onBookAppointment}
      />

      <main>
        <Services category="OBSTETRICS_GYNAECOLOGY" />

        <AppointmentCTA
          onBookAppointment={onBookAppointment}
        />
      </main>

      <Footer />
    </>
  );
}


/*
 * ============================================================
 * GALLERY PAGE
 * ============================================================
 */

function GalleryPage({ onBookAppointment }) {
  return (
    <>
      <Navbar
        onBookAppointment={onBookAppointment}
      />

      <main>
        <Gallery />

        <AppointmentCTA
          onBookAppointment={onBookAppointment}
        />
      </main>

      <Footer />
    </>
  );
}


/*
 * ============================================================
 * APP
 * ============================================================
 */

function App() {

  /*
   * ==========================================================
   * APPOINTMENT MODAL STATE
   * ==========================================================
   */

  const [appointmentOpen, setAppointmentOpen] =
    useState(false);


  /*
   * ==========================================================
   * OPEN APPOINTMENT
   * ==========================================================
   */

  const openAppointment = () => {
    setAppointmentOpen(true);
  };


  /*
   * ==========================================================
   * CLOSE APPOINTMENT
   * ==========================================================
   */

  const closeAppointment = () => {
    setAppointmentOpen(false);
  };


  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            HOME
            ===================================================== */}

        <Route
          path="/"
          element={
            <Home
              onBookAppointment={openAppointment}
            />
          }
        />


        {/* =====================================================
            OUR TEAM
            ===================================================== */}

        <Route
          path="/team"
          element={
            <TeamPage
              onBookAppointment={openAppointment}
            />
          }
        />


        {/* =====================================================
            GENERAL SERVICES
            ===================================================== */}

        <Route
          path="/services/general"
          element={
            <GeneralServicesPage
              onBookAppointment={openAppointment}
            />
          }
        />


        {/* =====================================================
            ORTHOPAEDIC SERVICES
            ===================================================== */}

        <Route
          path="/services/orthopaedic"
          element={
            <OrthopaedicServicesPage
              onBookAppointment={openAppointment}
            />
          }
        />


        {/* =====================================================
            OBSTETRICS & GYNAECOLOGY SERVICES
            ===================================================== */}

        <Route
          path="/services/obstetrics-gynaecology"
          element={
            <ObstetricsGynaecologyServicesPage
              onBookAppointment={openAppointment}
            />
          }
        />


        {/* =====================================================
            CONDITIONS
            ===================================================== */}

        <Route
          path="/conditions"
          element={
            <ConditionsPage />
          }
        />


        {/* =====================================================
            CONDITION DETAILS
            ===================================================== */}

        <Route
          path="/conditions/:slug"
          element={
            <ConditionDetailsPage />
          }
        />


        {/* =====================================================
            FAQ
            ===================================================== */}

        <Route
          path="/faq"
          element={
            <FAQPage />
          }
        />


        {/* =====================================================
            GALLERY
            ===================================================== */}

        <Route
          path="/gallery"
          element={
            <GalleryPage
              onBookAppointment={openAppointment}
            />
          }
        />


        {/* =====================================================
            CONTACT
            ===================================================== */}

        <Route
          path="/contact"
          element={
            <ContactPage />
          }
        />

      </Routes>


      {/* =======================================================
          GLOBAL APPOINTMENT MODAL
          ======================================================= */}

      <Appointment
        isOpen={appointmentOpen}
        onClose={closeAppointment}
      />

    </BrowserRouter>
  );
}

export default App;

