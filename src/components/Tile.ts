export default class Tile {
  private readonly _gameBoard: HTMLDivElement
  private _x: number
  private _y: number
  private _value: number | undefined
  private _tileElement: HTMLDivElement | null
  private _type: boolean | undefined

  constructor (gameBoard: HTMLDivElement, value: number = Math.random() < 0.5 ? 2 : 4) {
    this._gameBoard = gameBoard
    this._x = 0
    this._y = 0
    this._tileElement = null
    this.init()
    this.value = value
  }

  get gameBoard (): HTMLDivElement {
    return this._gameBoard
  }

  get x (): number {
    return this._x
  }

  get y (): number {
    return this._y
  }

  get value (): number {
    return <number>this._value
  }

  get type (): boolean {
    return <boolean>this._type
  }

  get tileElement (): HTMLDivElement | null {
    return this._tileElement
  }

  get gameBoardElement (): HTMLDivElement {
    return this._gameBoard
  }

  set x (x: number) {
    this._x = x
    this._tileElement!.style.setProperty('--x', `${this.x}`)
  }

  set y (y: number) {
    this._y = y
    this._tileElement!.style.setProperty('--y', `${this.y}`)
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

  set tileElement (tileElement: HTMLDivElement | null) {
    this._tileElement = tileElement
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