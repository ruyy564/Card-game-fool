
//Класс компьютер.
class cComputer extends cPlayer{
	//Логика атаки компьютера.
	ComputerAttack(){
		let SelectedCard=null;
		if(this.CheckContinueTurn()){
			let minCardCost=30;
			for(let i =0;i<this._deck.length;i++){
				if(minCardCost>this._deck[i].cost){
					if((this.CheckCardAttack(this._deck[i])==true)||(this._table._attack.length==0)){
						minCardCost=this._deck[i].cost;
						SelectedCard=this._deck[i];
					}
				}
			}
			if(SelectedCard!=null){
				this.Attack(SelectedCard);
			}
		}
		
	return SelectedCard; 
	}
	//Логика защиты компьютера.
	ComputerDefend(AttackCard){
		let minCardCost=30;
		let SelectedCard=null;
		//Поиск карты с наименьшей стоимостью,которой можно защититься.
		for(let i=0;i<this._deck.length;i++){
			if(this.CheckCardDefend(this._deck[i],AttackCard)==true){
				if(minCardCost>this._deck[i].cost){
					minCardCost=this._deck[i].cost;
					SelectedCard=this._deck[i];
				}
			}
		}
		if (minCardCost!=30){							//Если такая карта найдена.
			this.Defend(SelectedCard,AttackCard);		//Произвести защиту.
			return SelectedCard;
		}
	return 	SelectedCard;
	}
}