import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import axios from "axios";
import PopUp from "../../componenets/PopUp";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import { getMe } from "../../features/user/userSlice";
import {
  backgroundsStyle,
  FillButtons,
  OutlineButtons,
  ShadowButtons,
} from "../../bgTests.js";
import styles from "./Apperance.module.css";
import emptyProfileImage from "../../assets/images/empty_pp.png";
import CircularProgress from "@mui/material/CircularProgress";

const API_URL = process.env.REACT_APP_API_URL + "users/";

const theme = createTheme(); // Create a theme instance

function Appearance() {
  const [image, setImage] = useState("");
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loaded, setLoaded] = useState(false);
  const [bio, setBio] = useState("");
  const [title, setTitle] = useState("");
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  // Handle PUT request
  const putHandler = async () => {
    setLoaded(true);
    try {
      const response = await axios.put(
        API_URL + "editUser",
        { image: croppedImageFile },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data", // Specify content type for FormData
          },
        }
      );
      response.data && dispatch(getMe(user));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(false);
    }
  };

  // Handle DELETE request
  const deleteProfileImage = async () => {
    setLoaded(true);
    try {
      const response = await axios.delete(
        API_URL + "deleteProfileImage",

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      response.data && dispatch(getMe(user));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(false);
    }
  };

  const updateUserPageBackground = async (value) => {
    await axios
      .put(
        API_URL + "updateUserPage",
        {
          backgroundColor: value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json", // Specify content type for FormData
          },
        }
      )
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error))
      .finally(() => dispatch(getMe(user)));
  };

  const updateUserPageButtons = async (value) => {
    await axios
      .put(
        API_URL + "updateUserPage",
        {
          buttonStyle: {
            radius: value.radius ? value.radius : "",
            backgroundColor: value.backgroundColor ? value.backgroundColor : "",
            shadow: value.shadow ? value.shadow : "",
            color: value.color ? value.color : "",
            border: value.border ? value.border : "none",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json", // Specify content type for FormData
          },
        }
      )
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error))
      .finally(() => dispatch(getMe(user)));
  };

  const updateBioAndTitle = async () => {
    await axios
      .put(
        API_URL + "updateBioAndTitle",
        {
          profile_bio: bio,
          profile_title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json", // Specify content type for FormData
          },
        }
      )
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error))
      .finally(() => setShowUpdateButton(false));
  };

  useEffect(() => {
    dispatch(getMe(user));
  }, []);

  useEffect(() => {
    setTitle(userData?.profile_title);
    setBio(userData?.profile_bio);
  }, [userData]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0, 0, 0, 0.3) transparent",
        scrollbarGutter: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            width: isMobile ? "90%" : "60%",
            fontWeight: 500,
            fontSize: "22px",
          }}
        >
          Profile
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        {open && (
          <PopUp
            open={open}
            setOpen={setOpen}
            image={image}
            setImage={setImage}
            croppedImageFile={croppedImageFile}
            setCroppedImageFile={setCroppedImageFile}
            handleImage={handleImage}
            putHandler={putHandler}
          />
        )}

        <div
          style={{
            width: isMobile ? "90%" : "60%",
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item md={2.5} xs={2.5}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100px",
                }}
              >
                {!loaded ? (
                  userData?.profile_image ? (
                    <img
                      src={userData?.profile_image}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img
                      src={emptyProfileImage}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item md={9.5} xs={9.5}>
              <div
                style={{
                  width: "100%",
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "93%" }}>
                  <button
                    onClick={() => setOpen(true)}
                    className={styles.buttons}
                    style={{
                      width: "100%",
                      backgroundColor: "#8129D9",
                      color: "white",
                      border: "none",
                      padding: "15px",
                      borderRadius: "30px",
                      marginBottom: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Add
                  </button>
                  <button
                    onClick={deleteProfileImage}
                    className={styles.buttons}
                    style={{
                      width: "100%",
                      backgroundColor: "white",
                      color: "black",
                      padding: "15px",
                      borderRadius: "30px",
                      border: "1px solid #dadad8",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
          <div style={{ marginTop: "45px" }}>
            <p style={{ fontWeight: 500 }}>Image style</p>
            <div
              style={{ display: "flex", justifyContent: "start", gap: "10px" }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                ></div>
              </div>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  border: "2px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "10%",
                    backgroundColor: "white",
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                ></div>
              </div>
              <div></div>
            </div>
          </div>
          <div
            style={{
              marginTop: "45px",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            <TextField
              id="filled-basic"
              //  label="Profile Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value.trim());
                setShowUpdateButton(true);
              }}
              inputMode="text"
              fullWidth
              variant="filled"
              sx={{
                backgroundColor: "white",
                "& .MuiFilledInput-root": {
                  border: "none",
                  "&:before": {
                    borderBottom: "none",
                  },
                  "&:after": {
                    borderBottom: "none",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                },
              }}
            />

            <TextField
              id="outlined-multiline-static"
              // label="Bio"
              multiline
              rows={4}
              fullWidth
              value={bio}
              onChange={(e) => {
                setBio(e.target.value.trim());
                setShowUpdateButton(true);
              }}
              inputMode="text"
              sx={{
                backgroundColor: "#f2f2f2",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "none",
                  },
                  "&.Mui-focused fieldset": {
                    border: "none",
                  },
                },
              }}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              marginTop: "7px",
            }}
          >
            {showUpdateButton ? (
              <button
                onClick={updateBioAndTitle}
                style={{
                  padding: "8px",
                  width: "150px",
                  backgroundColor: "blueviolet",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                Update
              </button>
            ) : (
              <div
                style={{
                  padding: "8px",
                }}
              ></div>
            )}
          </div>
          <hr style={{ marginTop: "30px" }} />
          <div
            style={{
              width: "100%",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                color: "blueviolet",
                cursor: "pointer",
              }}
            >
              {" "}
              + Add social icons
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            width: isMobile ? "90%" : "60%",
            fontWeight: 500,
            fontSize: "22px",
          }}
        >
          Themes
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            width: isMobile ? "90%" : "60%",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <Grid container>
            {backgroundsStyle.map((m) => (
              <Grid
                className={styles.bgs}
                key={m.id}
                style={{
                  width: "100%",
                  height: "220px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                xs={6}
                md={3}
                onClick={() => updateUserPageBackground(m.bg)}
              >
                <img
                  src={m.img}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div
          style={{
            width: isMobile ? "90%" : "60%",
            fontWeight: 500,
            fontSize: "22px",
          }}
        >
          Buttons
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: isMobile ? "90%" : "60%",
            //zIndex: 10,
            backgroundColor: "white",
            //  padding: "16px",
            borderRadius: "20px",
          }}
        >
          <Grid container>
            <div
              style={{
                width: "100%",
                textAlign: "start",
                marginLeft: "10px",
                marginTop: "10px",
                fontWeight: 500,
              }}
            >
              Fill
            </div>
            {FillButtons.map((m) => (
              <Grid
                className={styles.bgs}
                key={m.id}
                style={{
                  width: "100%",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                xs={6}
                md={4}
              >
                <button
                  onClick={() => updateUserPageButtons(m)}
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: m.backgroundColor,
                    color: m.color,
                    border: "none",
                    borderRadius: m.radius,
                  }}
                />
              </Grid>
            ))}
            <div
              style={{
                width: "100%",
                textAlign: "start",
                marginLeft: "10px",
                marginTop: "10px",
                fontWeight: 500,
              }}
            >
              Outline
            </div>
            {OutlineButtons.map((m) => (
              <Grid
                className={styles.bgs}
                key={m.id}
                style={{
                  width: "100%",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                xs={6}
                md={4}
              >
                <button
                  onClick={() => updateUserPageButtons(m)}
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: m.backgroundColor,
                    color: m.color,
                    border: m.border,
                    borderRadius: m.radius,
                  }}
                />
              </Grid>
            ))}
            <div
              style={{
                width: "100%",
                textAlign: "start",
                marginLeft: "10px",
                marginTop: "10px",
                fontWeight: 500,
              }}
            >
              Shadow
            </div>
            {ShadowButtons.map((m) => (
              <Grid
                className={styles.bgs}
                key={m.id}
                style={{
                  width: "100%",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                xs={6}
                md={4}
              >
                <button
                  onClick={() => updateUserPageButtons(m)}
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: m.backgroundColor,
                    color: m.color,
                    border: m.border,
                    borderRadius: m.radius,
                    boxShadow: m.shadow,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Appearance;
