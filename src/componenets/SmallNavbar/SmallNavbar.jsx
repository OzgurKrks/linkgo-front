import React, { useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoLinkSharp } from "react-icons/io5";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const theme = createTheme(); // Create a theme instance

function SmallNavbar() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const param = useLocation();

  const navigate = useNavigate();

  useEffect(() => {}, []);

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
          onClick={() => navigate("/admin/account")}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "14px",
            padding: "5px",
            gap: "2px",
            borderBottom:
              param.pathname.includes("account") && "1px solid black",
          }}
        >
          <CgProfile size={20} /> Profile
        </div>
      </div>
    )
  );
}

export default SmallNavbar;
