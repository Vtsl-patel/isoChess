import { initGame } from "./Data/data.js";
import { initGameRender } from "./Render/main.js";
import { globalEvent } from "./Events/global.js";

//used till end of game, bears all the changes
const globalState = initGame();

initGameRender(globalState);
globalEvent();

export { globalState };