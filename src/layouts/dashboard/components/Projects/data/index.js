// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

import { FaSignal } from "react-icons/fa6";
import { FaCarBattery } from "react-icons/fa";
import { TbSolarElectricity } from "react-icons/tb";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaDroplet } from "react-icons/fa6";
import { TbGauge } from "react-icons/tb";







export default function data(systemData) {
  console.log("DATA: ", systemData)
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <VuiAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { dark } }) =>
              `${borderWidth[2]} solid ${dark.focus}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "parameters", align: "left" },
      { name: "", align: "left" },
      { name: "status", align: "right" },
      { name: "value", align: "right" },
    ],

    rows: [
      {
        parameters: (
          <VuiBox display="flex" alignItems="center">
            <FaSignal size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Signal strenght
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            
          </VuiBox>
        ),
        status: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {systemData ? `${systemData.Signal.status}` : ''}
          </VuiTypography>
        ),
        value: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
            {systemData ? `${systemData.Signal.value}` : ''}
            </VuiTypography>
            <VuiProgress value={systemData ? parseInt(systemData.Signal.value.replace('%', ''), 10) : ''} 
             color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        parameters: (
          <VuiBox display="flex" alignItems="center">
            <FaCarBattery size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Battery
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar2, "Romina Hadid"],
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        status: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {systemData ? `${systemData.Battery.status}` : ''}
          </VuiTypography>
        ),
        value: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
            {systemData ? `${systemData.Battery.value}` : ''}
            </VuiTypography>
            <VuiProgress value={systemData ? parseInt(systemData.Battery.value.replace('%', ''), 10) : ''} 
             color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        parameters: (
          <VuiBox display="flex" alignItems="center">
            <TbSolarElectricity size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Solar Panel
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar3, "Alexander Smith"],
            ])}
          </VuiBox>
        ),
        status: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
             {systemData ? `${systemData.Solar.status}` : ''}
          </VuiTypography>
        ),
        value: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
            {systemData ? `${systemData.Solar.value}` : ''}
            </VuiTypography>
            <VuiProgress value={systemData ? parseInt(systemData.Solar.value.replace('%', ''), 10) : ''} 
             color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        parameters: (
          <VuiBox display="flex" alignItems="center">
            <FaTemperatureHalf size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Indoor System Temperature
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar4, "Jessica Doe"],
              [avatar3, "Alexander Smith"],
              [avatar2, "Romina Hadid"],
              [avatar1, "Ryan Tompson"],
            ])}
          </VuiBox>
        ),
        status: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
             {systemData ? `${systemData.Temperature.status}` : ''}
          </VuiTypography>
        ),
        value: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
            {systemData ? `${systemData.Temperature.value}` : ''}
            </VuiTypography>
            <VuiProgress value={systemData ? parseInt(systemData.Temperature.value.replace('%', ''), 10) : ''} 
            color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        parameters: (
          <VuiBox display="flex" alignItems="center">
            <FaDroplet size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Indoor System Humidity
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([[avatar4, "Jessica Doe"]])}
          </VuiBox>
        ),
        status: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {systemData ? `${systemData.Humidity.status}` : ''}
          </VuiTypography>
        ),
        value: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
            {systemData ? `${systemData.Humidity.value}` : ''}
            </VuiTypography>
            <VuiProgress value={systemData ? parseInt(systemData.Humidity.value.replace('%', ''), 10) : ''}
           color="info" label={false} sx={{ background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
      {
        parameters: (
          <VuiBox display="flex" alignItems="center">
            <TbGauge size="20px" />
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Indoor System Barometric Pressure
            </VuiTypography>
          </VuiBox>
        ),
        members: (
          <VuiBox display="flex" py={1}>
            {avatars([
              [avatar1, "Ryan Tompson"],
              [avatar4, "Jessica Doe"],
            ])}
          </VuiBox>
        ),
        status: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {systemData ? `${systemData.Pressure.status}` : ''}
          </VuiTypography>
        ),
        value: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
            {systemData ? `${systemData.Pressure.value}` : ''}
            </VuiTypography>
            <VuiProgress value={80} color="info" label={false} sx={{ display: "none", background: "#2D2E5F" }} />
          </VuiBox>
        ),
      },
    ],
  };
}
