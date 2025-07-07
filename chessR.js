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

function cords(position) {
    let letcol = position[0]
    let letnum = position[1]
    let col = letters.indexOf(letcol)
    let fil = letnum - 1 
    return [col, fil]
}


console.log(cords(Board[0].position))