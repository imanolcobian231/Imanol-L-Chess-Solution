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

function insideBoard(position) {
    const [col, row] = position
    return col >= 0 && col < 8 && row >= 0 && row < 8
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
    return [letters[letCol], letnum + 1]
}

function pawnEat(position) {
    for (let i = 0; i < Board.length; i++) {
    if (Board[i].position[0] === position[0] + 1 && Board[i].position[1] === position[1] + 1 || Board[i].position[0] === position[0] - 1 && Board[i].position[1] === position[1] + 1) {
      return true;
    }
  }
  return false;
}

function move(part, color, positionR) {
    let newPosition2
    let position
    let actualPosition
    let newPosition

    //PAWNS
    if (part === "pawn") {
        let movesPawn = []

        for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)
            
            if(actualPosition[1] === 7) {
                Board[i].part = "queen"
            }

            if(pawnEat(actualPosition)) {
                movesPawn.push("Si hay piezas para comer")
            }

            if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {

                if(Board[i].color === "white" && color === "white") {

                    if (position[1] == 1) {
                    newPosition2 = [actualPosition[0], actualPosition[1] + 2]
                    if (isOccupied(changeCords(newPosition2))) {

                        } else {
                            movesPawn.push(changeCords(newPosition2))
                        }
                }
                    newPosition = [actualPosition[0], actualPosition[1] + 1]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else {
                        Board[i].position = changeCords(newPosition)
                        movesPawn.push(changeCords(newPosition))
                    }
                    console.log("Moves Pawn", movesPawn)
                }

                if(Board[i].color === "black" && color === "black") {
                    if (position[1] == 7) {
                    newPosition2 = [actualPosition[0], actualPosition[1] - 2]
                        if (isOccupied(changeCords(newPosition2))) {

                        } else {
                            movesPawn.push(changeCords(newPosition2))
                        }
                }
                    let newPosition = [actualPosition[0], actualPosition[1] - 1]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else {
                        Board[i].position = changeCords(newPosition)
                        movesPawn.push(changeCords(newPosition))
                    }
                    console.log("Moves Pawn", movesPawn)
                    
                }
            }
        }
    }

    //ROOK
    if(part === "rook") {
        let movesRook = []
        for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)

            if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {

                    //POSICIONES VERTICALES
                    for (let j = actualPosition[1] + 1; j < 8; j++) {
                        newPosition = [actualPosition[0], j]

                        if(isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesRook.push((changeCords(newPosition)))
                        }
                        
                    }

                    //VERTICAL ABAJO
                    for (let j = actualPosition[1] - 1; j >= 0; j--) {
                        newPosition = [actualPosition[0], j]

                        if(isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesRook.push((changeCords(newPosition)))
                        }
                        
                    }

                    //POSICIONES HORIZONTALES DERECHA
                    for (let j = actualPosition[0] + 1; j < 8; j++) {
                        newPosition = [j, actualPosition[1]]

                        if(isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesRook.push((changeCords(newPosition)))
                        }
                        
                    }

                    ///POSICIONES HORIZONTALES IZQUIERDA
                    for (let j = actualPosition[0] - 1; j >= 0; j--) {
                        newPosition = [j, actualPosition[1]]

                        if(isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesRook.push((changeCords(newPosition)))
                        }
                        
                    }
                }
            }
            console.log("Moves Rook", movesRook)
        }

        if(part === "knight") {

            let movesKnight = []
            for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)

                if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {
                    
                    let position1 = [position[0] + 2, position[1] + 1]
                    let position2 = [position[0] + 1, position[1] + 2]
                    let position3 = [position[0] - 1, position[1] + 2]
                    let position4 = [position[0] - 2, position[1] + 1]
                    let position5 = [position[0] - 2, position[1] - 1]
                    let position6 = [position[0] - 1, position[1] - 2]
                    let position7 = [position[0] + 1, position[1] - 2]
                    let position8 = [position[0] + 2, position[1] - 1]

                    if (insideBoard(position1)) {
                        movesKnight.push(changeCords(position1))
                    }
                     if (insideBoard(position2)) {
                        movesKnight.push(changeCords(position2))
                    }
                     if (insideBoard(position3)) {
                        movesKnight.push(changeCords(position3))
                    }
                    if (insideBoard(position4)) {
                        movesKnight.push(changeCords(position4))
                    }
                    if (insideBoard(position5)) {
                        movesKnight.push(changeCords(position5))
                    }
                     if (insideBoard(position6)) {
                        movesKnight.push(changeCords(position6))
                    }
                     if (insideBoard(position7)) {
                        movesKnight.push(changeCords(position7))
                    }
                     if (insideBoard(position8)) {
                        movesKnight.push(changeCords(position8))
                    }

            }

            

        }
        console.log("Moves Knight", movesKnight)
    }

    if(part === "bishop") {
        let movesBishop = []

        for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)
            if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {
                
                for (let j = 0; j < 8; j++) {
                    newPosition = [actualPosition[0] + j, actualPosition[1] + j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesBishop.push((changeCords(newPosition)))
                    }  
                }

                for (let j = 1; j < 8; j++) {
                    newPosition = [actualPosition[0] - j, actualPosition[1] + j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesBishop.push((changeCords(newPosition)))
                    }  
                }

                for (let j = 1; j < 8; j++) {
                    newPosition = [actualPosition[0] + j, actualPosition[1] - j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesBishop.push((changeCords(newPosition)))
                    }  
                }

                for (let j = 1; j < 8; j++) {
                    newPosition = [actualPosition[0] - j, actualPosition[1] - j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesBishop.push((changeCords(newPosition)))
                    }  
                }
            }
        }
         console.log("Moves Bishop", movesBishop)
    }
    
    if(part === "queen") {
         let movesQueen = []

        for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)
            if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {
               
                //Movimientos de la reina, combinando alfil y torre
                for (let j = 0; j < 8; j++) {
                    newPosition = [actualPosition[0] + j, actualPosition[1] + j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesQueen.push((changeCords(newPosition)))
                    }  
                }

                for (let j = 1; j < 8; j++) {
                    newPosition = [actualPosition[0] - j, actualPosition[1] + j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesQueen.push((changeCords(newPosition)))
                    }  
                }

                for (let j = 1; j < 8; j++) {
                    newPosition = [actualPosition[0] + j, actualPosition[1] - j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesQueen.push((changeCords(newPosition)))
                    }  
                }

                for (let j = 1; j < 8; j++) {
                    newPosition = [actualPosition[0] - j, actualPosition[1] - j]
                    if(isOccupied(changeCords(newPosition))){
                        break
                    } else if(insideBoard(newPosition)){
                        movesQueen.push((changeCords(newPosition)))
                    }  
                }

                     //POSICIONES VERTICALES
                    for (let j = actualPosition[1] + 1; j < 8; j++) {
                        newPosition = [actualPosition[0], j]

                        if(insideBoard(newPosition) && isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesQueen.push((changeCords(newPosition)))
                        }
                        
                    }

                    //VERTICAL ABAJO
                    for (let j = actualPosition[1] - 1; j >= 0; j--) {
                        newPosition = [actualPosition[0], j]

                        if(isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesQueen.push((changeCords(newPosition)))
                        }
                        
                    }

                    //POSICIONES HORIZONTALES DERECHA
                    for (let j = actualPosition[0] + 1; j < 8; j++) {
                        newPosition = [j, actualPosition[1]]

                        if(isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesQueen.push((changeCords(newPosition)))
                        }
                        
                    }

                    ///POSICIONES HORIZONTALES IZQUIERDA
                    for (let j = actualPosition[0] - 1; j >= 0; j--) {
                        newPosition = [j, actualPosition[1]]

                        if(isOccupied(changeCords(newPosition))){
                            break
                        } else {
                            movesQueen.push((changeCords(newPosition)))
                        }                  
              }
            }
        }  
        
        console.log("Moves Queen", movesQueen)
    }

    //King
    if(part === "king") {
        let movesKing = []

        for (let i = 0; i < Board.length; i++) {
            actualPosition = cords(Board[i].position)
            position = cords(positionR)
            if(position[0] == actualPosition[0] && position[1] == actualPosition[1]) {

                    //Movimientos
                    let position1 = [position[0] - 1, position[1]]
                    let position2 = [position[0] + 1, position[1]]
                    let position3 = [position[0], position[1] + 1]
                    let position4 = [position[0] - 1, position[1] + 1]
                    let position5 = [position[0] - 1, position[1] - 1]
                    let position6 = [position[0] + 1, position[1] - 1]
                    let position7 = [position[0] + 1, position[1] + 1]
                    let position8 = [position[0], position[1] - 1]

                    //Validacion si los lugares no estan ocupados
                    if (insideBoard(position1) && !isOccupied(changeCords(position1))) {
                        movesKing.push(changeCords(position1))
                    } 
                     if (insideBoard(position2) && !isOccupied(changeCords(position2))) {
                        movesKing.push(changeCords(position2))
                    }
                     if (insideBoard(position3) && !isOccupied(changeCords(position3))) {
                        movesKing.push(changeCords(position3))
                    }
                    if (insideBoard(position4) && !isOccupied(changeCords(position4))) {
                        movesKing.push(changeCords(position4))
                    }
                    if (insideBoard(position5) && !isOccupied(changeCords(position5))) {
                        movesKing.push(changeCords(position5))
                    }
                     if (insideBoard(position6) && !isOccupied(changeCords(position6))) {
                        movesKing.push(changeCords(position6))
                    }
                     if (insideBoard(position7) && !isOccupied(changeCords(position7))) {
                        movesKing.push(changeCords(position7))
                    }
                     if (insideBoard(position8) && !isOccupied(changeCords(position8))) {
                        movesKing.push(changeCords(position8))
                    }
            }
        }
        console.log("Moves King", movesKing)
    }
    return ""
}

console.log(move("pawn", "white", ["A", 2]))
console.log(move("pawn", "white", ["A", 3]))
console.log(move("pawn", "white", ["B", 2]))
console.log(move("rook", "white", ["A", 1]))
console.log(move("knight", "black", ["B", 8]))
console.log(move("bishop", "white", ["C", 1]))
console.log(move("pawn", "white", ["D", 2]))
console.log(move("pawn", "white", ["C", 2]))
console.log(move("queen", "white", ["D", 1]))
console.log(move("king", "white", ["E", 1]))

