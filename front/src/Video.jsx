import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Video = () => {
  const [video,setVideo] = useState("")

  
  const getVideo = async()=>{
    try {
      const result = await axios.get("http://localhost:8000/getVideo",{withCredentials:true})
      setVideo(result.data)
      console.log("result",result)
      console.log("video",video)
    } catch (error) {
      console.log(error.message)
    }
  }
  

  return (
    <div>
<button onClick={getVideo}>Play</button>
    </div>
  )
}

export default Video