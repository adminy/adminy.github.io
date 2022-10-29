const html5Attr = new Set(['href', 'class', 'placeholder', 'type', 'disabled', 'name', 'value', 'autocomplete'])
const styles = new Set()
for (const attr in document.body) { html5Attr.add(attr) }
for (const style in document.body.style) { styles.add(style) }

const addChild = (where, child) => appendElement(where, ...Object.entries(child)[0])

const customTypes = (element, props) => ({
  text: () => element.appendChild(document.createTextNode(props.text)),
  child: () => addChild(element, props.child),
  children: () => props.children.map(child => addChild(element, child))
})

const setAttr = (element, props, name) => {
  styles.has(name) && (element.style[name] = props[name])
  html5Attr.has(name) && (name.startsWith('on') ? (element[name] = props[name]) : element.setAttribute(name, props[name]))
}

export const appendElement = (where, elementName, props = {}) => {
  const element = document.createElement(elementName)
  where.appendChild(element)
  for (const name in props) {
    customTypes(element, props)[name]?.() ?? setAttr(element, props, name)
  }

  return element
}

export const $ = id => document.querySelector(id)

const textToChars = text => text.split('').map(c => c.charCodeAt(0))

const applySaltToChar = (key, txt) => textToChars(key).reduce((a, b) => a ^ b, txt)

export const decrypt = (key, encrypted) => encrypted.match(/.{1,2}/g)
  .map(hex => parseInt(hex, 16))
  .map(txt => applySaltToChar(key, txt))
  .map(charCode => String.fromCharCode(charCode))
  .join('')

export const hash = str => textToChars(str).reduce((a, v) => a + ((a << 7) + (a << 3)) ^ v).toString(16)
