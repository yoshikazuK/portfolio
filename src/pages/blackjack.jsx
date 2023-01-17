import { useState } from "react";
import Shuffle from "@com/Shuffle";
import PickCard from "@com/PickCard";

const App = () => {
  // 変数宣言
  let deckShoe = [],
    comfirmCard = [],
    playerHandArray = [],
    playerHandSum = [];

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

  // Hit時の処理
  const Hit = () => {
    // デッキトップをめくる
    comfirmCard = PickCard(deckShoe);
    // console.log(comfirmCard);

    // プレイヤーの手札に加える
    playerHandArray.push(comfirmCard);

    // 絵札はすべて10で計算する
    if (comfirmCard.num > 10) {
      comfirmCard.num = 10;
    }

    playerHandSum.push(comfirmCard.num);
    let total = playerHandSum.reduce((sum, element) => sum + element);

    // Aを加味して手札の合計が21を超えたらバスト処理をする
    switch (true) {
      case total < 11:
        if (playerHandSum.includes(1)) {
          total += 10;
        }
        break;
      
      case total > 21:
        setbust(true);
        break;
    }

    console.log(total);
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
