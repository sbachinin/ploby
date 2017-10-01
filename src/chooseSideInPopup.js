const chooseSideButtons = document.getElementById('chooseSideButtons')

export default function() {

  return new Promise((resolve, reject) => {
    chooseSideButtons.classList.remove('hidden')
    chooseSideButtons.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        chooseSideButtons.classList.add('hidden')
        resolve(e.target.innerText.toLowerCase())
      }
    })
  })
}
