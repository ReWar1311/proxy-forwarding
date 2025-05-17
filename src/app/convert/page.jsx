'use client'
import { useState, useEffect } from "react"


const Page = () => {

    function base64UrlEncode(str) {
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    
    function base64UrlDecode(base64UrlStr) {
      let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
    
      return atob(base64);             // Decode base64 to string
    }
    const [data, setData] = useState(null);
    const [url, setUrl] = useState(null);
    const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);
    useEffect(() => {
        if (!data) return;
        setUrl(origin + '/api/get?url=' + base64UrlEncode(data));
    },[data])
  return (
    <div>
      <h1>Convert</h1>
    <input
      type="text"
      value={data || ""}
      onChange={(e) => setData(e.target.value)}
    />
      <a href={url} target="_blank">{url}</a>
    </div>
  )
}

export default Page