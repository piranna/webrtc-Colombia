import $ from 'jquery';

class EvClientsDrawer{

	drawHtmlClients(clients){

		let htmlToPrint = '<ul class="clientsList">';
		for (let i = 0 ; i < clients.clients.length; i++){
			htmlToPrint += '	<li class="clientList__client" data-cltid="'+clients.clients[i].uid+'">'+clients.clients[i].name+'</li>';
		}
		htmlToPrint += '</ul>';
		$(".users").html(htmlToPrint);

	}

}

export default EvClientsDrawer;

