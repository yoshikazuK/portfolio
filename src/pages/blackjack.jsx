const App = () => {
  // 変数宣言
  let deckShoe = [],
    playerHand = [];

  // 6デッキでプレイ
  const numberOfDeck = 6 * 52;

  // 全カードをデッキシューに入れる
  for (let i = 0; i < numberOfDeck; i++) {
    deckShoe.push(i);
  }

  // デッキシュー内でランダム値を使用してシャッフル
  const NewGame = () => {
    for (let i = numberOfDeck; i > 0; i--) {
      let rdm = Math.floor(Math.random() * i);
      let def = deckShoe[i];
      deckShoe[i] = deckShoe[rdm];
      deckShoe[rdm] = def;
    }
  };

  // Hit時の処理（デッキシューからハンドへカードを移動）
  const Hit = () => {
    let MoveCard = deckShoe.shift();
    MoveCard = MoveCard % 52;
    playerHand.push(MoveCard);
    const SumPlayerHand = playerHand.reduce((sum, num) => sum + ((num % 13) + 1),0);
    console.log(SumPlayerHand);
  };

  return (
    <>
      <button onClick={NewGame}>NewGame</button>
      <button onClick={Hit}>HIT</button>
    </>
  );
};

export default App;
