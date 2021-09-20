// to transfer ERC721 Token from one account to another on Ropsten Test Network

const ethTx = require('@ethereumjs/tx')
const Common = require('@ethereumjs/common').default
const Web3 = require('web3');

const web3 = new Web3('https://ropsten.infura.io/v3/your_project_id')

const contract = require('../artifacts/contracts/MyCustomContract.sol/MyNftERC721Contract.json')

const contractAddress = "contract_address"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
 
const buyer = "buyer_wallet_address"

async function buyImToken() {
    const nonce = await web3.eth.getTransactionCount(buyer, 'latest')

    const txParams = {
        'from' : buyer,
        'to' : contractAddress,
        'nonce' : nonce,
        'gasLimit' : web3.utils.toHex(500000),
        'value' : web3.utils.toHex(web3.utils.toWei('5', 'gwei')),
        'gasPrice': web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        'data' : nftContract.methods.buyImToken(1).encodeABI()
    };

    const common = new Common({ chain: 'ropsten' })

    const privateKey = Buffer.from(
    'buyer_private_key',
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

buyImToken();