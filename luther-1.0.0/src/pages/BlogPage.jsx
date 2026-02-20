import React from 'react'
import Blog from '../components/Blog'
import BlogHero from '../components/BlogHero'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Cursor from '../components/Cursor'

const BlogPage = () => (
  <div className="s-pagewrap">
    <Header />
    <main className="s-content">
      <BlogHero />
      <Blog />
    </main>
    <Footer />
    <Cursor />
  </div>
)

export default BlogPage
