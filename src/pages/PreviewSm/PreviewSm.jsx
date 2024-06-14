import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PreviewSm({
  openPreview,
  setOpenPreview,
  updateLinksData,
  links,
  userData,
}) {
  const handleClose = () => {
    setOpenPreview(false);
  };

  return (
    <Dialog
      fullScreen
      open={openPreview}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: userData?.backgroundColor,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",

            justifyContent: "end",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "20%",
              gap: "20px",
            }}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
                objectFit: "center",
              }}
              src={userData?.profile_image}
              alt="image"
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              bio
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              height: "80%",
            }}
          >
            {updateLinksData.length > 0
              ? updateLinksData
                  .filter((m) => m.show === true)
                  .map((element) =>
                    element.thumbnail_image ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          fontSize: "11px",
                          marginTop: "12px",
                          minHeight: "48px",
                          paddingTop: "3px",
                          paddingBottom: "3px",
                          backgroundColor:
                            userData?.buttonStyle?.backgroundColor,
                          color: userData?.buttonStyle?.color,
                          border: userData?.buttonStyle?.border,
                          borderRadius: userData?.buttonStyle?.radius,
                          boxShadow: userData?.buttonStyle?.shadow,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            width: "20%",
                          }}
                        >
                          <img
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
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
                            minHeight: "48px",
                            paddingTop: "3px",
                            paddingBottom: "3px",
                          }}
                        >
                          {element.title}
                        </div>
                        <div style={{ width: "20%" }}></div>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          backgroundColor:
                            userData?.buttonStyle?.backgroundColor,
                          color: userData?.buttonStyle?.color,
                          border: userData?.buttonStyle?.border,
                          borderRadius: userData?.buttonStyle?.radius,
                          boxShadow: userData?.buttonStyle?.shadow,
                          marginTop: "12px",
                          textAlign: "center",
                          minHeight: "58px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "80%", wordWrap: "break-word" }}>
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
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          fontSize: "11px",
                          backgroundColor:
                            userData?.buttonStyle?.backgroundColor,
                          color: userData?.buttonStyle?.color,
                          border: userData?.buttonStyle?.border,
                          borderRadius: userData?.buttonStyle?.radius,
                          boxShadow: userData?.buttonStyle?.shadow,
                          marginTop: "12px",
                          minHeight: "48px",
                          paddingTop: "3px",
                          paddingBottom: "3px",
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
                            minHeight: "48px",
                            paddingTop: "3px",
                            paddingBottom: "3px",
                          }}
                        >
                          {element.title}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          fontSize: "12px",
                          backgroundColor:
                            userData?.buttonStyle?.backgroundColor,
                          color: userData?.buttonStyle?.color,
                          border: userData?.buttonStyle?.border,
                          borderRadius: userData?.buttonStyle?.radius,
                          boxShadow: userData?.buttonStyle?.shadow,
                          marginTop: "12px",
                          textAlign: "center",
                          // padding: "5px",
                          height: "38px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "40px",
                        }}
                      >
                        {element.title}
                      </div>
                    )
                  )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
