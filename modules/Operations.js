
//Родитель классов колоды.
class OperationsWithCards{
	//Конструктор класса Deck.
	constructor(){
		this._deck=[];
	}
	//Очистка массива deck.
	ClearDeck(){
		this._deck=[];
	}
	//Получение элементов массива deck.
	get Deck(){
		return this._deck;
	}
	//Добавление нового элемента в массив.
	set Deck(Card){
		this._deck.push(Card);
	}
	//Удаление последней карты из массива.
	DeleteLastCard(){
		return this._deck.pop();
	}
	//Удаление Card  из массива. 
	DeleteCard(Card){
		//Поиск карты,которую нужно удалитьи смещение массива на один элемент.
		for(let i=0;i<this._deck.length;i++){
			if (Card==this._deck[i]){
				for(let j=i;j<this._deck.length;j++){
					this.Deck[j]=this._deck[j+1];
				}
				break;
			}
		}
		this.DeleteLastCard();
		return Card;
	}
	
	
}