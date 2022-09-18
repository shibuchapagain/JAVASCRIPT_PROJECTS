const data = require("./dev-data/data/tours-simple.json");
// console.log(data);
// 1) sorting with the basis of rating / price / anything you want ...
// 2) search the items which has greater than specific price ...
// 3) limiting ( i mean display all tours (name, price, rating)) and also specific tours ...
// console.log(data);

// 1) ANSWER --->
// ALL ABOUT SINGLE SORTING
let priceSorting = data.sort((a, b) => {
  return a.price - b.price; // low to high
});
// console.log(priceSorting); // return array with price (low to high)sorting

let ratingAverageSorting = data.sort((a, b) => {
  return a.ratingsAverage - b.ratingsAverage; // low to high
});
// console.log(ratingAverageSorting); // rating low to high

let ratingAverageSorting2 = data.sort((a, b) => {
  return b.ratingsAverage - a.ratingsAverage; // high to low
});
// console.log(ratingAverageSorting2); // rating high to low

// SORTING WITH TWO CONDITION
// if both tours hav same price then sorting with their ratingAverage which has highest rating it will come first .... and this sorting is based on price as well as rating if both tours price are matched !! (low price to high)
let priceRatingSorting = data.sort((a, b) => {
  if (a.price == b.price) {
    return b.ratingsAverage - a.ratingsAverage;
  }
  return a.price > b.price ? 1 : -1; // (low price to high) works only when '>' ...
});
// console.log(priceRatingSorting);

// 2) ANSWER --->
// search the tours which has greater than specific price range

// greater than thausand tours price ...
let greaterThanThau = data.filter((el) => {
  return el.price > 1000;
});
// console.log(greaterThanThau);

// greater than 4.6 rating tours
let greaterThanSpecificRating = data.filter((el) => {
  return el.ratingsAverage > 4.6;
});
// console.log(greaterThanSpecificRating);

// search the tours with two condition
// rating is greater than 4.6 and price is less than 500
let search = data.filter((el) => {
  let condition = el.price < 500 && el.ratingsAverage > 4.7;
  if (!condition) {
    return;
  } else {
    return condition;
  }
});
// console.log(search);

// lets solve this problem with function
let searchData = (price, avgRat) => {
  let search = data.filter((el) => {
    let condition = el.price < price && el.ratingsAverage > avgRat;
    return condition;
  });
  return search;
};
// console.log(searchData(500, 4.7));

// 3) ANSWER --->
// display name, price and ratingsAverage of all tours
let displayData = () => {
  let storeArr = [];
  //   let storeObj = {};
  for (value of data) {
    let object = {
      name: value.name,
      price: value.price,
      ratingsAverage: value.ratingsAverage,
    };
    storeArr.push(object);
    // Object.assign(storeObj, object);
  }
  return storeArr;
  //   return storeObj;
};
let arrayData = displayData();
// console.log(arrayData); // return array
// change array to object
let object = { ...arrayData };
// console.log(object);
console.log(object[0]);
