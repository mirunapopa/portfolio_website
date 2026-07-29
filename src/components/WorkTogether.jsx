import content from '../lib/content.js'
import Reveal from './Reveal.jsx'
import callIcon from '../assets/icons/call.png'
import proposalIcon from '../assets/icons/proposal.png'
import collaborativeIcon from '../assets/icons/collaborative.png'

const ICONS = {
  chat: callIcon,
  clipboard: proposalIcon,
  idea: collaborativeIcon,
}

export default function WorkTogether() {
  const { title, steps = [] } = content['work-together']

  return (
    <section className="section section-light work-together">
      <div className="container">
        <Reveal as="h2" className="section-heading center">
          {title}
        </Reveal>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <Reveal as="div" key={step.title} delay={i * 100}>
              {ICONS[step.icon] && <img src={ICONS[step.icon]} alt="" className="step-icon" />}
              <h3 className="step-title">{step.title}</h3>
              <p className="step-body">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
