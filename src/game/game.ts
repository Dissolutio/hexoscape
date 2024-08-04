/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from "boardgame.io"

function IsVictory(cells: any) {
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

export const TicTacToe: Game = {
  name: 'tic-tac-toe',

  setup: () => ({
    cells: Array(9).fill(null),
  }),

  moves: {
    clickCell({ G, ctx }, id) {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer
      }
    },
  },

  turn: { moveLimit: 1 },

  endIf: ({ G, ctx }) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer }
    }
    if (G.cells.filter((c: any) => c === null).length === 0) {
      return { draw: true }
    }
  },
}
