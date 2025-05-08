import React, { useState } from 'react'

const UploadImage = ({name, setImage}) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl]= useState("");

  const uploadImage = ()=>{

  }

  return (
    <div>
      <label htmlFor={name}> Ladda upp bild</label>
      <input type="file" 
      name={name} 
      id={name} 
      onChange={uploadImage} 
      className='add-product-InputCSS' />
      {
        loading && (
          <div className='mt-2 text-sm text-blue-600'>Laddar upp bild...</div>
        )
      }
      {
        url && (
          <div className='mt-2 text-sm text-green-600'>
            <p>Bild uppladdad!</p>
            <img src={url} alt="uploaded-image" />
          </div>
        )
      }
    </div>
  )
}

export default UploadImage