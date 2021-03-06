import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import css from "../css/Signup.module.css";

const Signup = (props) => {
  const { collectUserDetails, configToast } = props;

  const navigate = useNavigate();
  const [rollnumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const notify = () => {
  //   toast.info("🦄 Wow so easy!", {
  //     position: "bottom-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  const navigator = (endpoint) => {
    navigate(endpoint, { replace: true });
  };

  const setstates = () => {
    setLoading(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    configToast();
    if (!rollnumber || !email || !password) {
      toast("All fields are necessary");
      return;
    }
    setLoading(true);

    fetch("https://cipher-results-api.herokuapp.com/signup/student", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rollnumber,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          // alert(data.error);
          toast(data.error);
          // navigator("/signup");
          setstates();
        } else {
          toast(data.message);
          setstates();
          collectUserDetails(data.userId);
          navigator("/signup/verifyotp");
        }
      })
      .catch((err) => {
        console.log(err);
        toast("Oops! Something went wrong 😥");
        setstates();
      });
  };

  return (
    <form
      onSubmit={(event) => formSubmitHandler(event)}
      className={css.mainrow}
    >
      <Row>
        <Col className={css.widget}>
          <Container className={css.formContainer}>
            <div className={css.form}>
              <div>
                <Col className={css.heading}>
                  <h1>Signup</h1>
                </Col>
              </div>
              <Form.Group className="mb-3" controlId="formBasicRollNumber">
                <Form.Label>Roll Number</Form.Label>
                <Form.Control
                  required
                  className={css.inputs}
                  type="string"
                  placeholder="20XXBCS-XXX"
                  value={rollnumber}
                  onChange={(event) => {
                    setRollNumber(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  className={css.inputs}
                  type="email"
                  placeholder="Enter college mail Id "
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  className={css.inputs}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="light" type="submit" id={css.button}>
                {loading ? "Loading..." : "Send OTP"}
              </Button>

              <p className={css.dividingLine}>&#8195;Or&#8195;</p>
              <Link className={css.signupText} to="/login">
                Already have an account? Login here
              </Link>
            </div>
          </Container>
        </Col>
        <Col>
          <div className={css.RightImage} />
        </Col>
      </Row>
    </form>
  );
};

export default Signup;
