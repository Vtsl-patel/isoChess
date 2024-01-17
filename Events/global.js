import { root_div } from "../Helper/constants.js";
import { globalState } from "../index.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { clearSelfHighlight } from "../Render/main.js";
import { moveElement } from "../Render/main.js";
import { checkPieceofOpponentOnElement } from "../Helper/commonHelper.js";

let highlight_state = false;

let selfHighlight_state = null;

let movestate = null;

function whitePawnClick({ piece }) {
    clearSelfHighlight(selfHighlight_state);
    if(piece == selfHighlight_state){
        clearSelfHighlight(selfHighlight_state);
        selfHighlight_state = null;
        clearHighlight();
        return;
    }

    movestate = piece;

    selfHighlight(piece);
    selfHighlight_state = piece;

    const currentPos = piece.current_position;
    //Initial position of pawn
    if(currentPos[1] == '2'){
        const highlightSquareIds = [
            `${currentPos[0]}${Number(currentPos[1]) + 1}`,
            `${currentPos[0]}${Number(currentPos[1]) + 2}`
        ];
        
        //clear board for any previous highlight
        clearHighlight();
        highlightSquareIds.forEach(highlight => {
            globalState.forEach(row => {
                row.forEach(element => {
                    if(element.id == highlight){
                        element.highlight(true);
                    }
                });
            });
        });
    }
    else{
        const col1 = `${String.fromCharCode(currentPos[0].charCodeAt(0) - 1)}${Number(currentPos[1]) + 1}`;
        const col2 = `${String.fromCharCode(currentPos[0].charCodeAt(0) + 1)}${Number(currentPos[1]) + 1}`;

        const captureIDs = [col1, col2];

        const highlightSquareIds = [
            `${currentPos[0]}${Number(currentPos[1]) + 1}`
        ];

        //clear board for any previous highlight
        clearHighlight();

        captureIDs.forEach(element => {
            checkPieceofOpponentOnElement(element, "white")
        });
        
        highlightSquareIds.forEach(highlight => {
            globalState.forEach(row => {
                row.forEach(element => {
                    if(element.id == highlight){
                        element.highlight(true);
                    }
                });
            });
        });
    }
}

function blackPawnClick({ piece }) {
    clearSelfHighlight(selfHighlight_state);
    if(piece == selfHighlight_state){
        clearSelfHighlight(selfHighlight_state);
        selfHighlight_state = null;
        clearHighlight();
        return;
    }

    movestate = piece;

    selfHighlight(piece);
    selfHighlight_state = piece;

    const currentPos = piece.current_position;
    //Initial position of pawn
    if(currentPos[1] == '7'){
        const highlightSquareIds = [
            `${currentPos[0]}${Number(currentPos[1]) - 1}`,
            `${currentPos[0]}${Number(currentPos[1]) - 2}`
        ];
        
        //clear board for any previous highlight
        clearHighlight();
        highlightSquareIds.forEach(highlight => {
            globalState.forEach(row => {
                row.forEach(element => {
                    if(element.id == highlight){
                        element.highlight(true);
                    }
                });
            });
        });
    }
    else{
        const col1 = `${String.fromCharCode(currentPos[0].charCodeAt(0) - 1)}${Number(currentPos[1]) - 1}`;
        const col2 = `${String.fromCharCode(currentPos[0].charCodeAt(0) + 1)}${Number(currentPos[1]) - 1}`;

        const captureIDs = [col1, col2];
        
        const highlightSquareIds = [
            `${currentPos[0]}${Number(currentPos[1]) - 1}`
        ];
        
        //clear board for any previous highlight
        clearHighlight();

        captureIDs.forEach(element => {
            checkPieceofOpponentOnElement(element, "black")
        });

        highlightSquareIds.forEach(highlight => {
            globalState.forEach(row => {
                row.forEach(element => {
                    if(element.id == highlight){
                        element.highlight(true);
                    }
                });
            });
        });
    }
}

function globalEvent() {
    root_div.addEventListener("click", function (event) {
        if(event.target.localName === "img"){
            const clickId = event.target.parentNode.id;
            const flatArray = globalState.flat();
            const square = flatArray.find(el => (el.id == clickId));

            if(square.piece.piece_name == "WHITE_PAWN"){
                whitePawnClick(square);
            }
            if(square.piece.piece_name == "BLACK_PAWN"){
                blackPawnClick(square);
            }
        }
        else {
            const childElementofClickedEl = Array.from(event.target.childNodes);
            if(childElementofClickedEl.length == 1 || event.target.localName == "span"){
                if(event.target.localName == "span"){
                    const id = event.target.parentNode.id;
                    moveElement(movestate,id);
                    movestate = null;
                }
                else{
                    const id = event.target.id;
                    moveElement(movestate,id);
                    movestate = null;
                }
                clearHighlight();
                clearSelfHighlight(selfHighlight_state);
                selfHighlight_state = null;
            }
            else{
                clearHighlight();
                clearSelfHighlight(selfHighlight_state);
                selfHighlight_state = null;
            }
        }
    });
}

export { globalEvent };