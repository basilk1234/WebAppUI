import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@material-ui/core';

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform email and password validation
    if (!validateEmail(email)) {
      setEmailError("Invalid email");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password should be at least 8 characters long");
      return;
    }

    // Clear any previous error messages
    setEmailError("");
    setPasswordError("");

    try {
      // Continue with registration process
      const user = {
        email: email,
        password: password
      };

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };

      console.log("Sending request:", options); // Debugging: Log the fetch request
      console.log('About to send registration request'); 

      const response = await fetch('http://localhost:8080/api/registration', options);
      console.log('Registration request sent');
      const data = await response.json();

      console.log("Server response:", response); // Debugging: Log the server response
      console.log("Response data:", data); // Debugging: Log the response data

      // Handle the response data
      if (response.ok) {
        // Registration successful
        setRegistrationSuccess(true);
        setErrorMessage("");
        // Additional handling logic if needed
        // ...
      } else {
        // Registration failed
        setRegistrationSuccess(false);
        setErrorMessage(data.message || "Registration failed");
      }

    } catch (error) {
      console.error("Fetch error:", error); // Error handling: Log the error

      // Display an appropriate error message to the user or handle the error in another way
      setRegistrationSuccess(false);
      setErrorMessage("An error occurred during registration");
      // Additional error handling logic if needed
      // ...
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={4} style={{ marginTop: '2rem', padding: '2rem' }}>
          <Typography variant="h4" align="center">Register</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Register
            </Button>
          </form>
          {registrationSuccess && (
            <Typography variant="body1" color="primary" style={{ marginTop: '1rem' }}>
              Registration successful! Please check your email for verification.
            </Typography>
          )}
          {errorMessage && (
            <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
              {errorMessage}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Registration;
