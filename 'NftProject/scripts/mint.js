// to mint NFT on Ropsten Test Network

const ethTx = require('@ethereumjs/tx')
const Common = require('@ethereumjs/common').default
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/your_project_id')

const contract = require('../artifacts/contracts/MyCustomContract.sol/MyNftERC721Contract.json')

const contractAddress = "contract_address"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
 
const PUBLIC_KEY = "your_wallet_address"

async function mintNFT() {
    
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest')

    const txParams = {
        'from' : PUBLIC_KEY,
        'to' : contractAddress,
        'nonce' : nonce,
        'gasLimit' : web3.utils.toHex(500000),
        'gasPrice': web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        'data' : nftContract.methods.mintImToken(PUBLIC_KEY, 3, web3.utils.toWei('5', 'gwei')).encodeABI()
    };

    const common = new Common({ chain: 'ropsten' })

    const privateKey = Buffer.from(
    'your_private_key',
    'hex',
    )

    const tx = ethTx.Transaction.fromTxData(txParams, { common })
    const signedTx = tx.sign(privateKey)

    const serializedTx = signedTx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err :', err, 'taxHash :', txHash)
    })
}

mintNFT();