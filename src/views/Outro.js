import React from 'react'

const Outro = ({setPage}) => {
  return (
    <div className='container '>
      <video  autoPlay={true} onEnded={()=>setPage(0)}>
        <source src="/assets/outro.mp4" type="video/mp4" />
        not supported
      </video>
    </div>
  )
}

export default Outro