import React, { useEffect } from "react";
import styles from "./Preview.module.css";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import emptyProfileImage from "../../assets/images/empty_pp.png";

function Preview({ links, userData, updateLinksData }) {
  const { isLoading } = useSelector((state) => state.links);

  useEffect(() => {
    console.log("userData", userData);
  }, [isLoading]);

  return !isLoading ? (
    <div
      style={{
        width: "99%",
        height: "100vh",
        borderLeft: "0.5px solid #dadad8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={styles.previewWrapper}
        style={{
          backgroundColor: userData?.backgroundColor,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <div>
            {userData?.profile_image ? (
              <img
                src={userData?.profile_image}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={emptyProfileImage}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ width: "100%", textAlign: "center" }}>
              {userData?.username ? "@" : ""}
              {userData?.username ? userData?.username : ""}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: "80%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              {" "}
              {/* update links data */}
              {updateLinksData.length > 0
                ? updateLinksData
                    .filter((m) => m.show === true)
                    .map((element) =>
                      element.thumbnail_image ? (
                        <div
                          onClick={() => window.open(element.url, "_blank")}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            fontSize: "11px",
                            border: "1px solid black",
                            background: userData?.buttonStyle?.backgroundColor,
                            color: userData?.buttonStyle?.color,
                            border: userData?.buttonStyle?.border,
                            borderRadius: userData?.buttonStyle?.radius,
                            boxShadow: userData?.buttonStyle?.shadow,
                            marginTop: "12px",
                            paddingTop: "3px",
                            paddingBottom: "3px",
                            minHeight: "48px",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "20%",
                            }}
                          >
                            <img
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: userData?.buttonStyle?.radius,
                              }}
                              src={element?.thumbnail_image}
                              alt={element.title}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "80%",
                            }}
                          >
                            {element.title}
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => window.open(element.url, "_blank")}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            fontSize: "11px",
                            background: userData?.buttonStyle?.backgroundColor,
                            color: userData?.buttonStyle?.color,
                            border: userData?.buttonStyle?.border,
                            borderRadius: userData?.buttonStyle?.radius,
                            boxShadow: userData?.buttonStyle?.shadow,
                            marginTop: "12px",
                            paddingTop: "3px",
                            paddingBottom: "3px",
                            minHeight: "48px",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              width: "80%",
                              maxWidth: "80%",
                              wordWrap: "break-word",
                            }}
                          >
                            {element.title}
                          </div>
                        </div>
                      )
                    )
                : links
                    .filter((m) => m.show === true)
                    .map((element) =>
                      element.thumbnail_image ? (
                        <div
                          onClick={() => window.open(element.url, "_blank")}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            fontSize: "11px",
                            border: "1px solid black",
                            background: userData?.buttonStyle?.backgroundColor,
                            color: userData?.buttonStyle?.color,
                            border: userData?.buttonStyle?.border,
                            borderRadius: userData?.buttonStyle?.radius,
                            boxShadow: userData?.buttonStyle?.shadow,
                            marginTop: "12px",
                            paddingTop: "3px",
                            paddingBottom: "3px",
                            height: "48px",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "20%",
                            }}
                          >
                            <img
                              style={{
                                width: "30px",
                                height: "30px",
                                objectFit: "cover",
                              }}
                              src={element?.thumbnail_image}
                              alt={element.title}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "80%",
                            }}
                          >
                            {element.title}
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => window.open(element.url, "_blank")}
                          style={{
                            width: "100%",
                            fontSize: "12px",
                            border: "1px solid black",
                            background: userData?.buttonStyle?.backgroundColor,
                            color: userData?.buttonStyle?.color,
                            border: userData?.buttonStyle?.border,
                            borderRadius: userData?.buttonStyle?.radius,
                            boxShadow: userData?.buttonStyle?.shadow,
                            marginTop: "12px",
                            textAlign: "center",
                            padding: "5px",
                            height: "38px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                        >
                          {element.title}
                        </div>
                      )
                    )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default Preview;
