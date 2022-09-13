import Head from "next/head";
import Featured from "../components/Banner/Featured";
import AllCategories from "../components/Categories/AllCategories";
import SpecialOffer from "../components/Common/SpecialOffer";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import RecentProducts from "../components/Products/RecentProducts";
import dynamic from "next/dynamic";
import axios from "axios";
import Tabs from "../components/Common/Tabs";

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
      <AllCategories categories={categories} />
      <FeaturedProducts />
      <SpecialOffer />
      <RecentProducts />
      <VendorCarousel />
      <Tabs />
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
