
const solve = board => {
    let solution = solveBoard(board)
    outputBoard(solution)
}

const solveBoard = board => {
    let cellPos = [0,0]
    let cellIndex = cellPos[0] + (cellPos[1] * 9)

    while(board[cellIndex] !== 0){
        cellPos = updateCellPos(cellPos)
        cellIndex = cellPos[0] + (cellPos[1] * 9)
    }
    // console.log(`Cell Pos: ${[...cellPos]}`)
    outputBoard(board)
    let candidates = getCandidates(board, cellIndex, cellPos)
    if(candidates) {
        candidates.forEach(candidate => {
            board[cellIndex] = candidate
            solveBoard(board)
        })
    }
    //find a way to make this finish the last cell without overriding it
    board[cellIndex] = 0
    if(cellPos[0] === cellPos[1] === 8) {
        candidates = getCandidates(board, cellIndex, cellPos)
        board[board.length-1] = candidates[0]
        return board
    }
}

const outputBoard = board => {
    let row = []
    for(let i=0; i<board.length; i++) {
        row.push(board[i])
        if(i%9 === 8) {
            console.log(row.join(''))
            row=[]
        }
    }
    console.log('\n\n\n\n\n\n')
}

const updateCellPos = currentPos => {
    let cellPos = currentPos
    let boardWidth = 8 //n-1
    if(cellPos[0] >= boardWidth) {
        cellPos[0] = 0
        if(cellPos[1] < 8) {
            cellPos[1] += 1
        }
    } else {
        cellPos[0] += 1
    }
    return cellPos
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

const getCandidates = (board, cellIndex, cellPos) => {
    let col = []
    let row = []
    let groupIndex = getCellGroup(cellPos[0],cellPos[1],3)
    let groups = getGroups(board,9)//just get the one group
    let group = groups[groupIndex]
    let colStart = cellPos[0]
    let rowStart = cellPos[1]
    let takenValues = []
    const POSSIBLE_VALUES = [1,2,3,4,5,6,7,8,9]

    for(let i=0; i<9; i++) {
        col.push(board[(colStart+(i*9))])
    }
    for(let i=0; i<9; i++) {
        row.push(board[(rowStart*9)+i])
    }

    col.forEach(val=>takenValues.includes(val) ? null : takenValues.push(val))
    row.forEach(val=>takenValues.includes(val) ? null : takenValues.push(val))
    group.forEach(val=>takenValues.includes(val) ? null : takenValues.push(val))
    let candidates = POSSIBLE_VALUES.map(val=>takenValues.includes(val) ? null : val).filter(item=>item!==null)

    // console.log(`Found candidates: ${console.dir(candidates)}`)

    return candidates
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

solveBoard(B)