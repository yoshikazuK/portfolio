const PickCard = (deckShoe) => {
  // デッキトップを引く
  let moveCard = deckShoe.shift();

  // 引いたカードのスートと数字を求める
  moveCard = moveCard % 52;

  let moveCardSuit = Math.ceil(moveCard / 13),
    moveCardNum = moveCard % 13;

  if (moveCardNum == 0) {
    moveCardNum = 13;
  }
  // comfirmCard = [moveCardSuit, moveCardNum];

  return {
    suit: moveCardSuit,
    num: moveCardNum,
  };
};

export default PickCard;
