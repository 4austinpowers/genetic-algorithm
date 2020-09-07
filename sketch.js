// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat


let target;
let popmax;
let mutationRate;
let mutationRateMax = 0.01;
let mutationRateMin = 0.00001;
let population;

let bestPhrase;
let allPhrases;
let stats;
let data = [];

function setup() {


	bestPhrase = createP("Best phrase:");
	//bestPhrase.position(10,10);
	bestPhrase.class("best");

	allPhrases = createP("All phrases:");
	allPhrases.position(400, 50);
	allPhrases.class("all");

	stats = createP("Stats");
	//stats.position(10,200);
	stats.class("stats");

	createCanvas(380, 360);
	background(0);


	target = "To be or not to be this is the question superlong because I want too see how long it takes for something challenging";
	popmax = 2000;
	mutationRate = 0.01;

	//Create a population with a target phrase, mutation rate, and population max
	population = new Population(target, mutationRate, popmax);



}




function draw() {
	// Generate mating pool
	population.naturalSelection();
	//Create next generation
	population.generate();
	// Calculate fitness
	population.calcFitness();

	population.evaluate();

	// If we found the target phrase, stop
	if (population.isFinished()) {
		//println(millis()/1000.0);
		noLoop();
	}

	displayInfo();
}

function displayInfo() {
	// Display current status of population
	let answer = population.getBest();

	bestPhrase.html("Best phrase:<br>" + answer);

	let statstext = "total generations:     " + population.getGenerations() + "<br>";
	statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
	statstext += "total population:      " + popmax + "<br>";
	statstext += "mutation rate:         " + (population.mutationRate * 100) + "%";

	stats.html(statstext);

	allPhrases.html("All phrases:<br>" + population.allPhrases());

	//* variable mutation
	data.push(population.getAverageFitness());
	stroke(255);
	let y = map(population.getAverageFitness(), 1, 0, 0, height);
	let x = map(population.getGenerations(), 0, 10000, 0, width);
	point(x, y);
	stroke(255, 255, 0);
	let y1 = map(population.mutationRate, mutationRate, 0, 0, height);
	let x1 = map(population.getGenerations(), 0, 10000, 0, width);
	point(x1, y1);
	let y2 = map(data[population.getGenerations() - 500], 1, 0, 0, height);
	stroke(255, 0, 0);
	point(x, y2);
	if ((data[population.getGenerations() - 1] - data[population.getGenerations() - 500]) < 0) {
		population.mutationRate = population.mutationRate * 0.9;
	}
	if (population.mutationRate < mutationRateMin) {
		population.mutationRate = mutationRateMax
	}

	// if ((population.getGenerations() % 50) == 0) {
	// 	population.mutationRate = population.mutationRate * 0.9;
	//}
	// if ((population.getGenerations() % 2500) == 0) {
	// 	population.mutationRate = mutationRate / 30;
	// }
}