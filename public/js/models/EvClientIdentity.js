import uidgen from 'uid-safe';
/**
	This class encapsulates the identity of the client to use in any WebRTC comunication
*/
class EvClientIdentity{
	constructor(){
		this.uid = uidgen.sync(14);
		this.name = ""; 
	}
}
export default EvClientIdentity;