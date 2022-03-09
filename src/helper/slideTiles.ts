import Cell from '../components/Cell'

const slideTiles = (cells: Cell[][]): Promise<Awaited<unknown>[]> => {
  return Promise.all<Promise<unknown>>(cells.flatMap((group: Cell[]) => {
    const promises = []

    for (let i = 1; i < group.length; i++) {
      const cell: Cell = group[i]
      if (cell.tile == null) continue
      let lastValidCell: Cell | null = null

      for (let j = i - 1; j >= 0; j--) {
        const moveToCell = group[j]
        if (!moveToCell.canAccept(cell.tile)) break
        lastValidCell = moveToCell
      }

      if (lastValidCell) {
        promises.push(cell!.tile!.waitForTransition())
        if (lastValidCell.tile) {
          lastValidCell.mergeTile = cell.tile
        } else {
          lastValidCell.tile = cell.tile
        }
        cell.tile = null
      }
    }

    return promises
  }))
}

export { slideTiles }