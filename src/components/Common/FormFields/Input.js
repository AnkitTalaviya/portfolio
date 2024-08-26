import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #007bff;
  }

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: bold;
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
`;

const Input = ({
  type = "text",
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  required = false,
  error,
  min,
  max,
  step,
  pattern,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    // Add keyboard shortcuts here
    if (e.ctrlKey && e.key === "Enter") {
      // Example: Ctrl + Enter to submit form
      e.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  };

  return (
    <InputWrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledInput
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        onFocus={() => setIsFocused(true)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        pattern={pattern}
        onKeyDown={handleKeyDown}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && <ErrorMessage id={`${name}-error`}>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  pattern: PropTypes.string,
};

export default Input;