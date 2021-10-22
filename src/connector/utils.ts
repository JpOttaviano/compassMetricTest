export function parseMoneyToFloat(money: string): number {
  return parseFloat(money.replace(/[^0-9.-]+/g, ""));
}
