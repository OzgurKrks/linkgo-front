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

const API_URL = "https://linkgo-backend-kuok.vercel.app/api/links/";

export default function Links() {
  const { user } = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  const { someProp } = useOutletContext();

  const updateLinks = async () => {
    await axios.put(
      API_URL + "updateorder",
      {
        orderArray: someProp.items,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  useEffect(() => {
    updateLinks();
    dispatch(updateLinksDataHandler(someProp.items));
  }, [someProp.items]);

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
