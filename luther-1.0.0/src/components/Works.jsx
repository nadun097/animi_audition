import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import useScrollAnimation from '../hooks/useScrollAnimation'

const ArrowIcon = () => (
  <svg
    width="15"
    height="15"
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
    img: '/images/portfolio/fuji.jpg',
    imgSet: '/images/portfolio/fuji.jpg 1x, /images/portfolio/fuji@2x.jpg 2x',
    cat: 'Website',
    title: 'Retro Camera.',
    galleryImg: '/images/portfolio/gallery/g-fuji.jpg',
    description:
      'Odio soluta enim quos sit asperiores rerum rerum repudiandae cum. Vel voluptatem alias qui assumenda iure et expedita voluptatem. Ratione officiis quae.',
    categories: ['Branding', 'Product Design'],
    link: 'https://www.behance.net/',
  },
  {
    id: 'modal-02',
    img: '/images/portfolio/lamp.jpg',
    imgSet: '/images/portfolio/lamp.jpg 1x, /images/portfolio/lamp@2x.jpg 2x',
    cat: 'Product Design',
    title: 'The White Lamp.',
    galleryImg: '/images/portfolio/gallery/g-lamp.jpg',
    description:
      'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
    categories: ['Branding'],
    link: 'https://www.behance.net/',
  },
  {
    id: 'modal-03',
    img: '/images/portfolio/rucksack.jpg',
    imgSet:
      '/images/portfolio/rucksack.jpg 1x, /images/portfolio/rucksack@2x.jpg 2x',
    cat: 'Branding',
    title: 'Rucksuck.',
    galleryImg: '/images/portfolio/gallery/g-rucksack.jpg',
    description:
      'Exercitationem reprehenderit quod explicabo consequatur aliquid ut magni ut. Deleniti quo corrupti illum velit eveniet ratione necessitatibus ipsam mollitia.',
    categories: ['Product Design'],
    link: 'https://www.behance.net/',
  },
  {
    id: 'modal-04',
    img: '/images/portfolio/skaterboy.jpg',
    imgSet:
      '/images/portfolio/skaterboy.jpg 1x, /images/portfolio/skaterboy@2x.jpg 2x',
    cat: 'Website',
    title: 'Since Day One.',
    galleryImg: '/images/portfolio/gallery/g-skaterboy.jpg',
    description:
      'Dolores velit qui quos nobis. Aliquam delectus voluptas quos possimus non voluptatem voluptas voluptas. Est doloribus eligendi porro doloribus voluptatum.',
    categories: ['Website'],
    link: 'https://www.behance.net/',
  },
  {
    id: 'modal-05',
    img: '/images/portfolio/sanddunes.jpg',
    imgSet:
      '/images/portfolio/sanddunes.jpg 1x, /images/portfolio/sanddunes@2x.jpg 2x',
    cat: 'Illustration',
    title: 'Sand Dunes.',
    galleryImg: '/images/portfolio/gallery/g-sanddunes.jpg',
    description:
      'Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.',
    categories: ['Illustration'],
    link: 'https://www.behance.net/',
  },
  {
    id: 'modal-06',
    img: '/images/portfolio/minimalismo.jpg',
    imgSet:
      '/images/portfolio/minimalismo.jpg 1x, /images/portfolio/minimalismo@2x.jpg 2x',
    cat: 'Branding',
    title: 'Minimalismo.',
    galleryImg: '/images/portfolio/gallery/g-minimalismo.jpg',
    description:
      'Quisquam vel libero consequuntur autem voluptas. Qui aut vero. Omnis fugit mollitia cupiditate voluptas. Aenean sollicitudin, lorem quis bibendum auctor.',
    categories: ['Branding', 'Product Design'],
    link: 'https://www.behance.net/',
  },
]

const testimonials = [
  {
    avatar: '/images/avatars/user-02.jpg',
    name: 'Tim Cook',
    position: 'CEO, Apple',
    text: 'Molestiae incidunt consequatur quis ipsa autem nam sit enim magni. Voluptas tempore rem. Explicabo a quaerat sint autem dolore ducimus ut consequatur neque. Nisi dolores quaerat fuga rem nihil nostrum. Laudantium quia consequatur molestias delectus culpa.',
  },
  {
    avatar: '/images/avatars/user-03.jpg',
    name: 'Sundar Pichai',
    position: 'CEO, Google',
    text: 'Excepturi nam cupiditate culpa doloremque deleniti repellat. Veniam quos repellat voluptas animi adipisci. Nisi eaque consequatur. Voluptatem dignissimos ut ducimus accusantium perspiciatis. Quasi voluptas eius distinctio. Atque eos maxime.',
  },
  {
    avatar: '/images/avatars/user-01.jpg',
    name: 'Satya Nadella',
    position: 'CEO, Microsoft',
    text: 'Repellat dignissimos libero. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam. Autem eaque officia cum exercitationem sunt voluptatum accusamus. Quasi voluptas eius distinctio. Voluptatem dignissimos ut.',
  },
  {
    avatar: '/images/avatars/user-06.jpg',
    name: 'Jeff Bezos',
    position: 'CEO, Amazon',
    text: 'Nunc interdum lacus sit amet orci. Vestibulum dapibus nunc ac augue. Fusce vel dui. In ac felis quis tortor malesuada pretium. Curabitur vestibulum aliquam leo. Qui sed at corrupti expedita voluptas odit. Nihil ea quia nesciunt. Ducimus aut sed ipsam.',
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

          <ul className="folio-list row block-lg-one-half block-stack-on-1000">
            {portfolioItems.map((item) => (
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
