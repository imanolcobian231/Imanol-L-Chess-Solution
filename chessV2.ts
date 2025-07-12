interface Piece {
    part: pieceType;
    color: color;
}

type boardType = {
    [letter: string]: {
        [number: number]: Piece | null;
    }     
};

interface enemyBoard {
    piece: Piece;
    position: position;
}

type pieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
type color = "white" | "black";
type letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type position = [letter, rank];

let Board: boardType = {};
let letters = ["A","B","C","D","E","F","G","H"];
let thereIsEnemy = ""

for (let i = 0; i < letters.length; i++) {
    let lett: string = letters[i];
    Board[lett] = {}
    for (let num = 1; num <= 8; num++) {
        Board[lett][num] = null;
    }
    
}

// WHITE PAWNS
for (let i = 0; i < 8; i++) {
  Board[letters[i]][2] = { part: "pawn", color: "white" };
}

// BLACK PAWNS
for (let i = 0; i < 8; i++) {
  Board[letters[i]][7] = { part: "pawn", color: "black" };
}

// ROOKS
Board["A"][1] = { part: "rook", color: "white" };
Board["H"][1] = { part: "rook", color: "white" };
Board["A"][8] = { part: "rook", color: "black" };
Board["H"][8] = { part: "rook", color: "black" };

// KNIGHTS
Board["B"][1] = { part: "knight", color: "white" };
Board["G"][1] = { part: "knight", color: "white" };
Board["B"][8] = { part: "knight", color: "black" };
Board["G"][8] = { part: "knight", color: "black" };

//BISHOPS
Board["D"][8] = { part: "bishop", color: "black" };
Board["F"][8] = { part: "bishop", color: "black" };
Board["D"][1] = { part: "bishop", color: "white" };
Board["F"][1] = { part: "bishop", color: "white" };

// QUEENS
Board["D"][1] = { part: "queen", color: "white" };
Board["D"][8] = { part: "queen", color: "black" };

// KINGS
Board["E"][1] = { part: "king", color: "white" };
Board["E"][8] = { part: "king", color: "black" };


function isOccupied(position: position): boolean {
    return Board[position[0]][position[1]] != null;
}

function insideBoard(x: number, y: number): boolean {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}


function cords(lett: letter, num: rank): [number, number] {
    return [letters.indexOf(lett), num - 1];
}

function changeCords(lett: number, num: number): position {
    return [letters[lett] as letter, (num + 1) as rank];
}


function movePart(position: position, newPosition: position): void {
    Board[newPosition[0]][newPosition[1]] = Board[position[0]][position[1]];
    Board[position[0]][position[1]] = null;
}

function pawnsEat(position: position): Array<enemyBoard> {
    let actualPosition = cords(position[0], position[1]);
    let isWhite = false;
    let isBlack = false;
    let enemy = []

    if(Board[position[0]][position[1]]?.color === "white"){
        isWhite = true;
    } else {
        isBlack = true;
    }

    //Pawns eat for white pawns
    if(insideBoard(actualPosition[0]-1, actualPosition[1] + 1)) {
        let enemyPosition = changeCords(actualPosition[0] - 1, actualPosition[1] + 1);
        let pieceBL = Board[enemyPosition[0]][enemyPosition[1]] as Piece;
        if (pieceBL != null && pieceBL.color === "black" && isWhite) {
            enemy.push({position: enemyPosition, piece: pieceBL });
            thereIsEnemy = "FICHAS DISPONIBLES PARA COMER";
        }
    }

    if(insideBoard(actualPosition[0]+1, actualPosition[1]+1)) {
        let enemyPosition = changeCords(actualPosition[0] + 1, actualPosition[1] + 1);
        let pieceBR = Board[enemyPosition[0]][enemyPosition[1]] as Piece;
        if (pieceBR != null && pieceBR.color === "black" && isWhite) {
            enemy.push({position: enemyPosition, piece: pieceBR });
            thereIsEnemy = "FICHAS DISPONIBLES PARA COMER";
        }
    }    

    //Pawns eat for black pawns
    if(insideBoard(actualPosition[0]-1, actualPosition[1]-1)) {
        let enemyPosition = changeCords(actualPosition[0] - 1, actualPosition[1] - 1);
        let pieceWL = Board[enemyPosition[0]][enemyPosition[1]] as Piece;
        if(pieceWL != null && pieceWL.color === "white" && isBlack){
            thereIsEnemy = "FICHAS DISPONIBLES PARA COMER";
            enemy.push({position: enemyPosition, piece: pieceWL });
        }
    }

    if(insideBoard(actualPosition[0] + 1, actualPosition[1]-1)){
        let enemyPosition = changeCords(actualPosition[0] + 1, actualPosition[1] - 1);
        let pieceWR = Board[enemyPosition[0]][enemyPosition[1]] as Piece;
        if(pieceWR != null && pieceWR.color === "white" && isBlack){
            thereIsEnemy = "FICHAS DISPONIBLES PARA COMER";
            enemy.push({position: enemyPosition, piece: pieceWR });
        }

    }
    return enemy;
}

function enemyDetector(position: position, actualPosition: position):Array<enemyBoard> {
    let newPosition = cords(position[0], position[1]);
    let enemyPosition = changeCords(newPosition[0], newPosition[1]);
    let enemy = Board[enemyPosition[0]][enemyPosition[1]]as Piece;
    let isWhite;
    let isBlack;
    let blackEnemyPositions = []
    let whiteEnemyPositions = []

    if(Board[actualPosition[0]][actualPosition[1]]?.color === "white"){
        isWhite = true;
    } else {
        isBlack = true;
    }

    if(enemy != null && enemy.color === "black" && isWhite ) {
        thereIsEnemy = "FICHAS DISPONIBLES PARA COMER";
        blackEnemyPositions.push({position: enemyPosition, piece: enemy });
    } else if (enemy != null && enemy.color === "white" && isBlack ) {
        thereIsEnemy = "FICHAS DISPONIBLES PARA COMER";
        whiteEnemyPositions.push({position: enemyPosition, piece: enemy });
    }
    
    if(isWhite) {
        return blackEnemyPositions;
    } else {
        return whiteEnemyPositions;
    } 
}

function pawnsMoves(position: position): string {
    thereIsEnemy = "";
    let actualPosition: [number, number];
    let newPosition: [number, number];
    let especialPosition: [number, number];
    let pawnsPosibleMoves: Array<position> = [];

    if (Board[position[0]][position[1]]) {
        actualPosition = cords(position[0], position[1]);
        let piece = Board[position[0]][position[1]] as Piece;


        if (piece.color == "black") {
            newPosition = [actualPosition[0], actualPosition[1] - 1];
            if (position[1] == 7) {
                especialPosition = [actualPosition[0], actualPosition[1] - 2];
                pawnsPosibleMoves.push(changeCords(especialPosition[0], especialPosition[1]));
                
            }
        } else {
        newPosition = [actualPosition[0], actualPosition[1] + 1];
        }
        if (!isOccupied(changeCords(newPosition[0], newPosition[1]))) {
            pawnsPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
        } 

        if (position[1] == 2){
            especialPosition = [actualPosition[0], actualPosition[1] + 2];
            pawnsPosibleMoves.push(changeCords(especialPosition[0], especialPosition[1]));
        }
    
    let enemyPositions = pawnsEat(position);
    let pawnPossibilities = [...pawnsPosibleMoves,thereIsEnemy,...enemyPositions];
    console.log("MOVIMIENTOS DISPONIBLES", pawnPossibilities);
    }
    return "";
}

function rookMoves(position: position) {
    let actualPosition;
    let newPosition;
    let rookEnemies = []
    let rookPosibleMoves = [];

    if(Board[position[0]][position[1]]) {
        actualPosition = cords(position[0], position[1]);

        //Movimiento vertical arriba
        for (let i = actualPosition[1] + 1; i < 8; i++) {
            newPosition = [actualPosition[0], i];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                rookEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]),changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]),changeCords(actualPosition[0], actualPosition[1]));
            }
        }

        //Movimiento vertical abajo
        for (let i = actualPosition[1] - 1;i >= 0; i--) {
            newPosition = [actualPosition[0], i];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                rookEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]),changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        //Movimiento horizontal derecha
        for (let i = actualPosition[0] + 1;i < 8; i++) {
            newPosition = [i, actualPosition[1]];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                rookEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]),changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        //Movimiento horizontal izquierda
        for (let i = actualPosition[0] - 1;i >= 0; i--) {
            newPosition = [i, actualPosition[1]];
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                rookEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]),changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                rookPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }
    }
   

    let rookPossibilities = []
    rookPossibilities = [...rookPosibleMoves, thereIsEnemy, ...rookEnemies];
    console.dir(rookPossibilities, {depth: null});
    return ""
}

function knightMoves(position: position) {
    let actualPosition;
    let knightPosibleMoves = []
    let knightEnemies = []
    let knightPossibilities = []
    if(Board[position[0]][position[1]]) {

        actualPosition = cords(position[0], position[1]);
        let position1 = [actualPosition[0] + 2, actualPosition[1] + 1];
        let position2 = [actualPosition[0] + 1, actualPosition[1] + 2];
        let position3 = [actualPosition[0] - 1, actualPosition[1] + 2];
        let position4 = [actualPosition[0] - 2, actualPosition[1] + 1];
        let position5 = [actualPosition[0] - 2, actualPosition[1] - 1];
        let position6 = [actualPosition[0] - 1, actualPosition[1] - 2];
        let position7 = [actualPosition[0] + 1, actualPosition[1] - 2];
        let position8 = [actualPosition[0] + 2, actualPosition[1] - 1];

        if (insideBoard(position1[0], position1[1]) && !isOccupied(changeCords(position1[0], position1[1]))) {
            knightPosibleMoves.push(changeCords(position1[0], position1[1]));
        } else if (isOccupied(changeCords(position1[0], position1[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position1[0], position1[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position2[0], position2[1]) && !isOccupied(changeCords(position2[0], position2[1]))) {
            knightPosibleMoves.push(changeCords(position2[0], position2[1]));
        } else if (isOccupied(changeCords(position2[0], position2[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position2[0], position2[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position3[0], position3[1]) && !isOccupied(changeCords(position3[0], position3[1]))) {
            knightPosibleMoves.push(changeCords(position3[0], position3[1]));
        } else if (isOccupied(changeCords(position3[0], position3[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position3[0], position3[1]),changeCords(actualPosition[0], actualPosition[1])));
        }    
        if (insideBoard(position4[0], position4[1]) && !isOccupied(changeCords(position4[0], position4[1]))) {
            knightPosibleMoves.push(changeCords(position4[0], position4[1]));
        } else if (isOccupied(changeCords(position4[0], position4[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position4[0], position4[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position5[0], position5[1]) && !isOccupied(changeCords(position5[0], position5[1]))) {
            knightPosibleMoves.push(changeCords(position5[0], position5[1]));
        } else if (isOccupied(changeCords(position5[0], position5[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position5[0], position5[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position6[0], position6[1]) && !isOccupied(changeCords(position6[0], position6[1]))) {
            knightPosibleMoves.push(changeCords(position6[0], position6[1]));
        } else if (isOccupied(changeCords(position6[0], position6[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position6[0], position6[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position7[0], position7[1]) && !isOccupied(changeCords(position7[0], position7[1]))) {
            knightPosibleMoves.push(changeCords(position7[0], position7[1]));
        } else if (isOccupied(changeCords(position7[0], position7[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position7[0], position7[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position8[0], position8[1]) && !isOccupied(changeCords(position8[0], position8[1]))) {
            knightPosibleMoves.push(changeCords(position8[0], position8[1]));
        } else if (isOccupied(changeCords(position8[0], position8[1]))) {
            knightEnemies.push(enemyDetector(changeCords(position8[0], position8[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
    }
    knightPossibilities = [...knightPosibleMoves, thereIsEnemy, ...knightEnemies];
    console.dir(knightPossibilities, {depth: null});
    return "";
}

function bishopMoves(position: position) {
    let actualPosition;
    let newPosition;
    let bishopPosibleMoves = [];
    let bishopEnemies = []

    if(Board[position[0]][position[1]]) {
        actualPosition = cords(position[0], position[1]);
        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] + i, actualPosition[1] + i];
            if (!insideBoard(newPosition[0], newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                bishopEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]), changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] - i, actualPosition[1] + i];
            if (!insideBoard(newPosition[0], newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                bishopEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]), changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] + i, actualPosition[1] - i];
            if (!insideBoard(newPosition[0],newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                bishopEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]), changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }

        for (let i = 1; i < 8; i++) {
            newPosition = [actualPosition[0] - i, actualPosition[1] - i];
            if (!insideBoard(newPosition[0], newPosition[1])) break;
            if (isOccupied(changeCords(newPosition[0], newPosition[1]))) {
                bishopEnemies.push(enemyDetector(changeCords(newPosition[0], newPosition[1]), changeCords(actualPosition[0], actualPosition[1])));
                break;
            } else {
                bishopPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            }
        }
    }

    let bishopPossibilities = []
    bishopPossibilities = [...bishopPosibleMoves, thereIsEnemy, ...bishopEnemies];
    console.dir(bishopPossibilities, {depth: null});
    return ""
}

function kingMoves(position: position) {
    let actualPosition;
    let kingPosibleMoves = [];
    let kingEnemies = []
    let kingPossibilities = []

    if(Board[position[0]][position[1]]) {

        actualPosition = cords(position[0], position[1]);
        let position1 = [actualPosition[0] - 1, actualPosition[1]];
        let position2 = [actualPosition[0] + 1, actualPosition[1]];
        let position3 = [actualPosition[0], actualPosition[1] + 1];
        let position4 = [actualPosition[0] - 1, actualPosition[1] + 1];
        let position5 = [actualPosition[0] - 1, actualPosition[1] - 1];
        let position6 = [actualPosition[0] + 1, actualPosition[1] - 1];
        let position7 = [actualPosition[0] + 1, actualPosition[1] + 1];
        let position8 = [actualPosition[0], actualPosition[1] - 1];

        if (insideBoard(position1[0], position1[1]) && !isOccupied(changeCords(position1[0], position1[1]))) {
            kingPosibleMoves.push(changeCords(position1[0], position1[1]));
        } else if (isOccupied(changeCords(position1[0], position1[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position1[0], position1[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position2[0], position2[1]) && !isOccupied(changeCords(position2[0], position2[1]))) {
            kingPosibleMoves.push(changeCords(position2[0], position2[1]));
        } else if (isOccupied(changeCords(position2[0], position2[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position2[0], position2[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position3[0], position3[1]) && !isOccupied(changeCords(position3[0], position3[1]))) {
            kingPosibleMoves.push(changeCords(position3[0], position3[1]));
        } else if (isOccupied(changeCords(position3[0], position3[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position3[0], position3[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position4[0], position4[1]) && !isOccupied(changeCords(position4[0], position4[1]))) {
            kingPosibleMoves.push(changeCords(position4[0], position4[1]));
        } else if (isOccupied(changeCords(position4[0], position4[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position4[0], position4[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position5[0], position5[1]) && !isOccupied(changeCords(position5[0], position5[1]))) {
            kingPosibleMoves.push(changeCords(position5[0], position5[1]));
        } else if (isOccupied(changeCords(position5[0], position5[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position5[0], position5[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position6[0], position6[1]) && !isOccupied(changeCords(position6[0], position6[1]))) {
            kingPosibleMoves.push(changeCords(position6[0], position6[1]));
        } else if (isOccupied(changeCords(position6[0], position6[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position6[0], position6[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position7[0], position7[1]) && !isOccupied(changeCords(position7[0], position7[1]))) {
            kingPosibleMoves.push(changeCords(position7[0], position7[1]));
        } else if (isOccupied(changeCords(position7[0], position7[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position7[0], position7[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
        if (insideBoard(position8[0], position8[1]) && !isOccupied(changeCords(position8[0], position8[1]))) {
            kingPosibleMoves.push(changeCords(position8[0], position8[1]));
        } else if (isOccupied(changeCords(position8[0], position8[1]))) {
            kingEnemies.push(enemyDetector(changeCords(position8[0], position8[1]),changeCords(actualPosition[0], actualPosition[1])));
        }
    }

    kingPossibilities = [...kingPosibleMoves, thereIsEnemy,...kingEnemies];
    console.dir(kingPossibilities, {depth: null});
    return "";
}

function move(part: pieceType, position: position, color: color): string {
    if(part === "pawn") {
        console.log(pawnsMoves(position));
    }

    if(part === "rook") {
        console.log(rookMoves(position));
    }

    if(part === "knight") {
        console.log(knightMoves(position));
    }

    if(part === "bishop") {
        console.log(bishopMoves(position));
    }

    if(part === "queen") {
        let queenPosibleMoves = []
        queenPosibleMoves.push(rookMoves(position));
        queenPosibleMoves.push(bishopMoves(position));
        console.log(queenPosibleMoves);
    }

    if(part === "king") {
        console.log(kingMoves(position));
    }
return ""
}

console.log(move("king", ["E", 6], "white"));
console.log(move("bishop", ["C", 4], "white"));
