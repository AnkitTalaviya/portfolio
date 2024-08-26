import Button from "components/Common/FormFields/Button";
import Input from "components/Common/FormFields/Input";
import { checkPasswordStrength, getStrengthColor } from "modules/modules";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
  });

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {}

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(loginDetails.password));
  }, [loginDetails.password]);

  return (
    <div>
      <form>
        <Input
          type="text"
          label="Username"
          name="username"
          value={loginDetails.username}
          onChange={handleChange}
          required
          error={errors.username}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
          required
          error={errors.password}
        />
        {loginDetails.password && (
          <div>
            Password Strength:
            <span style={{ color: getStrengthColor(passwordStrength.score) }}>
              {passwordStrength.label}
            </span>
          </div>
        )}
        <Button onClick={handleSubmit} variant="primary">
        Click me
      </Button>
      </form>
    </div>
  );
};

export default Login;
