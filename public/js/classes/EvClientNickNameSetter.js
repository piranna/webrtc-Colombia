import $ from 'jquery';

class EvClientNickNameSetter{

	constructor(){
	}

	getNickName(){
		let nick = this.showPrompt();
		if (this.validateNickName(nick)){
			return nick;
		}
		else{

			alert ("Invalid nickname, please try again");
			return this.getNickName();
		}
	}

	showPrompt(){
		let tmpNick = window.prompt("Set your nickname...");
		return tmpNick;
	}


	validateNickName(nick){

		if (typeof nick != 'String' && nick == ''){
			return false;
		}
		return true;
	}

}


export default EvClientNickNameSetter;