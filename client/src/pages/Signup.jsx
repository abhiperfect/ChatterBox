import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const countries = [
  { code: "+1", label: "USA", format: /^\d{10}$/ }, // Example format: +1 followed by 10 digits
  { code: "+44", label: "UK", format: /^\d{11}$/ }, // Example format: +44 followed by 10 digits
  { code: "+91", label: "India", format: /^\d{10}$/ }, // Example format: +91 followed by 10 digits
  // Add more countries with their corresponding formats as needed
];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [countryCode, setCountryCode] = React.useState("+91");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [error, setError] = React.useState(false);
  const [isOtpSend, setOtpSend] = useState(false);

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setError(false); // Reset error state when the phone number changes
  };

  const validatePhoneNumber = () => {
    const selectedCountry = countries.find(
      (country) => country.code === countryCode
    );
    if (selectedCountry) {
      const regex = selectedCountry.format;
      setError(!regex.test(phoneNumber));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("Data: " + data);

    // If OTP is being sent, handle OTP verification
    if (isOtpSend) {
      const otp = data.get("otp");
      console.log("otp::", otp);
      try {
        // Send request to server to verify OTP using Axios
        const response = await axios.post("http://localhost:8000/verify-otp", { otp });

        if (response.status === 200) {
          // OTP verification successful, proceed with sign up
          console.log("OTP verification successful");
          console.log({
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
            phoneNumber: `${countryCode}${data.get("phonenumber")}`,
            otp,
          });
        } else {
          // OTP verification failed, handle error (e.g., display error message)
          console.error("OTP verification failed");
          // Handle error scenario based on your application's requirements
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error("Error occurred while verifying OTP:", error);
        // Handle error scenario based on your application's requirements
      }
    } else {
      // If OTP is not being sent, proceed with regular sign up
      setOtpSend(true);
      console.log({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        phoneNumber: data.get("phonenumber"),
      });
      // Handle further steps like navigating to another page or displaying a success message
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={3}>
                <InputLabel id="country-code-label"></InputLabel>
                <Select
                  labelId="country-code-label"
                  id="country-code"
                  value={countryCode}
                  onChange={handleCountryCodeChange}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  id="phonenumber"
                  label="Phone Number"
                  name="phonenumber"
                  autoComplete="phonenumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  onBlur={validatePhoneNumber} // Validate on blur
                  error={error}
                  helperText={error ? "Invalid phone number" : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {isOtpSend && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="otp"
                    label="Otp"
                    type="otp"
                    id="otp"
                    autoComplete="new-otp"
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {!isOtpSend && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Get Otp
              </Button>
            )}
            {isOtpSend && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
