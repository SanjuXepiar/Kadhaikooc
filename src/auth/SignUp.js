import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function SignUp({ toggleForm }) {
  const [passwordVisibililty1, setPasswordVisibility1] = useState(false);
  const [passwordVisibililty2, setPasswordVisibility2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formField, setFormField] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { username, email, password, confirmPassword } = formField;
  const readyToSubmit = username && email && password && confirmPassword;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormField((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3) {
      return toast.error(`🚫 username length atleast 3`);
    }
    if (confirmPassword !== password) {
      return toast.error(`🚫 password do not match`);
    }
    if (readyToSubmit) {
      const user = {
        username,
        email,
        password,
      };
      setLoading(true);
      try {
        const { data, status } = await axios.post(
          `${process.env.REACT_APP_API}/signup`,
          user
        );
        console.log(data, status);
        if (data.success && status === 201) {
          toast.success(`Account for user '${username}' created Successfully!`);
          toast.info(`Now '${username}' can Sign In.`);
        }
      } catch (err) {
        return toast.error(`${err.response.data?.message}`);
      } finally {
        setLoading(false);
      }
      setFormField({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="formBx">
      <form onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="should be in format characters@characters.domain"
          value={email}
          onChange={handleChange}
        />
        <div className="password-section">
          <input
            type={`${passwordVisibililty1 ? "text" : "password"}`}
            name="password"
            placeholder="Create Password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            value={password}
            onChange={handleChange}
          />
          <span
            className="password-visibility"
            onClick={() => setPasswordVisibility1(!passwordVisibililty1)}
          >
            {passwordVisibililty1 ? (
              <i className="fas fa-eye-slash icon"></i>
            ) : (
              <i className="fas fa-eye icon"></i>
            )}
          </span>
        </div>
        <div className="password-section">
          <input
            type={`${passwordVisibililty2 ? "text" : "password"}`}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <span
            className="password-visibility"
            onClick={() => setPasswordVisibility2(!passwordVisibililty2)}
          >
            {passwordVisibililty2 ? (
              <i className="fas fa-eye-slash icon"></i>
            ) : (
              <i className="fas fa-eye icon"></i>
            )}
          </span>
        </div>
        <button type="submit" disabled={readyToSubmit ? false : true}>
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <p className="signup">
          Already have an account ?
          <Link to="#" onClick={() => toggleForm()}>
            Sign in.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
