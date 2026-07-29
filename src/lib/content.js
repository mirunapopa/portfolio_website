import yaml from 'js-yaml'

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function parse(raw) {
  const match = FRONTMATTER_RE.exec(raw)
  if (!match) return { body: raw.trim() }
  const data = yaml.load(match[1]) || {}
  return { ...data, body: match[2].trim() }
}

const files = import.meta.glob('../../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const content = {}
for (const path in files) {
  const name = path.split('/').pop().replace('.md', '')
  content[name] = parse(files[path])
}

export default content
