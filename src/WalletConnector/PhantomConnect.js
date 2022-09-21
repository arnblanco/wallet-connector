import { signingMessage } from "./signingMessage";

export const PhantomConnect = async( setErrorMessage, connectData ) => {
    if ( !window.solana ) {
        setErrorMessage('You do not have Phantom Wallet installed.')
        return
    }

    const provider =  window.phantom?.solana;

    const resp = await provider.connect()
    .catch((error) => {
        setErrorMessage("Couldn't get Wallet Connection")
        return
    });
    
    const publicKey = resp.publicKey.toString()
    const encodedMessage = new TextEncoder().encode( signingMessage(publicKey) );

    const signature = await provider.request({
        method: "signMessage",
        params: {
             message: encodedMessage,
             display: "hex",
        }
    }).catch((error) => {
        setErrorMessage( 'User denied message signature.' )
        return
    });

    connectData({
        'provider': 'phantom',
        'wallet': publicKey,
        'signature': signature.signature
    })
}
