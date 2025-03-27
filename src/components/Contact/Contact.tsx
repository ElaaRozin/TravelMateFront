import React from "react";
import "./Contact.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Contact: React.FC = () => {
  return (
    <div className="general-contact">
      <NavBar/>
    <div className="contact-container">
      <h1>Contact Us 📩</h1>
      <p>Have questions or need help? Reach out to us anytime!</p>

      <div className="contact-details">
        <div className="contact-item">
          <p>Email: <a href="mailto:support@travelmate.com">support@travelmate.com</a></p>
        </div>

        <div className="contact-item">
          <p>Phone: <a href="tel:+123456789">+1 (234) 567-89</a></p>
        </div>

        <div className="contact-item">
          <p>Location: 123 Travel Street, Wanderland</p>
        </div>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default Contact;
