export const runtime = 'edge';

import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cursor from '../components/Cursor'
import webdevImg from '../assets/portfolio/gallery/webdevolopment.jpg'
import uiuxImg from '../assets/portfolio/gallery/uiux.avif'
import asgardeoImg from '../assets/portfolio/gallery/asgardeo.png'
import code01 from '../assets/portfolio/gallery/code 01.png'
import code02 from '../assets/portfolio/gallery/code 02.png'
import code03 from '../assets/portfolio/gallery/code 03.png'

const blogPosts = [
//   {
//     id: 'blog-01',
//     img: webdevImg,
//     cat: 'Web Development',
//     title: 'Building a Modern Portfolio',
//     description: 'A step-by-step guide to creating a personal portfolio using React, Vite, and modern CSS techniques. Learn how to structure your project, add animations, and deploy your site.',
//     details: 'In this blog, I walk you through the process of building a modern portfolio website from scratch. We cover project setup, component structure, animation libraries, and deployment tips for maximum impact.',
//   },
  {
    id: 'blog-02',
    img: asgardeoImg,
    cat: 'Authentication',
    title: 'Getting Started with WSO2 Asgardeo – Secure Authentication Made Simple',
    description: 'A beginner friendly guide to integrating WSO2 Asgardeo for secure authentication in your web applications.',
    details: (
      <>
        <h3>In today’s digital world, security is not optional it’s essential.</h3>
        <p>
          Whether you are building a web app, mobile app, or enterprise system,
          authentication and authorization are critical components. That’s where
          WSO2 Asgardeo comes in.
        </p>

        <h3>What is WSO2 Asgardeo?</h3>
        <p>
          WSO2 Asgardeo is a cloud based Customer Identity and Access Management
          (CIAM) platform. It allows developers to easily add:
        </p>
        <ul>
          <li>Secure login &amp; registration</li>
          <li>Single Sign On (SSO)</li>
          <li>Multi-Factor Authentication (MFA)</li>
          <li>Social login (Google, Facebook, etc.)</li>
          <li>Role-based access control</li>
        </ul>
        <p>Instead of building authentication from scratch, Asgardeo provides a
          secure and scalable solution in minutes.</p>

        <h3>Key Features of Asgardeo</h3>
        <ol>
          <li>
            <strong>Authentication &amp; Authorization</strong>
            <ul>
              <li>OAuth 2.0</li>
              <li>OpenID Connect (OIDC)</li>
              <li>SAML 2.0</li>
            </ul>
          </li>
          <li>
            <strong>Single Sign-On (SSO)</strong><br />Users can log in once and
            access multiple applications securely.
          </li>
          <li>
            <strong>Multi-Factor Authentication (MFA)</strong><br />Add extra
            security layers like OTP via email, TOTP, SMS-based verification.
          </li>
          <li>
            <strong>Social Login</strong><br />Enable login with Google, Facebook,
            GitHub, etc.
          </li>
          <li>
            <strong>Role-Based Access Control (RBAC)</strong><br />Assign roles
            such as Admin, User, Manager and control access to specific features.
          </li>
        </ol>

        <h3>How Asgardeo Works</h3>
        <p>Asgardeo acts as an identity provider between your application and your
          users. Simple flow:</p>
        <ul>
          <li>User clicks “Login”</li>
          <li>Redirected to Asgardeo login page</li>
          <li>User authenticates</li>
          <li>Asgardeo sends back a secure token (JWT)</li>
          <li>Your app validates the token and grants access</li>
        </ul>
        <p>This process uses secure protocols like OAuth 2.0 and OpenID Connect.</p>

        <h3>Integrating Asgardeo with a React Application</h3>
        <p>Here’s a simple step-by-step overview:</p>
        <ol>
          <li><strong>Register on Asgardeo</strong>
            <ul>
              <li>Go to the Asgardeo Console</li>
              <li>Create an organization</li>
              <li>Register a new application</li>
              <li>Select Single Page Application (SPA)</li>
            </ul>
          </li>
          <li><strong>Install the Asgardeo SDK</strong>
            <img src={code01} alt="npm install command" style={{maxWidth:'100%',marginBottom:16}} />
          </li>
          <li><strong>Configure AuthProvider</strong>
            <img src={code02} alt="AuthProvider config snippet" style={{maxWidth:'100%',marginBottom:16}} />
          </li>
          <li><strong>Use Authentication Hooks</strong>
            <img src={code03} alt="useAuthContext hook" style={{maxWidth:'100%',marginBottom:16}} />
          </li>
        </ol>
        <p>Now your React app is secured</p>

        <h3>Why Use Asgardeo?</h3>
        <ul>
          <li>Cloud based – No server maintenance</li>
          <li>Developer friendly SDKs</li>
          <li>Enterprise grade security</li>
          <li>Easy integration</li>
          <li>Free tier available</li>
        </ul>
        <p>It saves development time and ensures your application follows modern
          security standards.</p>

        <h3>Real World Use Case</h3>
        <p>Imagine building:</p>
        <ul>
          <li>A Daily Quote App</li>
          <li>An Employee Portal</li>
          <li>An E-commerce Website</li>
        </ul>
        <p>With Asgardeo, you can:</p>
        <ul>
          <li>Allow users to register/login</li>
          <li>Protect APIs</li>
          <li>Restrict admin pages</li>
          <li>Enable secure logout</li>
        </ul>
        <p>All without building authentication manually.</p>

        <h3>Final Thoughts</h3>
        <p>Authentication is one of the most sensitive parts of any application.
          Instead of reinventing the wheel, platforms like WSO2 Asgardeo help
          developers focus on building features while ensuring security.</p>
        <p>If you are building modern applications using React, Spring Boot,
          Angular, Mobile Apps — Asgardeo is definitely worth trying.</p>

        <h3>About the Author</h3>
        <p>
          Hi, I’m Nadun Anjana, a Software Engineering undergraduate passionate
          about UI/UX design and secure application development. I enjoy
          building modern web applications and integrating authentication
          solutions like Asgardeo to enhance security.
        </p>
      </>
    ),
  },
//   {
//     id: 'blog-03',
//     img: uiuxImg,
//     cat: 'UI/UX Design',
//     title: 'UI/UX Fundamentals for Modern Web Apps',
//     description: 'Key principles and actionable tips for designing intuitive, beautiful user interfaces and experiences.',
//     details: 'This post covers layout, color, typography, and interaction design, with real-world examples to help you create web apps that users love.',
//   },
]

export default function BlogDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // scroll to top whenever the id changes (new post opened)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const post = blogPosts.find((b) => b.id === id)
  if (!post) return <div style={{padding:40}}>Blog not found.</div>
  return (
    <>
      <section className="s-blog target-section" style={{minHeight:'60vh', marginTop: 20}}>
        <div className="row blog-portfolio">
          <div className="column lg-12">
            <button style={{marginBottom:24}} onClick={() => navigate(-1)}>&larr; Back</button>
            <img src={post.img} alt={post.title} style={{maxWidth:'100%',marginBottom:24}} />
            <h2>{post.title}</h2>
            <div style={{fontWeight:'bold',marginBottom:8}}>{post.cat}</div>
            <p style={{marginBottom:16}}>{post.description}</p>
            <div>{post.details}</div>
          </div>
        </div>
      </section>
      <Cursor />
    </>
  )
}
