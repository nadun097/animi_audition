import { useRef } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const skills = [
  'Visual Design',
  'Branding Identity',
  'UI Design',
  'Product Design',
  'Prototyping',
  'Illustration',
]

const experience = [
  {
    title: 'Dropbox',
    role: 'Product Designer',
    timeframe: 'August 2019 - Present',
    description:
      'Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet est occaecat nisi.',
  },
  {
    title: 'Microsoft',
    role: 'Frontend Developer',
    timeframe: 'August 2016 - July 2019',
    description:
      'Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet est occaecat nisi.',
  },
]

const education = [
  {
    title: 'University of Life',
    role: 'Master in Graphic Design',
    timeframe: 'April 2015',
    description:
      'Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet est occaecat nisi.',
  },
  {
    title: 'School of Cool Designers',
    role: 'B.A. Degree in Graphic Design',
    timeframe: 'August 2012',
    description:
      'Lorem ipsum Occaecat do esse ex et dolor culpa nisi ex in magna consectetur nisi cupidatat laboris esse eiusmod deserunt aute do quis velit esse sed Ut proident cupidatat nulla esse cillum laborum occaecat nostrud sit dolor incididunt amet est occaecat nisi.',
  },
]

function TimelineBlock({ item }) {
  return (
    <div className="timeline__block">
      <div className="timeline__bullet"></div>
      <div className="timeline__header">
        <h4 className="timeline__title">{item.title}</h4>
        <h5 className="timeline__meta">{item.role}</h5>
        <p className="timeline__timeframe">{item.timeframe}</p>
      </div>
      <div className="timeline__desc">
        <p>{item.description}</p>
      </div>
    </div>
  )
}

function About() {
  const aboutInfoRef = useRef(null)
  const expertiseRef = useRef(null)
  const timelinesRef = useRef(null)

  useScrollAnimation([aboutInfoRef, expertiseRef, timelinesRef])

  return (
    <section id="about" className="s-about target-section">
      <div className="row about-info wide" data-animate-block ref={aboutInfoRef}>
        <div className="column lg-6 md-12 about-info__pic-block">
          <img
            src="/images/about-photo.jpg"
            srcSet="/images/about-photo.jpg 1x, /images/about-photo@2x.jpg 2x"
            alt=""
            className="about-info__pic"
            data-animate-el
          />
        </div>

        <div className="column lg-6 md-12">
          <div className="about-info__text">
            <h2 className="text-pretitle with-line" data-animate-el>
              About
            </h2>
            <p className="attention-getter" data-animate-el>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </p>
            <a href="#0" className="btn btn--medium u-fullwidth" data-animate-el>
              Download CV
            </a>
          </div>
        </div>
      </div>

      <div className="row about-expertise" data-animate-block ref={expertiseRef}>
        <div className="column lg-12">
          <h2 className="text-pretitle" data-animate-el>
            Expertise
          </h2>
          <ul className="skills-list h1" data-animate-el>
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row about-timelines" data-animate-block ref={timelinesRef}>
        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Experience
          </h2>
          <div className="timeline" data-animate-el>
            {experience.map((item) => (
              <TimelineBlock key={item.title} item={item} />
            ))}
          </div>
        </div>

        <div className="column lg-6 tab-12">
          <h2 className="text-pretitle" data-animate-el>
            Education
          </h2>
          <div className="timeline" data-animate-el>
            {education.map((item) => (
              <TimelineBlock key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
