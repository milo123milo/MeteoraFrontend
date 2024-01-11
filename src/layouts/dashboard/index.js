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
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
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


  useEffect(() => {
    setIsLoading(true);
    setStationData(null);
    // Function to extract station name from the current URL


    // Get the station name from the current URL
    const stationName = extractStationNameFromURL();

    // Check if stationName is not null before making the API request
    if (stationName) {
      const getData = async () => {
      // Make the API request with the station name as a parameter
      const sessionID = document.cookie.replace(/(?:(?:^|.*;\s*)sessionID\s*=\s*([^;]*).*$)|^.*$/, "$1");

      if (!sessionID) {
        // Redirect to /authentication/sign-in if sessionID is not present
        history.push("/authentication/sign-in");
      } else {
        try {
          // Send API POST request to check session
          const response = await fetch('http://localhost:3000/getStationData/' + stationName, {
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
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Last 7 Days Average
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="text" fontWeight="bold">
                      Temperature and Humidity
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                      <span style={{opacity: "0"}}> in 2021 </span>
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    

                      {isLoading ? (
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
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Temperature Last 24 Hours
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px" >
                    <VuiTypography variant="button" color="text" fontWeight="bold">
                        And other parameters average
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
            <Projects systemData={getStatisticData('systemData')} />
          </Grid>
          
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
