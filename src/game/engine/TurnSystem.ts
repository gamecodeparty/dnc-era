// ==============================================================================
// DICE&CARDS ERA - TURN SYSTEM
// ==============================================================================

import prisma from "@/lib/db";

export class TurnSystem {
  constructor(private gameId: string) {}

  /**
   * Get current turn number
   */
  async getCurrentTurn(): Promise<number> {
    const game = await prisma.game.findUniqueOrThrow({
      where: { id: this.gameId },
    });
    return game.currentTurn;
  }

  /**
   * Advance to next turn
   */
  async advanceTurn(): Promise<number> {
    const game = await prisma.game.update({
      where: { id: this.gameId },
      data: {
        currentTurn: { increment: 1 },
      },
    });
    return game.currentTurn;
  }

  /**
   * Decrement temporary effects on clans
   */
  async processTemporaryEffects(): Promise<void> {
    // Decrement harvest boost turns
    await prisma.clan.updateMany({
      where: {
        gameId: this.gameId,
        harvestBoostTurns: { gt: 0 },
      },
      data: {
        harvestBoostTurns: { decrement: 1 },
      },
    });

    // Decrement truce block turns
    await prisma.clan.updateMany({
      where: {
        gameId: this.gameId,
        truceBlockTurns: { gt: 0 },
      },
      data: {
        truceBlockTurns: { decrement: 1 },
      },
    });

    // Expire diplomacy relations
    const game = await prisma.game.findUniqueOrThrow({
      where: { id: this.gameId },
    });

    await prisma.diplomacyRelation.updateMany({
      where: {
        fromClan: { gameId: this.gameId },
        expiresAtTurn: { lte: game.currentTurn },
        status: { not: "NEUTRAL" },
      },
      data: {
        status: "NEUTRAL",
        expiresAtTurn: null,
      },
    });
  }
}

export default TurnSystem;
