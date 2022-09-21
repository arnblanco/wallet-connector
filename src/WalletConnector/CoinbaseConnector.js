import CoinbaseWalletSDK from "@coinbase/wallet-sdk"
import Web3 from "web3"

import { signingMessage } from "./signingMessage"

export const CoinbaseConnector = async( settings, setErrorMessage, connectData ) => {
    const { appName, networkUrl, chainId } = settings

    const coinbaseWallet = new CoinbaseWalletSDK({
        appName: appName
    })

    const provider = coinbaseWallet.makeWeb3Provider( networkUrl, chainId )
    const web3_provider = new Web3( provider )

    const connection = await provider.enable()
    const accounts = await web3_provider.eth.getAccounts()

    if (!accounts || accounts.length == 0) {
        setErrorMessage("Couldn't get Wallet Connection")
        return
    }

    // Signature only work with lower-cased account
    const account = accounts[0].toLowerCase();
    const signature = await web3_provider.eth.personal.sign(signingMessage(account), account)
    .catch((error) => {
        setErrorMessage( 'User denied message signature.' )
        return
    });

    connectData({
        'provider': 'coinbase',
        'wallet': account,
        'signature': signature
    })
}
