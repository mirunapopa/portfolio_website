import content from '../lib/content.js'

export default function Footer() {
  const { title, email, social, legal = [] } = content.contact

  return (
    <>
      <div className="site-footer-top" />
      <footer id="contact" className="site-footer">
        <div className="container">
          <div className="footer-main">
            <h2 className="footer-title">{title}</h2>
            <div className="footer-contact">
              <a href={`mailto:${email}`}>{email}</a>
              {social && (
                <a href={social.url} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              )}
            </div>
            <div className="footer-legal">
              {legal.map((item) => (
                <a key={item.label} href={item.url}>
                  {item.label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
