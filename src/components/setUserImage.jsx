import React from 'react';
import { useDispatch } from 'react-redux';
import { setImg } from '../redux/authSlice';
// Replace with your authSlice path

function ImageUploadComponent() {
  const dispatch = useDispatch();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    // Perform checks to validate the file, e.g., size, type, etc.

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      dispatch(setImg(imageData)); // Dispatch action to store image data
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <p>Upload an image</p>
    </div>
  );
}

export default ImageUploadComponent;
