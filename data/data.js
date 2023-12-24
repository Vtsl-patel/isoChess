function square(color, id, piece){
    return {color, id, piece};
}

function squareRow(rowId){
    const squareRow = [];
    const columnId = ["a", "b", "c", "d", "e", "f", "g", "h"];

    if(rowId%2 == 0){
        columnId.forEach((element,index) => {
            if((index+1)%2){
                squareRow.push(square("white",element + rowId, null));
            }
            else{
                squareRow.push(square("black",element + rowId, null));
            }
        });
    }
    else {
        columnId.forEach((element,index) => {
            if((index+1)%2){
                squareRow.push(square("black",element + rowId, null));
            }
            else{
                squareRow.push(square("white",element + rowId, null));
            }
        });
    }

    return squareRow;
}

function initGame(){
    return [squareRow(8), squareRow(7), squareRow(6), squareRow(5), squareRow(4), squareRow(3), squareRow(2), squareRow(1)];
}

export { initGame };