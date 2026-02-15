import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import useScrollAnimation from '../hooks/useScrollAnimation'
import {codedript2x, f1AutoCare2x, pixora2x, roborover2x, trashcaseApp2x, codedript, f1AutoCare, pixora, roborover, trashcaseApp, gFuji, gLamp, gMinimalismo, gRucksack, gSanddunes, gSkaterboy } from '../assets'


const ArrowIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const portfolioItems = [
  {
    id: 'modal-01',
    img: pixora,
    imgSet: `${pixora} 1x`,
    cat: 'Full Stack',
    title: 'Pixora',
    galleryImg: pixora2x,
    description:
      'A blockchain-based digital art marketplace. Implemented frontend using React and TypeScript, integrated smart contracts using Solidity.',
    categories: ['React', 'TypeScript', 'Solidity', 'Vite'],
    link: 'https://github.com/nadun097',
  },
  {
    id: 'modal-02',
    img: trashcaseApp,
    imgSet: `${trashcaseApp} 1x`,
    cat: 'Mobile App',
    title: 'Crash-Trace',
    galleryImg: trashcaseApp2x,
    description:
      'A vehicle accident news and verification mobile application. Users can search vehicle numbers and identify past accident records including location, damage percentage, and involved vehicles. Built with MVVM and Jetpack Compose.',
    categories: ['Kotlin', 'Jetpack Compose', 'Firebase', 'Supabase'],
    link: 'https://github.com/nadun097',
  },
  {
    id: 'modal-03',
    img: roborover,
    imgSet: `${roborover} 1x`,
    cat: 'Web Platform',
    title: 'RoboRover',
    galleryImg: roborover2x,
    description:
      'Official event website and race management system for the NIBM RoboRover challenge, including registration, session booking, real-time race timing, and a live leaderboard. Deployed with CI/CD on AWS Lightsail + Render.',
    categories: ['React', 'Express.js', 'MongoDB', 'Flutter', 'AWS'],
    link: 'https://roborover.nibmmatara.edu.lk',
  },
  {
    id: 'modal-04',
    img: codedript,
    imgSet: `${codedript} 1x`,
    cat: 'Blockchain',
    title: 'CodeDript',
    galleryImg: codedript2x,
    description:
      'A decentralized agreement management platform enabling secure contracts between clients and developers. Features MetaMask authentication, Ethereum transactions via ethers.js, real-time milestone tracking, and decentralized document storage using IPFS.',
    categories: ['React', 'TypeScript', 'Solidity', 'Node.js', 'Docker'],
    link: 'https://github.com/nadun097',
  },
  {
    id: 'modal-05',
    img: f1AutoCare,
    imgSet: `${f1AutoCare} 1x`,
    cat: 'Desktop App',
    title: 'Fact One Auto Care',
    galleryImg: f1AutoCare2x,
    description:
      'A desktop-based vehicle scheduling and route management system. Implemented MVC architecture with database integration for efficient vehicle service management.',
    categories: ['Java', 'JavaFX', 'MVC', 'MySQL'],
    link: 'https://github.com/nadun097',
  },
]

const testimonials = [
  {
    avatar: '/images/avatars/user-02.jpg',
    name: 'Nadishani N. Gunasekara',
    position: 'Consultant/Lecturer (IT), NIBM',
    text: 'Nadun is a highly dedicated and passionate student with exceptional skills in UI/UX design and software development. His creativity and attention to detail consistently shine through in every project he undertakes.',
  },
  {
    avatar: '/images/avatars/user-03.jpg',
    name: 'Prabodh De Silva',
    position: 'Database Administrator, Intervest Software Technologies',
    text: 'Working with Nadun has been a pleasure. His technical abilities in full-stack development combined with his strong design sense make him a versatile and valuable team member who delivers quality results.',
  },
]

function Modal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="basicLightbox basicLightbox--visible" onClick={onClose}>
      <div
        className="basicLightbox__placeholder"
        onClick={(e) => e.stopPropagation()}
        style={{ opacity: 1, transform: 'scale(1)' }}
      >
        <div className="modal-popup">
          <img src={item.galleryImg} alt="" />
          <div className="modal-popup__desc">
            <h5>{item.title.replace('.', '')}</h5>
            <p>{item.description}</p>
            <ul className="modal-popup__cat">
              {item.categories.map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          </div>
          <a href={item.link} className="modal-popup__details">
            Project link
          </a>
        </div>
      </div>
    </div>
  )
}

function Works() {
  const [activeModal, setActiveModal] = useState(null)
  const portfolioRef = useRef(null)
  const testimonialsRef = useRef(null)

  useScrollAnimation([portfolioRef, testimonialsRef])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setActiveModal(null)
    }
  }

  const academicItems = portfolioItems.slice(0, 6)
  const videoItems = portfolioItems.slice(6)

  return (
    <section id="works" className="s-works target-section">
      <div className="row works-portfolio">
        <div className="column lg-12" data-animate-block ref={portfolioRef}>
          <h2 className="text-pretitle" data-animate-el>
            Recent Works
          </h2>
          <p className="h1" data-animate-el>
            Here are some of my favorite projects I have done lately. Feel free
            to check them out.
          </p>

          <h3 className="text-pretitle" data-animate-el>Academic Projects</h3>
          <ul className="folio-list row block-lg-one-half block-stack-on-1000">
            {academicItems.map((item) => (
              <li
                key={item.id}
                className="folio-list__item column"
                data-animate-el
              >
                <a
                  className="folio-list__item-link"
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveModal(item)
                  }}
                >
                  <div className="folio-list__item-pic">
                    <img src={item.img} srcSet={item.imgSet} alt="" />
                  </div>
                  <div className="folio-list__item-text">
                    <div className="folio-list__item-cat">{item.cat}</div>
                    <div className="folio-list__item-title">{item.title}</div>
                  </div>
                </a>
                <a className="folio-list__proj-link" href="#" title="project link">
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>

          <h3 className="text-pretitle" data-animate-el>Video creation</h3>
          <ul className="folio-list row block-lg-one-half block-stack-on-1000">
            {videoItems.map((item) => (
              <li
                key={item.id}
                className="folio-list__item column"
                data-animate-el
              >
                <a
                  className="folio-list__item-link"
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveModal(item)
                  }}
                >
                  <div className="folio-list__item-pic">
                    <img src={item.img} srcSet={item.imgSet} alt="" />
                  </div>
                  <div className="folio-list__item-text">
                    <div className="folio-list__item-cat">{item.cat}</div>
                    <div className="folio-list__item-title">{item.title}</div>
                  </div>
                </a>
                <a className="folio-list__proj-link" href="#" title="project link">
                  <ArrowIcon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {activeModal && (
          <Modal item={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </div>

      <div className="row testimonials">
        <div className="column lg-12" data-animate-block ref={testimonialsRef}>
          <div className="swiper-container testimonial-slider" data-animate-el>
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              breakpoints={{
                401: { slidesPerView: 1, spaceBetween: 20 },
                801: { slidesPerView: 2, spaceBetween: 32 },
                1201: { slidesPerView: 2, spaceBetween: 80 },
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.name}>
                  <div className="testimonial-slider__slide">
                    <div className="testimonial-slider__author">
                      <img
                        src={testimonial.avatar}
                        alt="Author image"
                        className="testimonial-slider__avatar"
                      />
                      <cite className="testimonial-slider__cite">
                        <strong>{testimonial.name}</strong>
                        <span>{testimonial.position}</span>
                      </cite>
                    </div>
                    <p>{testimonial.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Works
