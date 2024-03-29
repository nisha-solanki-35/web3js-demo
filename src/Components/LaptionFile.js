import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button } from 'reactstrap'
// import PropTypes from 'prop-types'
import Web3 from 'web3'

const Wallet = props => {

  const accounts = useRef('')
  const transaction = useRef('')
  const transactionCount = useRef('')
  const [loading, setLoading] = useState(false)

  const handleWallet = async () => {
    try {
      // console.log('web3', web3)
      // const provider = window.ethereum
      // const metaAccount = await provider.request({ method: 'eth_requestAccounts'})
      // console.log('metaAccount', metaAccount)
      // const accounts = await provider.request({ method: 'eth_getAccounts'})
      // const acnts = await web3.eth.getAccounts();
      // accounts.current = acnts
      // const trnsctn = await web3.eth.getTransaction('0xdcbaa4d21d5f06216c95c3be46d5b52bb5e1bd2cc885fedafd76d013f7163b7d')
      // transaction.current = trnsctn
      // // const pendingTransaction = await web3.eth.getPendingTransactions()
      // const transactionCnt = await web3.eth.getTransactionCount(acnts[0])
      // transactionCount.current = transactionCnt
      // const transactionReceipt = await web3.eth.getTransactionReceipt(transaction?.current.hash)
      // console.log('accounts', accounts)
      // console.log('acnts[0]', acnts[0])
      // console.log('transaction', transaction)
      // // console.log('pendingTransaction', pendingTransaction)
      // console.log('transactionCount', transactionCount)
      // console.log('transactionReceipt', transactionReceipt)
      setLoading(false)
    } catch (error) {
      alert(error?.message)
      console.log('error', error)
    }
  }
  
  async function enableEth () {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
    await window.ethereum.enable()
    const network = await web3.eth.net.getNetworkType()
    console.log('network',network)
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log('accounts', accounts)
    setLoading(true)
    handleWallet()
  }

  return (
    <Fragment>
      <Button onClick={enableEth}>Enable Ethereum</Button>
      {loading ? 
        <h3>Loading...</h3>
      : <Fragment>
        <h3>Transaction Details</h3>
        <table>
          <tbody>
            <tr>
              <td>Hash</td>
              <td>{transaction?.current?.hash}</td>
            </tr>
            <tr>
              <td>Gas</td>
              <td>{transaction?.current?.gas}</td>
            </tr>
            <tr>
              <td>Gas Price</td>
              <td>{transaction?.current?.gasPrice}</td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{transaction?.current?.value}</td>
            </tr>
            <tr>
              <td>Nonce</td>
              <td>{transaction?.current?.nonce}</td>
            </tr>
            <tr>
              <td>Sender Address</td>
              <td>{transaction?.current?.from}</td>
            </tr>
            <tr>
              <td>Reciever Address</td>
              <td>{transaction?.current?.to}</td>
            </tr>
          </tbody>
        </table>
        <h4>Transaction Count: {transactionCount.current}</h4>
      </Fragment>}
    </Fragment>
  )
}

// Wallet.propTypes = {

// }

export default Wallet
