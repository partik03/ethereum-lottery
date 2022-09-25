import Web3 from "web3";

const getWeb3 = () => {
 return new Promise((resolve, reject) => {

        window.addEventListener("load",async()=>{
            if(window.ethereum){
                const web3 = new Web3(window.ethereum);
                try{
                    await window.ethereum.enable();
                    resolve(web3);
                }catch(e){
                    reject(e);
                }
            
            }
            else if(window.web3){
                const web3 = new Web3(window.web3.currentProvider);
                resolve(web3);
            }
        })
    })
}

export default getWeb3;