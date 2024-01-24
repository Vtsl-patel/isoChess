import { globalState } from "../index.js";
import { keySquareMapper } from "../index.js";

// function to check if piece exists of opponent
function checkPieceOfOpponentOnElement(id, color) {
  const opponentColor = color === "white" ? "BLACK" : "WHITE";

  const element = keySquareMapper[id];

  if (!element) return false;

  if (element.piece && element.piece.piece_name.includes(opponentColor)) {
    const el = document.getElementById(id);
    el.classList.add("captureColor");
    element.captureHighlight = true;
    return true;
  }

  return false;
}

// function to check weather piece exists or not by square-id
function checkWeatherPieceExistsOrNot(squareId) {
  const square = keySquareMapper[squareId];

  if (square.piece) {
    return square;
  } else {
    return false;
  }
}

// function to check capture id square
function checkSquareCaptureId(array) {
  let returnArray = [];

  for (let index = 0; index < array.length; index++) {
    const squareId = array[index];
    const square = keySquareMapper[squareId];

    if (square.piece) {
      break;
    }
    returnArray.push(squareId);
  }

  return returnArray;
}

// function to give highlight ids for bishop
function giveBishopHighlightIds(id) {
  let finalReturnArray = [];

  // will give top left id
  function topLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom left ids
  function bottomLeft(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find top right ids
  function topRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 8) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom right ids
  function bottomRight(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h" && num != 1) {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  return {
    topLeft: topLeft(id),
    bottomLeft: bottomLeft(id),
    topRight: topRight(id),
    bottomRight: bottomRight(id),
  };
}

function giveBishopCaptureIds(id, color){

  if(!id){
    return [];
  }

  let hightlightSquareIds = giveBishopHighlightIds(id);

  let temp = [];
  const { bottomLeft, topLeft, bottomRight, topRight } = hightlightSquareIds;
  let returnArr = [];

  // insert into temp
  temp.push(bottomLeft);
  temp.push(topLeft);
  temp.push(bottomRight);
  temp.push(topRight);
  
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWeatherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes(color)
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElementNoDom(element, color)) {
        returnArr.push(element)
        break;
      }
    }
  }

 
  return returnArr;

}

// function to give highlight ids for rook
function giveRookHighlightIds(id) {
  let finalReturnArray = [];

  // will give top left id
  function top(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 8) {
      num = num + 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom left ids
  function bottom(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (num != 1) {
      num = num - 1;
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find top right ids
  function right(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "h") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) + 1);
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  // find bottom right ids
  function left(id) {
    let alpha = id[0];
    let num = Number(id[1]);
    let resultArray = [];

    while (alpha != "a") {
      alpha = String.fromCharCode(alpha.charCodeAt(0) - 1);
      resultArray.push(`${alpha}${num}`);
    }

    return resultArray;
  }

  return {
    top: top(id),
    bottom: bottom(id),
    right: right(id),
    left: left(id),
  };
}

function giveRookCapturesIds(id,color){

  if(!id)
  {
    return [];
  }

  let hightlightSquareIds = giveRookHighlightIds(id);

  let temp = [];
  const { bottom, top, right, left } = hightlightSquareIds;
  let returnArr = [];

  // insert into temp
  temp.push(bottom);
  temp.push(top);
  temp.push(right);
  temp.push(left);
  
  for (let index = 0; index < temp.length; index++) {
    const arr = temp[index];

    for (let j = 0; j < arr.length; j++) {
      const element = arr[j];

      let checkPieceResult = checkWeatherPieceExistsOrNot(element);
      if (
        checkPieceResult &&
        checkPieceResult.piece &&
        checkPieceResult.piece.piece_name.toLowerCase().includes(color)
      ) {
        break;
      }

      if (checkPieceOfOpponentOnElementNoDom(element, color)) {
        returnArr.push(element)
        break;
      }
    }
  }

  return returnArr;

}

// function to give highlight ids for knight
function giveKnightHighlightIds(id) {
  let resultArray = [];
  if(!id){
    return resultArray;
  }

  let alpha = id[0];
  let num = Number(id[1]);

  //top
  if(num <= 6){
    if (alpha != "h") {
      let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
      resultArray.push(`${alpha2}${num+2}`);
    }
    if (alpha != "a") {
      let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
      resultArray.push(`${alpha2}${num+2}`);
    }
  }

  //bottom
  if(num > 2){
    if (alpha != "h") {
      let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 1);
      resultArray.push(`${alpha2}${num-2}`);
    }
    if (alpha != "a") {
      let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 1);
      resultArray.push(`${alpha2}${num-2}`);
    }
  }

  //left
  if(alpha != "a" && alpha != "b"){
    let alpha2 = String.fromCharCode(alpha.charCodeAt(0) - 2);
    if (num < 8){
      resultArray.push(`${alpha2}${num+1}`);
    }
    if(num > 1){
      resultArray.push(`${alpha2}${num-1}`);
    }
  }

  //right
  if(alpha != "g" && alpha != "h"){
    let alpha2 = String.fromCharCode(alpha.charCodeAt(0) + 2);
    if (num < 8){
      resultArray.push(`${alpha2}${num+1}`);
    }
    if(num > 1){
      resultArray.push(`${alpha2}${num-1}`);
    }
  }

  return resultArray;
}

function giveKnightCaptureIds(id, color) {

  if (!id) {
    return [];
  }

  let returnArr  = giveKnightHighlightIds(id);

  returnArr = returnArr.filter(element => {
    if(checkPieceOfOpponentOnElementNoDom(element, color)){
      return true;
    }
  });

  return returnArr;
}

// function to give highlight ids for queen
function giveQueenHighlightIds(id){
  const rookMoves = giveRookHighlightIds(id)
  const bishopMoves = giveBishopHighlightIds(id);
  return {
    "left": rookMoves.left,
    "right" :rookMoves.right,
    "top" : rookMoves.top,
    "bottom" : rookMoves.bottom,
    "topLeft": bishopMoves.topLeft,
    "topRight": bishopMoves.topRight,
    "bottomLeft" : bishopMoves.bottomLeft,
    "bottomRight" : bishopMoves.bottomRight
  }
}

function giveQueenCapturesIds(id,color){

  if(!id) return [];

  let returnArr = [];
  returnArr.push(giveBishopCaptureIds(id, color))
  returnArr.push(giveRookCapturesIds(id, color))
  return returnArr.flat();
}

// function to give highlight ids for king
function giveKingHighlightIds(id){
  const rookMoves = giveRookHighlightIds(id)
  const bishopMoves = giveBishopHighlightIds(id);
  const returnResult =  {
    "left": rookMoves.left,
    "right" :rookMoves.right,
    "top" : rookMoves.top,
    "bottom" : rookMoves.bottom,
    "topLeft": bishopMoves.topLeft,
    "topRight": bishopMoves.topRight,
    "bottomLeft" : bishopMoves.bottomLeft,
    "bottomRight" : bishopMoves.bottomRight
  }

  for (const key in returnResult) {
    if (Object.hasOwnProperty.call(returnResult, key)) {
      const element = returnResult[key];

      if(element.length != 0){
        returnResult[key] = new Array(element[0]);
      }
      
    }
  }

  return returnResult;
}

function giveKingCaptureIds(id, color){

  if(!id) {
    return [];
  }

  let result = giveKingHighlightIds(id);
  result = Object.values(result).flat();
  result = result.filter(element => {
    if(checkPieceOfOpponentOnElementNoDom(element, color)){
      return true;
    }
  })

  return result;
}

export {
  checkPieceOfOpponentOnElement,
  checkSquareCaptureId,
  checkWeatherPieceExistsOrNot,
  giveBishopHighlightIds,
  giveBishopCaptureIds,
  giveRookHighlightIds,
  giveRookCapturesIds,
  giveKnightHighlightIds,
  giveKnightCaptureIds,
  giveQueenHighlightIds,
  giveQueenCapturesIds,
  giveKingHighlightIds,
  giveKingCaptureIds
};