import { root_div } from "../Helper/constants.js";
import { globalState } from "../index.js";

function whitePawnClick() {
    console.log("White Pawn is Clicked");
}

function globalEvent() {
    root_div.addEventListener("click", function (event) {
        if(event.target.localName === "img"){
            const clickId = event.target.parentNode.id;
            const flatArray = globalState.flat();
            const square = flatArray.find(el => (el.id == clickId));

            if(square.piece.piece_name == "WHITE_PAWN"){
                whitePawnClick();
            }
        }
    });
}

export { globalEvent };