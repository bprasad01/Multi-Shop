import axios from "axios";
import React, { useState, useEffect } from "react";

const SubMenu = () => {
    const [category, setCategory] = useState([]);
    
    useEffect(() => {
        fetchCategoryData();
    }, [])
    const fetchCategoryData = async () => {
        const res = await axios.get('https://wpfurniture.mangoitsol.com/wp-json/wc/store/products/categories');
        const categoryData = res.data;
        setCategory(categoryData);
    }

  return (
    <nav
      className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
      id="navbar-vertical"
      style={{ width: " calc(100% - 30px)", zIndex: "999" }}
    >
      <div className="navbar-nav w-100">
        {category.map(item => (
        <a href="/" className="nav-item nav-link">
          {item.name}
        </a>
        ))}
      </div>
    </nav>
  );
};

export default SubMenu;
