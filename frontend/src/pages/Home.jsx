import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="w-full overflow-x-hidden bg-gray-50">
      {/* ===================== HERO ===================== */}
      <Header />

      {/* ===================== SPECIALITIES ===================== */}
      <SpecialityMenu />

      {/* ===================== TOP DOCTORS ===================== */}
      <TopDoctors />

      {/* ===================== CTA BANNER ===================== */}
      <Banner />

      {/* ===================== FOOTER ===================== */}
      <Footer />
    </main>
  );
};

export default Home;