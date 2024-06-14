import React, { useEffect, useState } from "react";
import { IoLinkSharp } from "react-icons/io5";
import styles from "./TestSiderBar.module.css";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { useNavigate, useLocation } from "react-router-dom";
import { LiaStaylinked } from "react-icons/lia";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/user/userSlice";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import emptyProfileImage from "../assets/images/empty_pp.png";

const theme = createTheme();

function TestSideBar() {
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));
  const isXl = useMediaQuery(theme.breakpoints.down("xl"));

  const [open, setOpen] = useState(true);
  const [openCheck, setOpenCheck] = useState(true);

  const param = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      setOpenCheck(open);
    }, 300);
  }, [open]);

  useEffect(() => {
    dispatch(getMe(user));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        marginLeft: "10px",
      }}
    >
      <div
        className={styles.sidebarwrapper}
        style={{
          width: open ? (isLg || isMd ? "100%" : "80%") : "30%",
          height: "98%",
          backgroundColor: "white",
          borderRadius: open ? "30px" : "40px",
          transition: "all 0.5s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div onClick={() => setOpen(!open)} className={styles.expand}>
          {open ? (
            <TfiArrowCircleLeft
              className={styles.icon}
              style={{ cursor: "pointer" }}
              size={23}
            />
          ) : (
            <TfiArrowCircleRight
              className={styles.icon}
              style={{ cursor: "pointer" }}
              size={23}
            />
          )}
        </div>{" "}
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                width: open ? "80%" : "90%",
                display: "flex",
                alignItems: "center",
                gap: open ? "10px" : "0px",
                fontSize: "15px",
                justifyContent: open ? "" : "center",
                padding: open ? "12px" : "8px",
                cursor: "pointer",
                transition: "all 0.5s ease-in-out",
                overflow: "hidden",
              }}
            >
              <LiaStaylinked size={28} />
            </div>
          </div>

          <div
            onClick={() => navigate("/admin/links")}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
              borderLeft:
                param.pathname.includes("links") && "3px solid blueviolet",
            }}
          >
            <div
              className={styles.sideBarItems}
              style={{
                width: open ? "80%" : "90%",
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  open && param.pathname.includes("links") && "#ededec",
                borderRadius: "10px",
                gap: open ? "10px" : "0px",
                fontSize: "15px",
                justifyContent: open ? "" : "center",
                padding: open ? "12px" : "8px",
                cursor: "pointer",
                transition: "all 0.5s ease-in-out",
                overflow: "hidden",
              }}
            >
              <IoLinkSharp
                style={{
                  color: param.pathname.includes("links")
                    ? "blueviolet"
                    : "#171717",
                }}
                size={22}
              />{" "}
              <span
                style={{
                  color: param.pathname.includes("links")
                    ? "blueviolet"
                    : "#171717",
                  fontWeight: 500,
                }}
              >
                {(open ? openCheck : open) ? "Links" : ""}
              </span>
            </div>
          </div>

          <div
            onClick={() => navigate("/admin/appearance")}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              borderLeft:
                param.pathname.includes("appearance") && "2px solid blueviolet",
            }}
          >
            <div
              className={styles.sideBarItems}
              style={{
                width: open ? "80%" : "90%",
                display: "flex",
                backgroundColor:
                  open && param.pathname.includes("appearance") && "#ededec",
                borderRadius: "10px",
                alignItems: "center",
                gap: open ? "10px" : "0px",
                fontSize: "15px",
                justifyContent: open ? "" : "center",
                padding: open ? "12px" : "8px",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <MdOutlineFeaturedPlayList
                style={{
                  color: param.pathname.includes("appearance")
                    ? "blueviolet"
                    : "#171717",
                }}
                size={22}
              />{" "}
              <span
                style={{
                  color: param.pathname.includes("appearance")
                    ? "blueviolet"
                    : "#171717",
                  fontWeight: 500,
                }}
              >
                {(open ? openCheck : open) ? "Appearance" : ""}
              </span>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "90%",
              marginBottom: "20px",
              height: "45px",
              display: "flex",
              justifyContent: open ? "" : "center",
              alignItems: "center",
            }}
          >
            <div
              onClick={() => navigate("/admin/account")}
              style={{
                width: open ? "90%" : "70%",
                display: "flex",
                alignItems: "center",
                gap: open ? "10px" : "0px",
                fontSize: "15px",
                justifyContent: open ? "" : "center",
                padding: open ? "5px" : "4px",
                paddingLeft: open && "8px",
                paddingRight: open && "8px",
                cursor: "pointer",
                overflow: "hidden",
                border: open && "1px solid #dadad8",
                borderRadius: open ? "40px" : "100%",
                zIndex: 999,
              }}
            >
              {userData?.profile_image ? (
                <img
                  src={userData?.profile_image}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectPosition: "center",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src={emptyProfileImage}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectPosition: "center",
                    borderRadius: "50%",
                  }}
                />
              )}
              {open ? (
                <p>
                  {userData?.username ? "@" : ""}
                  {userData?.username ? userData?.username : ""}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestSideBar;
