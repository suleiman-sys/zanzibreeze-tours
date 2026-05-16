import Hero from "../components/home/Hero";
import BookingBar from "../components/home/BookingBar";
import PopularTours from "../components/home/PopularTours";
import TrendingTours from "../components/home/TrendingTours";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FeaturedAdventures from "../components/home/FeaturedAdventures";
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import RealExperiences from "../components/home/RealExperiences";

export default function Home() {
  return (
    <div>
      <Hero />
      <BookingBar />
      <PopularTours />
      <TrendingTours />
      <WhyChooseUs />
      <FeaturedAdventures />
      <Testimonials />
      <CallToAction />
      <RealExperiences />
    </div>
  );
}