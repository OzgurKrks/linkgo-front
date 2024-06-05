import React, { useEffect } from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoLinkSharp } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const theme = createTheme(); // Create a theme instance

function SmallNavbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const param = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(param.pathname.includes("appearance"));
  }, []);

  return (
    isMobile && (
      <div style={{ display: "flex", backgroundColor: "white" }}>
        <div
          onClick={() => navigate("/admin/links")}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "14px",
            padding: "5px",
            gap: "2px",
            borderBottom: param.pathname.includes("links") && "1px solid black",
          }}
        >
          <IoLinkSharp size={20} /> Links
        </div>
        <div
          onClick={() => navigate("/admin/appearance")}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "14px",
            borderBottom:
              param.pathname.includes("appearance") && "1px solid black",
            padding: "5px",
            gap: "2px",
          }}
        >
          <MdOutlineFeaturedPlayList size={20} /> Appearance
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "14px",
            padding: "5px",
            gap: "2px",
          }}
        >
          <TbBrandGoogleAnalytics size={20} /> Analytics
        </div>{" "}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "14px",
            padding: "5px",
            gap: "2px",
          }}
        >
          <IoLinkSharp size={20} /> Profile
        </div>
      </div>
    )
  );
}

export default SmallNavbar;
