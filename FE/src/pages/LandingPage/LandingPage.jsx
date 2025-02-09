import Jumbotron from "./Jumbotron";
import Footer from "../../components/Footer";
import ProductCard from "./ProductCard";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Jumbotron />
      <ProductCard/>
      <Footer />
    </div>
  );
}
