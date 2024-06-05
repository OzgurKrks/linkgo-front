import React from "react";
import styles from "./Preview.module.css";
function Preview({ links, userData, updateLinksData }) {
  return (
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
            <img
              src={userData?.profile_image}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <div style={{ width: "100%", textAlign: "center" }}>
              @{userData?.name}
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
          <div style={{ height: "100%", width: "80%" }}>
            {updateLinksData.length > 0
              ? updateLinksData
                  .filter((m) => m.show === true)
                  .map((element) => (
                    <div
                      style={{
                        width: "100%",
                        fontSize: "12px",
                        border: "1px solid black",
                        borderRadius: "30px",
                        marginTop: "12px",
                        textAlign: "center",
                        padding: "5px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {element.title}
                    </div>
                  ))
              : links
                  .filter((m) => m.show === true)
                  .map((element) => (
                    <div
                      style={{
                        width: "100%",
                        fontSize: "12px",
                        border: "1px solid black",
                        borderRadius: "30px",
                        marginTop: "12px",
                        textAlign: "center",
                        padding: "5px",
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {element.title}
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
