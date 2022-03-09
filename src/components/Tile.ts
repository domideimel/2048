export default class Tile {
  private readonly _gameBoard: HTMLDivElement

  constructor (gameBoard: HTMLDivElement, value: number = Math.random() < 0.5 ? 2 : 4) {
    this._gameBoard = gameBoard
    this._x = 0
    this._y = 0
    this._tileElement = null
    this.init()
    this.value = value
  }

  private _x: number

  get x (): number {
    return this._x
  }

  set x (x: number) {
    this._x = x
    this._tileElement!.style.setProperty('--x', `${this.x}`)
  }

  private _y: number

  get y (): number {
    return this._y
  }

  set y (y: number) {
    this._y = y
    this._tileElement!.style.setProperty('--y', `${this.y}`)
  }

  private _value: number | undefined

  get value (): number {
    return <number>this._value
  }

  set value (value: number) {
    this._value = value

    const power: number = Math.log2(value)
    const backgroundLightness: number = 100 - (power * 9)
    const textLightness: number = backgroundLightness <= 50 ? 90 : 10

    this.tileElement!.textContent = `${value}`
    this.tileElement!.style.setProperty('--background-lightness', `${backgroundLightness}%`)
    this.tileElement!.style.setProperty('--text-lightness', `${textLightness}%`)
  }

  private _tileElement: HTMLDivElement | null

  get tileElement (): HTMLDivElement | null {
    return this._tileElement
  }

  set tileElement (tileElement: HTMLDivElement | null) {
    this._tileElement = tileElement
  }

  private _type: boolean | undefined

  get type (): boolean {
    return <boolean>this._type
  }

  get gameBoard (): HTMLDivElement {
    return this._gameBoard
  }

  get gameBoardElement (): HTMLDivElement {
    return this._gameBoard
  }

  public init (): void {
    this.generateTile()
  }

  public generateTile (): HTMLDivElement {
    this.tileElement = document.createElement('div')
    this.tileElement.classList.add('tile')

    this.gameBoard.appendChild(this.tileElement)
    return this.tileElement
  }

  public remove (): void {
    this.tileElement!.remove()
  }

  public waitForTransition (animation: boolean = false): Promise<unknown> {
    return new Promise((resolve) => {
      this.tileElement!.addEventListener(animation ? 'animationend' : 'transitionend', resolve, { once: true })
    })
  }
}