/* 1561. Maximum Number of Coins you Can get

There are 3n piles of coins of varying size, you and your friends will take piles of coins as follows:
In each step, you will choose any 3 piles of coins (not necessarily consecutive).
Of your choice, Alice will pick the pile with the maximum number of coins.
You will pick the next pile with the maximum number of coins.
Your friend Bob will pick the last pile.
Repeat until there are no more piles of coins.
 */

var maxCoins = function (piles) {
  piles.sort((a, b) => b - a);
  let max = 0;
  let count = piles.length / 3;
  for (let i = 1; i < piles.length && count > 0; i += 2) {
    max += piles[i];
    count--;
  }
  return max;
};
