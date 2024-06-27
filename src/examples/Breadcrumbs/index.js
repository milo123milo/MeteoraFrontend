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

// react-router-dom components
import { Link, useHistory } from "react-router-dom";
import React, { useState } from 'react';




// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import { Select, MenuItem, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import Icon from "@mui/material/Icon";


// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiSwitch from "components/VuiSwitch";
import VuiButton from "components/VuiButton";
function getLocationName(id) {
  switch (id) {
      case 'Station1':
          return 'Dobra Voda';
      case 'Station2':
          return 'Bartula';
      case 'Station3':
          return 'Barska Uljara';
      case 'Station4':
          return 'Mandarici';
      default:
          return 'Unknown Location';
  }
}


function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);

  console.log(title)
  const [selectedTitle, setSelectedTitle] = useState(title.replace("-", " "));

  var location = getLocationName(title)
  

  const handleChange = (event) => {

    const selectedValue = event.target.value;
    console.log(selectedValue);

    // Navigate to the selected page using vanilla JavaScript
    window.location.href = `/dashboard/${selectedValue}`;
  };

  return (
    <VuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to="/">
          <VuiTypography
            component="span"
            variant="body2"
            color={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </VuiTypography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <VuiTypography
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </VuiTypography>
          </Link>
        ))}
        <VuiTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title.replace("-", " ")}
        </VuiTypography>
      </MuiBreadcrumbs>
      <VuiBox sx={{display: 'flex'}}>     
      <Select
      sx={{
        paddingInline: '0px !important',
        marginTop: '10px !important',
        backgroundColor: 'transparent !important', // Set transparent background
        width: '115px !important',
        color: 'white !important',
        fontWeight: 'bold !important',
        '& .MuiSelect-root': {
          paddingInline: '0px !important',
         // Set transparent background for the root element
          border: 'none !important', // Remove border for the root element
          color: 'white !important',
          fontWeight: 'bold !important',
        },
        '& .MuiSelect-icon': {
          width: '20px',
          height: '20px', 
          color: 'white !important',
        },
        
      }}
      
        value={title.replace("-", " ")} 
        
        onChange={handleChange}
        endAdornment={<span style={{ fontSize: '2em' , paddingTop: '4px'}}><ArrowDropDownIcon /></span>}
      >
        
        <MenuItem value="Station1">Station1</MenuItem>
        <MenuItem value="Station2">Station2</MenuItem>
        <MenuItem value="Station3">Station3</MenuItem>
        <MenuItem value="Station4">Station4</MenuItem>
        
        
      </Select>
      <VuiTypography sx={{ 
        color: 'white !important', 
        fontWeight: 'bold !important',
        paddingTop: '23px',
        paddingLeft: '20px'
        }}>{location}</VuiTypography>

       
        </VuiBox> 
        
    </VuiBox>

    
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
