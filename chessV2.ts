interface Piece {
    part: PieceType;
    color: Color;
}

type BoardType = {
    [letter: string]: {
        [number: number]: Piece | null;
    }     
};

type PieceType = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";
type Color = "white" | "black";
type letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type position = [letter, rank];

let Board: BoardType = {};
let letters = ["A","B","C","D","E","F","G","H"];

for (let i = 0; i < letters.length; i++) {
    let lett: string = letters[i]
    Board[lett] = {}
    for (let num = 1; num <= 8; num++) {
        Board[lett][num] = null
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

//BISHOPS* Board["F"][1] = { part: "bishop", color: "white" };
Board["C"][8] = { part: "bishop", color: "black" };
Board["F"][8] = { part: "bishop", color: "black" };

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
    Board[newPosition[0]][newPosition[1]] = Board[position[0]][position[1]]
    Board[position[0]][position[1]] = null
}

function pawnsMoves(position: position): Array<position> {
    let actualPosition: [number, number];
    let newPosition: [number, number];
    let pawnsPosibleMoves: Array<position> = [];

    if (Board[position[0]][position[1]]) {
        actualPosition = cords(position[0], position[1]);
        newPosition = [actualPosition[0], actualPosition[1] + 1];
        if (!isOccupied(changeCords(newPosition[0], newPosition[1]))) {
            pawnsPosibleMoves.push(changeCords(newPosition[0], newPosition[1]));
            movePart(changeCords(actualPosition[0],actualPosition[1]), changeCords(newPosition[0], newPosition[1]));
        } 

        if (position[1] == 2){
            let especialPosition = [actualPosition[0], actualPosition[1] + 2];
            pawnsPosibleMoves.push(changeCords(especialPosition[0], especialPosition[1]));
        }
    }
    return pawnsPosibleMoves;
}