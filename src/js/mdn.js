/**
 * resizeObserver
 * https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 */
const pElem = document.querySelector('.resize-observer-container p');
const divElem = document.querySelector('.resize-observer-container > div');
const slider = document.querySelector('.resize-observer-container input[type="range"]');
const checkbox = document.querySelector('.resize-observer-container input[type="checkbox"]');
checkbox.checked = true;
divElem.style.width = '600px';

const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    if(entry.contentBoxSize) {
      // Checking for chrome as using a non-standard array
      if (entry.contentBoxSize[0]) {
        pElem.style.fontSize = Math.max(1, entry.contentBoxSize[0].inlineSize/600) + 'rem';
      } else {
        pElem.style.fontSize = Math.max(1, entry.contentBoxSize.inlineSize/600) + 'rem';
      }
    } else {
      pElem.style.fontSize = Math.max(1, entry.contentRect.width/200) + 'rem';
    }
    console.log('Size changed', entry);
  }
});

// 监听div变化
resizeObserver.observe(divElem);

slider.addEventListener('input', () => {
  divElem.style.width = (slider.value * 10) + 'px';
})

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    resizeObserver.observe(divElem);
  } else {
    resizeObserver.unobserve(divElem);
  }
});