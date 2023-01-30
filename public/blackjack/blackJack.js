/******************
 * グローバル変数
 *****************/

// デッキ
// プレイヤーハンド
// ディーラーハンド
// Stand判定フラグ
// 勝敗判定フラグ
let deckShoe = [],
  playerHand = [],
  dealerHand = [],
  isStand = false,
  isGameOver = false;

/*****************
 * イベントハンドラの割り当て
 ****************/

// bet関数を登録
document.querySelector("#bet").addEventListener("click", clickNewBetHandler);

// ページの読み込みが完了したときの実行する関数を登録
window.addEventListener("load", loadHandler);

// hit関数を登録
document.querySelector("#hit").addEventListener("click", clickHitHandler);

// stand関数を登録
document.querySelector("#stand").addEventListener("click", clickStandHandler);

// Double関数を登録
document.querySelector("#double").addEventListener("click", clickDoubleHandler);

/*****************
 * イベントハンドラ
 ****************/

// ページの読み込みが完了したときの実行する関数
function loadHandler() {
  // シャッフルする
  shuffle();
}

// NewBetボタン押下時
function clickNewBetHandler() {
  // グローバル変数（テーブルの上）を初期化する
  playerHand = [];
  dealerHand = [];
  isStand = false;
  isGameOver = false;

  let target = document.getElementById("playerHand");
  while (target.lastChild) {
    target.removeChild(target.lastChild);
  }

  target = document.getElementById("dealerHand");
  while (target.lastChild) {
    target.removeChild(target.lastChild);
  }

  // カードを1枚ずつ2回配る
  for (let i = 0; i < 2; i++) {
    playerHit();
    dealerHit();
  }
}

// HITボタン押下時
function clickHitHandler() {
  // 勝敗が未決定の場合
  if (!isGameOver) {
    // カードを1枚引く
    playerHit();

    // 手札の合計が21を超えた場合は強制的にStandイベントを発火
    if (getTotal(playerHand) > 21) {
      clickStandHandler();
    }
  }
}

// Standボタン押下時
function clickStandHandler() {
  // Stand状態変更
  isStand = true;

  // 手札の最後（2枚目）を確認
  const card = dealerHand[dealerHand.length - 1];

  // 手札のimgタグを指定
  const target =
    document.getElementById("dealerHand").lastElementChild.firstElementChild;

  // 画像ファイルを差し替え
  target.setAttribute("src", getCardPath(card));

  let result = "";

  if (!isGameOver) {
    // ディーラーがカードを引く
    dealerHit();

    // 勝敗を判定する
    result = judge();

    // 1秒後に勝敗を画面に表示する
    setTimeout(showResult, 1000, result);

    // 勝敗決定フラグを決定に変更
    isGameOver = true;
  }
}

// Doubleボタン押下時
function clickDoubleHandler() {
  // 勝敗が未決定の場合
  if (!isGameOver) {
    // カードを1枚引く
    playerHit();

    // 手札の最後（3枚目）を確認
    const card = playerHand[dealerHand.length - 1];

    // 手札のliタグを指定
    const target = document.getElementById("playerHand").lastElementChild;

    // liタグにdoubleクラスを付与
    target.classList.add("double");

    // 手札の合計値に関わらず強制的にStandイベントを発火
    clickStandHandler();
  }
}

/*****************
 * ゲーム関数
 ****************/

// シャッフルする
function shuffle() {
  for (let i = 1; i <= 52; i++) {
    deckShoe.push(i);
  }

  for (let i = deckShoe.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckShoe[i], deckShoe[j]] = [deckShoe[j], deckShoe[i]];
  }
}

// 自分がカードを引く
function playerHit() {
  const card = deckShoe.shift();
  playerHand.push(card);
  const target = document.getElementById("playerHand");
  let element = document.createElement("li");
  const path = getCardPath(card);
  element.innerHTML = `<img src="${path}" alt="">`;
  target.appendChild(element);
  document.querySelector("#playerTotal").innerText = getTotal(playerHand);
}

// ディーラーがカードを引く
function dealerHit() {
  if (!isStand) {
    const card = deckShoe.shift();
    dealerHand.push(card);
    const target = document.getElementById("dealerHand");
    const path = getCardPath(card);
    const backPath = "./img/red.png";
    let element = document.createElement("li");

    switch (dealerHand.length) {
      // 最初の1枚目は公開して加算する
      case 1:
        element.innerHTML = `<img src="${path}" alt="">`;
        target.appendChild(element);
        document.querySelector("#dealerTotal").innerText = getTotal(dealerHand);
        break;

      // 2枚目は非公開で加算もしない
      case 2:
        element.innerHTML = `<img src="${backPath}" alt="">`;
        target.appendChild(element);
        break;
    }
  } else {
    // プレイヤーがStand後はディーラーがカードを引き続ける
    while (pickAI(dealerHand)) {
      const card = deckShoe.shift();
      dealerHand.push(card);
      const target = document.getElementById("dealerHand");
      const path = getCardPath(card);
      let element = document.createElement("li");
      element.innerHTML = `<img src="${path}" alt="">`;
      target.appendChild(element);
      document.querySelector("#dealerTotal").innerText = getTotal(dealerHand);
    }
  }
}

// ディーラーがカードを引くかどうかを考える
function pickAI(handCards) {
  let total = getTotal(handCards);
  let isPick = false;

  if (total < 17) {
    isPick = true;
  }

  return isPick;
}

// カードの合計を計算する関数
function getTotal(handCards) {
  let total = 0;
  let number = 0;

  for (let i = 0; i < handCards.length; i++) {
    number = handCards[i] % 13;

    // 絵札を10と数えて加算する
    switch (number) {
      case 11: //Jack
      case 12: //Queen
      case 0: //King
        total += 10;
        break;

      // 1～10はそのまま加算する
      default:
        total += number;
    }
  }

  // 手札にAがあり合計が12未満の場合
  if (
    (handCards.includes(1) ||
      handCards.includes(14) ||
      handCards.includes(27) ||
      handCards.includes(40)) &&
    total < 12
  ) {
    // Aを11と計算する つまり10を加算
    total += 10;
  }

  return total;
}

// カードの画像パスを求める関数
function getCardPath(card) {
  let zeroPadding = "";

  if (card < 10) {
    zeroPadding = "0";
  }

  const path = `./img/${zeroPadding}${card}.png`;

  return path;
}

// 勝敗を判定する
function judge() {
  let result = "";
  let playerTotal = getTotal(playerHand);
  let dealerTotal = getTotal(dealerHand);

  if (playerTotal > 21) {
    result = "loose";
  } else if (playerTotal < 22 && dealerTotal > 21) {
    result = "win";
  } else {
    if (playerTotal > dealerTotal) {
      result = "win";
    } else if (playerTotal < dealerTotal) {
      result = "loose";
    } else {
      result = "draw";
    }
  }

  return result;
}

// 勝敗を画面に表示する
function showResult(result) {
  let message = "";

  switch (result) {
    case "win":
      message = "あなたの勝ちです";
      break;
    case "loose":
      message = "あなたの負けです";
      break;
    case "draw":
      message = "引き分けです";
      break;
  }

  alert(message);
}

/*****************
 * デバッグ関数
 ****************/

function debug() {
  console.log("デッキ", deckShoe);
  console.log("プレイヤーハンド", playerHand, "合計", getTotal(playerHand));
  console.log("ディーラーハンド", dealerHand, "合計", getTotal(dealerHand));
  console.log("勝敗決定フラグ", isGameOver);
}
