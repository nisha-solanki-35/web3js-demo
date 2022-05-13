import React, { Fragment, useEffect } from 'react'
// import PropTypes from 'prop-types'

const Wallet = props => {

  const handleWallet = async () => {
    const provider = window.ethereum
    const account = await provider.request({ method: 'eth_requestAccounts'})
    console.log('account', account)
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
