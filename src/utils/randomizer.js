module.exports = {
  /**
  * @param { Number } choices amount of partitions to return, each choice has an equal chance
  * @param { Number } partitionRange integer range of partition block
  * https://en.wikipedia.org/wiki/Law_of_large_numbers
  */
  generate(choices = 2, partitionRange = 10000) {
    // Constants
    const partitions = choices;
    const partitionSize = partitionRange;
    const sumPartitionSize = partitions * partitionSize;
    const multiplier = sumPartitionSize;
    const randomNumber = Math.random() * multiplier;

    let currentChoice = 0;
    for (let i = 0; i < sumPartitionSize; i += partitionSize) {
      if (randomNumber >= i && randomNumber < i + partitionSize) {
        return currentChoice;
      } 
      currentChoice += 1; 
    }
    
    return currentChoice;
  },
};
