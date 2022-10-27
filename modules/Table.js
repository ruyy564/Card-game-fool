//Класс игральный стол.
class cTable {
  constructor(computer, player) {
    this._computer = computer; //Ссылка на экземпляр класса cComputer.
    this._player = player; //Ссылка на экземпляр класса cPlayer.
    this._attack = []; //Массив карт,которые выставляются на атаку.
    this._defend = []; //Массив карт,которые выставляются на защиту.
  }
  set computer(computer) {
    this._computer = computer;
  }
  set player(player) {
    this._player = player;
  }
  //Положить карту в атаку.
  set attack(card) {
    this._attack.push(card);
  }
  //Положить карту в защиту.
  set defend(card) {
    this._defend.push(card);
  }
  //Очищение стола.
  ClearTable() {
    for (let i = 0; i < this._defend.length; i++) {
      this._defend.pop();
    }
    for (let i = 0; i < this._attack.length; i++) {
      this._attack.pop();
    }
  }
}
