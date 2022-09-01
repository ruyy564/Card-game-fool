//Класс колода карт.
class DeckOfCardsOnTable extends OperationsWithCards{
	constructor(player,computer){
		super();
		//Ссылки на экземпляры классов:cPlayer,cComputer;Индикатор хода.
		this._player=player;
		this._computer=computer;
		this.Turn=0;
	}
	//Добавление карт в колоду.
	AddCardsInDeck(){
		let suits=['Hearts','Diamonds','Clubs','Spades'];
		let ranges=[6,7,8,9,10,'Jack','Queen','King','Ace'];

		for(let suit of suits){
			for(let range of ranges){
				//Расчет стоимости карты.
				let cost=this.CalculateCost(0,range);
				//Добавление карты в массив.
				this._deck.push(new cCard(suit,range,cost));
			}
		}
	}
	//Расчет ценности определенной карты с учетом козыря.
	CalculateCost(cost,range){
	//В зависимости от range выбирается стоимость карты.
		switch(range){
			case "Jack":
				cost=11;
				break;
			case "Queen":
				cost=12;
				break;
			case "King":
				cost=13;
				break;
			case "Ace":
				cost=14;
				break;
			default:
				cost=range;
				break;
		}
		return cost;
	}
	//Тасовка карт.
	Shuffle(){
		for (let i = 0; i < 1000; i++){
			let location1 = Math.floor((Math.random() * this._deck.length));
			let location2 = Math.floor((Math.random() * this._deck.length));
			let tmp = this._deck[location1];

			this._deck[location1] = this._deck[location2];
			this._deck[location2] = tmp;
	    }
	    if(this._deck[23].range=='Ace'){					//Если козырем должен стать Туз,то перемешать колоду еще раз.
			this.Shuffle();
		}
	}
	//Раздача карт игрокам.
	DropCards(){
	//Если ходит Player первым,то сначала ему раздаются карты,иначе Computer.s
		if (this.Turn==1){
			this.DropCardsPlayer(this._player);
			this.DropCardsPlayer(this._computer);	
		}else{
			this.DropCardsPlayer(this._computer);
			this.DropCardsPlayer(this._player);
		}
		
	}
	//Определить кто ходит первым.
	TheFirstTurn(){
		//Записывает в Turn случайным образом либо 1,либо 0.
		this.Turn=Math.floor(Math.random() * 2);
	}
	//Смена хода.
	ChangeTurn(){
		//Turn=1 - ходит Player;Turn=0 - ходит Computer.
		//Если ходил Player,то Turn станет равным 0.
		if(this.Turn){
			this.Turn=0;
		}else{
			this.Turn=1;
		}
	}
	//Раздача карт игроку.
	DropCardsPlayer(Player){
		let Card
		//Раздавать до тех пор,пока в руке не будет 6 карт или раздаточная колода не закончится.
		while((Player._deck.length<6)&(this._deck.length!=0)){
			Card=this.DeleteLastCard();			//Удаление карты из раздаточной колоды
			Player.Deck=Card;					//Добавление карты в массив Player
		};
		return;
	}
	//Добавление козырей.
	AddTrump(){
		let Trump;
		Trump=this.DeleteCard(this._deck[23]);	//Следущая карта,после первой раздачи
		this._deck.unshift(Trump);				//Добавление карты в начало	
		for(let i=0;i<this._deck.length;i++){	//Пересчет стоимости карт-козырей
			if(Trump.suit==this._deck[i].suit){
				this._deck[i].cost+=9;
			} 
		}
	return Trump;
	}	
};