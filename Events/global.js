import { root_div } from "../Helper/constants.js";
import { globalState } from "../index.js";
import { clearHighlight } from "../Render/main.js";
import { selfHighlight } from "../Render/main.js";
import { clearSelfHighlight } from "../Render/main.js";

let highlight_state = false;

let selfHighlight_state = null;

function whitePawnClick({ piece }) {
    clearSelfHighlight(selfHighlight_state);
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
        }
    });
}

export { globalEvent };