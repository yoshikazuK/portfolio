import { useState } from "react";
import Shuffle from "@com/Shuffle";
import PickCard from "@com/PickCard";

const App = () => {
  // 変数宣言
  let deckShoe = [],
    comfirmCard = [],
    playerHand = [],
    playerHandSum = 0;

  const [bust, setbust] = useState(false);

  // 6デッキでプレイ
  const numberOfDeck = 6 * 52;

  // 全カードをデッキシューに入れる
  for (let i = 1; i <= numberOfDeck; i++) {
    deckShoe.push(i);
  }
  // console.log(deckShoe);

  // ゲーム開始時にデッキをシャッフル
  const NewGame = () => {
    deckShoe = Shuffle(deckShoe);
    console.log(deckShoe);
  };

  // 最初にカードを2枚ずつ配る
  const Distribute = () => {
    Hit();
    Hit();
  };

  // Hit時の処理（デッキシューからハンドへカードを移動）
  const Hit = () => {
    // デッキトップを引く
    // let MoveCard = deckShoe.shift();

    // 引いたカードのスートと数字を求める
    // MoveCard = MoveCard % 52;

    // let MoveCardsuit = Math.ceil(MoveCard / 4);
    // let MoveCardNum = MoveCard + 1;
    // let ComfirmCard = [MoveCardsuit, MoveCardNum];

    comfirmCard = PickCard(deckShoe);

    // プレイヤーの手札に加える
    playerHand.push(comfirmCard);

    // エースと絵札の計算をする
    if (comfirmCard[1] > 10) {
      comfirmCard[1] = 10;
    }

    playerHandSum = parseInt(playerHandSum) + parseInt(comfirmCard[1]);
    console.log(playerHandSum);

    // 手札の合計が21を超えたらバスト処理をする
    if (playerHandSum > 21) {
      setbust(true);
    }
  };

  return (
    <>
      <button onClick={NewGame}>NewGame</button>
      <button onClick={Distribute}>Distribute</button>
      <button onClick={Hit}>HIT</button>
      {bust ? <p>BUST!!</p> : ""}
    </>
  );
};

export default App;
