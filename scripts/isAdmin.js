// checks if the player can do shit
export function isAdmin(player) {
  return player.isOp() || player.hasTag("admin");
}