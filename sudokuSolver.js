const initialize = board => {
    n = checkBoardSizeValid(board.length) 
    n !== 0 ? solveSudoku(board, n) : console.log('Invalid board') 
}

const checkBoardSizeValid = base => {
    const num = Math.sqrt(base)
    return num % 1 === 0 ? num : 0
}

const solveSudoku = (board, n) => {
    const rows = getRows(board, n)
    const cols = getCols(board, n)
    const groups = getGroups(board, n)
    const gridFlags = getGridFlags(board)
    const currentBoard = board
    let colIndex = 0
    let rowIndex = 0
    let groupIndex = 0
    let groupWidth = Math.sqrt(n)
    let cellPos = [0,0]
    let boardWidth = n-1
    let colPos = 0

    console.dir(rows)
    console.dir(cols)
    console.dir(groups)
    console.dir(gridFlags)
    getCellGroup(5,2,3)
    debugger
    for(let j = 0; j < board.length - 1; j++) {
        //update cell coordinates and column position.
        //If column position is greater than the board with
        //increase the y coordinate position and reset the 
        //x coordinate position and reset the colPos
        //Else, increase the colPos and the x coordinate of the
        (colPos > boardWidth) ? () => { colPos = 0; cellPos[1] += 1; cellPos[0] = 0 } : () => {colPos += 1; cellPos[0] +=1 }
        let groupIndex = getCellGroup(cellPos[0], cellPos[1], groupWidth)
        let validDigits = getValidDigits(cellPos[0], cellPos[1], )
        
    }
    //identify any non-zero cell as a given value and flag as unchangeable
    //start at group cell 0
    //get valid digits for r0 c0 g0
    //move to cell 1
    //get valid digits for r0 c1 g0
    //move to cell 2
    //get valid digits for r0 c2 g0
    //move to cell 3
}

const getCellGroup = (x, y, width) => {
    //x coord is Math.floor(x/width % width)
    //y coord is Math.floor(y/width % width)
    //group coord
    let xCoord = Math.floor(x/width % width)
    let yCoord = Math.floor(y/width % width)
    let groupCoords = [xCoord, yCoord]

    const groupCoordMap = {
        0: [0,0],
        1: [1,0],
        2: [2,0],
        3: [0,1],
        4: [1,1],
        5: [2,1],
        6: [0,2],
        7: [1,2],
        8: [2,2]
    }

    // Having fun
    //Gets the index of the groupCoordMap which matches groupCoords
    const groupIndex = Object.keys(groupCoordMap).map((key)=>groupCoordMap[key].every((item,index)=>item===groupCoords[index])).map((member,index)=>member === true ? index : null).sort()[0]
    return groupIndex
}

const getValidDigits = (row, col, group) => {

}

const getGridFlags = board => {
    let flags = board.map(cell => cell !== 0 ? 1 : 0 )
    return flags
}

const getRows = (board, n) => {
    let subX = 0
    let subXMax = n-1
    let rows = {}

    for(subX; subX <= subXMax; subX++) {
        let currentRow = []
        for(j=0; j<n; j++) {
            let index = (n * subX) + j
            currentRow.push(board[index])
        }
        rows[subX] = currentRow
    }
    return rows
}

const getCols = (board, n) => {
    let subX = 0
    let subXMax = n-1
    let cols = {}

    for(subX; subX <= subXMax; subX++) {
        let currentCol = []
        for(j=0; j<n; j++) {
            let index = (n * j) + subX
            currentCol.push(board[index])
        }
        cols[subX] = currentCol
    }
    return cols
}

const getGroups = (board, n) => {
    let subX = 0
    let subXMax = n-1
    const h = Math.sqrt(n)
    let groups = {}

    let heightOffset = 0
    //iterate through the nine groups
    for(subX; subX <= subXMax; subX++) {
        let currentGroup = []

        //group row 1
        let rowOne = []

        //group row 2
        let rowTwo = []

        //group row 3
        let rowThree = []


        if(subX > 0 && (subX % h === 0)) {
            heightOffset += 1
        }
        //iterate through the width of each group (h)
        for(let r = 0; r < h; r++) {
            let q = (h * subX) + (heightOffset * (n*2))
            let y = q + n
            let z = q + (n * 2)

            rowOne.push(board[q+r])
            rowTwo.push(board[y+r])
            rowThree.push(board[z+r])
        }
        currentGroup = [...rowOne, ...rowTwo, ...rowThree]
        groups[subX] = currentGroup
    }
    return groups
}

const B = [ 0,0,0,0,0,0,0,0,6,
            4,5,0,6,0,0,0,0,2,
            0,0,0,0,8,3,7,0,0,
            0,0,3,0,0,0,0,0,4,
            7,0,4,0,0,0,0,5,0,
            9,0,6,0,0,8,0,3,0,
            0,6,0,0,1,7,0,0,0,
            0,0,0,0,0,9,0,0,0,
            0,0,0,5,6,0,0,0,0]

initialize(B)