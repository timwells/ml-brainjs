const restaurants = {
  // name : value
  "Brilliant Yellow Corral": "Monday",
  "Penny’s": "Tuesday",
  "Right Coast Wings": "Wednesday",
  "The Delusion Last Railway Car": "Thursday",
  "Fun Day Inn": "Friday",
  "JHOP": "Saturday",
  "Owls": "Sunday"
};

console.log('Problem - predict Restaurant given a Day')
// input:  { Monday, Tues.., .., etc}
// output: { Restaurant#1, Restaurant#2, Restaurant#n }

let trainingData = [];
for(let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName]
  trainingData.push({ input: {[dayOfWeek]: 1 }, output: { [restaurantName]: 1} })
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
const stats = net.train(trainingData)
function restaurantForDay(dayOfWeek) {
  const result = net.run({ [dayOfWeek]: 1 });
  let highestValue = 0;
  let highestRestaurantName = '';
  for (let restuarantName in result) {
      if (result[restuarantName] > highestValue) {
          highestValue = result[restuarantName];
          highestRestaurantName = restuarantName;
      }
  }
  return highestRestaurantName;
}

console.log(restaurantForDay('Monday'));
console.log(restaurantForDay('Tuesday'));
console.log(restaurantForDay('Wednesday'));
console.log(restaurantForDay('Thursday'));
console.log(restaurantForDay('Friday'));
console.log(restaurantForDay('Saturday'));
console.log(restaurantForDay('Sunday'));

console.log('Problem - Predict Day given Restaurant name')
// input:   { Restaurant#1, Restaurant#2, Restaurant#n }
// output:  { Monday, Tues.., .., etc}

const invertedTrainingData = [];
for(let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName]  
  invertedTrainingData.push({ input: {[restaurantName]: 1 }, output: { [dayOfWeek]: 1} })
}

const invertedNet = new brain.NeuralNetwork({ hiddenLayers: [3] });
const invertedStats = invertedNet.train(invertedTrainingData);

function dayForRestaurant(restuarantName) {
    const result = invertedNet.run({ [restuarantName]: 1 });
    // console.log(result)
    let rDay = ''
    let rValue = 0.0
    for (let day in result) {
      // console.log(day,":", result[day])
      if(result[day] > rValue) {
        rValue = result[day]
        rDay = day
      }
    }
    return rDay
}

console.log(dayForRestaurant('Fun Day Inn'))       // Friday
console.log(dayForRestaurant('JHOP'))              // Saturday
console.log(dayForRestaurant('Right Coast Wings')) // Wednesday
