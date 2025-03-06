import React, { useState, useRef, useEffect } from "react";
import UploadingAnimation from "../images/loading.png";
import EditIcon from "../images/edit.png";
import DefaultImage from "../images/professional'.jpg";
import "./style.css";

const ImageUpload = ({ onUploadSuccess, initialImage }) => {
  const [avatarURL, setAvatarURL] = useState(initialImage || DefaultImage);
  const fileUploadRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    try {
      setIsUploading(true);
      setAvatarURL(UploadingAnimation);
      const uploadedFile = fileUploadRef.current.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setAvatarURL(base64String);
        onUploadSuccess(base64String); // Send Base64 to parent
      };
      reader.readAsDataURL(uploadedFile);
    } catch (error) {
      console.error(error);
      setAvatarURL(initialImage || DefaultImage);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setAvatarURL(initialImage || DefaultImage);
  }, [initialImage]);

  return (
    <div className="galary min-wh-100 conatiner">
      <img src={avatarURL} alt="Avatar" className="imagedefault bg-light" />
      <form id="form" encType="multipart/form-data" className="form_content">
        <button
          type="button" 
          onClick={handleImageUpload}
          className="img-fluid uploadimage"
        >
          <img src={EditIcon} alt="Edit" className="object-cover" />
        </button>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          onChange={uploadImageDisplay}
          hidden
        />
      </form>
    </div>
  );
};

export default ImageUpload;