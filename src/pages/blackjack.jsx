import { useState } from "react";

import Shuffle from "@com/Shuffle";
import PickCard from "@com/PickCard";
import Calculation from "@com/Calculation";

const App = () => {
  // 変数宣言
  let deckShoe = [],
    comfirmCard = [],
    playerHandArray = [];

  const [bust, setbust] = useState(false);

  // 6デッキでプレイ
  const numberOfDeck = 6 * 52;

  // 全カードをデッキシューに入れる
  for (let i = 1; i <= numberOfDeck; i++) {
    deckShoe.push(i);
  }
  // console.log(deckShoe);

  // ゲーム開始時にデッキをシャッフル
  const DeckShuffle = () => {
    deckShoe = Shuffle(deckShoe);
    // console.log(deckShoe);
  };

  // 最初にカードを2枚ずつ配る
  const Distribute = () => {
    Hit();
    Hit();
  };

  // Hit時の処理
  const Hit = () => {
    // デッキトップをめくる
    comfirmCard = PickCard(deckShoe);

    // プレイヤーの手札に加える
    playerHandArray.push(comfirmCard);

    // 手札の合計値を計算する
    let total = Calculation(comfirmCard.num);

    console.log(total);
    // バスト判定をする
    if (total > 21) {
      setbust(true);
    }
  };

  return (
    <>
      <button onClick={DeckShuffle}>デッキをシャッフル</button>
      <button onClick={Distribute}>カードを配る</button>
      <button onClick={Hit}>HIT</button>
      {bust ? <p>BUST!!</p> : ""}
    </>
  );
};

export default App;
