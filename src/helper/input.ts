import { slideTiles } from './slideTiles'
import { gameBoard, grid } from '../main'
import Tile from '../components/Tile'
import Cell from '../components/Cell'

const setupInput = () => {
  window.addEventListener('keydown', handleInput, { once: true })
}

const handleInput = async (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      if (!canMoveUp()) {
        setupInput()
        return
      }
      await moveUp()
      break
    case 'ArrowDown':
      if (!canMoveDown()) {
        setupInput()
        return
      }
      await moveDown()
      break
    case 'ArrowLeft':
      if (!canMoveLeft()) {
        setupInput()
        return
      }
      await moveLeft()
      break
    case 'ArrowRight':
      if (!canMoveRight()) {
        setupInput()
        return
      }
      await moveRight()
      break
    default:
      setupInput()
      return
  }

  const newTile = new Tile(gameBoard)
  grid.cells.forEach(cell => cell.mergeTiles())
  grid.randomEmptyCell().tile = newTile

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile.waitForTransition(true).then(() => {
      alert('You lose')
    })
    return
  }

  setupInput()
}

const moveUp = () => {
  return slideTiles(grid.cellsByColumn)
}

const moveDown = () => {
  return slideTiles(grid.cellsByColumn.map(group => [...group].reverse()))
}

const moveLeft = () => {
  return slideTiles(grid.cellsByRow)
}

const moveRight = () => {
  return slideTiles(grid.cellsByRow.map(group => [...group].reverse()))
}

const canMoveUp = (): boolean => {
  return canMove(grid.cellsByColumn)
}

const canMoveDown = (): boolean => {
  return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}

const canMoveLeft = (): boolean => {
  return canMove(grid.cellsByRow)
}

const canMoveRight = (): boolean => {
  return canMove(grid.cellsByRow.map(column => [...column].reverse()))
}

const canMove = (cells: Cell[][]): boolean => {
  return cells.some(group => {
    return group.some((cell, index) => {
      if (index === 0) return false
      if (cell.tile == null) return false
      const moveToCell = group[index - 1]
      return moveToCell.canAccept(cell.tile)
    })
  })
}

export { setupInput, moveDown, moveLeft, moveRight, moveUp, canMove, canMoveRight, canMoveLeft, canMoveDown }
