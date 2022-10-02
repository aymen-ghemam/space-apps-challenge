import React, { useEffect, useRef } from 'react'

const Over = ({setPage}) => {
  return (
    <div className='container'>
      <video id="intro"  autoPlay onEnded={()=>setPage(1)} onClick={()=>{}}>
        <source src="/assets/intro.mp4" type="video/mp4" />
        not supported
      </video>
    </div>
  )
}

export default Over