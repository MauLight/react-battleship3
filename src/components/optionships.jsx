class AIShip {
    constructor(length, isHorizontal, randomPos) {
      this.length = length;
      this.isHorizontal = isHorizontal;
      this.randomPos = randomPos;
    }
  }
  
  const boolArray = new Array(5);
  for (let i = 0; i < boolArray.length; i++) {
    //console.log(i);
    let randomBoolean = Math.random() < 0.5;
    boolArray[i] = randomBoolean;
  }
  
  const shipLengthArray = [2, 3, 3, 4, 5];
  
  const ship = new AIShip(shipLengthArray[1], boolArray[1]);
  
  console.log(ship);
  
  const AIshipsArray = new Array(5);
  for (let i = 0; i < AIshipsArray.length; i++) {
    let ranNum = Math.floor(Math.random() * 100);
  
    AIshipsArray[i] = new AIShip(shipLengthArray[i], boolArray[i], ranNum);
  }
  
  console.log(AIshipsArray); 
  

  export default AIshipsArray;