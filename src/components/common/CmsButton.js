import React, { useState } from 'react'
import '../../styles/CmsButton.scss'

const Button = ({handleSave, resetImages}) => {
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState(false)

    const handleSubmit = () => {
      setShowModal(false)
      resetImages()
    }
  
    const handleSaveBtnClick = () => {
      handleSave()
      // resetImages()
      setMessage(true)
    }

    const handleContinue = () => {
      setMessage(false)
    }
    
return (
  <div className='Cmsbutton'>
      <div className="Cmsbutton buttonsContainer">
          <button className="Cmsbutton cancelBtn" onClick={() => setShowModal(true)}>Cancel</button>
          <button className="Cmsbutton saveBtn" onClick={handleSaveBtnClick}>Save</button>
      </div>
          {showModal &&
            <div className="Cmsbutton modalScreen">
              <div className="Cmsbutton modalContainer">
                  <p>Do you want cancel the changes done ?</p>
                  <div className="Cmsbutton modalBtnsContainer">
                      <button className="Cmsbutton yesBtn" onClick={handleSubmit}>Yes</button>
                      <button className="Cmsbutton noBtn" onClick={() => setShowModal(false)}>No</button>
                  </div>
              </div>
            </div>
          }
          {message && 
            <div className='Cmsbutton messagebox'>
              <div className="Cmsbutton messageContainer">
                <p>Saved Successfully !</p>
                <div className="Cmsbutton mesageBtnsContainer">
                    {/* <button className="Cmsbutton previwBtn" >Preview</button> */}
                    <button className="Cmsbutton continueBtn" onClick={handleContinue}>Continue</button>
                </div>
              </div>
            </div>
          }
  </div>
)
}

export default Button
