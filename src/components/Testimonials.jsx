import content from '../lib/content.js'
import Reveal from './Reveal.jsx'

const images = import.meta.glob('../assets/testimonials/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function imageFor(name) {
  if (!name) return null
  const match = Object.entries(images).find(([path]) => path.endsWith(`/${name}`))
  return match ? match[1] : null
}

export default function Testimonials() {
  const { label, items } = content.testimonials

  if (!items?.length) return null

  return (
    <section className="section section-light testimonials">
      <div className="container">
        {label && <Reveal as="p" className="testimonials-label">{label}</Reveal>}
        <div
          className={`testimonials-grid${
            items.length === 1 ? ' testimonials-grid-single' : ''
          }`}
        >
          {items.map((item, i) => {
            const photo = imageFor(item.image)
            return (
              <Reveal as="figure" key={item.name} delay={i * 100} className="testimonial">
                <blockquote className="testimonial-quote">{`“${item.quote}”`}</blockquote>
                <figcaption className="testimonial-attribution">
                  <span className="testimonial-avatar" aria-hidden="true">
                    {photo ? (
                      <img src={photo} alt="" className="testimonial-avatar-photo" />
                    ) : (
                      item.name.charAt(0)
                    )}
                  </span>
                  <span className="testimonial-person">
                    <span className="testimonial-name">{item.name}</span>
                    {item.role && <span className="testimonial-role">{item.role}</span>}
                  </span>
                </figcaption>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
