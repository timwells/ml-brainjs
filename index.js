// input 0 0, output 0
// input 0 1, output 1
// input 1 0, output 1
// input 1 1, output 0
const nLayers = 2
const net = new brain.NeuralNetwork({ hiddenLayers: [nLayers] });

const trainingData = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
];

net.train(trainingData, {
    log: (error) => console.log(error),
    logPeroid: 10
});

console.log(net.run([0, 0]));
console.log(net.run([0, 1]));
console.log(net.run([1, 0]));
console.log(net.run([1, 1]));