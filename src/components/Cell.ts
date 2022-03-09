import Tile from './Tile'

export default class Cell {
  private readonly _cell: HTMLDivElement
  private readonly _x: number
  private readonly _y: number

  constructor (cell: HTMLDivElement, x: number, y: number) {
    this._cell = cell
    this._x = x
    this._y = y
    this._tile = null
  }

  private _tile: Tile | null

  get tile () {
    return this._tile
  }

  set tile (value: Tile | null) {
    this._tile = value

    if (value == null) return
    this._tile!.x = this._x
    this._tile!.y = this._y
  }

  private _mergeTile: Tile | null | undefined

  // @ts-ignore
  get mergeTile (): Tile | null | undefined {
    return this._mergeTile
  }

  set mergeTile (value: Tile | null) {
    this._mergeTile = value

    if (value == null) return
    this._mergeTile!.x = this._x
    this._mergeTile!.y = this._y
  }

  get cell (): HTMLDivElement {
    return this._cell
  }

  get x (): number {
    return this._x
  }

  get y (): number {
    return this._y
  }

  public canAccept (tile: Tile | null): boolean {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value === tile?.value)
    )
  }

  public mergeTiles (): void {
    if (this.tile == null || this.mergeTile == null) return
    this.tile.value = this.tile.value + this.mergeTile.value
    this.mergeTile.remove()
    this.mergeTile = null
  }
}