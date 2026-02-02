import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="homepage-main">
      <div className="homepage-card">
        {/* Logo Placeholder */}
        <div className="homepage-logo">
          <span className="homepage-logo-text">CMS</span>
        </div>
        <h1 className="homepage-title">Welcome to the CMS</h1>
        <p className="homepage-tagline">
          A modern, flexible platform to manage your content with ease and professionalism.
        </p>
        <Link href="/admin" className="homepage-admin-link">
          <svg
            className="homepage-admin-link-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Go to Admin
        </Link>
      </div>
      <footer className="homepage-footer">
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </footer>
    </main>
  )
}
