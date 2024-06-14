import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Item } from "./Item";
import AddLink from "../../componenets/AddLink/AddLink";
import { updateLinksDataHandler } from "../../features/links/linksSlice";
import styles from "./Links.module.css";
import { useOutletContext } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import useAxios from "../../hooks/useAxios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const API_URL = process.env.REACT_APP_API_URL + "links/";

export default function Links() {
  const { user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const [load, setLoad] = useState(false);
  const [copy, setCopy] = useState(null);
  const { put } = useAxios();

  const dispatch = useDispatch();

  const { someProp } = useOutletContext();

  const updateLinks = async () => {
    await put("/links/updateorder", { orderArray: someProp.items });
  };

  useEffect(() => {
    updateLinks();
    dispatch(updateLinksDataHandler(someProp.items));
  }, [someProp.items]);

  useEffect(() => {
    copy && toast.success("Copied");
  }, [copy]);

  return (
    <div
      style={{
        width: "100%",
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
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            backgroundColor: "#A4DDED",
            padding: "5px",
            borderRadius: "20px",
          }}
        >
          <div style={{ padding: "8px", fontSize: "13px" }}>
            <strong>🔥 Your link is live: </strong> linkgo-front.vercel.app/
            {userData.username}
          </div>
          <CopyToClipboard
            text={`https://linkgo-front.vercel.app/${userData.username}`}
            onCopy={() => setCopy(true)}
          >
            <button
              style={{
                border: "none",
                borderRadius: "30px",
                backgroundColor: "white",
                color: "black",
                width: "150px",
                padding: "8px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Copy your link
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <AddLink load={load} setLoad={setLoad} />
        </div>
        {load ? (
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
        ) : (
          ""
        )}
        <Reorder.Group
          style={{
            listStyle: "none",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
            padding: "0px",
          }}
          axis="y"
          onReorder={someProp.setItems}
          values={someProp.items}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className={styles.itemWrapper}>
              {someProp.items.map((item) => (
                <Item
                  key={item._id}
                  item={item}
                  load={load}
                  setLoad={setLoad}
                />
              ))}
            </div>
          </div>
        </Reorder.Group>
      </div>
    </div>
  );
}
