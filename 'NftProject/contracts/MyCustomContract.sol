// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Address.sol";


contract MyNftERC721Contract is ERC721, AccessControl{
    
    using Address for address;

    uint256 transactionCount;
    mapping(uint256 => uint256) private _tokenPrices;

    constructor() ERC721("ImToken", "IMTKN") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        transactionCount = 0;
    }


    function mintImToken(address to, uint256 tokenId, uint256 price) public {
        _safeMint(to, tokenId);
        _tokenPrices[tokenId] = price;
        transactionCount += 1;
    }


    function buyImToken(uint256 tokenId) public payable {

        require(msg.value == _tokenPrices[tokenId], 'Token price not met');

        uint256 amount = msg.value;
        address tokenOwner = ownerOf(tokenId);

        _approve(_msgSender(), tokenId);
        safeTransferFrom(tokenOwner, _msgSender(), tokenId);

        payable(tokenOwner).transfer(amount);

        transactionCount += 1;
    }


    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }


    function setTokenPrice(uint256 price, uint256 tokenId) public {
        require(ownerOf(tokenId) == _msgSender(), 'Not the owner of the token');
        _tokenPrices[tokenId] = price;
        transactionCount += 1;
    }


    function getTokenPrice(uint256 tokenId) public view returns(uint256) {
        return _tokenPrices[tokenId];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}