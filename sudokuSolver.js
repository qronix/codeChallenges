const initialize = board => {
    n = checkBoardSizeValid(board.length) 
    n !== 0 ? solveSudoku(board, n) : console.log('Invalid board') 
    // n !== 0 ? solveCells(null, null, board, n, 0) : console.log('Invalid board')
}

const checkBoardSizeValid = base => {
    const num = Math.sqrt(base)
    return num % 1 === 0 ? num : 0
}

const solveSudoku = (board, n) => {

    const SOLUTION = [
        3,7,2,9,4,5,1,8,6,
        4,5,8,6,7,1,3,9,2,
        6,9,1,2,8,3,7,4,5,
        5,8,3,7,9,2,6,1,4,
        7,2,4,1,3,6,9,5,8,
        9,1,6,4,5,8,2,3,7,
        8,6,5,3,1,7,4,2,9,
        1,4,7,8,2,9,5,6,3,
        2,3,9,5,6,4,8,7,1 ]

    let rows = getRows(board, n)
    let cols = getCols(board, n)
    let groups = getGroups(board, n)
    const gridFlags = getGridFlags(board)
    const currentBoard = board
    let groupIndex = 0
    let groupWidth = Math.sqrt(n)
    let cellPos = [0,0]
    let boardWidth = n-1
    let colPos = 0

    bruteForce(board, gridFlags, rows, cols, groups, boardWidth, groupWidth, n)
{
    // console.dir(rows)
    // console.dir(cols)
    // console.dir(groups)
    // console.dir(gridFlags)
    // getCellGroup(5,2,3)

    // for(let j = 0; j < board.length - 1; j++) {
    //     // (colPos > boardWidth) ? function() { colPos = 0; cellPos[1] += 1; cellPos[0] = 0 } : function()  {colPos += 1; cellPos[0] += 1 }
    //     if(gridFlags[j] === 1){
    //         continue
    //     }
    //     groupIndex = getCellGroup(cellPos[0], cellPos[1], groupWidth)

    //     let validDigits = getCandidates(cellPos[0], cellPos[1], groupIndex, rows, cols, groups, n)
    //     if(validDigits !== null) {
    //         board[j] = validDigits
    //     } else {
    //         let positionTracker = j
    //         let tempCellPos = [cellPos[0],cellPos[1]]

    //         debugger
    //         while(validDigits === null) {
    //             if(tempCellPos[0] === 0 && tempCellPos[1] !== 0) {
    //                 tempCellPos[0] = boardWidth
    //                 tempCellPos[1] -= 1
    //              } else {
    //                  tempCellPos[0] -= 1
    //              }
    //              positionTracker -= 1
    //              if(gridFlags[positionTracker] !== 1) {
    //                 console.log('Backtracking to find a valid number...')
    //                 groupIndex = getCellGroup(tempCellPos[0], tempCellPos[1], groupWidth)
    //                 validDigits = getCandidates(tempCellPos[0], tempCellPos[1], groupIndex, rows, cols, groups, n)
    //                 if(validDigits !== null) {
    //                     board[positionTracker] = validDigits
    //                     break
    //                 }
    //              }
    //         }
    //     }

    //     rows = getRows(board, n)
    //     cols = getCols(board, n)
    //     groups = getGroups(board, n)
    //     outputBoard(rows)

    //     if( colPos >= boardWidth ) {
    //         colPos = 0
    //         cellPos[1] += 1
    //         cellPos[0] = 0 
    //     } else {
    //         colPos += 1
    //         cellPos[0] += 1
    //     }
    // }
    
    // let isSolution = board.every((item, index) => item === SOLUTION[index])
    // if(isSolution) {
    //     console.log('A solution has been found')
    // } else {
    //     console.log('The solution is incorrect')
    // }
}
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

const bruteForce = (board, gridFlags, rows, cols, groups, boardWidth, groupWidth, n) => {

    let cellPos = [0,0]
    let group = 0
    let candidateValue = null
    let badCandidateValue = null
    let backtracking = false
    let unsolvable = false
    let solved = false

    while(!solved && !unsolvable) {
        console.log(`CellPos: ${cellPos}`)
        //start at cell 0
        //if the cell is flagged as correct (from grid flags)
        //continue
        //if the cell is not correct (from grid flags)
        //check for candidates
        //if a candidate is found
        //continue
        //if no candidate is found
        //backtrack to a previous cell
        //that is NOT correct (from grid flags)
        //check for a valid candidate AND
        //pass the current value as a bad value to be skipped
        //if no candidate, continue backtracking
        //once a candidate is found, continue
        let cellIndex = cellPos[0] + (cellPos[1] * n)
        //cell is available to change
        if(gridFlags[cellIndex] === 0) {
            group = getCellGroup(cellPos[0], cellPos[1], groupWidth)
            if(backtracking) {
                badCandidateValue = board[cellIndex]
            }
            candidateValue = getCandidates(cellPos[0], cellPos[1], group, rows, cols, groups, n, badCandidateValue)
            //if a candidate value is not found
            if(!candidateValue) {
                //if we are at the start of the board with
                //no possible candidates, the board is 
                //unsolvable
                if(cellIndex===0) {
                    unsolvable = true
                    console.log('Board is unsolvable')
                    break
                } else {
                    //otherwise, we need to backtrack
                    backtracking = true
                    //the current cell needs to be set to 0 to free
                    //candidates
                    board[cellIndex] = 0
                    updateCellPos(cellPos, 'backward', boardWidth)
                }
            } else {
                //we have found a candidate!
                backtracking = false

            }
        } else if(backtracking) {
            updateCellPos(cellPos, 'backward', boardWidth)
        }
        board[cellIndex] = candidateValue
        rows = getRows(board, n)
        cols = getCols(board, n)
        groups = getGroups(board, n)
        outputBoard()
        updateCellPos(cellPos, 'forward', boardWidth)
    }
}

// const solveCells = (cellPos, gridFlags, board , n, boardIndex) => { 
//     //The cellpos array can be used to find the index of
//     //a cell, the y coord = the index of the row
//     //from the rows group. The x coord = the index
//     //of the cell within the row

//     //start at the cellPos given,
//     //
//     cellPos = cellPos ? cellPos : [0,0]
//     boardIndex = boardIndex ? boardIndex : 0

//     if(!gridFlags) {
//         gridFlags = getGridFlags(board)
//     }

//     let rows = getRows(board, n)
//     outputBoard(rows)
//     console.log(`Cell position is ${cellPos[0]} , ${cellPos[1]}`)
//     let cols = getCols(board, n)
//     let groups = getGroups(board, n)
//     const groupWidth = Math.sqrt(n)
//     let groupIndex = getCellGroup(cellPos[0], cellPos[1], groupWidth)
//     const boardWidth = n-1
//     if(gridFlags[boardIndex] !== 1) {
//         let validDigits = getValidDigits(cellPos[0],cellPos[1], groupIndex, rows, cols, groups, n)
//         if(!validDigits) { 
//             // debugger
//             if(cellPos[0] !== 0) {
//                 if(cellPos[0] === 0 && cellPos[1] !== 0) {
//                     cellPos[0] = boardWidth
//                     cellPos[1] -= 1
//                 }else {
//                     cellPos[0] -=1
//                 }
//             } else {
//                 console.log('Invalid board')
//             }
//             if(boardIndex > 0) {
//                 boardIndex -= 1
//                 solveCells(cellPos, gridFlags, board, n, boardIndex)
//             } else {
//                 console.log('No solution')
//             }
//         }
//         board[boardIndex] = validDigits
//     }
//     if (boardIndex < board.length - 1) {
//         boardIndex += 1
//         cellPos[0] += 1
//         if(cellPos[0] > boardWidth) {
//             cellPos[0] =0
//             cellPos[1] += 1
//         }
//         solveCells(cellPos, gridFlags, board, n, boardIndex)
//     }
// }

const outputBoard = rows => {
   Object.keys(rows).forEach(row=>console.log(rows[row].join('')))
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

const getCandidates = (col, row, group, rows, cols, groups, n, badCandidateValue) => {
    const POSSIBLE_DIGITS = []
    let takenDigits = []

    for(let i=1; i<=n; i++) {
        POSSIBLE_DIGITS.push(i)
    }

    //can add a check here for duplicates
    //if duplicates exist ==> the board is invalid from the start
    // debugger
    takenDigits = checkArrayForTakenDigits(rows[row], takenDigits)
    takenDigits = checkArrayForTakenDigits(cols[col], takenDigits)
    takenDigits = checkArrayForTakenDigits(groups[group], takenDigits)
    //why is this broken?
    //if no digits are available, then the previous solution is incorrect
    //so, we need to start at the beginning of the row, change the value
    //and retest the current position
    // debugger
    let cellPossibleValues = POSSIBLE_DIGITS.map(possibility=>takenDigits.includes(possibility) ? null : possibility)
    cellPossibleValues = cellPossibleValues.filter(val => val !== badCandidateValue)

    if(cellPossibleValues.every(item => item === null)) {
        console.log('No candidates')
        return null
    }
    let cellValue = null
    // debugger
    let cleanValues = cellPossibleValues.filter(item => item !== null)
    if(cleanValues.length !== 0 && cleanValues.length !== 1) {
        while(cellValue === null || cellValue === undefined) {
            // debugger
            cellValue = cleanValues[Math.floor(Math.random() * cellPossibleValues.length - 1)]
        }
    } else {
        cellValue = cellPossibleValues[0]
    }
    if(cellValue === undefined) { 
        debugger
    }
    console.log(cellValue)
    return cellValue

}

const checkArrayForTakenDigits = (targetArray, takenDigits) => {
    let newTakenDigits = takenDigits
    targetArray.forEach(item=>(takenDigits.includes(item) ? null : item === 0 ? null : newTakenDigits.push(item)))
    return newTakenDigits
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