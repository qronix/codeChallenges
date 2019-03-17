const initialize = board => {
    n = checkBoardSizeValid(board.length) 
    n !== 0 ? solvePuzzle(board, n) : console.log('Invalid board')
}

const checkBoardSizeValid = base => {
    const num = Math.sqrt(base)
    return num % 1 === 0 ? num : 0
}

// const updateCellPos = (currentPos, direction, boardWidth) => {
//     let cellPos = currentPos
//     if(direction === 'forward') {
//         if(cellPos[0] >= boardWidth) {
//             cellPos[0] = 0
//             cellPos[1] += 1
//         } else {
//             cellPos[0] += 1
//         }
//     }
//     if(direction === 'backward') {
//         if(cellPos[0] > 0) {
//             cellPos[0] -= 1
//         } else {
//             cellPos[0] = boardWidth
//             cellPos[1] -= 1
//         }
//     }

//     return cellPos
// }
const isBoardSolved = (cols, rows, groups) => {
    const CHECK_DIGITS = [1,2,3,4,5,6,7,8,9]
    let solved = false

    for(let i=0; i<cols.length-1; i++) {
        solved = cols[i].includes(CHECK_DIGITS[i])
        solved = rows[i].includes(CHECK_DIGITS[i])
        solved = groups[i].includes(CHECK_DIGITS[i])
        if(!solved) {
            break
        }
    }
    return solved
}

const updateCellPos = (currentPos, direction, boardWidth) => {
    let cellPos = currentPos
    if(direction === 'forward') {
        if(cellPos[0] >= boardWidth) {
            cellPos[0] = 0
            cellPos[1] += 1
        } else {
            cellPos[0] += 1
        }
    }
    if(direction === 'backward') {
        if(cellPos[0] > 0) {
            cellPos[0] -= 1
        } else {
            cellPos[0] = boardWidth
            cellPos[1] -= 1
        }
    }

    return cellPos
}

const solvePuzzle = (board,n) => {

    // const SOLUTION = [
    //     3,7,2,9,4,5,1,8,6,
    //     4,5,8,6,7,1,3,9,2,
    //     6,9,1,2,8,3,7,4,5,
    //     5,8,3,7,9,2,6,1,4,
    //     7,2,4,1,3,6,9,5,8,
    //     9,1,6,4,5,8,2,3,7,
    //     8,6,5,3,1,7,4,2,9,
    //     1,4,7,8,2,9,5,6,3,
    //     2,3,9,5,6,4,8,7,1 ]

    let rows = getRows(board, n)
    let cols = getCols(board, n)
    let groups = getGroups(board, n)
    const gridFlags = getGridFlags(board)
    let cellPos = [0,0]
    const boardWidth = n - 1
    //start at first unoccupied cell
    //use the first valid digit from the
    //returned array
    //if nothing is returned
    //move back, find a valid value
    //if nothing is found, move back
    //find a valid value
    //if nothing is found move back
    //if we are at the start of the board
    //increase the value by 1

    do {
        let cellIndex = cellPos[0] + (cellPos[1]*n)
        if(gridFlags[cellIndex] !== 1) {
            let group = getCellGroup(cellPos[0], cellPos[1], 3)
            debugger
            let value = getCandidates(cols[cellPos[0]], rows[cellPos[1]], groups[group], n)
            while(!value) {
                while(gridFlags[cellIndex] === 1) {
                    cellPos = updateCellPos(cellPos, 'backward', boardWidth)
                    cellIndex = cellPos[0] + (cellPos[1]*n)
                }
                board[cellIndex] += 1
                rows = getRows(board, n)
                cols = getCols(board, n)
                groups = getGroups(board, n)

                if(board[cellIndex] > n) {
                    board[cellIndex] = 0
                    rows = getRows(board, n)
                    cols = getCols(board, n)
                    groups = getGroups(board, n)
                    continue
                }
                while(gridFlags[cellIndex] === 1) {
                    cellPos = updateCellPos(cellPos, 'backward', boardWidth)
                    cellIndex = cellPos[0] + (cellPos[1]*n)
                }
                value = getCandidates(cols[cellPos[0]], rows[cellPos[1]], groups[group], n)
            }
            board[cellIndex] = value[0]
            cellPos = updateCellPos(cellPos, 'forward', boardWidth)
            cellIndex = cellPos[0] + (cellPos[1]*n)
            rows = getRows(board, n)
            cols = getCols(board, n)
            groups = getGroups(board, n)
        } else {
            cellPos = updateCellPos(cellPos, 'backward', boardWidth)
            cellIndex = cellPos[0] + (cellPos[1]*n)
        }
        outputBoard(rows)

    } while(!isBoardSolved(cols,rows, groups))
}

const outputBoard = rows => {
    Object.keys(rows).forEach(row=>console.log(rows[row].join('')))
 }

const getCandidates = (col, row, group, n) => {
    const POSSIBLE_DIGITS = []
    let takenDigits = []

    for(let i=1; i<=n; i++) {
        POSSIBLE_DIGITS.push(i)
    }

    //can add a check here for duplicates
    //if duplicates exist ==> the board is invalid from the start
    // debugger
    takenDigits = checkArrayForTakenDigits(row, takenDigits)
    takenDigits = checkArrayForTakenDigits(col, takenDigits)
    takenDigits = checkArrayForTakenDigits(group, takenDigits)
    //why is this broken?
    //if no digits are available, then the previous solution is incorrect
    //so, we need to start at the beginning of the row, change the value
    //and retest the current position
    // debugger
    let cellPossibleValues = POSSIBLE_DIGITS.map(possibility=>takenDigits.includes(possibility) ? null : possibility)

    if(cellPossibleValues.every(item => item === null)) {
        console.log('No candidates')
        return null
    }
    let cellValue = null
    // debugger
    let cleanValues = cellPossibleValues.filter(item => item !== null)

    return cleanValues

}

const checkArrayForTakenDigits = (targetArray, takenDigits) => {
    let newTakenDigits = takenDigits
    targetArray.forEach(item=>(takenDigits.includes(item) ? null : item === 0 ? null : newTakenDigits.push(item)))
    return newTakenDigits
}

const getCellGroup = (x, y, width) => {
    //x coord is Math.floor(x/width % width)
    //y coord is Math.floor(y/width % width)
    //group coord
    let xCoord = Math.floor(x/width % width)
    let yCoord = Math.floor(y/width % width)
    let groupCoords = [xCoord, yCoord]

    //I know this is not dynamic
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
            0,0,0,5,6,0,0,0,0 ]

initialize(B)