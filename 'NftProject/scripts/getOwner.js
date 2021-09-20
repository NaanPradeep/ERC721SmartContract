const Web3 = require('web3'); 

const web3 = new Web3('https://ropsten.infura.io/v3/your_project_id')

const contract = require('../artifacts/contracts/MyCustomContract.sol/MyNftERC721Contract.json')

const contractAddress = "contract_address"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const tokenId = 2


nftContract.methods.getOwner(tokenId).call((err, result) => {
    if(!err) {
        console.log(result)
    } else {
        console.log(err)
    }
})
