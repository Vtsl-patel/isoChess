import * as piece from "../data/pieces.js"
import { root_div } from "../Helper/constants.js";
import { globalState } from "../index.js";

//used to render pieces on board
function pieceRender(data) {
    data.forEach(row => {
        row.forEach(square => {
            //only render if it has piece
            if(square.piece){
                const squareEl = document.getElementById(square.id);

                //create piece
                const piece = document.createElement("img");
                piece.src = square.piece.img;
                piece.classList.add("piece");
                
                //insert piece into square element
                squareEl.appendChild(piece);
            }
        });
    });
}

//used to render board when game starts (called only initially)
function initGameRender(data) {
    data.forEach((element) => {
        const rowEle = document.createElement("div");
        element.forEach((square) => {
            const squareDiv = document.createElement("div");
            squareDiv.id = square.id;
            squareDiv.classList.add(square.color, "square");

            //render blackPawn
            if(square.id[1] == 7){
                square.piece = piece.blackPawn(square.id);
            }

            //render blackRook
            if(square.id == "a8" || square.id == "h8"){
                square.piece = piece.blackRook(square.id);
            }

            //render blackKnight
            if(square.id == "b8" || square.id == "g8"){
                square.piece = piece.blackKnight(square.id);
            }

            //render blackBishop
            if(square.id == "c8" || square.id == "f8"){
                square.piece = piece.blackBishop(square.id);
            }

            //render blackQueen
            if(square.id == "d8"){
                square.piece = piece.blackQueen(square.id);
            }

            //render blackKing
            if(square.id == "e8"){
                square.piece = piece.blackKing(square.id);
            }

            //---------------------------------------------

            //render whitePawn
            if(square.id[1] == 2){
                square.piece = piece.whitePawn(square.id);
            }

            //render whiteRook
            if(square.id == "a1" || square.id == "h1"){
                square.piece = piece.whiteRook(square.id);
            }

            //render whiteKnight
            if(square.id == "b1" || square.id == "g1"){
                square.piece = piece.whiteKnight(square.id);
            }

            //render whiteBishop
            if(square.id == "c1" || square.id == "f1"){
                square.piece = piece.whiteBishop(square.id);
            }

            //render whiteQueen
            if(square.id == "d1"){
                square.piece = piece.whiteQueen(square.id);
            }

            //render whiteKing
            if(square.id == "e1"){
                square.piece = piece.whiteKing(square.id);
            }

            rowEle.appendChild(squareDiv);
        });
        rowEle.classList.add("squareRow");
        root_div.appendChild(rowEle);
    });

    pieceRender(data);
}

function renderHighlight(squareId) {
    const highlightSpan = document.createElement("span");
    highlightSpan.classList.add("highlight");
    document.getElementById(squareId).appendChild(highlightSpan);
}

function clearHighlight(){
    const flatData = globalState.flat();
    flatData.forEach(el => {
        if(el.captureHighlight){
            document.getElementById(el.id).classList.remove("captureColor");
        }
        if(el.highlighted){
            document.getElementById(el.id).innerHTML = "";
            el.highlighted = false;
        }
    });
}

function selfHighlight(piece){
    document.getElementById(piece.current_position).classList.add("highlightYellow");
}

function clearSelfHighlight(piece){
    if(piece){
        document.getElementById(piece.current_position).classList.remove("highlightYellow");
    }
}

function moveElement(piece, id){
    const flatData = globalState.flat();
    flatData.forEach(el => {
        if(el.id == piece.current_position){
            delete el.piece;
        }
        if(el.id == id){
            el.piece = piece;
        }
    });

    clearHighlight();
    const previousPiece = document.getElementById(piece.current_position);
    previousPiece.classList.remove("highlightYellow");
    const currentPiece = document.getElementById(id);

    currentPiece.innerHTML = previousPiece.innerHTML;
    previousPiece.innerHTML = "";
    piece.current_position = id; 
}

export { initGameRender , renderHighlight , clearHighlight , selfHighlight , clearSelfHighlight , moveElement };