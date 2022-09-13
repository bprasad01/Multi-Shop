import Head from "next/head";
// import BannerCarousel from '../components/Banner/BannerCarousel'
import Featured from "../components/Banner/Featured";
import AllCategories from "../components/Categories/AllCategories";
// import CarouselMulti from '../components/Common/Carousel'
import SpecialOffer from "../components/Common/SpecialOffer";
// import VendorCarousel from '../components/Common/VendorCarousel'
// import api from "../utils/config";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Header/NavBar";
import TopBar from "../components/Header/TopBar";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import RecentProducts from "../components/Products/RecentProducts";

import dynamic from "next/dynamic";
import axios from "axios";

const VendorCarousel = dynamic(
  () => import("../components/Common/VendorCarousel"),
  {
    ssr: false,
  }
);

const BannerCarousel = dynamic(
  () => import("../components/Banner/BannerCarousel"),
  {
    ssr: false,
  }
);
export default function Home({ categories }) {
 
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BannerCarousel />
      <Featured />
      <AllCategories categories={categories}/>
      <FeaturedProducts />
      <SpecialOffer />
      <RecentProducts />
      <VendorCarousel />
      {/* <CarouselMulti /> */}
    </div>
  );
}

export const getServerSideProps = async () => {
  const resCategories = await axios.get(
    "https://wpfurniture.mangoitsol.com/wp-json/wc/store/products/categories"
  );
  const categories = resCategories.data;
  return {
    props: {
      categories,
    },
  };
};
