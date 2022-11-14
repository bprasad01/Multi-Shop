import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import BreadCrumb from '../../components/Shop/BreadCrumb'
import Products from '../../components/Shop/Products'

const Shop = () => {
  const [ products, setProducts ] = useState([]);
  const getProductsData = async () => {
    const resProducts = await axios.get('https://wpfurniture.mangoitsol.com/wp-json/wc/store/products?per_page=31');
    const resData = resProducts.data;
    setProducts(resData);
  }

  useEffect(() => {
    getProductsData();
  }, [])
  return (
    <>
    <BreadCrumb />
    <Products products={products}/>
    </>
  )
}

export default Shop