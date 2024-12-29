import React from 'react'
import './App.scss'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate=useNavigate()
  return (
       <Box sx={{ width: '100vw' }}>
     <div className='container'>
     <Typography className="h2" variant="h3" gutterBottom>
      React Features
      </Typography>
      <ul className='features'>
        <li className='list-item' onClick={()=>navigate("/Filter")}><p>Filter Search Sort on a list of items</p></li>
        <li className='list-item' onClick={()=>navigate("/InfiniteScroll")}><p>Infinite Scrolling</p></li>
      </ul>
     </div>
     </Box>
  )
}
