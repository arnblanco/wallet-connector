import { WalletConnector } from "../WalletConnector";

export const AddNewWallet = () => {
    const settings = {
        appName: '', //create a project on https://infura.io/
        networkUrl: '', //create a project on  https://infura.io/
        chainId: 1,
    }

    const sendData = ( data ) => {
        console.log(data)
    }

    return (
        <>
            <button
                className="btn btn-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target=".bd-example-modal-sm" 
            >Connect with Wallet</button>

            <div className="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title h4" id="mySmallModalLabel">Select Wallet Provider</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <WalletConnector
                                settings={ settings }
                                receiver={ sendData }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
