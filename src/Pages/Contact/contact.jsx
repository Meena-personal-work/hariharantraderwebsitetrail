import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <img src="./crackers-website-banner6.jpg" alt="contact banner"></img>
      <div className="contact-info-img">
        <div className="contact-info">
          <h2 className="contact-heading">Contact Us :-</h2>
          <h5 className="contact-gradient-underline">HARIHARAN TRADER</h5>
          <span>
            <FontAwesomeIcon className="contact-icon" icon={faLocationDot} />{" "}
            &nbsp; No.3/1341/15, Sattur Road, Opp. Old PRC Bus Depot, Near East
            Police Station, SIVAKASI - 626 189.
          </span>
          <span>
            <FontAwesomeIcon className="contact-icon" icon={faPhone} /> &nbsp;
            9444324237
          </span>
          <span>
            <FontAwesomeIcon className="contact-icon" icon={faEnvelope} />{" "}
            &nbsp; hariayyansworld@gmail.com
          </span>
        </div>

        <img className="contact-img" src="./contact-image.png" alt="contact" />
      </div>
      <div className="contact-map-container">
        <iframe
          title="map"
          src=" https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3935.7609157010875!2d77.80998129999999!3d9.442353100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cffb1a5e4c13%3A0x65b51e50ae2fcf92!2sAyyan&#39;s%20World-Hariharan%20Trader!5e0!3m2!1sen!2sin!4v1754326531794!5m2!1sen!2sin"
          width="100%"
          height="500"
          className="contact-map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
