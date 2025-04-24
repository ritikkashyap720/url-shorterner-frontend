import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

function Home() {
  const [allUrls, setAllUrls] = useState();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    LoadAllUrl()
  }, [])

  async function LoadAllUrl() {
    const response = await axios.get(`${BACKEND_URL}/url/allUrl`);
    console.log(response);
    if (response.data.allurls) {
      setAllUrls(response.data.allurls)
    }
  }

  return (
    <div className='flex flex-col'>
      {allUrls ? allUrls.map((url)=><Link key={url} className='text-blue-600 underline' target='_blank' to={`/${url}`}> {url} </Link>):<p>No link available</p>}
    </div>
  )
}

export default Home
