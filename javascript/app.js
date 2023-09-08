// function num(){
//   let x=11;
//   return x
// }
// let num11=num
// console.log(num11());

obj={
  x:11,
  num:function(){
    return this.x;
  }
}
console.log(obj.num());
num1=obj.num
console.log(num1());


// let car = {
//   brand: 'Honda',
//   getBrand: function () {
//       return this.brand;
//   }
// }
// let brand = car.getBrand;
// console.log(brand()); // undefined