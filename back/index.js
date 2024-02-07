const express = require("express")
const cors = require('cors')
require("dotenv").config()
const app = express()
const { putObject, getObjectUrl } = require("./aws_s3")


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 3000

app.post('/uploads', async (req, res, next) => {
  try {
    console.log("reached here", req.body);
    let key = await putObject(req.body.filename, req.body.contentType);
    res.status(200).json({ key: key });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/getVideo", async (req, res, next) => {
  try {
    console.log("reached here /getVideo");

    const result = await getObjectUrl('uploads/user-uploads/video-1707289378066.mp4')
    console.log(result)
    res.status(200).json(result)

  } catch (error) {
    console.log(error.message)
  }
})

app.listen(PORT, () => { console.log(`server running on http://localhost:${PORT}`) })