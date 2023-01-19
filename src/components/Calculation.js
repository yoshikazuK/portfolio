const Calculation = ([...array]) => {
  // 手札の最後の1枚を抜き出してチェック
  let lastCard = array.pop();

  // 絵札はすべて10で計算する
  if (lastCard > 10) {
    lastCard = 10;
  }

  // 手札に戻す
  array.push(lastCard);
  console.log(`手札一覧：${array}`);

  let total = array.reduce((sum, element) => sum + element);

  // Aを11と計算してバストしなければ11とする
  if (total < 12 && array.includes(1)) {
    total += 10;
  }

  return total;
};

export default Calculation;
