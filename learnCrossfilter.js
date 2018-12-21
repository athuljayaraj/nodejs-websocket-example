import crossfilter from 'crossfilter'

function test() {
    var livingThings = crossfilter([
        // Fact data.
        { name: "Rusty",  type: "human", legs: 2 },
        { name: "Alex",   type: "human", legs: 2 },
        { name: "Lassie", type: "dog",   legs: 4 },
        { name: "Spot",   type: "dog",   legs: 4 },
        { name: "Polly",  type: "bird",  legs: 2 },
        { name: "Fiona",  type: "plant", legs: 0 }
      ]);
    
      // How many living things are in my house?
    var n = livingThings.groupAll().reduceCount().value();
    console.log("There are " + n + " living things in my house.") // 6
    
    // How many total legs are in my house?
    var legs = livingThings.groupAll().reduceSum(function(fact) { return fact.legs; }).value()
    console.log("There are " + legs + " legs in my house.") // 14
}
