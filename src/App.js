import './App.css';
import getWeb3 from './web3';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
// import lottery from './lottery';
function App() {
  const [web3, setWeb3] = useState();
  const valueRef = useRef()
  const [manager, setManager] = useState();
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState()
  const [balance, setBalance] = useState();
  const [winner, setWinner] = useState()
  // let lotteryContract;
  // alert(players[0])
  const [lotteryContract, setLotteryContract] = useState()
  const address ="0x322D74314F607eA9db68f49A13fF7ef9e19eeb63";
  const abi = [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
  useEffect(() => {
    const init = async () => {
      try {
        console.log("euhxub");
        const x = await getWeb3();
        setWeb3(x);
        console.log(x);
          console.log("web3");
          x.eth.getAccounts().then(e=>{
           console.log(e);
          });
           const lottery = new x.eth.Contract(abi,address);
           console.log(lottery);
           const manager = await lottery.methods.manager().call();
           const players = await lottery.methods.getPlayers().call();
           const balance = await x.eth.getBalance(lottery.options.address);
           console.log(players);
           setLotteryContract(lottery);
           setManager(manager);
           setPlayers(players);
           setBalance(balance);
           console.log(manager);
      } catch (error) {
        console.log(error);
      }
    };
   
    init();
  }, [web3,lotteryContract]);
//  console.log(web3);
if(web3 && lotteryContract){
  console.log(web3);
  console.log(lotteryContract);
}
const enterPlayer =async(e)=>{
  e.preventDefault();
  console.log("enter");
  const accounts = await web3.eth.getAccounts();
  setStatus("Waiting on transaction success...");
  await lotteryContract.methods.enter().send({
    from:accounts[0],
    value:web3.utils.toWei(valueRef.current.value,'ether') 
  })
  setStatus("You have been entered!");
}
const pickwinner=async()=>{
  console.log("pick");
  const accounts = await web3.eth.getAccounts();
  setStatus("Waiting on transaction success...");
  const winner =  await lotteryContract.methods.pickWinner().send({
    from:accounts[0],
  })
  setWinner(winner);
  console.log(winner);
  setStatus("A winner has been picked!");
}

 

  return (
   <>
  {manager && balance && players && lotteryContract && web3 &&
  <>
  <h1 className='text-red-800'>Manager account is :-{manager}</h1> 
  <h1 className='text-red-800'>Balance is :-{balance/web3.utils.toWei("1",'Ether')}</h1> 
  <h1 className='text-red-800'>Players account is :-{players[0]}</h1> 
  {/* <h1 className='text-red-800'>Players account is :-{web3.utils}</h1>  */}
  </>
  }
  <form className='flex items-start flex-col w-1/2 mx-5' onSubmit={enterPlayer}>
    <h3 className='text-black text-6xl font-medium'>Want to try your luck?</h3>
    {/* <label htmlFor="eth">Eth</label> */}
    <input type="text" name='eth' className='py-2 px-3 text-2xl w-1/2 outline-black outline-1 border-solid border-black border-2 my-4' placeholder='Enter the amount of Eth' ref={valueRef} />

    <button className='w-1/2 bg-red-700 text-white py-3 rounded text-2xl font-medium'>Enter</button>
  </form>
  {
    status && 
    
    <h1 className='text-4xl font-extrabold'>{status}</h1>
}
    <h1 className='text-4xl font-extrabold m-3'>Time to pick a winner?</h1>
    <button className='w-1/2 bg-red-700 text-white py-3 rounded text-2xl font-medium' onClick={pickwinner}>Pick Winner</button>
    {/* {
      winner && 
      <h1 className='text-4xl font-extrabold'>{winner}</h1>

    } */}
   </>
  );
}

export default App;
