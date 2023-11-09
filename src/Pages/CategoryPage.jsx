import React from 'react'
import BlogCard from '../Components/BlogCard'

export default function CategoryPage() {
  return (
   <>
       <div className="container-fluid TagPage">
        <div className="container">
          <h1>
          <i class="bi bi-collection"></i> Lifestyle
          </h1>
          <h6 className="h6">Here's related posts to this Category...</h6>
          <div className="row d-flex">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>

   </>
  )
}
