import React from 'react'
import { Button } from '@mui/material'

function File() {
  const download=()=>{
    const fileURL="https://drive.google.com/file/d/1a4ft4yngl4rmWRXi_9GVK4e5j6-sXckB/view?usp=sharing";
    const link=document.createElement('a')
    link.href=fileURL
    link.setAttribute("download","myfile.pdf")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return (
    <div>
      <h2>File Upload and Download</h2>
      <Button onClick={download} sx={{color:"black"}}>Download</Button>
    </div>
  )
}
export default File
