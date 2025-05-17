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
  const url = new URL(request.url);
  const oldurl = url.searchParams.get('url');
  
  if (!oldurl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }
  
  const decodedUrl = base64UrlDecode(oldurl);
  const originalUrlObj = new URL(decodedUrl);

  try {
    const response = await fetch(decodedUrl, {
      method: 'POST',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml,text/css,*/*',
      },
    });
    
    // Create a new headers object without content-encoding
    const cleanHeaders = new Headers();
    response.headers.forEach((value, key) => {
      // Skip content-encoding header to prevent decoding issues
      if (key.toLowerCase() !== 'content-encoding') {
        cleanHeaders.append(key, value);
      }
    });
    
    // Check if the response is HTML
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('text/html')) {
      // Process HTML to rewrite URLs
      const html = await response.text();
      
      // Rewrite URLs in the HTML
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
    
    // For non-HTML responses, directly forward the response
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: cleanHeaders
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}