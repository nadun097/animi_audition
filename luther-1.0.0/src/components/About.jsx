import { useRef, useState } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import CVVerificationModal from './CVVerificationModal'

const skills = [
  'UI/UX Design',
  'React Development',
  'Frontend Development',
  'Figma & Prototyping',
  'Mobile Development',
  'Full Stack Development',
]

const experience = [
  {
    title: 'Meraki United',
    role: 'Animator & Designer',
    timeframe: '2023',
    description:
      'Created short animation video concepts and scripts. Worked on visual design and animation projects, combining creativity with technical design skills to produce engaging content.',
  },
  {
    title: 'Associated Motorways (Pvt) Ltd',
    role: 'Technical Trainer',
    timeframe: '2021 - 2023',
    description:
      'Served as a technical trainer, delivering hands-on training sessions. Developed training materials and guided teams on technical processes, enhancing operational efficiency and skill development.',
  },
]

const education = [
  {
    title: 'National Institute of Business Management (NIBM)',
    role: 'BSc (Hons) in Computing — Software Engineering',
    timeframe: '2023 - Present',
    description:
      'Awarded by Coventry University. Specializing in Software Engineering with a focus on UI/UX design, full-stack development, and blockchain technologies. Expected graduation: 2027.',
  },
  {
    title: 'International College of Business and Technology (ICBT)',
    role: 'Higher National Diploma in Human Resource Management',
    timeframe: '2021',
    description:
      'Awarded by Cardiff Metropolitan University. Gained foundational knowledge in management, organizational behavior, and professional communication skills.',
  },
  {
    title: 'St/Thomas College, Matara',
    role: 'G.C.E. Advanced Level — Mathematics Stream',
    timeframe: '2016',
    description:
      'Completed Advanced Level studies with a focus on Mathematics, providing a strong analytical and problem-solving foundation.',
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

  const [isModalOpen, setIsModalOpen] = useState(false)

  useScrollAnimation([aboutInfoRef, expertiseRef, timelinesRef])

  const handleDownloadClick = () => {
    setIsModalOpen(true)
  }

  const handleVerificationComplete = () => {
    // Create a temporary link to download the CV
    const link = document.createElement('a')
    link.href = '/Nadun-Anjana-CV-ATS.pdf'
    link.download = 'Nadun-Anjana-CV-ATS.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="about" className="s-about target-section">
      <div className="row about-info wide" data-animate-block ref={aboutInfoRef}>
        <div className="column lg-6 md-12 about-info__pic-block">
          <img
            src="/images/about-photo.svg"
            srcSet="/images/about-photo.svg 1x, /images/about-photo@2x.svg 2x"
            alt="Nadun Anjana"
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
              I am a third-year BSc (Hons) in Computing student specializing in
              Software Engineering at NIBM, driven by a strong passion for
              UI/UX design and creating intuitive, user-centered digital
              experiences. I am particularly interested in designing responsive
              interfaces, improving usability, and building visually engaging
              products that solve real user problems. I also have experience in
              full-stack development with React, Node.js, and mobile development
              with Kotlin.
            </p>
            <button onClick={handleDownloadClick} className="btn btn--medium u-fullwidth" data-animate-el>
              Download CV
            </button>
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

      <CVVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerified={handleVerificationComplete}
      />
    </section>
  )
}

export default About
