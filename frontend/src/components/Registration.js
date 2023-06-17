import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@material-ui/core';

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = {
      email: email,
      password: password
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };

    const response = await fetch('http://localhost:8080/api/registration', options);
    const data = await response.json();
    console.log(data);
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
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ marginTop: '1rem' }}>
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Registration;
