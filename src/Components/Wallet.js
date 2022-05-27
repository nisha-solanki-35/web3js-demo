import React, { Fragment, useRef, useState } from 'react'
import { Button } from 'reactstrap'
// import PropTypes from 'prop-types'
import Web3 from 'web3'
import SignTransaction from './SignTransaction'

const Wallet = props => {
  const [accounts, setAccounts] = useState('')
  const transaction = useRef('')
  const transactionCount = useRef('')
  const [loading, setLoading] = useState(false)

  const handleWallet = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider)
      // console.log('web3', web3)
      // const provider = window.ethereum
      // const metaAccount = await provider.request({ method: 'eth_requestAccounts'})
      // console.log('metaAccount', metaAccount)
      // const accounts = await provider.request({ method: 'eth_getAccounts'})
      const acnts = await web3.eth.getAccounts()
      accounts.current = acnts
      console.log('acnts[0]', acnts[0])
      const coinBase = await web3.eth.getBlockNumber()
      console.log('coinBase', coinBase)
      const block = await web3.eth.getBlock('12290338')
      console.log('block', block)
      const trnsctn = await web3.eth.getTransaction(block.hash)
      transaction.current = trnsctn
      const transactionReceipt = await web3.eth.getTransactionReceipt(transaction?.current.hash)
      // const pendingTransaction = await web3.eth.getPendingTransactions()
      const transactionCnt = await web3.eth.getTransactionCount(acnts[0])
      transactionCount.current = transactionCnt
      console.log('accounts', accounts)
      console.log('acnts[0]', acnts[0])
      console.log('transaction', transaction)
      // console.log('pendingTransaction', pendingTransaction)
      console.log('transactionCount', transactionCount)
      console.log('transactionReceipt', transactionReceipt)
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
    setAccounts(await web3.eth.getAccounts())
    console.log('accounts', accounts)
    const balance = await web3.eth.getBalance(accounts[0])
    console.log('balance', balance)
    const balanceInWei = web3.utils.fromWei(balance)
    console.log('balanceInWei', balanceInWei) 
    setLoading(true)
    handleWallet()
  }

  // useEffect(() => {
  //   setLoading(true)
  //   handleWallet()
  // }, [])

  console.log('account', accounts[0])

  return (
    <Fragment>
      <Button color='primary' onClick={enableEth}>Enable Ethereum</Button>
      <br />
      <SignTransaction {...props} accountAddress={accounts[0]} />
      {loading
        ? <h3>Loading...</h3>
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
