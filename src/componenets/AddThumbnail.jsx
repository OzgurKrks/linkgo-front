import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { CiFileOn } from "react-icons/ci";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddThumbnail({
  open,
  setOpen,
  image,
  setImage,
  setCroppedImageFile,
  handleImage,
  putHandler,
  link_item,
}) {
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const imgRef = useRef(null);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    setCrop({
      unit: "%",
      width: 50,
      height: 50,
      x: (width - 50) / 2,
      y: (height - 50) / 2,
    });
  };

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], "croppedImage.jpeg", {
          type: "image/jpeg",
        });
        const fileUrl = URL.createObjectURL(blob);
        resolve({ file, fileUrl });
      }, "image/jpeg");
    });
  };

  const onCropComplete = async (crop) => {
    if (imgRef.current && crop.width && crop.height) {
      const { file, fileUrl } = await getCroppedImg(imgRef.current, crop);
      setCroppedImageUrl(fileUrl);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setCroppedImageFile(reader.result);
      };
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        fullWidth
        TransitionComponent={Transition}
      >
        <DialogTitle>{"Upload Thumbnail"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {!image && (
              <>
                <input
                  onChange={handleImage}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  type="file"
                  name="image"
                />{" "}
                <div
                  onClick={handleButtonClick}
                  style={{
                    width: "98%",
                    border: "1px dashed black",
                    borderRadius: "15px",
                    height: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <CiFileOn size={38} />
                    <p>Select file to upload</p>
                  </div>
                </div>
              </>
            )}

            {image && (
              <ReactCrop
                src={image}
                crop={crop}
                onImageLoaded={onImageLoad}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={onCropComplete}
              >
                {image && <img ref={imgRef} src={image} alt="Source" />}
              </ReactCrop>
            )}
            {croppedImageUrl && (
              <div>
                <p>Cropped Image:</p>
                <img src={croppedImageUrl} alt="Cropped" />
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "8px",
              gap: "3px",
            }}
          >
            <button
              onClick={() => {
                setCroppedImageFile(null);
                setImage(null);
                setCroppedImageUrl(null);
              }}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "15px",
                border: "1px solid #dadad8",
                borderRadius: "30px",
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Clear
            </button>
            <button
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "16px",
                border: "none",
                borderRadius: "30px",
                backgroundColor: "rgb(129, 41, 217)",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={(e) => {
                putHandler(link_item);
                setOpen(false);
              }}
            >
              Upload
            </button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
