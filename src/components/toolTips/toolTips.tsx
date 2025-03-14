import React from 'react'
import './style.scss'

const ToolTips = (props: any) => {
  const {activeOrderTypes, allChannels} = props
  return (
    <div className='v2-tooltip'>
        {allChannels ? 'All channels' : activeOrderTypes?.length < 1 ? 'Nil' : activeOrderTypes?.join(', ')}
    </div>
  )
}

export default ToolTips
