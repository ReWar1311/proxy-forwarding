# Proxy Forwarding Server

A flexible and powerful API forwarding server built with Next.js that lets you bypass CORS restrictions and make API requests with custom headers, parameters, and authentication.

![Proxy Forwarding Server Screenshot](public/screenshot.png)

## Features

- 🌐 **Universal API Access**: Bypass CORS restrictions and access any API endpoint
- 🔄 **Multiple HTTP Methods**: Support for GET, POST, PUT, DELETE, and PATCH requests
- 🔒 **Authentication Support**: Built-in Basic Auth and Bearer Token authentication
- 📋 **Custom Headers & Parameters**: Easily add and manage request headers and query parameters
- 🧩 **Request Body Support**: Send JSON, text, or other content in request bodies
- 🔐 **Base64 URL Encoding**: Secure parameter passing using base64url encoding
- 🌓 **Dark Mode Support**: Full light and dark mode integration
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js 18.0.0 or newer
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/proxy-forwarding-server.git
   cd proxy-forwarding-server
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Basic Usage

1. Navigate to the API Builder page (/convert)
2. Enter the target API URL
3. Select the HTTP method (GET, POST, PUT, DELETE, PATCH)
4. Configure any necessary headers, parameters, authentication, or body content
5. Use the generated proxy URL for your requests

### Example

To make a GET request to `https://api.example.com/data` with an API key:

1. Enter `https://api.example.com/data` as the URL
2. Select `GET` as the method
3. Add a header with key `X-API-Key` and your API key as the value
4. Copy the generated proxy URL, which will look something like:
   ```
   http://localhost:3000/api/get?data=eyJ1cmwiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbS9kYXRhIiwiaGVhZGVycyI6eyJYLUFQSS1LZXkiOiJ5b3VyLWFwaS1rZXkifX0
   ```

### Using in JavaScript

```javascript
// Example using fetch with the proxy URL
const proxyUrl = 'http://localhost:3000/api/get?data=eyJ1cmwiOiJodHRwczovL2FwaS5leGFtcGxlLmNvbS9kYXRhIiwiaGVhZGVycyI6eyJYLUFQSS1LZXkiOiJ5b3VyLWFwaS1rZXkifX0';

fetch(proxyUrl)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## API Reference

### Endpoint Structure

All proxy endpoints follow this pattern:
```
/api/{method}?data={encodedData}
```

Where:
- `{method}` is one of: `get`, `post`, `put`, `delete`, `patch`
- `{encodedData}` is a base64url-encoded JSON object with the following structure:
  ```json
  {
    "url": "https://target-api.com/endpoint",
    "headers": { "Header-Name": "value" },
    "params": { "param1": "value1" },
    "body": "Request body content or JSON string"
  }
  ```

### Encoding Data

The data parameter uses base64url encoding to avoid URL encoding issues. You can generate this encoding using:

```javascript
function base64UrlEncode(obj) {
  return btoa(JSON.stringify(obj))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const data = {
  url: "https://api.example.com/data",
  headers: { "X-API-Key": "your-api-key" }
};

const encodedData = base64UrlEncode(data);
const proxyUrl = `http://localhost:3000/api/get?data=${encodedData}`;
```

## Deployment

The easiest way to deploy your Proxy Forwarding Server is to use [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

You can also deploy to other platforms that support Next.js applications like Netlify, AWS, or your own server.

## Security Considerations

This proxy server can access any URL specified in the request. In production, you should:

1. Implement rate limiting
2. Add IP restrictions
3. Consider adding an allowlist of permitted target domains
4. Add authentication to the proxy server itself

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styling with CSS Modules
- Icons from [Vercel](https://vercel.com)'s icon set
