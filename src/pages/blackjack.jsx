import { useState } from "react";

const App = () => {
  // 変数宣言
  let deckShoe = [],
    playerHand = [],
    PlayerHandSum = 0;

  let [bust, setbust] = useState(false);

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
    // デッキトップを引く
    let MoveCard = deckShoe.shift();

    // 引いたカードのスートと数字を求める
    MoveCard = MoveCard % 52;

    let MoveCardsuit = Math.ceil(MoveCard / 4);
    let MoveCardNum = MoveCard + 1;
    let ComfirmCard = [MoveCardsuit, MoveCardNum];

    // プレイヤーの手札に加える
    playerHand.push(ComfirmCard);

    // エースと絵札の計算をする
    if (ComfirmCard[1] > 10) {
      ComfirmCard[1] = 10;
    }

    PlayerHandSum = parseInt(PlayerHandSum) + parseInt(ComfirmCard[1]);
    console.log(PlayerHandSum);

    // 手札の合計が21を超えたらバスト処理をする
    if (PlayerHandSum > 21) {
      alert("BUST!!");
    }
  };

  return (
    <>
      <button onClick={NewGame}>NewGame</button>
      <button onClick={Hit}>HIT</button>
      {/* {bust ? <p>BUST!!</p> : ""} */}
    </>
  );
};

export default App;
