import { signingMessage } from "./signingMessage";

export const MetamaskConnect = async( setErrorMessage, connectData ) => {
    if ( !window.ethereum ) {
        setErrorMessage('You do not have Metamask installed.')
        return
    }

    const provider =  window.ethereum 
    
    const accounts = await provider.request({
        method: "eth_requestAccounts",
    }).catch((error) => {
        setErrorMessage( 'Account transaction canceled' )
        return
    });
  
    const account = accounts[0]
    
    const signature = await provider.request({
        'method': "personal_sign",
        "params": [account, signingMessage(account)]
    }).catch((error) => {
        setErrorMessage( 'User denied message signature.' )
        return
    });

    connectData({
        'provider': 'metamask',
        'wallet': account,
        'signature': signature
    })
}
