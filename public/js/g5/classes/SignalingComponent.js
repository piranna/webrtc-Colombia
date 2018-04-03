import io from "socket.io-client";
import $ from "jquery";

class SignalingComponent {

	constructor(socketEndPoint){
		/* Conecta al servidor de sockets */
		this.socket = io(socketEndPoint);
		this.clients = [];
		this.socket.on('message',(data)=>{
			//console.log(data);
			if (typeof data.type != 'undefined'){
				switch (data.type){

					case 'joined':
						break;
					case 'no joined':
						break;
					case 'connected':
						this.onConnected(data);
						break;
					case 'new connection':
						this.onNewConnection(data);
						this.displayClients();
						break;
					case 'all clients':
						console.log("Getting request: all clients");
						this.setClients(data.clients);
						this.displayClients();
						break;

				}
			}

		});

		this.socket.on('error',(data)=>{
			console.log(data);
		});
		/* Binding local functions */
		this.onJoined = this.onJoined.bind(this);
		this.onNewConnection = this.onNewConnection.bind(this);
		this.onConnected = this.onConnected.bind(this);
		this.setClients = this.setClients.bind(this);
		this.displayClients = this.displayClients.bind(this);
		
	}

	onJoined(data){		

	}

	onNewConnection(data){

		if (data.id == this.socket.id){
			return false;
		}
		for (let i = 0 ; i <this.clients.length; i++){

			if (this.clients[i] == data.id){
				return false;
			}
		}
	
		console.log("Un nuevo socket se ha conectado, solicito todos usuarios conectados...");
		this.socket.emit('message',{
			topic:'getallclients',
			info: this.socket.id
		});

	}

	onConnected(data){
		/*
		this.setClients(data.clients);
		this.displayClients()
		*/
		console.log("Me he conectado, ahora solicito usuarios conectados...");
		this.socket.emit('message',{
			topic:'getallclients',
			info: this.socket.id
		});

	}

	setClients(clients){

		this.clients = [];
		for (let i = 0 ; i < clients.length; i++){
			if (clients[i] != this.socket.id){
				this.clients.push(clients[i]);
			}
		}

	}

	join(room){

	}

	displayClients(){

		$(".user-list ul").html(`<li>
			<span data-id="${this.socket.id}">Me</span>
			</li>`);

		for (let i = 0 ; i <this.clients.length; i++){
			$(".user-list ul").append(`<li>
			<span data-id="${this.clients[i]}">${this.clients[i]}</span>
			</li>`)
		}

	}


}

export default SignalingComponent;