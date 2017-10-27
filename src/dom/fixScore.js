const leftScore = document.getElementById('leftScore')
const rightScore = document.getElementById('rightScore')

export default (score = [0, 0]) =>  {
  leftScore.innerText = score[0]
  rightScore.innerText = score[1]
};
