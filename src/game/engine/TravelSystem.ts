// ==============================================================================
// DICE&CARDS ERA - TRAVEL SYSTEM
// ==============================================================================
// Grid 4x3: 4 colunas, 3 linhas
// Posições 1-12: linha 0 = posições 1-4, linha 1 = posições 5-8, linha 2 = posições 9-12

/**
 * Calcula o tempo de viagem em turnos entre dois territórios usando distância Manhattan.
 * Grid 4x3: posições 1-12.
 */
export function calculateTravelTime(fromPosition: number, toPosition: number): number {
  const fromRow = Math.floor((fromPosition - 1) / 4);
  const fromCol = (fromPosition - 1) % 4;
  const toRow = Math.floor((toPosition - 1) / 4);
  const toCol = (toPosition - 1) % 4;
  const distance = Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol);
  return Math.max(1, distance);
}
