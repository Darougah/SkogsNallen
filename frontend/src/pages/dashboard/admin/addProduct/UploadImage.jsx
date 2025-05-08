
import React, { useState } from 'react';
import axios from 'axios';
import { getBaseURL } from './../../../../utils/baseURL';

const UploadImage = ({ name, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result); 
      fileReader.onerror = (error) => reject(error);
    });
  };

  const UploadSingleImage = (base64) => {
    setLoading(true);
    axios.post(`${getBaseURL()}/uploadImage`, { image: base64 })
      .then((res) => {
        const imageUrl = res.data;
        setUrl(imageUrl);
        setImage(imageUrl);
        alert("Bild uppladdad!");
      })
      .catch((error) => {
        console.error("Fel med att ladda upp bild", error);
      })
      .finally(() => setLoading(false));
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      UploadSingleImage(base64);
    }
  };

  return (
    <div>
      <label htmlFor={name}>Ladda upp bild</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className="border p-2 w-full rounded-md bg-gray-100 text-sm"
      />
      {loading && (
        <div className="mt-2 text-sm text-blue-600">Laddar upp bild...</div>
      )}
      {url && (
        <div className="mt-2 text-sm text-green-600">
          <p>Bild uppladdad!</p>
          <img src={url} alt="uploaded" className="w-32 mt-2 rounded-md shadow" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
