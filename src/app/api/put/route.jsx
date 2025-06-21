import { NextResponse } from 'next/server';

function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(base64UrlStr) {
  let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }

  return atob(base64);
}

export async function GET(request) {

    const encodedData = request.nextUrl.searchParams.get('data');
    if (!encodedData) {
      return NextResponse.json({ error: 'Data parameter is required' }, { status: 400 });
    }
    
    const dataStr = base64UrlDecode(encodedData);
    const data = JSON.parse(dataStr);
    
    const decodedUrl = data.url;
    if (!decodedUrl) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }
    const bodyData = data.body || null;
    const headersData = data.headers || {};  
    const originalUrlObj = new URL(decodedUrl);

  try {
    const response = await fetch(decodedUrl, {
      method: 'PUT',
      headers: headersData,
      body: bodyData
    });
    
    const cleanHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        cleanHeaders.append(key, value);
      }
    });
    
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      const html = await response.text();
      
      const baseUrl = `${originalUrlObj.protocol}//${originalUrlObj.host}`;
      const modifiedHtml = html
        // Fix CSS links
        .replace(/href="(\/[^"]*)"/g, (match, p1) => {
          const absoluteUrl = new URL(p1, baseUrl).href;
          return `href="/api/get?url=${base64UrlEncode(absoluteUrl)}"`;
        })
        // Fix JS sources
        .replace(/src="(\/[^"]*)"/g, (match, p1) => {
          const absoluteUrl = new URL(p1, baseUrl).href;
          return `src="/api/get?url=${base64UrlEncode(absoluteUrl)}"`;
        })
        // Fix image sources
        .replace(/src="(\/[^"]*)"/g, (match, p1) => {
          const absoluteUrl = new URL(p1, baseUrl).href;
          return `src="/api/get?url=${base64UrlEncode(absoluteUrl)}"`;
        });
      
      return new NextResponse(modifiedHtml, {
        status: response.status,
        statusText: response.statusText,
        headers: cleanHeaders
      });
    }
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: cleanHeaders
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}