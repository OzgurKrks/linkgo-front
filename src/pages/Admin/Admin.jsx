import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Preview from "../../componenets/Preview/Preview";
import TestSideBar from "../../componenets/TestSideBar";
import SmallNavbar from "../../componenets/SmallNavbar/SmallNavbar";
import { getMe } from "../../features/user/userSlice";
import { getLinks, reset } from "../../features/links/linksSlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import PreviewSm from "../PreviewSm/PreviewSm";
import { useLocation } from "react-router-dom";

const theme = createTheme();

function Admin() {
  const isMobileSM = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileMD = useMediaQuery(theme.breakpoints.down("md"));

  const [openPreview, setOpenPreview] = useState(false);

  const [items, setItems] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { links, updateLinksData, isError, isSuccess, isLoading } = useSelector(
    (state) => state.links
  );
  const { userData } = useSelector((state) => state.user);
  const location = useLocation().pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinks(user));
    dispatch(getMe(user));
  }, []);
  useEffect(() => {
    setItems(links);
  }, [links]);

  return (
    <div
      style={{
        backgroundColor: "#f3f3f1",
        height: "100vh",
        position: "relative",
      }}
    >
      <SmallNavbar />
      <Grid container>
        {!isMobileSM && (
          <Grid item sm={4} md={2}>
            <TestSideBar />
          </Grid>
        )}
        <Grid
          item
          sm={isMobileSM ? 8 : !location.includes("account") ? 8 : 8}
          md={isMobileMD ? 8 : !location.includes("account") ? 6.5 : 10}
          xs={12}
        >
          <Outlet
            context={{
              someProp: {
                items,
                setItems,
                user,
                links,
                userData,
                updateLinksData,
                isError,
                isSuccess,
                isLoading,
              },
            }}
          />
        </Grid>
        {!location.includes("account") &&
          (!isMobileSM && !isMobileMD ? (
            <Grid item sm={2} md={3.5} xs={12}>
              <Preview
                links={links}
                userData={userData}
                updateLinksData={updateLinksData}
              />
            </Grid>
          ) : (
            <div
              style={{
                position: "fixed",
                bottom: "4%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setOpenPreview(true)}
                style={{
                  width: "160px",
                  padding: "14px",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "white",
                  borderRadius: "30px",
                  alignItems: "center",
                  gap: "6px",
                  color: "black",
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
                  border: "none",
                  zIndex: 99999,
                  cursor: "pointer",
                }}
              >
                <MdOutlineRemoveRedEye opacity="0.8" size={25} />{" "}
                <span style={{ fontSize: "18px", fontWeight: 600 }}>
                  Preview
                </span>
              </button>
              <PreviewSm
                openPreview={openPreview}
                setOpenPreview={setOpenPreview}
                updateLinksData={updateLinksData}
                links={links}
                userData={userData}
              />
            </div>
          ))}
      </Grid>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Admin />
    </ThemeProvider>
  );
}
