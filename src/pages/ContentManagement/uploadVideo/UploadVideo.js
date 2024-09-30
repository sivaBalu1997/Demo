import React, { useState } from 'react';
import addVideoIcon from '../../../assets/svg/AddImg.svg';
import './uploadVideo.scss';

const UploadVideo = ({ videos, setVideos, inputRefs }) => {
  const [dragIndex, setDragIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  const handleChange = (index, event) => {
    const newVideos = [...videos]
    const file = event.target.files[0]
    newVideos[index] = file
    setVideos(newVideos)
  }

  const handleClick = (index) => {
    if (videos.some(video => video === null)) {
      inputRefs[index].current.click()
    }
  }

  
  const isBase64 = (str) => {
    try {
      return btoa(atob(str)) == str
    } catch (err) {
      return false
    }
  }

  const removeVideo = (index) => {
    const newVideos = [...videos]
    newVideos[index] = null
    setVideos(newVideos)
  }

  const handleDragStart = (index) => {
    setDragIndex(index)
  }

  const handleDragOver = (index) => {
    setDragOverIndex(index)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const nullIndex = videos.findIndex(video => video === null)
    if (nullIndex !== -1) {
      const files = event.dataTransfer.files
      if (files.length > 0) {
        const file = files[0]
        if (file.type.includes('video')) {
          const newVideos = [...videos]
          newVideos[nullIndex] = file
          setVideos(newVideos)
        } 
      }
    }
    if (dragIndex !== null && dragOverIndex !== null) {
      const newVideos = [...videos]
      const draggedVideo = newVideos[dragIndex]
      newVideos.splice(dragIndex, 1)
      newVideos.splice(dragOverIndex, 0, draggedVideo)
      setVideos(newVideos)
    }
    setDragIndex(null)
    setDragOverIndex(null)
  }

  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: 'video/mp4'})
  }

  return (
    <div className='uploadVideo'>
      <div className='uploadVideo uploadVideoContainer'>
        <div className='uploadVideo uploadheadings'>
          <p>Drag & Drop to upload or <span className='uploadVideo uploadLink' onClick={() => handleClick(videos.findIndex(video => video === null))}>Browse</span></p>
        </div>
        <div className='uploadVideo videoBox' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <div className="uploadVideo uploadedVideos">
            {videos && videos.map((video, index) => (
              <div key={index} className="uploadVideo uploadedVideo" draggable onDragStart={() => handleDragStart(index)} onDragOver={() => handleDragOver(index)}>
                {video && (
                  <>
                    {isBase64(video) ? (
                      <video src={URL.createObjectURL(base64ToBlob(video))} alt='video' />
                    ) : video instanceof File ? (
                      <video src={URL.createObjectURL(video)} alt='video' />
                    ) : (
                      <video src={video} alt='video' />
                    )}
                    <p className="uploadVideo removeVideoBtn" onClick={() => removeVideo(index)} style={{ color: "white" }}>x</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className='uploadVideo addVideoBtn' style={{ display: videos.some(video => video === null) ? 'block' : 'none' }} onClick={() => handleClick(videos.findIndex(video => video === null))}>
            <img src={addVideoIcon} alt='' />
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                type='file'
                ref={ref}
                onChange={(event) => handleChange(index, event)}
                style={{ display: 'none' }}
                accept=".mp4, .mov, .avi"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadVideo
