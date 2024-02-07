import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Video from './Video'

function App() {
  const [file, setFile] = useState(0)

  const handleChange = (e)=>{
    const file = e.target.files[0]
    console.log("file",file)
    setFile(file)
  }

 const handleSubmit = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8000/uploads',{ filename: `video-${Date.now()}.mp4`, contentType: "video/mp4" },
      { withCredentials: true }
    );
    console.log("response", response);
     const upload = await axios.put(response.data.key, file, {
      headers: {
        'Content-Type': 'video/mp4', 
      },
    });
    console.log("success", upload);
  } catch (error) {
    console.log(error.message);
  }
};

  return (
    <>
     <input type="file" onChange={(e)=>handleChange(e)}/>
     <button onClick={handleSubmit}>upload</button>

     <br />
     <br />
     <br />
     <Video />
    </>
  )
}

export default App
