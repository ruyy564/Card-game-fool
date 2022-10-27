//Курсовая работа.Карточная игра "Дурак".
//Выполнил:Климкин К.С. ст.гр.8413.

'use strict';

/*-----------------------------------------------------*/
/*               Основная программа                    */
/*-----------------------------------------------------*/

//Создание экземпляров классов.
let Player = new cPlayer();
let GameTable = new cTable();
let Computer = new cComputer();
let DeckOnTable = new DeckOfCardsOnTable(Player, Computer);
let View = new cView();
let Controller = new cController(
  View,
  Player,
  Computer,
  DeckOnTable,
  GameTable
);

//Добавление связи между экземплярами классов.
GameTable.Computer = Computer;
GameTable.Player = Player;
Player.Table = GameTable;
Player.Enemy = Computer;
Computer.Table = GameTable;
Computer.Enemy = Player;

//Начать игру.
Controller.StartGame();

//События при нажатии на кнопки.
document.addEventListener('click', function (event) {
  //Нажатие на кнопку ToMenu
  if (event.target.className == 'ToMenu') {
    Controller.ToMenu();
  }
  //Нажатие на кнопку Take
  if (event.target.className == 'Take') {
    Controller.TakeCardPlayer(Player, '.Player');
  }
  //Нажатие на кнопку Pass
  if (event.target.className == 'Pass') {
    Controller.PassCardPlayer(Player);
  }
  //Нажатие на кнопку Stop
  if (event.target.className == 'Stop') {
    Controller.Stop();
  }
});
//Событие при нажатии на карту
document.addEventListener('click', function (event) {
  if ((event.target.id == 'Card') & (event.target.offsetParent != null)) {
    if (event.target.offsetParent.className == 'Player') {
      //Если выбрана карта,которая находится в руке Player
      let SelectedCart = Controller.ReadDiv(event.target, Player._deck); //Поиск выбранной карты в массиве Player.
      Controller.ProcessingTurn(SelectedCart, event.target); //Обработка хода игрока.
    }
  }
});
