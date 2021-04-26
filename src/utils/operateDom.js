export function outputDom(title, type = 'h2', style) {
  const dom = document.createElement(type);
  dom.innerHTML = title;
  style && Object.keys(style).forEach(item => {
    console.log(item)
    dom.style[item] = style[item];
    dom.setAttribute(item, style[item])
  })
  document.body.appendChild(dom);
}