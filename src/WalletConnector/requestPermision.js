export const requestPermision = async(event) => {
    event.preventDefault()
    
    const permision = await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
    })
}
