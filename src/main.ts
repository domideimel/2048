import './style.css'
import Grid from './components/Grid'
import Tile from './components/Tile'
import { setupInput } from './helper'

export const gameBoard = document.getElementById('game-board')! as HTMLDivElement
export const grid = new Grid(gameBoard)

grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)

setupInput()