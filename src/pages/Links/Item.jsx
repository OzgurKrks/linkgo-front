import React, { useState, useEffect, useCallback } from "react";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { RiDraggable } from "react-icons/ri";
import { PiTrashLight } from "react-icons/pi";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getLinks } from "../../features/links/linksSlice";
import { TbPencilMinus } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { debounce } from "lodash";

export const Item = ({ item, load, setLoad }) => {
  const dragControls = useDragControls();
  const [checked, setChecked] = useState(item.show);
  const [changeTitle, setChangeTitle] = useState(false);
  const [inputValue, setInputValue] = useState(item.title);
  const [debounceTitleData, setTitleDebounceData] = useState(null);
  const [debounceUrlData, setUrlDebounceData] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setTitleDebounceData(value);
    }, 300), // 300ms delay
    []
  );

  const handleChangeValueHandler = (event) => {
    const { value } = event.target;
    setInputValue(value);
    debouncedChangeHandler(value);
  };

  const updateLinkHandler = async (id) => {
    setLoad(true);
    await axios
      .put(
        `http://localhost:5000/api/links/${id}`,
        { title: debounceTitleData, show: checked },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .finally(() => {
        dispatch(getLinks(user));
        setLoad(false);
      });
  };

  const deleteLinkHandler = async (id) => {
    setLoad(true);
    await axios
      .delete(`http://localhost:5000/api/links/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((data) => console.log(data.data))
      .catch((error) => console.log(error))
      .finally(() => {
        dispatch(getLinks(user));
        setLoad(false);
      });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);

    const updateLinkHandler1 = async (id) => {
      await axios
        .put(
          `http://localhost:5000/api/links/${id}`,
          { show: !checked },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .finally(() => {
          dispatch(getLinks(user));
        });
    };
    updateLinkHandler1(item._id);
  };

  useEffect(() => {
    if (debounceTitleData) {
      updateLinkHandler(item._id);
    }
  }, [debounceTitleData, checked]);

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      dragListener={false}
      dragControls={dragControls}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "150px",
          backgroundColor: "white",
          borderRadius: "30px",
          boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <RiDraggable
          style={{ cursor: "pointer", touchAction: "none" }}
          size={25}
          onPointerDown={(event) => dragControls.start(event)}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginLeft: "10px",
          }}
        >
          <div style={{ fontSize: "14px", fontWeight: 500 }}>
            {!changeTitle && item?.title}
            {changeTitle && (
              <input
                style={{
                  padding: "5px",
                  border: "none",
                  width: "70%",
                  outline: "none",
                }}
                value={inputValue}
                onChange={handleChangeValueHandler}
              />
            )}
            {changeTitle ? (
              <IoMdClose onClick={() => setChangeTitle(false)} />
            ) : (
              <TbPencilMinus
                onClick={() => setChangeTitle(true)}
                size={16}
                style={{ marginLeft: "5px", cursor: "pointer" }}
              />
            )}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "14px",
            }}
          >
            {item.url}
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <PiTrashLight
              onClick={() => deleteLinkHandler(item._id)}
              style={{ marginRight: "12px", cursor: "pointer" }}
              size={22}
            />
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
};
