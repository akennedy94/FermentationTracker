import logo from "../icons/logo.png";
import "../css/landingPage.css";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const LandingPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Image src={logo} alt="brand logo" className="logo" />
        </Col>
        <Col className="text-center text-col">
          <h1>Fermentation Tracker</h1> <br />
          <p>
            {" "}
            This a web app for tracking different lacto-fermentation projects!{" "}
            <br /> <br />
            For more information about the background or technical workings of
            this app, please checkout the readme located in the project's
            <a
              href="https://github.com/akennedy94/FermentationTracker"
              alt="github link"
            >
              &nbsp;github repository.
            </a>{" "}
            <br /> <br />
            To begin using this app, click the button below to be taken to the
            project form! <br /> <br />
          </p>
          <Row className="justify-content-center mb-2">
            <Button href="/projectForm" className="btn btn-lg">
              Get Started!
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
