import React, {useState, useRef} from 'react';
import UploadingAnimation from "../images/loading.png";
import EditIcon from "../images/edit.png";
import DefaultImage from "../images/professional'.jpg";
import './style.css';
const ImageUpload = () => {
    const [avatarURL, setAvatarURL] = useState(DefaultImage);
  
    const fileUploadRef = useRef();
  
    const handleImageUpload = (event) => {
      event.preventDefault();
      fileUploadRef.current.click();
    }
    const uploadImageDisplay = async () => {
        try {
          setAvatarURL(UploadingAnimation);
          const uploadedFile = fileUploadRef.current.files[0];
          const formData = new FormData();
          formData.append("file", uploadedFile);
    
          const response = await fetch("https://api.escuelajs.co/api/v1/files/upload", {
            method: "post",
            body: formData
          });
    
          if (response.status === 201) {
            const data = await response.json();
            setAvatarURL(data?.location);
          }
        } catch(error) {
          console.error(error);
          setAvatarURL('');
        }
      }
    
      return (
        <div className="h-96 w-full m-8 container-lg">
          <img 
        src={avatarURL} 
        alt="Avatar" 
        className="img-fluid" />
          <form id="form" encType='multipart/form-data'>
            <button
              type='submit'
              onClick={handleImageUpload}
              className='flex-center absolute bottom-12 right-14 h-10 w-10 '>
              <img
                src={EditIcon}
                alt="Edit"
                className='object-cover'/>Edit Image
            </button>
            <input 
              type="file"
              id="file"
              ref={fileUploadRef}
              onChange={uploadImageDisplay}
              hidden />
          </form>  
        </div>
      )
    }
    
    export default ImageUpload;
    
