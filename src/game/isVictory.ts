export function IsVictory(cells: any) {
    const positions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
  
    const isRowComplete = (row: any) => {
      const symbols = row.map((i: any) => cells?.[i])
      return symbols.every((i: any) => i !== null && i === symbols[0])
    }
  
    return positions.map(isRowComplete).some((i) => i === true)
  }