const balance = 1200;
const bonusBalance = 80;
const isBanned = false;
const isErist = false;
const isSelling = true;

if (
  (balance >= 1000 || bonusBalance >= 100) &&
  !isBanned &&
  !isErist &&
  isSelling
) {
  console.log('Вы можете купить игру!');
} else {
  console.log('Вы не можете купить игру :(');
}
