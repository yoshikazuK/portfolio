let handSum = [];

const Calculation = (comfirmCard) => {
  // 絵札はすべて10で計算する
  if (comfirmCard > 10) {
    comfirmCard = 10;
  }

  handSum.push(comfirmCard);
  let total = handSum.reduce((sum, element) => sum + element);

  // Aを11と計算してバストしなければ11とする
  if (total < 12 && handSum.includes(1)) {
    total += 10;
  }

  return total;
};

export default Calculation;
