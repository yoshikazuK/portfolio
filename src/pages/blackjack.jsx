import { useState } from "react";

import Shuffle from "@com/Shuffle";
import PickCard from "@com/PickCard";
import Calculation from "@com/Calculation";

const App = () => {
  // 変数宣言
  let deckShoe = [],
    playerHandArray = [],
    playerHandSum = [],
    dealerHandArray = [],
    dealerHandSum = [];

  const [playerBust, setPlayerBust] = useState(false);
  const [dealerBust, setDealerBust] = useState(false);
  const [playerHandTotal, setPlayerHandTotal] = useState(0);
  const [dealerHandTotal, setDealerHandTotal] = useState(0);
  const [active, isActive] = useState(true);

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
    setPlayerHandTotal(0);
    setDealerHandTotal(0);
    playerHit();
    dealerHit();
    playerHit();
    dealerHit();
  };

  // Hit時の処理
  const playerHit = () => {
    // デッキトップをめくる
    const comfirmCard = PickCard(deckShoe);

    // プレイヤーの手札に加える
    // 表示用のスート情報入り
    playerHandArray.push(comfirmCard);

    // 計算用の数字情報のみ
    playerHandSum.push(comfirmCard.num);

    // 配列ごと関数に渡して手札の合計値を計算してStateを更新する
    setPlayerHandTotal(Calculation(playerHandSum));

    // バスト判定をする
    if (playerHandTotal > 21) {
      setPlayerBust(true);
    }
  };

  // Stay時の処理
  const Stay = () => {
    isActive(false);
  };

  // ディーラーの処理
  // if (!isActive) {
  //   for(total)
  // }

  const dealerHit = () => {
    // デッキトップをめくる
    const comfirmCard = PickCard(deckShoe);
    // console.log(comfirmCard);

    // ディーラーの手札に加える
    // 表示用のスート情報入り
    dealerHandArray.push(comfirmCard);

    // 計算用の数字情報のみ
    dealerHandSum.push(comfirmCard.num);

    // 配列ごと関数に渡して手札の合計値を計算してStateを更新する
    setDealerHandTotal(Calculation(dealerHandSum));

    // バスト判定をする
    if (dealerHandTotal > 21) {
      setDealerBust(true);
    }
  };

  return (
    <>
      <button onClick={DeckShuffle}>デッキをシャッフル</button>
      <button onClick={Distribute}>カードを配る</button>
      <button onClick={playerHit}>HIT</button>
      <button onClick={Stay}>STAY</button>
      <p>プレイヤーハンド：{playerHandTotal}</p>
      {playerBust ? <p>BUST!!</p> : ""}
      <p>ディーラーハンド：{dealerHandTotal}</p>
      {dealerBust ? <p>BUST!!</p> : ""}
    </>
  );
};

export default App;
