let car = {
  brand: 'Honda',
  getBrand: function () {
      return this.brand;
  }
}

// console.log(car.getBrand()); // Honda

let brand = car.getBrand;
console.log(brand()); // undefined

