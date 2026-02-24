export const runtime = 'edge';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import webdevImg from '../assets/portfolio/gallery/webdevolopment.jpg'
import uiuxImg from '../assets/portfolio/gallery/uiux.avif'
import asgardeoImg from '../assets/portfolio/gallery/asgardeo.png'

const blogPosts = [
  // {
  //   id: 'blog-01',
  //   img: webdevImg,
  //   cat: 'Web Development',
  //   title: 'Building a Modern Portfolio',
  //   description: 'A step-by-step guide to creating a personal portfolio using React, Vite, and modern CSS techniques. Learn how to structure your project, add animations, and deploy your site.',
  //   details: 'In this blog, I walk you through the process of building a modern portfolio website from scratch. We cover project setup, component structure, animation libraries, and deployment tips for maximum impact.',
  // },
 
  {
    id: 'blog-02',
    img: asgardeoImg,
    cat: 'Authentication',
    title: 'Getting Started with WSO2 Asgardeo – Secure Authentication Made Simple',
    description: 'A beginner-friendly guide to integrating WSO2 Asgardeo for secure authentication in your web applications.',
    details: 'This post walks you through setting up WSO2 Asgardeo, configuring OAuth2/OpenID Connect, and implementing secure login flows. Perfect for developers looking to add robust authentication to their apps with minimal hassle.',
  },
  // {
  //   id: 'blog-03',
  //   img: uiuxImg,
  //   cat: 'UI/UX Design',
  //   title: 'UI/UX Fundamentals for Modern Web Apps',
  //   description: 'Key principles and actionable tips for designing intuitive, beautiful user interfaces and experiences.',
  //   details: 'This post covers layout, color, typography, and interaction design, with real-world examples to help you create web apps that users love.',
  // },
]


import { useRef, useEffect } from 'react'

function BlogCard({ post, open, onClick }) {
  const contentRef = useRef(null)
  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + 'px'
      contentRef.current.style.opacity = 1
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = '0px'
      contentRef.current.style.opacity = 0
    }
  }, [open])
  return (
    <li className="folio-list__item column">
      <div className="folio-list__item-link" style={{ cursor: 'pointer' }} onClick={onClick}>
        <div className="folio-list__item-pic">
          <img src={post.img} alt={post.title} />
        </div>
        <div className="folio-list__item-text">
          <div className="folio-list__item-cat">{post.cat}</div>
          <div className="folio-list__item-title">{post.title}</div>
        </div>
      </div>
      <div
        ref={contentRef}
        className={`blog-dropdown-details${open ? ' open' : ''}`}
        style={{
          maxHeight: open ? undefined : '0px',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
        }}
      >
        <p>{post.details}</p>
        <button className="blog-read-more-btn" onClick={(e) => { e.stopPropagation(); onClick('readmore'); }}>Read More</button>
      </div>
    </li>
  )
}
function BlogModal({ post, onClose }) {
  if (!post) return null
  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal" onClick={e => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose}>&times;</button>
        <img src={post.img} alt={post.title} style={{ maxWidth: '100%', marginBottom: 24 }} />
        <h2>{post.title}</h2>
        <div style={{ fontWeight: 'bold', marginBottom: 8 }}>{post.cat}</div>
        <p style={{ marginBottom: 16 }}>{post.description}</p>
        <div>{post.details}</div>
      </div>
    </div>
  )
}


const Blog = () => {
  const [openId, setOpenId] = useState(null)
  const navigate = useNavigate()
  const handleCardClick = (id, action) => {
    if (action === 'readmore') {
      navigate(`/blog/${id}`)
    } else {
      setOpenId(openId === id ? null : id)
    }
  }
  return (
    <section id="blog" className="s-blog target-section">
      <div className="row blog-portfolio">
        <div className="column lg-12">
          <h2 className="text-pretitle">Blog</h2>
          <ul className="folio-list row block-lg-one-half block-stack-on-1000">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                open={openId === post.id}
                onClick={(action) => handleCardClick(post.id, action)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Blog
