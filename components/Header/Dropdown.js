import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Dropdown = () => {
  const [category, setCategory] = useState([]);
  const [ dropDown, setDropDown] = useState(false)
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    const res = await axios.get(
      "https://wpfurniture.mangoitsol.com/wp-json/wc/store/products/categories"
    );
    const categoryData = res.data;
    setCategory(categoryData);
  };
  
  return (
    <>
      <nav
        className="position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
        id="navbar-vertical"
        style={{ width: " calc(100% - 30px)", zIndex: "999" }}
      >
        <div className={dropDown ? "navbar-nav w-100 clicked" : "navbar-nav w-100"} onClick={() => setDropDown(!dropDown)}> 
          {category.map((item) => {
           return(
            <Link href={`/categories/${item.id}`} passHref key={item.id}><a href="" className="nav-item nav-link" onClick={() => setDropDown(false)}>
              {item.name}
            </a></Link>
          )})}
        </div>
      </nav>
    </>
  );
};

export default Dropdown;
