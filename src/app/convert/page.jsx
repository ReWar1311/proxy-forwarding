"use client";
import { useState, useEffect } from "react";
import "./style.css";

const Page = () => {
  function base64UrlEncode(str) {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function base64UrlDecode(base64UrlStr) {
    let base64 = base64UrlStr.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }

    return atob(base64);
  }
  
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [method, setMethod] = useState("get");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [body, setBody] = useState("");
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [authType, setAuthType] = useState("none");
  const [authValue, setAuthValue] = useState({ username: "", password: "", token: "" });
  const [origin, setOrigin] = useState("");
  const [activeTab, setActiveTab] = useState("params");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);
  
  useEffect(() => {
    if (!data) return;
    
    const headerObj = {};
    headers.forEach(h => {
      if (h.key && h.value) headerObj[h.key] = h.value;
    });
    
    // Auth ------------------------------------------------------------------------------------------
    if (authType === "basic" && authValue.username) {
      headerObj["Authorization"] = `Basic ${btoa(`${authValue.username}:${authValue.password}`)}`;
    } else if (authType === "bearer" && authValue.token) {
      headerObj["Authorization"] = `Bearer ${authValue.token}`;
    }
    
    // parameters -------------------------------------------------------------------------------------
    const paramObj = {};
    params.forEach(p => {
      if (p.key && p.value) paramObj[p.key] = p.value;
    });

    // url -----------------------------------------------------------------------------------------
    let requestData = {
      url: data,
      headers: Object.keys(headerObj).length > 0 ? headerObj : undefined,
      params: Object.keys(paramObj).length > 0 ? paramObj : undefined,
      body: body || undefined
    };

    setUrl(`${origin}/api/${method}?data=${base64UrlEncode(JSON.stringify(requestData))}`);
  }, [data, method, origin, headers, body, params, authType, authValue]);
  
  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };
  
  const removeHeader = (index) => {
    const newHeaders = [...headers];
    newHeaders.splice(index, 1);
    setHeaders(newHeaders.length ? newHeaders : [{ key: "", value: "" }]);
  };
  
  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };
  
  const addParam = () => {
    setParams([...params, { key: "", value: "" }]);
  };
  
  const removeParam = (index) => {
    const newParams = [...params];
    newParams.splice(index, 1);
    setParams(newParams.length ? newParams : [{ key: "", value: "" }]);
  };
  
  const updateParam = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  return (
    <div className="convert-container">
      <h1>API Request Builder</h1>
      <p>Enter a URL and configure your request</p>
      
      <form className="convert-form">
        <div className="method-url-row">
          <select 
            name="method" 
            id="method" 
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="delete">DELETE</option>
            <option value="patch">PATCH</option>
          </select>
          
          <input
            type="text"
            placeholder="Enter URL"
            value={data || ""}
            onChange={(e) => setData(e.target.value)}
            className="url-input"
          />
        </div>
        
        <div className="tabs">
          <button 
            type="button" 
            className={activeTab === "params" ? "active" : ""}
            onClick={() => setActiveTab("params")}
          >
            Parameters
          </button>
          <button 
            type="button" 
            className={activeTab === "headers" ? "active" : ""}
            onClick={() => setActiveTab("headers")}
          >
            Headers
          </button>
          <button 
            type="button" 
            className={activeTab === "auth" ? "active" : ""}
            onClick={() => setActiveTab("auth")}
          >
            Authorization
          </button>
          <button 
            type="button" 
            className={activeTab === "body" ? "active" : ""}
            onClick={() => setActiveTab("body")}
          >
            Body
          </button>
        </div>
        
        {/* Parameters Tab */}
        {activeTab === "params" && (
          <div className="tab-content">
            <h3>Query Parameters</h3>
            {params.map((param, index) => (
              <div key={index} className="key-value-row">
                <input
                  type="text"
                  placeholder="Parameter name"
                  value={param.key}
                  onChange={(e) => updateParam(index, "key", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={param.value}
                  onChange={(e) => updateParam(index, "value", e.target.value)}
                />
                <button type="button" onClick={() => removeParam(index)}>✕</button>
              </div>
            ))}
            <button type="button" className="add-button" onClick={addParam}>+ Add Parameter</button>
          </div>
        )}
        
        {/* Headers Tab */}
        {activeTab === "headers" && (
          <div className="tab-content">
            <h3>HTTP Headers</h3>
            {headers.map((header, index) => (
              <div key={index} className="key-value-row">
                <input
                  type="text"
                  placeholder="Header name"
                  value={header.key}
                  onChange={(e) => updateHeader(index, "key", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={header.value}
                  onChange={(e) => updateHeader(index, "value", e.target.value)}
                />
                <button type="button" onClick={() => removeHeader(index)}>✕</button>
              </div>
            ))}
            <button type="button" className="add-button" onClick={addHeader}>+ Add Header</button>
          </div>
        )}
        
        {/* Authorization Tab */}
        {activeTab === "auth" && (
          <div className="tab-content">
            <h3>Authorization</h3>
            <div className="auth-type">
              <select 
                value={authType}
                onChange={(e) => setAuthType(e.target.value)}
              >
                <option value="none">No Authorization</option>
                <option value="basic">Basic Auth</option>
                <option value="bearer">Bearer Token</option>
              </select>
            </div>
            
            {authType === "basic" && (
              <div className="auth-inputs">
                <input
                  type="text"
                  placeholder="Username"
                  value={authValue.username}
                  onChange={(e) => setAuthValue({...authValue, username: e.target.value})}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authValue.password}
                  onChange={(e) => setAuthValue({...authValue, password: e.target.value})}
                />
              </div>
            )}
            
            {authType === "bearer" && (
              <div className="auth-inputs">
                <input
                  type="text"
                  placeholder="Token"
                  value={authValue.token}
                  onChange={(e) => setAuthValue({...authValue, token: e.target.value})}
                />
              </div>
            )}
          </div>
        )}
        
        {/* Body Tab */}
        {activeTab === "body" && (
          <div className="tab-content">
            <h3>Request Body</h3>
            <textarea
              placeholder="Enter request body (JSON, text, etc.)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
            />
          </div>
        )}
      </form>

      {url && (
        <div className="result">
          <h3>Generated Proxy URL:</h3>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <code>{url}</code>
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
