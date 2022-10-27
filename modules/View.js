//Класс интерфейса.
class cView {
  //Показ сообщения.
  ShowMessage(Massage) {
    let divMSG = document.querySelector('.MSG');
    divMSG.innerText = Massage; //Текст сообщения.
    divMSG.style.display = 'flex';
    setTimeout(this.Hide, 1500, '.MSG'); //Прекратить показ сообщения
  }
  //Показ лицевой части карты.
  ShowCard(SelectedCard, Ref) {
    //Замена Класса Back у карты на класс с ее лицевой стороной.
    Ref.className = SelectedCard.suit + '_' + SelectedCard.range;
  }
  //Скрытие лицевой части карты.
  HideCard(SelectedCard) {
    //Замена у карты класс лицевой сторона на класс Back.
    SelectedCard.className = 'Back';
    SelectedCard.style.backgroundImage = '';
  }
  //Создание div-ов с картами.
  AddDivInHTML(Deck) {
    //Создание карт.
    for (let i = 0; i < Deck.length; i++) {
      let Card = document.createElement('div');
      let PlayingField = document.querySelector('.CardDeck');
      Card.className = 'Back';
      Card.setAttribute('id', 'Card');
      Card.style.zIndex = 1;
      Card.style.position = 'absolute';
      PlayingField.appendChild(Card);
    }
  }
  //Отображение козыря.
  ViewTrump(Trump, Check) {
    let Ref = document.querySelector('.CardDeck').children[0];
    let divDeck = document.querySelector('.CardDeck');

    if (Check == true) {
      this.ShowCard(Trump, Ref);
      switch (Trump.suit) {
        case 'Hearts':
          divDeck.style.backgroundImage = "url('../deck/4.png')";
          break;
        case 'Diamonds':
          divDeck.style.backgroundImage = "url('../deck/1.png')";
          break;
        case 'Clubs':
          divDeck.style.backgroundImage = "url('../deck/3.png')";
          break;
        case 'Spades':
          divDeck.style.backgroundImage = "url('../deck/2.png')";
          break;
      }
      Ref.style.transform = 'rotate(90deg)';
      Ref.style.zIndex = 0;
      Ref.style.left = '50%';
    } else {
      Ref.style.transform = 'rotate(0deg)';
      Ref.style.zIndex = 1;
      Ref.style.left = '';
    }
  }
  //Перемещение карты из колоды в руку Player/Computer.
  MoveCardFromDeck(Card, FieldName) {
    let divCardDeck = document.querySelector('.CardDeck');
    let Ref = divCardDeck.children[divCardDeck.children.length - 1]; //Ссылка на div
    let Field = document.querySelector(`${FieldName}`);
    Ref.remove(); //Удаление div элемента с div Deck.
    Field.appendChild(Ref); //Добавлене div элемента в div Player(Computer/player).

    Ref.style.position = 'relative';
    Ref.style.margin = '-20px';

    if (Field.className == 'Player') {
      //Если карта перемещается в руку Player,то показать лицевую сторону карты.
      this.ShowCard(Card, Ref);
    } else {
      this.HideCard(Ref);
    }
    if (divCardDeck.children.length == 1) {
      this.ViewTrump(divCardDeck.children[0], false); //Если остался в колоде только козырь,то перевернуть его.
    }
  }
  //Перемещение карты из руки на стол.
  MoveCardFromHand(Card, Ref, FieldName, PlayerAttack, Player) {
    let Field = document.querySelector(`${FieldName}`);
    let divHand = document.querySelector(`${Player}`);
    if (Player == '.Computer') {
      Ref = divHand.children[0]; //Ссылка на первую карту.
    }

    Ref.remove(); //Удаление карты.
    Field.appendChild(Ref); //Добавление карты.
    Ref.style.margin = '5px';
    Ref.style.top = '';

    if (PlayerAttack == true) {
      Ref.style.transform = 'rotate(-10deg)'; //Если игрок атакует,то повернуть карту на -10 град.
    } else {
      Ref.style.transform = 'rotate(10deg)'; //Если игрок защищается,то повернуть карту на 10 град.
    }
    this.ShowCard(Card, Ref);
  }
  //Отображение надписи с ходом.
  ViewTurn(Turn) {
    let divTurn = document.querySelector('.Turn');
    //Turn=1 - ходит Player;Turn=0 - ходит Computer;
    if (Turn) {
      divTurn.innerText = 'Your turn';
    } else {
      divTurn.innerText = 'Opponent turn';
    }
  }
  //Скрыть блок.
  Hide(Name) {
    let Div = document.querySelector(`${Name}`);
    if (Div != null) {
      Div.style.display = 'none'; //Скрывает блок.
    }
  }
  ShowAlert(MSG) {
    alert(`${MSG}`);
  }
  //Переход в меню.
  Menu(Check) {
    if (Check) {
      document.location.href = 'menu.html';
    } else {
      if (confirm('Выйти в главное меню?')) {
        document.location.href = 'menu.html';
      }
    }
  }
  //Показать блок.
  Show(Name) {
    let Div = document.querySelector(`${Name}`);
    Div.style.display = 'inline-block'; //Показывает блок.
  }
  //Добавить элемент на HTML страницу.
  AddElementHTML(Place, Tag, ClassName, Name) {
    let divGame = document.querySelector(`${Place}`); //Место, в которое нужно добавить элемент.
    let Element = document.createElement(`${Tag}`); //Тэг добавляемого элемента.
    Element.className = `${ClassName}`; //Имя класса добавляемого элемента.
    if (Name != null) {
      Element.innerText = `${Name}`;
    }
    divGame.appendChild(Element); //Добавление элемента.
    return Element;
  }
  //Очистить стол.
  ClearTable() {
    //Обращение к столу.
    let divTableAttack = document.querySelector('.Attack');
    let divTableDefend = document.querySelector('.Defend');
    let length;

    //Удаление вложенных элементов стола
    length = divTableAttack.children.length;
    for (let i = 0; i < length; i++) {
      divTableAttack.children[0].remove();
    }
    length = divTableDefend.children.length;
    for (let i = 0; i < length; i++) {
      divTableDefend.children[0].remove();
    }
  }
  //Взять карты.
  TakeCard(NamePlayer) {
    let length, Ref;
    //Обращение к столу.
    let divTableAttack = document.querySelector('.Attack');
    let divTableDefend = document.querySelector('.Defend');

    //Обращение к руке игрока.
    let Player = document.querySelector(`${NamePlayer}`);

    //Для стола-атаки.
    length = divTableAttack.children.length;
    //Перебор всех карт на столе.
    for (let i = length - 1; i >= 0; i--) {
      //Возвращение в исходное состояние.
      Ref = divTableAttack.children[i];
      Ref.style.transform = 'rotate(0deg)';
      Ref.style.margin = '-20px';
      divTableAttack.children[i].remove(); //Удаление карты со стола.
      Player.appendChild(Ref); //Добавление карты в руку.
      if (Player.className == 'Computer') {
        //Если игрок-компьютер,то перевернуть карту.
        this.HideCard(Ref);
      }
    }
    //Для стола-защиты.
    length = divTableDefend.children.length;
    //Перебор всех карт на столе.
    for (let i = length - 1; i >= 0; i--) {
      //Возвращение в исходное состояние.
      Ref = divTableDefend.children[i];
      Ref.style.transform = 'rotate(0deg)';
      Ref.style.margin = '-20px';
      divTableDefend.children[i].remove(); //Удаление карты со стола.
      Player.appendChild(Ref); //Добавление карты в руку.
      if (Player.className == 'Computer') {
        //Если игрок-компьютер,то перевернуть карту.
        this.HideCard(Ref);
      }
    }
  }
  //Чтение suit.Возвращает suit.
  ReadSuit(Ref) {
    let suit = '';
    let j = 0;
    //Нахождение suit.
    for (let i = 0; i < Ref.className.length; i++) {
      if (Ref.className[i] == '_') {
        j = i + 1;
        break;
      }
      suit += Ref.className[i];
    }
    return suit;
  }
  //Чтение range.Возвращает range.
  ReadRange(Ref) {
    let range = '';
    let j = 0;
    //Нахождение range.
    for (let i = 0; i < Ref.className.length; i++) {
      if (Ref.className[i] == '_') {
        j = i + 1;
        break;
      }
    }
    for (j; j < Ref.className.length; j++) {
      range += Ref.className[j];
    }
    return range;
  }
  //Удаление игрового поля.
  DeleteGameField() {
    let divGame = document.querySelector('.Game');
    divGame.remove();
  }
  //Чтение карты по номеру в руке.
  ReadCardInHand(number, Field) {
    let divCards = document.querySelector(`${Field}`);
    let Ref = divCards.children[number];
    return Ref;
  }
  //Отображение карт Player.
  OpacityCard(Ref, flag) {
    if (flag) {
      //Если flag=true.
      Ref.style.opacity = '0.5';
      Ref.style.top = '30px';
    } else {
      Ref.style.top = '';
      Ref.style.opacity = '1';
    }
  }
}
