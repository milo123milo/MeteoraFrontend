/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState } from "react";

// react-router-dom components
import { Link, useHistory } from "react-router-dom";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "examples/GradientBorder";

// Vision UI Dashboard assets
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgSignIn from "assets/images/sign_back.png";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSignIn = async () => {
    try {
      // Fetch data from your API endpoint
      const response = await fetch("http://94.176.237.198/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username, // Replace with the actual value
          password: password, // Replace with the actual value
        }),
      });

      // Check if the response is successful (status code in the range 200-299)
      if (response.status !== 401) {
        const data = await response.json();
        const sessionID = data.sessionID; // Adjust this based on your API response structure

        // Store the sessionID locally (e.g., in localStorage)
        document.cookie = `sessionID=${sessionID}; secure; max-age=3600; path=/;`;

        // Optionally, you can redirect the user to another page
        history.push("/dashboard/Station1");
      } else {
        // Handle error response
        setError("Invalid username or password");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setError("An error occurred while signing in");
      console.error("Error:", error);
    }
  };

  return (
    <CoverLayout
      title="System Tracking"
      color="white"
      description="Enter your username and password to log in"
      premotto=""
      motto=""
      image={bgSignIn}
    >
      <VuiBox component="form" role="form">
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Username
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            padding="1px"
            borderRadius={borders.borderRadius.lg}
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput type="username" placeholder="Your username..." fontWeight="500" 
             value={username}
             onChange={(e) => setUsername(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Your password..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
        <VuiButton color="info" fullWidth onClick={handleSignIn}>
          LOG IN
        </VuiButton>
        {error && (
          <VuiTypography variant="caption" color="error" fontWeight="medium" mt={2} textAlign="center">
            {error}
          </VuiTypography>
        )}
      </VuiBox>

      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
