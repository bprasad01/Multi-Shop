import axios from 'axios'
import React from 'react'
import BreadCrumb from '../../components/Shop/BreadCrumb'
import Products from '../../components/Shop/Products'

const Shop = ({products}) => {
  console.log(products)
  return (
    <>
    <BreadCrumb />
    <Products products={products}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const resProducts = await axios.get('https://wpfurniture.mangoitsol.com/wp-json/wc/store/products')
  const products = resProducts.data;
  console.log(products)
  return {
    props : {
      products,
    }
  }
}

export default Shop