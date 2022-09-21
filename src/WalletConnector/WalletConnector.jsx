import { useState } from "react"

import { MetamaskConnect } from "./MetamaskConnect"
import { CoinbaseConnector } from "./CoinbaseConnector"
import { OtherWallets } from "./OtherWallets"
import { PhantomConnect } from "./PhantomConnect"

export const WalletConnector = ({ settings, receiver }) => {
    const [errorMessage, setErrorMessage] = useState('')

    const connectData = ( data ) => {
        receiver( data )
    }

    return (
        <div className="d-grid gap-2">
            <button 
                key={ 'metamask' }
                className="btn btn-light"
                onClick={ () => MetamaskConnect( setErrorMessage, connectData ) }
            >
                <img
                    src="https://opensea.io/static/images/logos/metamask-fox.svg"
                    width="20"
                    height="20"
                /> Metamask
            </button>
            <button
                key={ 'coinbase' }
                className="btn btn-light"
                onClick={ () => CoinbaseConnector( settings, setErrorMessage, connectData ) }
            >
                <img
                    src="https://static.opensea.io/logos/walletlink-alternative.png"
                    width="20"
                    height="20"
                /> Coinbase
            </button>
            <button
                key={ 'phantom' }
                className="btn btn-light"
                onClick={ () => PhantomConnect( setErrorMessage, connectData ) }
            >
                <img
                    src="https://opensea.io/static/images/logos/phantom.svg"
                    width="20"
                    height="20"
                /> Phantom
            </button>
            <button
                key={ 'walletconnector' }
                className="btn btn-light"
                onClick={ () => OtherWallets( settings.networkUrl, setErrorMessage, connectData ) }
            >
                <img
                    src="https://static.opensea.io/logos/walletconnect-alternative.png"
                    width="20"
                    height="20"
                /> WalletConnector
            </button>

            {
                errorMessage !== '' && ( <div className="alert alert-danger mt-1" role="alert">{ errorMessage }</div> )
            }
        </div>
    )
}
