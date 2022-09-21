import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3"

export const OtherWallets = async( networkUrl, setErrorMessage, connectData  ) => {
    const connect_options = {'infuraId':networkUrl}
    const provider = new WalletConnectProvider(connect_options)
    const web3 = new Web3(provider)

    try {
        await provider.enable()
    } catch (e) {
        if (e.toString() == 'Error: User closed modal') setErrorMessage("Couldn't get Wallet Connection")
        return
    }

    const accounts = await web3.eth.getAccounts()
    if (!accounts || accounts.length == 0) {
        setErrorMessage("Couldn't get Wallet Connection")
    }

    const account = accounts[0].toLowerCase()
    const signature = await web3.eth.personal.sign(signingMessage(account), account)
    .catch((error) => {
        setErrorMessage( 'User denied message signature.' )
        return
    });

    connectData({
        'provider': 'walletconnect',
        'wallet': account,
        'signature': signature
    })
}
