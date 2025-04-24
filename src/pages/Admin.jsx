import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

function Admin() {
  const navigate = useNavigate()
  const [allurl, setAllUrl] = useState(null)
  const [newUrl, setNewUrl] = useState("")
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  
  useEffect(() => {
    if (token) {
      LoadAllUrl(token)
    } else {
      navigate("/login")
    }
  }, [])

  async function handleAdd() {
    if (newUrl) {
      console.log(token)
      const response = await axios.post(`${BACKEND_URL}/url/newurl`, { mainUrl: newUrl },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        })
      if (response.data.msg == "success") {
        LoadAllUrl(token)
        setNewUrl("")
      }
    }
  }

  async function LoadAllUrl(token) {
    if (token) {
      const response = await axios.get("http://localhost:8000/url/allUserUrl", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.data.msg == "invalid authtoken") {
        navigate("/login")
        localStorage.clear()
      } else {
        setAllUrl(response.data)
      }
      console.log(response)
    }
  }

  async function deleteURL(urlID) {
    const response = await axios.delete(`http://localhost:8000/url/deleteUrl/${urlID}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
    if (response.data.msg == "success") {
      LoadAllUrl(token)
    }
    console.log(response)
  }

  async function viewUrl(shortID) {
    window.open(shortID, "_blank")
    setTimeout(() => {
      LoadAllUrl(token)
    }, 1000);
  }

  function logout(){
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className='flex item-center w-full justify-between my-5'>
        <h1 className="text-2xl font-bold mb-4">Admin Panel – URL Shortener</h1>
        <button className='bg-red-600 py-2 px-2.5 rounded-sm text-white' onClick={()=>logout()}>Logout</button>
      </div>
      <div className="flex gap-2 mb-6">
        <input
          placeholder="Original URL"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      {allurl && <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Short Code</th>
            <th className="p-2">Original URL</th>
            <th className="p-2">Clicks</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allurl.map(url => (
            <tr key={url._id} className="border-t">
              <td className="p-2">
                <button
                  onClick={() => { viewUrl(url.shortID) }}
                  className="text-blue-600 hover:underline"
                >
                  {url.shortID}
                </button>
              </td>
              <td className="p-2 break-all">{url.mainUrl}</td>
              <td className="p-2">{url.clicks}</td>
              <td className="p-2">
                <button
                  onClick={() => { deleteURL(url._id) }}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>}

    </div>
  )
}

export default Admin

