function Contact() {
  return (
    <section id="contact" className="s-contact target-section">
      <div className="row contact-top">
        <span className="contact-vline contact-vline--left"></span>
        <span className="contact-vline contact-vline--right"></span>
        <div className="column lg-12">
          <h2 className="text-pretitle">Get In Touch</h2>
          <p className="h1">
            I love to hear from you. Whether you have a question or just want to
            chat about design, tech &amp; art — shoot me a message.
          </p>
        </div>
      </div>

      <div className="row contact-bottom">
        <div className="column lg-3 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Reach me at</h3>
          <p className="contact-links">
            <a href="mailto:sayhello@nadunanjana.com">sayhello@nadunanjana.com</a> <br />
            <a href="tel:+1975432345">+197 543 2345</a>
          </p>
        </div>
        <div className="column lg-4 md-5 tab-6 stack-on-550 contact-block">
          <h3 className="text-pretitle">Social</h3>
          <ul className="contact-social">
            <li>
              <a href="#0">Behance</a>
            </li>
            <li>
              <a href="#0">Dribble</a>
            </li>
            <li>
              <a href="#0">Twitter</a>
            </li>
            <li>
              <a href="#0">Instagram</a>
            </li>
            <li>
              <a href="#0">Github</a>
            </li>
          </ul>
        </div>
        <div className="column lg-4 md-12 contact-block">
          <a
            href="mailto:sayhello@nadunanjana.com"
            className="btn btn--medium u-fullwidth contact-btn"
          >
            Say Hello.
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
