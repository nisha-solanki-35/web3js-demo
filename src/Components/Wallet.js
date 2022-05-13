import React, { Fragment, useEffect } from 'react'
// import PropTypes from 'prop-types'
import Web3 from 'web3'

const Wallet = props => {

  const handleWallet = async () => {
    const web3 = new Web3(Web3.givenProvider);
    console.log('web3', web3)
    // const provider = window.ethereum
    // const account = await provider.request({ method: 'eth_requestAccounts'})
    // const accounts = await provider.request({ method: 'eth_getAccounts'})

    const accounts = await web3.eth.requestAccounts();

    // console.log('account', account)
    console.log('accounts', accounts)
  }
  
  useEffect(() => {
    handleWallet()
  }, [])
  
  return (
    <Fragment>
    </Fragment>
  )
}

// Wallet.propTypes = {

// }

export default Wallet
