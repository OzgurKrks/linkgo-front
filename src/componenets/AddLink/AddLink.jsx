import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getLinks } from "../../features/links/linksSlice";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

function AddLink({ load, setLoad }) {
  const [addOpen, setaddOpen] = useState(false);
  const [link, setLink] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { links } = useSelector((state) => state.links);

  const dispatch = useDispatch();

  const setLinkHandler = async () => {
    setLoad(true);
    if (link) {
      try {
        await axios
          .post(
            process.env.REACT_APP_API_URL + "links/setlink",
            { url: link }, // İstek gövdesi
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .then(() => {
            setLink(null);
            setaddOpen(false);
          })
          .catch((error) => console.log(error))
          .finally(() => {
            dispatch(getLinks(user));
            setLoad(false);
          });
      } catch (error) {
        console.error("Error setting the link:", error);
      }
    } else {
      toast.warn("Enter an URL");
    }
  };

  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      {addOpen ? (
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Enter URL</div>

            <div
              style={{ cursor: "pointer" }}
              onClick={() => setaddOpen(false)}
            >
              <IoClose size={20} />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <input
              required
              onChange={(e) => setLink(e.target.value.trim())}
              value={link}
              style={{
                width: "600px",
                backgroundColor: "#e0e0e0",
                border: "none",
                padding: "10px",
                borderRadius: "10px",
              }}
              placeholder="URL"
            />
            <button
              onClick={setLinkHandler}
              style={{
                width: "70px",
                padding: "10px",
                border: "none",
                borderRadius: "30px",
                color: "white",
                backgroundColor: "blueviolet",
                cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setaddOpen(true)}
          style={{
            width: "70%",
            padding: "20px",
            border: "none",
            borderRadius: "30px",
            color: "white",
            backgroundColor: "blueviolet",
            cursor: "pointer",
          }}
        >
          + Add Link
        </button>
      )}
    </div>
  );
}

export default AddLink;
