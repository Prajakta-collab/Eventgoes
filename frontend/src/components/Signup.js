import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let history = useHistory();

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const { name, email, password } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (json.success) {
      //save the token
      localStorage.setItem("token", json.authtoken);

      history.push("/");
      props.showAlert("Account created Successfully !", "success");
    } else {
      props.showAlert("email must not be used before", "error");
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
              className="img-fluid"
              alt="sample img"
            ></img>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start md-2">
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onChange}
                  class="form-control "
                />
                <label class="form-label" for="form3Example1c">
                  Your Name
                </label>
              </div>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={onChange}
                  class="form-control"
                />
                <label class="form-label" for="form3Example3c">
                  Your Email
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="password"
                  onChange={onChange}
                  name="password"
                  class="form-control"
                />

                <label className="form-label" for="form3Example4">
                  Password
                </label>
              </div>

              {/* <!-- repeat Password input --> */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  class="form-control"
                  onChange={onChange}
                />
                <label class="form-label" for="form3Example4cd">
                  Repeat your password
                </label>
              </div>
              <div class="form-check d-flex justify-content-center mb-5">
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form2Example3c"
                />
                <label class="form-check-label" for="form2Example3">
                  I agree all statements in <a href="#!">Terms of service</a>
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg justify-content-center"
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account?{" "}
                  <Link to="/login" role="link" className="link-danger">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-dark">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2021. All rights reserved to Prajakta Badgujar.
        </div>

        <div>
          <a
            href="https://www.instagram.com/theprajakta/"
            className="text-white me-4"
          >
            <i className="fa fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com/Prajakt06363682"
            className="text-white me-4"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="mailto:prajaktabadgujar2281@gmail.com"
            className="text-white me-4"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/prajakta-badgujar-7a40b4180/"
            className="text-white"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Signup;
