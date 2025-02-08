const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

// Sample training data
const trainingData = [
  { input: "hello", output: "greeting" },
  { input: "hi", output: "greeting" },
  { input: "how are you", output: "greeting" },
  { input: "bye", output: "farewell" },
  { input: "goodbye", output: "farewell" },
  { input: "thanks", output: "gratitude" },
  { input: "thank you", output: "gratitude" }
];

// Convert text to numbers
const words = [...new Set(trainingData.flatMap(d => d.input.split(" ")))];
const labels = [...new Set(trainingData.map(d => d.output))];

const wordToIndex = Object.fromEntries(words.map((word, i) => [word, i + 1]));
const labelToIndex = Object.fromEntries(labels.map((label, i) => [label, i]));

function textToTensor(text) {
  const inputArray = new Array(words.length).fill(0); // Initialize with zeros
  text.split(" ").forEach(word => {
    if (wordToIndex[word] !== undefined) {
      inputArray[wordToIndex[word]] = 1; // Mark the word as present
    }
  });
  return tf.tensor2d([inputArray], [1, words.length]); // ✅ Correct shape
}


// Prepare training tensors
const xs = tf.tensor2d(trainingData.map(d => textToTensor(d.input).arraySync()[0]));
const ys = tf.tensor2d(trainingData.map(d => {
  const arr = new Array(labels.length).fill(0);
  arr[labelToIndex[d.output]] = 1;
  return arr;
}));

// Build the model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [words.length], units: 8, activation: "relu" }));
model.add(tf.layers.dense({ units: labels.length, activation: "softmax" }));

model.compile({ optimizer: "adam", loss: "categoricalCrossentropy", metrics: ["accuracy"] });

// Train and save the model
async function trainAndSaveModel() {
  await model.fit(xs, ys, { epochs: 100 });
  await model.save("file://./model");
  console.log("Model trained and saved!");
}

trainAndSaveModel();
