"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [origin, setOrigin] = useState('')
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="/globe.svg"
            alt="Proxy Server Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
          <h1>Proxy Forwarding Server</h1>
        </div>
      </header>
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Secure & Flexible API Proxying</h2>
          <p>Forward API requests with custom headers, parameters, and authentication while avoiding CORS issues</p>
          
          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href={`${origin}/convert`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Build a Request
            </a>
            <a
              href="https://github.com/rewar1311/proxy-forwarding-server"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              View on GitHub
            </a>
          </div>
        </section>
        
        <section className={styles.features}>
          <h3>Key Features</h3>
          <ul className={styles.featureList}>
            <li>
              <div className={styles.featureIcon}>🔄</div>
              <div className={styles.featureContent}>
                <h4>Multi-Method Support</h4>
                <p>Complete support for GET, POST, PUT, PATCH, and DELETE HTTP methods</p>
              </div>
            </li>
            <li>
              <div className={styles.featureIcon}>🔒</div>
              <div className={styles.featureContent}>
                <h4>Authentication Options</h4>
                <p>Basic Auth and Bearer Token authentication methods included</p>
              </div>
            </li>
            <li>
              <div className={styles.featureIcon}>📋</div>
              <div className={styles.featureContent}>
                <h4>Custom Headers & Parameters</h4>
                <p>Add headers and query parameters with an easy-to-use interface</p>
              </div>
            </li>
            <li>
              <div className={styles.featureIcon}>🌙</div>
              <div className={styles.featureContent}>
                <h4>Dark Mode Support</h4>
                <p>Built with full light and dark mode integration</p>
              </div>
            </li>
          </ul>
        </section>
        
        <section className={styles.usage}>
          <h3>How It Works</h3>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <p>Enter your target API URL and select HTTP method</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <p>Configure headers, params, auth, and body as needed</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <p>Get your encoded proxy URL ready for use</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className={styles.footer}>
        <p className={styles.copyright}>© 2023 Proxy Forwarding Server</p>
        <div className={styles.footerLinks}>
          <a
            href="https://github.com/rewar1311/proxy-forwarding-server"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/github.svg" 
              alt="GitHub"
              width={16}
              height={16}
            />
            GitHub
          </a>
          <a
            href={`${origin}/convert`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="API Builder"
              width={16}
              height={16}
            />
            API Builder
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Next.js"
              width={16}
              height={16}
            />
            Built with Next.js
          </a>
        </div>
      </footer>
    </div>
  );
}
