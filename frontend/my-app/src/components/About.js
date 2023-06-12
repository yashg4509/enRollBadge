import React from "react";
import Footer from "./Footer.jsx";
import Card from "react-bootstrap/Card";
import "./About.css"; // Import the CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="text-center my-3 about-heading">About EnrollBadger</h1>
        <h5 className="text-center" style={{ color: "gray" }}>
          Simplifying Course Enrollment at UW Madison.
        </h5>

        <Card className="about-card">
          <Card.Body>
            <Card.Title>
              <h4>Stay One Step Ahead</h4>
            </Card.Title>
            <Card.Text>
              Our system monitors course availability and sends instant
              notifications directly to your device when a course opens up or
              becomes waitlisted. Say goodbye to repeatedly refreshing the
              course registration page or relying on outdated information.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="about-card">
          <Card.Body>
            <Card.Title>
              <h4>Personalized Course Alerts</h4>
            </Card.Title>
            <Card.Text>
              You can use our subscription interface to select what courses you
              want to keep track of instead of getting course alerts for the
              thousands of courses we have on our platform. Whether it's a
              general education requirement, a major-specific course, or an
              elective that piques your interest, EnrollBadger will keep an eye
              on them for you. No more missed opportunities or last-minute
              scrambles during enrollment periods.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="about-card">
          <Card.Body>
            <Card.Title>
              <h4>Effortless and User Friendly</h4>
            </Card.Title>
            <Card.Text>
              We believe in making the course enrollment process effortless and
              user-friendly. EnrollBadger features a sleek and intuitive
              interface, ensuring a seamless experience for all users. With just
              a few clicks, you can set up your course subscriptions and receive
              notifications directly on your device—no more wasted time or
              missed chances.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="about-card">
          <Card.Body>
            <Card.Title>
              <h4>Reliable and Real-Time Data</h4>
            </Card.Title>
            <Card.Text>
              Count on EnrollBadger for reliable and real-time course data. Our
              system continuously updates our database to provide accurate
              course availability information when you need it most. Make
              informed decisions about your course selections with dependable
              notifications from EnrollBadger.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="about-card highlighted-card">
          <Card.Body>
            <Card.Title>
              <h4>Get Started With EnrollBadger Today!</h4>
            </Card.Title>
            <Card.Text>
              Don't let course enrollment stress you out. Take control of your
              academic journey with EnrollBadger. Sign up today and gain the
              advantage of real-time notifications for course availability at UW
              Madison. Streamline your course selection process, secure your
              preferred classes, and make the most of your time as a college
              student. EnrollBadger is your key to a smoother and more
              successful enrollment experience.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default About;
