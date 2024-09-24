import React from 'react'
import './AvailabilityChangesUntil.scss'

const AvailabilityChangesUntil = ({onclose,setShowAvailabilityChangesUntilModal}) => {


    const Text=["End of Today","End of Today","Until(DD/MM/YYYY HH:MM AM/PM)","Until manually enabled"]

    const handleSaveBtn=()=>{
        onclose();
        setShowAvailabilityChangesUntilModal(false)

    }
  return (
    <div className='AvailabilityChangesUntilContainer'>
        <div className="Availability_Changes_Until_SubContainer">
            <div className='Avail_Changes_Form'>
                <h4 className='Avail_Changes_Heading'>Availability Changes Until</h4>

                {Text.map((elem)=>{
                    return(
                        <>

             
                <div className='Avail_Changes_Radio_container'>
                    <div className='Avail_Changes_Radio_container_Justify'>
                        <h4 className='Avail_Changes_Radio_Text'>{elem}</h4>
                        <input  className="AvaiilRadio" type="radio" name='avail-radio' />
                     </div>
                     
            
                </div>
                </>
                    )
                   })}

                   <div className='Avail_Button_Flex'>
                    <a className='Avail-btn1-Cancel'  onClick={handleSaveBtn}  >Cancel</a>
                    <a className='Avail-btn1-Save' onClick={handleSaveBtn}>Save</a>


                   </div>


            </div>

            
            
            </div>  


    </div>
  )
}

export default AvailabilityChangesUntil