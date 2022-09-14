import Link from 'next/link'
import React from 'react'

const AllCategories = ({categories}) => {
  
  return (
    <>
    <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Categories</span></h2>
        <div className="row px-xl-5 pb-3">
            {categories.map(category => (
                <Link href={`/categories/${category.id}`}>
                <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={category.id}>
                <a className="text-decoration-none" href="">
                    <div className="cat-item d-flex align-items-center mb-4">
                        <div className="overflow-hidden" style={{width: "100px", height: "100px"}}>
                            <img className="img-fluid" src="img/cat-1.jpg" alt=""/>
                        </div>
                        <div className="flex-fill pl-3">
                            <h6>{category.name}</h6>
                            <small className="text-body">100 Products</small>
                        </div>
                    </div>
                </a>
            </div>
            </Link>
            ))}
        </div>
    </div>
    </>
  )
}

export default AllCategories