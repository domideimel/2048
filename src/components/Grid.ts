import Cell from './Cell'

export const GRID_SIZE: number = 4
export const CELL_SIZE: number = 20
export const CELL_GAP: number = 2

export default class Grid {
  private readonly _grid: HTMLDivElement

  constructor (grid: HTMLDivElement) {
    this._grid = grid
    this._cells = []

    this.init()
  }

  private _cells: Cell[]

  get cells (): Cell[] {
    return this._cells
  }

  set cells (cells: Cell[]) {
    this._cells = cells
  }

  get emptyCells (): Cell[] {
    return this._cells.filter(cell => cell.tile == null)
  }

  get cellsByColumn (): Cell[][] {
    return this._cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || []
      cellGrid[cell.x][cell.y] = cell
      return cellGrid
    }, [] as Cell[][])
  }

  get cellsByRow (): Cell[][] {
    return this._cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || []
      cellGrid[cell.y][cell.x] = cell
      return cellGrid
    }, [] as Cell[][])
  }

  get grid (): HTMLDivElement {
    return this._grid
  }

  public init (): void {
    this.grid.style.setProperty('--grid-size', `${GRID_SIZE}`)
    this.grid.style.setProperty('--cell-size', `${CELL_SIZE}vmin`)
    this.grid.style.setProperty('--cell-gap', `${CELL_GAP}vmin`)

    this.cells = this.createCellElements().map((cell, i) => {
      const x = i % GRID_SIZE
      const y = Math.floor(i / GRID_SIZE)
      return new Cell(cell, x, y)
    })
  }

  public createCellElements (): HTMLDivElement[] {
    const cells: HTMLDivElement[] = []
    for (let i = 0; i < GRID_SIZE ** 2; i++) {
      const cell: HTMLDivElement = document.createElement('div')
      cell.classList.add('cell')
      cells.push(cell)
      this.grid.appendChild(cell)
    }

    return cells
  }

  public randomEmptyCell (): Cell {
    const randomIndex = Math.floor(Math.random() * this.emptyCells.length)
    return this.emptyCells[randomIndex]
  }
}