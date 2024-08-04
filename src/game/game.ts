/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game } from "boardgame.io"
import { IsVictory } from "./isVictory"

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
