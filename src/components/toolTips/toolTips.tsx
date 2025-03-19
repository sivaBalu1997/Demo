import React from 'react'
import './style.scss'

const ToolTips = (props: any) => {
  const {activeOrderTypes, allChannels} = props
  return (
    <div className='v2-tooltip'>
        {allChannels ? 'All channels' : activeOrderTypes?.length < 1 ? 'Not available in any channel' : activeOrderTypes?.join(', ')}
    </div>
  )
}

export default ToolTips
