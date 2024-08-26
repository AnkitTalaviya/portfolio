import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  outline: none;

  ${({ variant, disabled }) => {
    if (disabled) {
      return css`
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
      `;
    }
    switch (variant) {
      case 'primary':
        return css`
          background-color: #007bff;
          color: white;
          &:hover { background-color: #0056b3; }
        `;
      case 'secondary':
        return css`
          background-color: #6c757d;
          color: white;
          &:hover { background-color: #545b62; }
        `;
      case 'success':
        return css`
          background-color: #28a745;
          color: white;
          &:hover { background-color: #218838; }
        `;
      default:
        return css`
          background-color: #f8f9fa;
          color: #212529;
          &:hover { background-color: #e2e6ea; }
        `;
    }
  }}

  &:active {
    transform: scale(0.98);
  }
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top: 2px solid transparent;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon,
  ariaLabel,
}) => {
  const handleClick = (e) => {
    if (!disabled && !isLoading && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  };

  return (
    <StyledButton
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      type={type}
      variant={variant}
      disabled={disabled || isLoading}
      style={{ width: fullWidth ? '100%' : 'auto' }}
      aria-label={ariaLabel || children}
      aria-disabled={disabled || isLoading}
    >
      {isLoading && <LoadingSpinner />}
      {icon && !isLoading && icon}
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  ariaLabel: PropTypes.string,
};

export default Button;