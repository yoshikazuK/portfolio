const PickCard = (deckShoe) => {
  // デッキトップを引く
  let moveCard = deckShoe.shift();

  // 引いたカードのスートと数字を求める
  moveCard = moveCard % 52;

  const
    moveCardsuit = Math.ceil(moveCard / 4),
    moveCardNum = moveCard,
    comfirmCard = [moveCardsuit, moveCardNum];

  return comfirmCard;
};

export default PickCard;
