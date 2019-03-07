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
    debugger
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
            // debugger
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