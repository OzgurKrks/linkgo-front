import React, { useState, useEffect, useCallback } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { RiDraggable } from "react-icons/ri";
import { PiTrashLight } from "react-icons/pi";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getLinks } from "../../features/links/linksSlice";
import { TbPencilMinus } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { debounce } from "lodash";
import { Grid } from "@mui/material";
import { RiGalleryFill } from "react-icons/ri";
import AddThumbnail from "../../componenets/AddThumbnail";

const API_URL = process.env.REACT_APP_API_URL + "links/";

export const Item = ({ item, setLoad }) => {
  const dragControls = useDragControls();
  const [checked, setChecked] = useState(item.show);
  const [changeTitle, setChangeTitle] = useState(false);
  const [inputValue, setInputValue] = useState(item.title);
  const [debounceTitleData, setTitleDebounceData] = useState(null);
  const [image, setImage] = useState("");
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const [open, setOpen] = useState(false);
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
        process.env.REACT_APP_API_URL + `links/${id}`,
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
      .delete(process.env.REACT_APP_API_URL + `links/${id}`, {
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
          process.env.REACT_APP_API_URL + `links/${id}`,
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

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  // Handle PUT request
  const putHandler = async (id) => {
    try {
      const response = await axios.put(
        API_URL + `addThumbnail/${id}`,
        { thumbnail_image: croppedImageFile ? croppedImageFile : image },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data", // Specify content type for FormData
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (debounceTitleData) {
      updateLinkHandler(item._id);
    }
  }, [debounceTitleData, checked]);

  return (
    <Reorder.Item
      style={{ width: "100%" }}
      value={item}
      id={item._id}
      dragListener={false}
      dragControls={dragControls}
    >
      {open && (
        <AddThumbnail
          open={open}
          setOpen={setOpen}
          image={image}
          setImage={setImage}
          croppedImageFile={croppedImageFile}
          setCroppedImageFile={setCroppedImageFile}
          handleImage={handleImage}
          putHandler={putHandler}
          link_item={item._id}
        />
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "160px",
          backgroundColor: "white",
          borderRadius: "30px",
          boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <RiDraggable
          style={{ minWidth: "10%", cursor: "pointer", touchAction: "none" }}
          size={25}
          onPointerDown={(event) => dragControls.start(event)}
        />
        <div
          style={{
            width: "85%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginLeft: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: 500,
                maxWidth: "80%",
                textOverflow: "ellipsis",
                overflow: "hidden",
                height: "1.2rem",
                whiteSpace: "nowrap",
              }}
            >
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
            </div>
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

          <Grid container>
            <Grid xs={10}>
              <p
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  height: "1.2rem",
                  whiteSpace: "nowrap",
                }}
              >
                {item.url}
              </p>
            </Grid>
            <Grid
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              xs={2}
            >
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid xs={10}>
              <RiGalleryFill
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
                size={22}
              />
            </Grid>
            <Grid
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px",
              }}
              xs={2}
            >
              <PiTrashLight
                onClick={() => deleteLinkHandler(item._id)}
                style={{ cursor: "pointer" }}
                size={22}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Reorder.Item>
  );
};
