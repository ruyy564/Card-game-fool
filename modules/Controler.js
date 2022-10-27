//Класс,контролирующий игровой процесс.
class cController {
  constructor(View, Player, Computer, DeckOnTable, GameTable) {
    this.View = View;
    this.ModelPlayer = Player;
    this.ModelComputer = Computer;
    this.ModelDeck = DeckOnTable;
    this.ModelTable = GameTable;
  }
  //Начало игры.
  StartGame() {
    //Добавление элементов на HTML страницу.
    let divTurn = this.View.AddElementHTML('.Game', 'div', 'Turn', null);
    let divMSG = this.View.AddElementHTML('.Game', 'div', 'MSG', null);
    let divPlayer = this.View.AddElementHTML('.Game', 'div', 'Player', null);
    let divComputer = this.View.AddElementHTML(
      '.Game',
      'div',
      'Computer',
      null
    );
    let divTable = this.View.AddElementHTML('.Game', 'div', 'Table', null);
    let divTableAttack = this.View.AddElementHTML(
      '.Table',
      'div',
      'Attack',
      null
    );
    let divTableDefend = this.View.AddElementHTML(
      '.Table',
      'div',
      'Defend',
      null
    );
    let divCardDeck = this.View.AddElementHTML(
      '.Game',
      'div',
      'CardDeck',
      null
    );
    let buttonToMenu = this.View.AddElementHTML(
      '.Game',
      'button',
      'ToMenu',
      'To menu'
    );
    let buttonTake = this.View.AddElementHTML(
      '.Game',
      'button',
      'Take',
      'Take'
    );
    let buttonPass = this.View.AddElementHTML(
      '.Game',
      'button',
      'Pass',
      'Pass'
    );
    let buttonStop = this.View.AddElementHTML(
      '.Game',
      'button',
      'Stop',
      'Stop'
    );
    let Card, Field, Ref, Trump;

    //Убирает лишние кнопки.
    this.View.Hide('.Take');
    this.View.Hide('.Pass');
    this.View.Hide('.Start');
    this.View.Hide('.About');
    this.View.Hide('.Author');
    this.View.Hide('.Stop');
    this.View.Hide('.MSG');

    //Создание и тасовка колоды карт.
    this.ModelDeck.AddCardsInDeck(); //Создание колоды.
    this.ModelDeck.Shuffle(); //Тасовка карт.
    Trump = this.ModelDeck.AddTrump(); //Добавление карт-козырей.
    this.View.AddDivInHTML(this.ModelDeck._deck); //Отображение колоды карт.
    this.DropCards(); //Раздача карт.
    this.View.ViewTrump(Trump, true); //Делает карту-козырь заметной.
    this.ModelDeck.TheFirstTurn(); //Выбирает случайно кто ходит первым Player или Computer.
    this.View.ViewTurn(this.ModelDeck.Turn); //Отображение информации чей ход.

    //Если первый должен ходить Computer,то Computer ходит.
    let Check = this.CheckTurn();
    if (Check == this.ModelComputer) {
      this.ComputerAttack();
      this.View.Show('.Take');
    }
    return;
  }
  //Обработка хода Player.
  ProcessingTurn(SelectedCard, Ref) {
    let AttackPlayer = this.CheckTurn(); //Информация:кто атакует.

    //Если атакует Player.
    if (AttackPlayer == this.ModelPlayer) {
      let Check = this.PlayerAttack(SelectedCard, Ref); //Player атакует.
      if (Check) {
        //Если атака произошла,то Computer защищается.
        if (this.EndOfGame()) {
          //Проверка на окончание игры.
          return;
        }
        this.ComputerDefend(SelectedCard);
      }
    } else {
      //Если атакует Computer.
      let Check = this.PlayerDefend(SelectedCard, Ref); //Player защищается.
      if (Check) {
        //Если Player защитился,то Computer может снова атаковать.
        if (this.EndOfGame()) {
          //Проверка на окончание игры.
          return;
        }
        this.ComputerAttack();
      }
    }
  }
  //Условие окончания игры.
  EndOfGame() {
    //Если чья-либо рука пуста и пуста раздаточная колода,то игра окончена и возвращается значение true.
    if (
      (this.ModelDeck._deck.length == 0) &
      (this.ModelComputer._deck.length == 0 ||
        this.ModelPlayer._deck.length == 0)
    ) {
      if (this.ModelComputer._deck.length == 0) {
        //Если рука пуста у Computer,то Player проиграл.
        this.View.ShowAlert('You lost');
      } else {
        //Если рука пуста у Player,то Player выиграл.
        this.View.ShowAlert('You won');
      }
      this.ToMenu(true); //Выход в меню
      return true;
    }
    return false;
  }
  //К меню
  ToMenu(Check) {
    this.View.Menu(Check);
  }
  //Проверка:кто ходит.
  CheckTurn() {
    //Turn=1 - ходит Player;
    //Turn=0 - ходит Computer;
    if (this.ModelDeck.Turn) {
      return this.ModelPlayer;
    }
    return this.ModelComputer;
  }
  //Компьютер атакует.
  ComputerAttack() {
    let SelectedCard = null;
    SelectedCard = this.ModelComputer.ComputerAttack(); //Computer атакует.
    this.View.Show('.Take'); //Появляется кнопка Take.

    if (SelectedCard != null) {
      //Если Computer атаковал
      this.View.MoveCardFromHand(
        SelectedCard,
        null,
        '.Attack',
        true,
        '.Computer'
      ); //Перемещение карты из Руки на стол.
    } else {
      //Иначе
      this.PassCard(this.ModelComputer); //Computer делает Pass
      this.View.Hide('.Take'); //Убирается кнопку Take.
    }
    this.OpacityCard(); //Скрытие карт,которыми Player не может защищаться.
  }
  //Компьютер защищается.
  ComputerDefend(AttackCard) {
    let SelectedCard, Ref;
    if (this.ModelPlayer.dopTurn == 0) {
      //Если Player не забрасывает картами Computer.
      SelectedCard = this.ModelComputer.ComputerDefend(AttackCard); //Computer защищается.
    }
    if (SelectedCard != null) {
      //Если Computer защитился.
      this.View.MoveCardFromHand(
        SelectedCard,
        Ref,
        '.Defend',
        false,
        '.Computer'
      ); //Перемещение карты из Руки на стол.
      this.OpacityCard(); //Скрытие карт,которыми Player не может атаковать.
    } else {
      if (this.EndOfGame()) {
        //Проверка на конец игры.
        return;
      }
      this.View.ShowMessage('Press "Stop" to end the turn'); //Выводит сообщения на экран.
      this.View.Show('.Stop'); //Показывает кнопку Stop.
      this.ModelPlayer.dopTurn = 1; //Player теперь имеет возможность закидать картами Computer.
      return;
    }
  }
  //Остановка закидывания картами.
  Stop() {
    this.ModelPlayer.dopTurn = 0; //Player больше не может закидывать картами Computer.
    this.TakeCard(this.ModelComputer, '.Computer'); //Computer берет все карты на столе.
    this.View.Hide('.Stop'); //Убирается кнопку Stop.
    this.View.Hide('.Pass'); //Убирается кнопку Pass.
    this.OpacityCard(); //Скрытие карт,которыми Player не может атаковать.
  }
  //Взять карты для Player.
  TakeCardPlayer(Player, NamePlayer) {
    this.TakeCard(Player, NamePlayer); //Player берет карты.
    if (this.EndOfGame()) {
      //Проверка на конец игры.
      return;
    }
    this.View.Hide('.Take'); //Убирается кнопку Take.
    this.ComputerAttack(); //Computer атакует.
  }
  //Пасс для Player.
  PassCardPlayer(Player) {
    this.PassCard(Player); //Player делает Pass.
    if (this.EndOfGame()) {
      //Проверка на конец игры.
      return;
    }
    this.View.Hide('.Pass'); //Убирается кнопку Pass.
    this.ComputerAttack(); //Computer атакует.
  }
  //Взять карты.
  TakeCard(Player, NamePlayer) {
    this.OpacityCard(); //Скрытие карт,которыми Player не может походить.
    Player.TakeCard(Player._deck); //Игрок берет карты.
    this.View.TakeCard(NamePlayer);
    this.DropCards(); //Раздача карт.
    this.View.ShowMessage('T a k e n'); //Отоброжение сообщения.
  }
  //Раздача карт.
  DropCards() {
    let CountP, CountC;
    //Узнаем кол-во розданных карт.
    let lengthPlayer0 = this.ModelPlayer._deck.length;
    let lengthComputer0 = this.ModelComputer._deck.length;
    this.ModelDeck.DropCards();
    let lengthPlayer1 = this.ModelPlayer._deck.length;
    let lengthComputer1 = this.ModelComputer._deck.length;
    //Раздаем карты.
    this.DropCardsPlayer(
      this.ModelPlayer,
      '.Player',
      lengthPlayer0,
      lengthPlayer1
    );
    this.DropCardsPlayer(
      this.ModelComputer,
      '.Computer',
      lengthComputer0,
      lengthComputer1
    );
  }
  //Раздача карт Игроку.
  DropCardsPlayer(Player, Field, lengthPlayer0, lengthPlayer1) {
    for (let i = lengthPlayer0; i < lengthPlayer1; i++) {
      let Card = Player._deck[i]; //i-я карта из колоды.
      this.View.MoveCardFromDeck(Card, Field); //Перемецение div из колоды в руку игроку
    }
  }
  //Пасс.
  PassCard(Player) {
    Player.Pass(); //Игрок делает Pass.
    this.ModelTable.ClearTable(); //Очистка стола.
    this.View.ClearTable();
    this.DropCards(); //Раздача карт.
    this.ChangeTurn(); //Смена хода.
    this.View.ShowMessage('P a s s'); //Отоброжение сообщения.
  }
  //Player атакует.
  PlayerAttack(SelectedCard, Ref) {
    let Check = false;
    this.View.Show('.Pass'); //Отображение кнопки Pass.
    if (this.ModelPlayer.CheckContinueTurn()) {
      //Если не превышен лимит карт на столе.
      Check = this.ModelPlayer.CheckCardAttack(SelectedCard);
      if (Check) {
        //Если Player атаковал,то перемещает карту из Руки на стол.
        this.View.OpacityCard(Ref, false);
        this.ModelPlayer.Attack(SelectedCard);
        this.View.MoveCardFromHand(
          SelectedCard,
          Ref,
          '.Attack',
          true,
          '.Player'
        );
        this.OpacityCard(); //Скрытие карт,которыми не сожет ходить Player.
      }
    }
    return Check;
  }
  //Player защищается.
  PlayerDefend(SelectedCard, Ref) {
    //Вычисление последней атакующей карты.
    let index = this.ModelTable._defend.length;
    let AttackCard = this.ModelTable._attack[index];
    //Защита
    let Check = this.ModelPlayer.CheckCardDefend(SelectedCard, AttackCard);
    if (Check) {
      //Если Player смог защититься,то перемещает карту из Руки на стол.
      this.ModelPlayer.Defend(SelectedCard);
      this.View.MoveCardFromHand(
        SelectedCard,
        Ref,
        '.Defend',
        false,
        '.Player'
      );
    }
    return Check;
  }
  //Смена хода.
  ChangeTurn() {
    this.ModelDeck.ChangeTurn();
    //1-атакует Player;0-атакует Computer.
    if (this.ModelDeck.Turn == 1) {
      this.View.ViewTurn(true);
    } else {
      this.View.ViewTurn(false);
    }
  }
  //Внешний вид карт Player
  OpacityCard() {
    let Card, Ref, flag, RefAttackCard, AttackCard;
    //Перебор всех карт в руке Player.
    for (let i = 0; i < this.ModelPlayer._deck.length; i++) {
      Ref = this.View.ReadCardInHand(i, '.Player'); //Ссылка на i-ую карту в руке Player.
      Card = this.ModelPlayer._deck[i];
      if (this.ModelDeck.Turn == 1) {
        //Если ходит Player.
        if (this.ModelPlayer.CheckContinueTurn()) {
          flag = this.ModelPlayer.CheckCardAttack(Card); //Проверка:можно ли ходить картой.
        } else {
          flag = false;
        }
      } else {
        //Если ходит Computer.
        RefAttackCard = this.View.ReadCardInHand(
          this.ModelTable._attack.length - 1,
          '.Attack'
        ); //Вычисление ссылки на последнюю атакующую карту Computer.
        AttackCard = this.ReadDiv(RefAttackCard, this.ModelTable._attack);
        flag = this.ModelPlayer.CheckCardDefend(Card, AttackCard); //Проверка можно ли ходить.
        if (this.ModelTable._attack.length == this.ModelTable._defend.length) {
          flag = false;
        }
      }
      if (flag != true) {
        //Если картой ходить нельзя,то менять внешний вид карты.
        this.View.OpacityCard(Ref, true);
      } else {
        this.View.OpacityCard(Ref, false);
      }
    }
  }
  //Сопоставление карты в массиве с div.Возвращает выбранную карту из массива.
  ReadDiv(Ref, Place) {
    let SelectedCard;
    //Нахождение suit и range.
    let suit = this.View.ReadSuit(Ref);
    let range = this.View.ReadRange(Ref);
    //Поиск карты в массиве.
    for (let i = 0; i < Place.length; i++) {
      if ((Place[i].range == range) & (Place[i].suit == suit)) {
        SelectedCard = Place[i];
        break;
      }
    }
    return SelectedCard;
  }
}
