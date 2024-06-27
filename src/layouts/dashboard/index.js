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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Select, MenuItem, Card, LinearProgress, Stack } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoIosThermometer } from "react-icons/io";
import { IoIosNavigate } from "react-icons/io";
import { IoIosWater } from "react-icons/io";
import { FiWind } from "react-icons/fi";
import { WiWindDeg } from "react-icons/wi";
import { TbGauge } from "react-icons/tb";
import { LuCloudRainWind } from "react-icons/lu";






import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
//import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";

import axios from "axios";
import React, { useEffect, useState } from "react";



function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  
  const [stationData, setStationData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [otherParamsAvg, setOtherParamsAvg] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLine, setIsLoadingLine] = useState(true);


  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  function handleAlertOn() {
    console.log("Confirm Notifications Activation?")
    const publicVapidKey =
      "BAABol4lIL0tpSskELBxy8pFcHw-uNFXoD4WfTlwvPuv4Od-FIoKQUl2kDnESPH4flCcGUfCIzZVmNvadOfMNJE";
      /*if ("serviceWorker" in navigator) {
        send().catch(err => console.error(err));
      }*/
      async function send() {
        alert("Confirm Notifications Activation?")
        // Register Service Worker
        console.log("Registering service worker...");
        const register = await navigator.serviceWorker.register("/worker.js", {
          scope: "/"
        });
        console.log("Service Worker Registered...");
      
        // Check for existing subscription
        const existingSubscription = await register.pushManager.getSubscription();
      
        if (existingSubscription) {
          // Unsubscribe from the existing subscription
          console.log("Unsubscribing from existing subscription...");
          await existingSubscription.unsubscribe();
          console.log("Existing subscription unsubscribed...");
        }
      
        // Register Push with new applicationServerKey
        console.log("Registering Push...");
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
        console.log("Push Registered...");
      
        // Send Push Notification
        console.log("Sending Push...");
        await fetch("https://meteorastation.com/api/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Push Sent...");
      }
  
    send().catch(err => console.error(err));
  }
  function handleAlertOff() {
    console.log("Confirm Notifications Deactivation?")
    const publicVapidKey =
      "BAABol4lIL0tpSskELBxy8pFcHw-uNFXoD4WfTlwvPuv4Od-FIoKQUl2kDnESPH4flCcGUfCIzZVmNvadOfMNJE";
      /*if ("serviceWorker" in navigator) {
        send().catch(err => console.error(err));
      }*/
      async function send() {
        alert("Confirm Notifications Deactivation?")
        // Register Service Worker
        console.log("Registering service worker...");
        const register = await navigator.serviceWorker.register("/worker.js", {
          scope: "/"
        });
        console.log("Service Worker Registered...");
      
        // Check for existing subscription
        const existingSubscription = await register.pushManager.getSubscription();
      
        if (existingSubscription) {
          // Unsubscribe from the existing subscription
          console.log("Unsubscribing from existing subscription...");
          await existingSubscription.unsubscribe();
          console.log("Existing subscription unsubscribed...");
        }
      
        
      
        // Send Push Notification
        console.log("Sending Push...");
        await fetch("https://meteorastation.com/api/unsubscribe", {
          method: "POST",
          body: JSON.stringify(existingSubscription),
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Push Sent...");
      }
  
    send().catch(err => console.error(err));
  }


  const extractStationNameFromURL = () => {
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    const stationNameIndex = parts.indexOf("dashboard") + 1;
    if (stationNameIndex < parts.length) {
      return parts[stationNameIndex];
    }
    return null;
  };
 

  let urlChange = extractStationNameFromURL();
  let fristTime = true

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingLine(true); // Set loading to false

    setStationData(null);
    // Function to extract station name from the current URL
    console.log("MILOOO")

    // Get the station name from the current URL
    const stationName = extractStationNameFromURL();

    // Check if stationName is not null before making the API request
    if (stationName) {
      fristTime == false;
      const getData = async () => {
      // Make the API request with the station name as a parameter
      const sessionID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionID\s*=\s*([^;]*).*$)|^.*$/, "$1");

      if (!sessionID) {
        // Redirect to /authentication/sign-in if sessionID is not present
        history.push("/authentication/sign-in");
      } else {
        try {
          // Send API POST request to check session
          const response = await fetch('https://meteorastation.com/api/getStationData/' + stationName, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionID,
            }),
          });
          
          if (response.status === 200) {
            const responseData = await response.json();

            setStationData(responseData);

            setLineChartData(responseData.L7DA);
            setBarChartData(responseData.L24H);
            setOtherParamsAvg(responseData.L24H.OtherAverage);
            setIsLoading(false); // Set loading to false
            setIsLoadingLine(false); // Set loading to false




            console.log(responseData);
            return;
          } else {
            // Session is invalid, redirect to /authentication/sign-in
            history.push("/authentication/sign-in");
          }
        } catch (error) {
          // Handle API request error, redirect to /authentication/sign-in
          console.error("Error checking session:", error);
          history.push("/authentication/sign-in");
        }
      }
    }

    getData();
    }
  }, [urlChange]);

  const [selectedOption, setSelectedOption] = useState("th");
  const [selectedOption2, setSelectedOption2] = useState("l7");
  const [selectedOption3, setSelectedOption3] = useState("t24");
  const [selectedOption4, setSelectedOption4] = useState("t24");




  const handleSelectChange2 = async (event) => {
    const selectedOption = event.target.value;

    if(selectedOption == 'custom'){
      console.log("CUSTOM")
    }
    



    if(event.target.name == "7daysSelect"){
      setSelectedOption(event.target.value);
    }
    if(event.target.name == "7daysSelectTitle"){
      setSelectedOption2(event.target.value);
    }
  }
  useEffect(() => {
    setIsLoadingLine(true);
    setLineChartData(null);
      
      
      var days30 = 'false';
      var param30days = selectedOption;
      

      if(selectedOption2 == "l30"){
        days30 = 'true';
      }

      console.log("Selected Option: " + selectedOption)
      
      // Make API request with the selected option
      const stationName = extractStationNameFromURL();
      const sessionID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionID\s*=\s*([^;]*).*$)|^.*$/, "$1");
      
      const getData = async () => {
        // Make the API request with the station name as a parameter
        
  
       
          try {
            // Send API POST request to check session
            const response = await fetch('https://meteorastation.com/api/getStationData/' + stationName, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sessionID,
                days30,
                param30days
              }),
            });

            const responseData = await response.json();

            const  dummy = {
              "location": "Dobra Voda",
              "datetime": "April 28, 2024 at 8:12:35 AM GMT+2",
              "stationID": "Station1",
              "airTemp": "15.2 °C",
              "airHumi": "66 %",
              "windSpeed": "0 km/h",
              "windDirection": "75° ENE",
              "airPressure": "991.8 hPa",
              "rainAmount": "0 mm",
              "irradiation": "31 kW/m²",
              "SH1": "96.8%",
              "SH2": "97.7%",
              "SHA": "97%",
              "ST1": "13.3 °C",
              "ST2": "13.1 °C",
              "STA": "13 °C",
              "L7DA": [
                  {
                      "name": "Temperature",
                      "data": [
                          1,
                          2,
                          3,
                          4,
                          3,
                          2,
                          1,
                          8
                      ]
                  },
                  {
 
                  },
                  {
                      "categories": [
                          "01.00",
                          "02.00",
                          "03.00",
                          "04.00",
                          "05.00",
                          "06.00",
                          "07.00"
                        
                      ]
                  }
              ],
              "L24H": {
                  "categories": [
                      "00:00h",
                      "03:00h",
                      "06:00h",
                      "09:00h",
                      "12:00h",
                      "14:00h",
                      "16:00h",
                      "19:00h",
                      "22:00h"
                  ],
                  "series": [
                      {
                          "name": "Temperature °C",
                          "data": [
                              "NaN",
                              "NaN",
                              "NaN",
                              "NaN",
                              "NaN",
                              "NaN",
                              "NaN",
                              "NaN",
                              "NaN"
                          ]
                      }
                  ],
                  "OtherAverage": {
                      "Humidity": "NaN %",
                      "Wind": "NaN km/h",
                      "Pressure": "NaN hPa",
                      "Rain": "NaN mm"
                  }
              },
              "systemData": {
                  "Online": false,
                  "Signal": {
                      "status": "-",
                      "value": "45.7 %"
                  },
                  "Battery": {
                      "status": "0 V",
                      "value": "0 %"
                  },
                  "Solar": {
                      "status": "0 V",
                      "value": "0.0 %"
                  },
                  "Temperature": {
                      "status": "-",
                      "value": "13.2 °C"
                  },
                  "Humidity": {
                      "status": "-",
                      "value": "68 %"
                  },
                  "Pressure": {
                      "status": "-",
                      "value": "991.8 hPa"
                  }
              }
          }

            
            setLineChartData(responseData.L7DA);
            //setLineChartData(dummy.L7DA);
            
            setIsLoadingLine(false); // Set loading to false
            
            } catch {} 
            
          }
       
      getData();
    
  },  [selectedOption, selectedOption2]);

  const handleSelectChange3 = async (event) => {
    const selectedOption3 = event.target.value;
    




    if(event.target.name == "24hoursSelectTitle"){
      setSelectedOption3(event.target.value);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    setBarChartData(null);
      
      
      var days30 = 'false';
      var param24hours = selectedOption3;

      
      
      // Make API request with the selected option
      const stationName = extractStationNameFromURL();
      const sessionID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionID\s*=\s*([^;]*).*$)|^.*$/, "$1");
      
      const getData = async () => {
        // Make the API request with the station name as a parameter
        
  
       
          try {
            // Send API POST request to check session
            const response = await fetch('https://meteorastation.com/api/getStationData/' + stationName, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sessionID,
                param24hours
              }),
            });

            const responseData = await response.json();

            
            setBarChartData(responseData.L24H);
            console.log("Data24hhh:")
            console.log(responseData.L24H)
            setIsLoading(false); // Set loading to false
            
            } catch {} 
            
          }
       
      getData();
    
  },  [selectedOption3]);

  // Helper function to get the data for a specific statistic from the API response
  const getStatisticData = (statisticName) => {
    
      return stationData ? stationData[statisticName] : null;
  };

 
 

 
  
  

 

  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={2}>
              <MiniStatisticsCard
                title={{ text: "Air Temperature", fontWeight: "regular" }}
                count={`${getStatisticData('airTemp')}`}
                percentage={{ color: "success", text: "±3%" }}
                icon={{ color: "info", component: <IoIosThermometer size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={2}>
              <MiniStatisticsCard
                title={{ text: "Air Humidity" }}
                count={`${getStatisticData('airHumi')}`}
                percentage={{ color: "success", text: "±3%" }}
                icon={{ color: "info", component: <IoIosWater size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={2}>
              <MiniStatisticsCard
                title={{ text: "Wind Speed" }}
                count={`${getStatisticData('windSpeed')}`}
                percentage={{ color: "error", text: "" }}
                icon={{ color: "info", component: <FiWind size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={2}>
              <MiniStatisticsCard
                title={{ text: "Wind Direction" }}
                count={`${getStatisticData('windDirection')}`}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <WiWindDeg size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={2}>
              <MiniStatisticsCard
                title={{ text: "Atmospheric Pressure" }}
                count={`${getStatisticData('airPressure')}`}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <TbGauge size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={2}>
              <MiniStatisticsCard
                title={{ text: "Rain Amount" }}
                count={`${getStatisticData('rainAmount')}`}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <LuCloudRainWind size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={6} xl={4}>
              {/* 
              <WelcomeMark />  */}
              <SatisfactionRate value={getStatisticData('irradiation')} />
              
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking text={{
                title: "Soil Humidty", 
                name1: "Humidty Sensor 1",
                name2: "Humidity Sensor 2", 
                value1: `${getStatisticData('SH1')}`,
                value2: `${getStatisticData('SH2')}`,
                valueAvg:`${getStatisticData('SHA')}`,
                gtitle: "Humidity",
                gsub: "Average",
                circleVal: getStatisticData('SHA') ? getStatisticData('SHA').replace('%', '') : '',
                circleColor: "success"}}/>
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
            <ReferralTracking text={{
                title: "Soil Temperature", 
                name1: "Temperature Sensor 1",
                name2: "Temperature Sensor 2", 
                value1: getStatisticData('ST1'),
                value2: getStatisticData('ST2'),
                valueAvg: getStatisticData('STA'),
                gtitle: "Temperature",
                gsub: "Average",
                circleVal: getStatisticData('STA') ? getStatisticData('STA').replace('°C', '') : '',
                circleColor: "warning"}}/>
              
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiBox variant="lg" color="white" fontWeight="bold" mb="5px">
                  <Select
                      sx={{
                        backgroundColor: 'transparent !important',
                        color: '#ffffff !important',
                        border: 'none',
                        fontFamily: '"Plus Jakarta Display","Helvetica","Arial",sans-serif',
                        fontSize: '1.125rem !important',
                        fontWeight: '700 !important',
                        padding: '0 !important',
                        marginLeft: "-12px !important",
                        '&:hover': {
                          opacity: 0.8, // Adjust the opacity as needed
                        }
                      }}
                      name="7daysSelectTitle"
                      id="7daysSelectTitle"
                      value={selectedOption2}
                      onChange={handleSelectChange2}
                      
                    >
                      <MenuItem value="l7">Last 7 Days Average</MenuItem>
                      <MenuItem value="l30">Last 30 Days Average</MenuItem>
                     
                      
                    </Select>
                  </VuiBox>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="text" fontWeight="bold">
                      
                    <Select
                      sx={{
                        backgroundColor: 'transparent !important',
                        color: '#a0aec0 !important',
                        border: 'none',
                        fontFamily: '"Plus Jakarta Display","Helvetica","Arial",sans-serif',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        padding: '0 !important',
                        marginLeft: "-12px !important"
                      }}
                      name="7daysSelect"
                      id="7daysSelect"
                      value={selectedOption}
                      onChange={handleSelectChange2}
                      endAdornment={<span style={{ fontSize: '2em' , paddingTop: '4px'}}><ArrowDropDownIcon /></span>}
                    >
                      <MenuItem value="th">Temperature and Humidity</MenuItem>
                      <MenuItem value="sht1">Soil TH 1</MenuItem>
                      <MenuItem value="sht2">Soil TH 2</MenuItem>
                      <MenuItem value="ws">Wind Speed</MenuItem>
                      <MenuItem value="ra">Rain Amount</MenuItem>
                      <MenuItem value="ps">Atmospheric pressure</MenuItem>
                      <MenuItem value="sr">Solar irradiation</MenuItem>
                    </Select>

                      <VuiTypography variant="button" color="text" fontWeight="regular">
                      <span style={{opacity: "0"}}> in 2021 </span>
                      </VuiTypography>
                    </VuiTypography>
                    
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    

                      {isLoadingLine ? (
                        <p></p>
                      ) : (
                        <LineChart
                          lineChartData={lineChartData}
                          lineChartOptions={{
                            ...lineChartOptionsDashboard,
                            xaxis: {
                              ...lineChartOptionsDashboard.xaxis,
                              categories: lineChartData ? lineChartData[2]?.categories : [], // Assuming categories are the same for all data series
                            },
                          }}
                        />
                      )}

                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    {isLoading ? (
                        <p></p>
                      ) : (
                  <BarChart
                    barChartData={barChartData ? barChartData.series : []}
                    barChartOptions={{
                      ...barChartOptionsDashboard,
                      xaxis: {
                        ...barChartOptionsDashboard.xaxis,
                        categories: barChartData ? barChartData.categories : [],
                      },
                    }}
                  /> )}
                  </VuiBox>
                  <Select
                      sx={{
                        backgroundColor: 'transparent !important',
                        color: '#ffffff !important',
                        border: 'none',
                        fontFamily: '"Plus Jakarta Display","Helvetica","Arial",sans-serif',
                        fontSize: '1.125rem !important',
                        fontWeight: '700 !important',
                        padding: '0 !important',
                        marginLeft: "-12px !important",
                        '&:hover': {
                          opacity: 0.8, // Adjust the opacity as needed
                        }
                      }}
                      name="24hoursSelectTitle"
                      id="24hoursSelectTitle"
                      value={selectedOption3}
                      onChange={handleSelectChange3}
                      
                    >
                      <MenuItem value="t24">Temperature Last 24h</MenuItem>
                      <MenuItem value="h24">Humidity Last 24h</MenuItem>
                      <MenuItem value="w24">Wind Speed Last 24h</MenuItem>
                      <MenuItem value="p24">Atmospheric Pressure Last 24h</MenuItem>
                      <MenuItem value="r24">Rain Amount Last 24h</MenuItem>
                      <MenuItem value="s24">Solar Irradiation Last 24h</MenuItem>

                      
                    </Select>
                  <VuiBox display="flex" alignItems="center" mb="40px" >
                    <VuiTypography variant="button" color="text" fontWeight="bold">
                        And other parameters daily average
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                      
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosWater color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                           Humidity
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                      {otherParamsAvg ? `${otherParamsAvg.Humidity}` : ''}
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ display: "none", background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FiWind color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                           Wind 
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                      {otherParamsAvg ? `${otherParamsAvg.Wind}` : ''}
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ display: "none", background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <TbGauge color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                           Pressure
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                      {otherParamsAvg ? `${otherParamsAvg.Pressure}` : ''}
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ display: "none", background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <LuCloudRainWind color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Rain
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                      {otherParamsAvg ? `${otherParamsAvg.Rain}` : ''}
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ display: "none", background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={12} lg={12}>
            <Projects systemData={getStatisticData('systemData')} date={getStatisticData('datetime')} />
            

          </Grid>
          
        </Grid>
        <VuiBox sx={{display:'flex', justifyContent: 'flex-end'}}>
        <VuiButton color='success' sx={{height:'10px', marginTop:'20px', marginLeft:'0px'}} onClick={handleAlertOn}>Alert ON</VuiButton>
        <VuiButton color='warning' sx={{height:'10px', marginTop:'20px', marginLeft:'10px'}} onClick={handleAlertOff}>Alert OFF</VuiButton>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
