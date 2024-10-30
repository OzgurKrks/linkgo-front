import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./SinglePage.module.css";
import { PiDotsThreeBold } from "react-icons/pi";

function SinglePage() {
  const { username } = useParams();
  const [profileImage, setProfileImage] = useState(null);
  const [links, setLinks] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [pageColor, setPageColor] = useState("");

  const getSinglePage = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `users/getSinglePage/${username}`
      );
      const data = response.data;
      console.log(data);
      setLinks(data.data.links);
      setProfileImage(data.data.user.profile_image);
      setUserInfo(data.data.user.buttonStyle);
      setPageColor(data.data.user.backgroundColor);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePage();
  }, []);

  return (
    <div style={{ backgroundColor: pageColor }} className={styles.pageWrapper}>
      <div className={styles.list}>
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {" "}
            <div
              className={styles.infoWrapper}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              <PiDotsThreeBold size={20} />
            </div>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={profileImage} />
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "30px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          @{username}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {links &&
            links.map((m) => (
              <div
                onClick={() => window.open(m.url, "_blank")}
                className={styles.linkItem}
                style={{
                  minHeight: "60px",
                  backgroundColor: userInfo?.backgroundColor,
                  color: userInfo?.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  wordWrap: "break-word",
                  borderRadius: userInfo?.radius,
                  boxShadow: userInfo?.shadow,
                }}
              >
                {m.thumbnail_image && (
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    src={m.thumbnail_image}
                  />
                )}

                <div
                  style={{
                    width: "80%",
                    wordWrap: "break-word",
                    textAlign: "center",
                  }}
                >
                  {m.title}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
