import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router'

function GetUrl() {
  const { shortID } = useParams();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  useEffect(() => {
    loadUrl(shortID)
  }, [])

  async function loadUrl(shortID) {
    const response = await axios.get(`${BACKEND_URL}/url/${shortID}`)
    console.log(response)
    if (response.data.url) {
      window.open(response.data.url,"_self")
    }
  }
  return (
    <div>
      Fething your url
    </div>
  )
}

export default GetUrl
