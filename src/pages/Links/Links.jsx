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

const API_URL = process.env.REACT_APP_API_URL + "links/";

export default function Links() {
  const { user } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
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
