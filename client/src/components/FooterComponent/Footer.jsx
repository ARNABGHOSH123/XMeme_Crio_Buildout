/**
 * This React Component is responsible for rendering the footer of the application.
 */
import React from "react";
import "./Footer.css";

const Footer = (props) => {
  return (
    <div
      className="main-footer"
      style={{ position: props.memesLength !== 0 ? "relative" : "fixed" }}
    >
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>(+91)-9674581334</li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h5>Email</h5>
            <ul className="list-unstyled">
              <li>arnabghosh31031998@gmail.com</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h5>Created By:</h5>
            <ul className="list-unstyled">
              <li>Arnab Ghosh</li>
            </ul>
          </div>
        </div>
        <hr style={{ borderColor: "white" }} />
        <div className="row justify-content-center">
          <p>
            &copy;{new Date().getFullYear()} XMEME INC | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
