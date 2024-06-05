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
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme(); // Create a theme instance

function Admin() {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [items, setItems] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { links, updateLinksData, isError, isSuccess, isLoading } = useSelector(
    (state) => state.links
  );
  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinks(user));
    dispatch(getMe(user));
  }, []);
  useEffect(() => {
    setItems(links);
  }, [links]);

  return (
    <div style={{ backgroundColor: "#f3f3f1", height: "100vh" }}>
      <SmallNavbar />
      <Grid container>
        {!isMobile && (
          <Grid item sm={4} md={2}>
            <TestSideBar />
          </Grid>
        )}
        <Grid item sm={isMobile ? 12 : 5} md={isMobile ? 12 : 6.5} xs={12}>
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
        {!isMobile && (
          <Grid item sm={3} md={3.5} xs={12}>
            <Preview
              links={links}
              userData={userData}
              updateLinksData={updateLinksData}
            />
          </Grid>
        )}
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
