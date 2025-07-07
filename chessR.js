var Board = [
  // White pawns
  { part: "pawn", color: "white", position: ["A", 2] },
  { part: "pawn", color: "white", position: ["B", 2] },
  { part: "pawn", color: "white", position: ["C", 2] },
  { part: "pawn", color: "white", position: ["D", 2] },
  { part: "pawn", color: "white", position: ["E", 2] },
  { part: "pawn", color: "white", position: ["F", 2] },
  { part: "pawn", color: "white", position: ["G", 2] },
  { part: "pawn", color: "white", position: ["H", 2] },

  // Black pawns
  { part: "pawn", color: "black", position: ["A", 7] },
  { part: "pawn", color: "black", position: ["B", 7] },
  { part: "pawn", color: "black", position: ["C", 7] },
  { part: "pawn", color: "black", position: ["D", 7] },
  { part: "pawn", color: "black", position: ["E", 7] },
  { part: "pawn", color: "black", position: ["F", 7] },
  { part: "pawn", color: "black", position: ["G", 7] },
  { part: "pawn", color: "black", position: ["H", 7] },

  // White rooks
  { part: "rook", color: "white", position: ["A", 1] },
  { part: "rook", color: "white", position: ["H", 1] },

  // Black rooks
  { part: "rook", color: "black", position: ["A", 8] },
  { part: "rook", color: "black", position: ["H", 8] },

  // White knights
  { part: "knight", color: "white", position: ["B", 1] },
  { part: "knight", color: "white", position: ["G", 1] },

  // Black knights
  { part: "knight", color: "black", position: ["B", 8] },
  { part: "knight", color: "black", position: ["G", 8] },

  // White bishops
  { part: "bishop", color: "white", position: ["C", 1] },
  { part: "bishop", color: "white", position: ["F", 1] },

  // Black bishops
  { part: "bishop", color: "black", position: ["C", 8] },
  { part: "bishop", color: "black", position: ["F", 8] },

  // White queen
  { part: "queen", color: "white", position: ["D", 1] },

  // Black queen
  { part: "queen", color: "black", position: ["D", 8] },

  // White king
  { part: "king", color: "white", position: ["E", 1] },

  // Black king
  { part: "king", color: "black", position: ["E", 8] }
];


let letters = ["A", "B", "C", "D", "E", "F", "G", "H"]

function isOccupied(position) {
  for (let i = 0; i < Board.length; i++) {
    if (Board[i].position[0] === position[0] && Board[i].position[1] === position[1]) {
      return true;
    }
  }
  return false;
}

function cords(position) {
    let letcol = position[0]
    let letnum = position[1]
    let col = letters.indexOf(letcol)
    let fil = letnum - 1 
    return [col, fil]
}

function changeCords(position) {
    let letCol = position[0];    
    let letnum = position[1];       
    let col = letters[letCol];
    let num = letnum + 1;
    return [col, num];
}

function move(part, color, positionR) {
    let newPosition2
    let position
    let actualPosition
    let newPosition

    //PAWNS
    if (part === "pawn") {

        for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)
            
            if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {

                if(Board[i].color === "white" && color === "white") {

                    if (position[1] == 1) {
                    newPosition2 = [actualPosition[0], actualPosition[1] + 2]
                    if (isOccupied(changeCords(newPosition2))) {

                        } else {
                              console.log(changeCords(newPosition2))
                        }
                }
                    newPosition = [actualPosition[0], actualPosition[1] + 1]
                    if(isOccupied(changeCords(newPosition))){
                        console.log("Casilla bloqueada")
                    } else {
                        Board[i].position = changeCords(newPosition)
                        return changeCords(newPosition)
                    }
                }

                if(Board[i].color === "black" && color === "black") {
                    if (position[1] == 7) {
                    newPosition2 = [actualPosition[0], actualPosition[1] - 2]
                        if (isOccupied(changeCords(newPosition2))) {

                        } else {
                              console.log(changeCords(newPosition2))
                        }
                }
                    let newPosition = [actualPosition[0], actualPosition[1] - 1]
                    if(isOccupied(changeCords(newPosition))){
                        console.log("Casilla bloqueada")
                    } else {
                        Board[i].position = changeCords(newPosition)
                        return changeCords(newPosition)
                    }
                    
                }
            }
        }
    }

    //ROOK
    if(part === "rook") {
        for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)

            if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {

                if(Board[i].color === "white" && color === "white") {

                    //POSICIONES VERTICALES
                    for (let j = actualPosition[1]; j <= 8; j++) {
                        newPosition = [actualPosition[0], actualPosition[1] + 1]

                        if(isOccupied(changeCords(newPosition))){

                        } else {
                            return changeCords(newPosition)
                        }
                        
                    }

                    //POSICIONES HORIZONTALES
                    for (let j = actualPosition[1]; j <= 8; j++) {
                        newPosition = [actualPosition[0], actualPosition[1] + 1]

                        if(isOccupied(changeCords(newPosition))){
                            console.log("Casilla bloqueada")

                        } else {
                            return changeCords(newPosition)
                        }
                        
                    }

                    Board[i].position = changeCords(newPosition)
                }

                if(Board[i].color === "black" && color === "black") {
            
                }
            }
        }
    }
}

console.log(move("pawn", "white", ["A", 2]))
console.log(Board[0])
console.log(move("pawn", "white", ["A", 3]))
console.log(Board[0])
console.log(move("pawn", "black", ["A", 7]))
console.log(Board[8])
console.log(move("pawn", "white", ["A", 4]))
console.log(move("pawn", "white", ["A", 5]))

