import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import useScrollAnimation from '../hooks/useScrollAnimation'
import {codedript2x, f1AutoCare2x, pixora2x, roborover2x, trashcaseApp2x, codedript, f1AutoCare, pixora, roborover, trashcaseApp, sad, revengex, NFhappy, magicShow, deepjungul } from '../assets'


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
    link: 'https://github.com/nadun097/pixora-frontend',
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
    link: 'https://github.com/JaninduPramod/Crash-Trace',
    designLink: 'https://www.figma.com/design/GbNxEKf7KljwRw9p62U4Xi/Accident-Report-App-Design?node-id=18-2&t=NPolZtfXxJseYHSd-1',
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
    link: 'https://github.com/CodeDript',
    designLink: 'https://www.figma.com/design/Ai8X9KUeTK2ljaGvwayYWa/CODEDRIPT?node-id=0-1&t=qlubLPR6behMeype-1',
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
    link: 'https://github.com/nadun097/fact1_auto_care_java_project',
  },
 
  {
    id: 'modal-06',
    img: sad,
    imgSet: `${sad} 1x`,
    cat: 'Animation',
    title: 'XXXTENTACION – SAD! (Official Animated Video)',
    galleryImg: sad,
    description:
      'This animated video was created as a tribute to XXXTENTACION and his powerful music. As a huge fan, I wanted to visually interpret the emotional depth of the lyrics through an anime-inspired storytelling style. My artistic inspiration for this project came from one of the most iconic animators and visual directors, Randy Chriz. His work has deeply influenced my creative direction, and I\'m grateful for the inspiration he continues to provide. Special thanks to Meraki United / Randy Chriz for the constant motivation. Thank you for visiting — I hope you enjoy this visual experience.',
    categories: ['Animation', 'Anime', 'Music Video'],
    link: 'https://www.youtube.com/watch?v=DSQt1Tft35M',
  },
  {
    id: 'modal-07',
    img: revengex,
    imgSet: `${revengex} 1x`,
    cat: 'Lyric Video',
    title: 'Eminem – Revenge X (Official Lyric Video)',
    galleryImg: revengex,
    description:
      'This lyric video was created in collaboration with Meraki United. My role in this project was animation, where I contributed to bringing the visuals and motion design to life in sync with the song\'s intensity and rhythm. This project helped me strengthen my animation timing, visual storytelling, and lyric-based motion design skills.',
    categories: ['Animation', 'Lyric Video', 'Music'],
    link: 'https://www.youtube.com/watch?v=lEDVPx42yLw',
  },
  {
    id: 'modal-08',
    img: NFhappy,
    imgSet: `${NFhappy} 1x`,
    cat: 'Lyric Video',
    title: 'NF – HAPPY (Lyric Video)',
    galleryImg: NFhappy,
    description:
      'This fan-made lyric video was created for Meraki United during the time I worked with the team. The project focuses on emotional expression through clean visuals, typography animation, and mood-driven design that reflects the theme of the song. Working on this video helped me improve my skills in lyric synchronization, animation flow, and emotional visual direction.',
    categories: ['Animation', 'Lyric Video', 'Music'],
    link: 'https://www.youtube.com/watch?v=lCqCNgHEImY',
  },
  {
    id: 'modal-09',
    img: magicShow,
    imgSet: `${magicShow} 1x`,
    cat: 'Music Video',
    title: 'Thelivid1ne – Magic Show (Official Video)',
    galleryImg: magicShow,
    description:
      'This official video was created in collaboration with Meraki United. My contribution to the project was as an animator, where I worked on animating key scenes and enhancing the overall visual style of the video. The project allowed me to experiment with creative animation techniques and dark, atmospheric visuals that match the artist\'s unique style.',
    categories: ['Animation', 'Music Video', 'Hip Hop'],
    link: 'https://www.youtube.com/watch?v=j2KyeRnXgJ0',
  },
  {
    id: 'modal-10',
    img: deepjungul,
    imgSet: `${deepjungul} 1x`,
    cat: 'Trailer',
    title: 'Deep Jungle Festival 2025 – Official Trailer',
    galleryImg: deepjungul,
    description:
      'This official trailer was created in collaboration with Novagraphy. My role in the project was animation, where I helped bring energy, motion, and excitement to the festival visuals through dynamic animation and visual effects. This project focused on promotional storytelling, rhythm-based animation, and creating a strong visual impact for a live event.',
    categories: ['Animation', 'Festival Trailer', 'Event'],
    link: 'https://www.youtube.com/watch?v=kBJFUsJdOR4',
  },
]

/*
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
*/


//ADD HERE MORE PORTFOLIO ITEMS FOR THE VIDEO CREATION PART.THERE SHOULD BE AT LEAST 5 ITEMS IN TOTAL. MAKE SURE TO ADD THE CORRESPONDING IMAGES IN THE ASSETS FOLDER AND UPDATE THE IMPORTS AT THE TOP OF THIS FILE.I PROVIDED CORRECT IMAGES FOR THE VIDEO CREATION PART.


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
          <div className="modal-popup__details-wrap">
            {item.link && (
              <a
                href={item.link}
                className="modal-popup__details"
                target="_blank"
                rel="noopener noreferrer"
              >
                Project link
              </a>
            )}

            {item.designLink && (
              <a
                href={item.designLink}
                className="modal-popup__details"
                target="_blank"
                rel="noopener noreferrer"
              >
                Design (Figma)
              </a>
            )}
          </div>
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

  const academicItems = portfolioItems.slice(0, 5)
  const videoItems = portfolioItems.slice(5)

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

     
      {/* <div className="row testimonials">
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
       */}
    </section>
  )
}

export default Works
