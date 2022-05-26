import React from 'react'
import PropTypes from 'prop-types'
import Web3 from 'web3';
import { Button } from 'reactstrap';

const SignTransactionL = props => {

  async function payMeta(sender, receiver, strEther, msged) {
    console.log(`payWithMetamask(receiver=${receiver}, sender=${sender}, strEther=${strEther})`)
    try {
    const params = {
        from: sender,
        to: receiver,
        value: strEther,
        gas: 39000
    };
        await window.ethereum.enable();
        window.web3 = new Web3(window.ethereum);    
        const sendHash = window.web3.eth.sendTransaction(params);
        console.log('txnHash is ' + sendHash);
    } catch(e) {
        console.log("payment fail!");
        console.log(e);
        msged(<p>Can't connect MetaMask. Please check MetaMask.</p>);   
    }
  }

  return (
    <Button color='primary' onClick={() => payMeta()}>SignTransactionL</Button>
  )
}

SignTransactionL.propTypes = {}

export default SignTransactionL