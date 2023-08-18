let colors = ['red', 'green', 'blue'];
let rgb = [...colors];
console.log(rgb);

const circle = {
  radius: 10
};
const coloredCircle = {
  ...circle,
  color: 'black'
};
console.log(coloredCircle);