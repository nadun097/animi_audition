import React, { useState } from 'react'

const blogPosts = [
  {
    id: 'blog-01',
    img: '/images/portfolio/gallery/game1.jpg',
    cat: 'Web Development',
    title: 'Building a Modern Portfolio',
    description: 'A step-by-step guide to creating a personal portfolio using React, Vite, and modern CSS techniques. Learn how to structure your project, add animations, and deploy your site.',
    details: 'In this blog, I walk you through the process of building a modern portfolio website from scratch. We cover project setup, component structure, animation libraries, and deployment tips for maximum impact.',
  },
  {
    id: 'blog-02',
    img: '/images/portfolio/gallery/game2.jpg',
    cat: 'UI/UX Design',
    title: 'Designing for User Experience',
    description: 'Explore the fundamentals of UI/UX design for web apps. This post covers wireframing, prototyping, and user testing to create engaging digital experiences.',
    details: 'This article dives into the essentials of UI/UX design, including best practices for wireframing, prototyping tools, and how to conduct user testing to refine your designs.',
  },
  {
    id: 'blog-03',
    img: '/images/portfolio/gallery/game3.jpg',
    cat: 'JavaScript',
    title: 'Mastering React Hooks',
    description: 'An in-depth look at React Hooks and how they simplify state management and side effects in functional components.',
    details: 'We explore useState, useEffect, and custom hooks, with practical examples to help you master React Hooks for cleaner, more maintainable code.',
  },
]

function BlogCard({ post }) {
  const [open, setOpen] = useState(false)
  return (
    <li className="folio-list__item column">
      <div className="folio-list__item-link" style={{ cursor: 'pointer' }} onClick={() => setOpen((v) => !v)}>
        <div className="folio-list__item-pic">
          <img src={post.img} alt={post.title} />
        </div>
        <div className="folio-list__item-text">
          <div className="folio-list__item-cat">{post.cat}</div>
          <div className="folio-list__item-title">{post.title}</div>
        </div>
      </div>
      {open && (
        <div className="blog-dropdown-details">
          <p>{post.details}</p>
          <button className="blog-read-more-btn">Read More</button>
        </div>
      )}
    </li>
  )
}

const Blog = () => (
  <section id="blog" className="s-blog target-section">
    <div className="row wide">
      <h2>Blog</h2>
      <ul className="folio-list row block-lg-one-half block-stack-on-1000">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </ul>
    </div>
  </section>
)

export default Blog
