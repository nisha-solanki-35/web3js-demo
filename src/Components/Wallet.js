import React, { Fragment, useEffect, useRef, useState } from 'react'
// import PropTypes from 'prop-types'
import Web3 from 'web3'

const Wallet = props => {

  const accounts = useRef('')
  const transaction = useRef('')
  const transactionCount = useRef('')
  const [loading, setLoading] = useState(false)

  const handleWallet = async () => {
    try {
      const web3 = new Web3('http://127.0.0.1:7545');
      console.log('web3', web3)
      // const provider = window.ethereum
      // const account = await provider.request({ method: 'eth_accounts'})
      // const accounts = await provider.request({ method: 'eth_getAccounts'})
      const acnts = await web3.eth.getAccounts();
      accounts.current = acnts
      const trnsctn = await web3.eth.getTransaction('0xb863e9f7700b56971757b75936824d0068e7ef8540aa7087d4bdcf8b7111ed04')
      transaction.current = trnsctn
      // const pendingTransation = await web3.eth.getPendingTransactions()
      const transactionCnt = await web3.eth.getTransactionCount('0x2526B7dDf64934c57ff965B092DDbDcbC270D8B3')
      transactionCount.current = transactionCnt
      const transactionReceipt = await web3.eth.getTransactionReceipt('0xb863e9f7700b56971757b75936824d0068e7ef8540aa7087d4bdcf8b7111ed04')
      console.log('accounts', accounts)
      console.log('transaction', transaction)
      // console.log('pendingTransation', pendingTransation)
      console.log('transactionCount', transactionCount)
      console.log('transactionReceipt', transactionReceipt)
      setLoading(false)
    } catch (error) {
      alert(error?.message)
      console.log('error', error)
    }
  }
  
  useEffect(() => {
    setLoading(true)
    handleWallet()
  }, [])
  
  return (
    <Fragment>
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
