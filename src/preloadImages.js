const srcs = [
  'circle3.png',
  'wood.jpg',
  'dressedMaja.jpg',
  'nudeMaja.jpg'
]

export default () =>  {
  srcs.forEach(src => {
    const image = new Image();
    image.src = src;
  })
};
