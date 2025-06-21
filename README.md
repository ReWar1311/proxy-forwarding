# Proxy Forwarding Server

A powerful API proxy server that bypasses CORS restrictions and enables flexible request customization with headers, parameters, and authentication.

**[🌐 Live Demo: https://proxy-forwarding-silk.vercel.app](https://proxy-forwarding-silk.vercel.app)**

![Proxy Forwarding Server](public/screenshot.png)

## 🚀 Key Features

- 🔄 **Full HTTP Method Support**: GET, POST, PUT, PATCH, DELETE
- 🔐 **Advanced Authentication**: Basic Auth and Bearer Token built-in
- 🌐 **CORS Bypass**: Access any API endpoint without cross-origin restrictions
- 📋 **Request Customization**: Headers, query parameters, and body content
- 🔒 **Secure Encoding**: Base64URL parameter encoding for reliable transmission
- 🌙 **Dark Mode Interface**: Modern UI with automatic dark theme
- 📱 **Fully Responsive**: Optimized for all device sizes
- ⚡ **High Performance**: Built on Next.js for optimal speed

## 📚 API Reference

### Core Endpoints

```
https://proxy-forwarding-silk.vercel.app/api/{method}?data={encodedData}
```

Where:
- `{method}` is one of: `get`, `post`, `put`, `delete`, `patch`
- `{encodedData}` is your base64url-encoded request configuration

### Request Configuration Structure

The `data` parameter accepts a base64url-encoded JSON object with this structure:

```json
{
  "url": "https://target-api.com/endpoint",
  "headers": {
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
  },
  "params": {
    "filter": "active",
    "limit": "100"
  },
  "body": "{\"key\":\"value\"}" 
}
```

### Encoding Helper Function

```javascript
function encodeProxyRequest(config) {
  return btoa(JSON.stringify(config))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
```

## 💻 Usage Examples

### Basic API Request

```javascript
// Target: https://api.example.com/users
const config = {
  url: "https://api.example.com/users"
};

const encodedData = encodeProxyRequest(config);
const proxyUrl = `https://proxy-forwarding-silk.vercel.app/api/get?data=${encodedData}`;

fetch(proxyUrl)
  .then(response => response.json())
  .then(data => console.log(data));
```

### Authenticated Request with Parameters

```javascript
// Target: https://api.example.com/data?type=premium
const config = {
  url: "https://api.example.com/data",
  headers: {
    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
    "Accept": "application/json"
  },
  params: {
    "type": "premium",
    "format": "detailed"
  }
};

const encodedData = encodeProxyRequest(config);
const proxyUrl = `https://proxy-forwarding-silk.vercel.app/api/get?data=${encodedData}`;

// Use in your application
```

### POST Request with JSON Body

```javascript
// Target: https://api.example.com/create
const config = {
  url: "https://api.example.com/create",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "your-api-key"
  },
  body: JSON.stringify({
    name: "New Resource",
    status: "active",
    properties: {
      color: "blue",
      size: "medium"
    }
  })
};

const encodedData = encodeProxyRequest(config);
const proxyUrl = `https://proxy-forwarding-silk.vercel.app/api/post?data=${encodedData}`;

// Use with fetch or axios
```

## 🛠️ Technical Details

### HTML Rewriting

The proxy automatically rewrites URLs in HTML responses to route them through the proxy:

- **CSS Links**: `href="/style.css"` → `href="/api/get?data={encoded-url}"`
- **JavaScript**: `src="/app.js"` → `src="/api/get?data={encoded-url}"`
- **Images**: `src="/image.png"` → `src="/api/get?url={encoded-url}"`

### Request Pipeline

1. Client sends request to proxy with encoded configuration
2. Proxy decodes the base64url data to extract request details
3. Proxy forwards the request to the target API with specified options
4. Response is captured and processed (headers cleaned, links rewritten)
5. Final response is returned to the client

### Security Features

- No server-side request logs (privacy-focused)
- Content encoding headers are properly handled
- Clean response headers to prevent conflicts

## 🔧 Quick Setup (Optional)

If you prefer to run your own instance:

```bash
# Clone and install
git clone https://github.com/yourusername/proxy-forwarding-server.git
cd proxy-forwarding-server
npm install

# Start server
npm run dev

# Or deploy directly to Vercel
npm install -g vercel && vercel
```

## 📝 License

MIT License - See LICENSE file for details.

## 🌟 Built With

- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com) - Edge deployment platform