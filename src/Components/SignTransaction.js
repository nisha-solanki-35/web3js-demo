import React from 'react'
import PropTypes from 'prop-types'
import Web3 from 'web3'
import { Button } from 'reactstrap';

const SignTransaction = props => {
  // const { accountAddress } = props

  // console.log('accountAddress', accountAddress)
  async function payMeta() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    await window.ethereum.enable()
    const network = await web3.eth.net.getNetworkType()
    console.log('network',network)
    const accountAddress = await web3.eth.getAccounts()
    console.log('accountAddress', accountAddress[0])
    const nonce = await web3.eth.getTransactionCount(accountAddress[0])
    console.log('nonce', nonce)
    const receiver = '0x8553C5FE108aDF72ADfc4F853F8b464E0BB0AadF'
    const valueToSend = web3.utils.toWei('1')
    try {
      // const transaction = {
      //   // from: accountAddress[0],
      //   to: receiver,
      //   value: '1000000000',
      //   gas: 2000000,
      //   nonce: nonce
      // }
      const pvtKey = '2118fa66e6f546e0d62ec0c4434d6d6eaa31f34fa492daae6c7f52cc2d7bbd18'
      // const sendHash = web3.eth.accounts.signTransaction(transaction, pvtKey)
      web3.eth.accounts.signTransaction({
        from: accountAddress[0],
        to: receiver,
        value: valueToSend,
        gas: 21000,
        // nonce: nonce
      }, pvtKey).then(transaction => {
        console.log('transaction', transaction)
        web3.eth.sendSignedTransaction(transaction.rawTransaction).then(obj => {
          console.log('obj', obj)
        })
      })
      // console.log('txnHash is ' + (await sendHash).events)
    } catch(e) {
        console.log("payment fail!")
        console.log(e)
    }
  }

  return (
    <Button color='primary' onClick={() => payMeta()}>Sign Transaction</Button>
  )
}

SignTransaction.propTypes = {}

export default SignTransaction