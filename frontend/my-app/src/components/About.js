import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import Card from "react-bootstrap/Card";
import "./About.css"; // Import the CSS file for styling
import { FaHeart } from "react-icons/fa";
import { BsPencilFill } from "react-icons/bs";
import "./footer.css";

const About = () => {
  const donateLink = "https://fundly.com/uw-madison-course-notification";
  const feedbackLink = "https://forms.gle/65xy8qoiGbTDiooW8";

  return (
    <div className="about-container">
      <div className="about-content">
        <h5
          className="text-center my-3 about-heading"
          style={{ textDecoration: "underline" }}
        >
          ABOUT
        </h5>
        <h5 className="text-center" style={{ color: "gray" }}>
          Simplifying Course Enrollment at UW Madison.
        </h5>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            className="about-card"
            style={{ width: "550px", marginTop: "20px" }}
          >
            <Card.Body>
              <Card.Text style={{ textAlign: "center", fontSize: 14 }}>
<<<<<<< Updated upstream
                Are you one of us who keeps checking for course availability
                every five minutes? Don't let that stress you out anymore! Take
                control of your academic journey with EnrollBadger. Sign up
                today and gain the advantage of real-time notifications for
                course availability at UW Madison. Get notified in just three
                easy steps: Log in, Search, and Subscribe.
                <br />
                <br />
                <Link to="/signup">
                  <h5 id="getstarted">Get Started With EnrollBadger Today!</h5>
                </Link>
=======
                Don't let course enrollment stress you out. Take control of your
                academic journey with EnRollBadge. Sign up today and gain the
                advantage of real-time notifications for course availability at
                UW Madison. Get notified in just 3 easy steps: Log in, Search,
                and Subscribe.
                <br />
                <br />
                <h5>Get Started With EnRollBadge Today!</h5>
>>>>>>> Stashed changes
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <h5
          className="text-center my-3 about-heading"
          style={{ textDecoration: "underline" }}
        >
          HELP
        </h5>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            className="about-card"
            style={{ width: "550px", marginTop: "10px" }}
          >
            <Card.Body>
              <Card.Text style={{ textAlign: "center", fontSize: 14 }}>
                <p>
                  If you have issues,questions or feedback regarding this
                  project, please click on the 'Feedback' link. We will get back
                  to you as soon as we can. There is always scope to improve
                  this website and add features you want us to so we would love
                  to hear from you.
                </p>
                Hosting this website and using proxies to track status costs
                money. Help us keep this project going by clicking the 'Donate'
                button below.
              </Card.Text>
              <div
                className="footer-buttons my-4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px 0",
                }}
              >
                <a
                  className="feedback-button green"
                  href={feedbackLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: "0 10px", textDecoration: "none" }}
                >
                  <span className="feedback-icon">
                    <BsPencilFill />
                  </span>
                  Feedback
                </a>
                <a
                  className="donate-button orange"
                  href={donateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ margin: "0 10px" }}
                >
                  <span className="donate-icon">
                    <FaHeart />
                  </span>
                  Donate
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
