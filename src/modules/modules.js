export const checkPasswordStrength = (password) => {
  let score = 0;
  if (password.length === 0) return { score: 0, label: "" };

  // Length check
  if (password.length > 7) score += 1;
  if (password.length > 10) score += 1;

  // Complexity checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1; // Has uppercase and lowercase
  if (/\d/.test(password)) score += 1; // Has number
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) score += 1; // Has special char

  // Deduct points for common patterns
  if (/^[a-zA-Z]+$/.test(password) || /^\d+$/.test(password)) score -= 1; // Only letters or only numbers
  if (
    /^(?:(?:(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[12]\d|3[01])\/(?:19|20)\d{2})|(?:(?:19|20)\d{2})[-/.](?:0?[1-9]|1[0-2])[-/.](?:0?[1-9]|[12]\d|3[01]))$/.test(
      password
    )
  )
    score -= 1; // Date format
  if (
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      password
    )
  )
    score -= 1; // IP address format
  if (/\b(?:password|123456|qwerty|admin)\b/i.test(password)) score -= 2; // Common weak passwords

  // Determine label based on score
  let label = "";
  if (score <= 0) label = "Very Weak";
  else if (score === 1) label = "Weak";
  else if (score === 2) label = "Fair";
  else if (score === 3) label = "Good";
  else if (score >= 4) label = "Strong";

  return { score, label };
};

export const getStrengthColor = (score) => {
  if (score <= 0) return "red";
  if (score === 1) return "orange";
  if (score === 2) return "yellow";
  if (score === 3) return "lightgreen";
  return "green";
};
