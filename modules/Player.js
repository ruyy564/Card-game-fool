//Класс игрок.
class cPlayer extends OperationsWithCards{
	constructor(table,enemy){
		super();
		this._table=table;
		this._enemy=enemy;
		this.dopTurn=0;
	}
	set Table(table){
		this._table=table;
	}
	set Enemy(enemy){
		this._enemy=enemy;
	}
	//Атаковать выбранной картой.
	Attack(SelectedCard){
		//Перемещает карту в зону атаки.
		this.MoveCardFromHand(SelectedCard,true);
	}
	//Защититься выбранной картой.
	Defend(SelectedCard){
		//Перемещает карту в зону защиты.
		this.MoveCardFromHand(SelectedCard,false);
	}
	
	//Перемещение из массива Руки в массив стола 
	MoveCardFromHand(Card,PlayerAttack){
		this.DeleteCard(Card);			//Удаляет карту из руки.
		if (PlayerAttack==true){		//Если Игрок атакует,то перемещает в зону атаки.
			this._table.attack=Card;
		}else{							//Если Игрок защищается,то перемещает в зону защиты.
			this._table.defend=Card;
		}
		
	}
	//Проверка:можно ли продолжить ход.
	CheckContinueTurn(){
		if((this._enemy._deck.length!=0)&(this._table._attack.length<6)&(this._enemy._deck.length+this._table._defend.length>this._table._attack.length)){
			return true;
		}
		return false;
	}
	//Проверка: можно ли картой атаковать.Возращает true, если можно.
	CheckCardAttack(SelectedCard){
		//Проверка:если у противника нет карт,то нельзя атаковать,а также больше 6 карт за ход положить на стол нельзя.
		
			if(this._table._attack.length!=0){									//Если ход не первый.
				for(let i=0;i<this._table._attack.length;i++){					//Поиск карт с таким же рангом.
					if(SelectedCard.range==this._table._attack[i].range){		//Если такие карты найдены,то атаковать можно.
						return true;
					}
				}
			}else{																//Если первый ход,то атаковать можно.
				return true;
			}
			if(this._table._defend.length!=0){									
				for(let i=0;i<this._table._defend.length;i++){					//Поиск карт с таким же рангом.
						if(SelectedCard.range==this._table._defend[i].range){	//Если такие карты найдены,то атаковать можно.
							return true;
						}
					}
			}
		
		return false;
	}
	//Проверка : можно ли картой защититься.Возращает true, если можно.
	CheckCardDefend(SelectedCard,AttackCard){
		for(let i=0;i<this._table._attack.length;i++){					//Поиск атакующей карты
			if (this._table._attack[i]==AttackCard) {					
				if(SelectedCard.cost>AttackCard.cost){					//Если выбранная карта стоит дороже.
					if(SelectedCard.cost>14){							//Если выбранная карта козырь,то защититься можно.						
						return true;
					}else if(SelectedCard.suit==AttackCard.suit){		//Если карты одной масти,то защититься можно.	 
						return true;
					}
				}
			}
			
		}
	return false;	
	}
	//Взять карты.
	TakeCard(Player){
		//Удаляет карты со стола и добавляет в руку игроку.
		while(this._table._attack.length!=0){
			let Card=this._table._attack.pop();	//Удаление последней карты из раздаточной колоды.
			Player.push(Card);					//Добавление карты в массив Player
		}
		while(this._table._defend.length!=0){
			let Card=this._table._defend.pop();	//Удаление последней карты из раздаточной колоды.
			Player.push(Card);					//Добавление карты в массив Player
		}
	return false;	
	}
	//Бита
	Pass(){
		//Очистка стола.
		while(this._table._attack.length!=0){
			let Card=this._table._attack.pop();	
		}
		while(this._table._defend.length!=0){
			let Card=this._table._defend.pop();	
		}
	return true;
	}
	
}