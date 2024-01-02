// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts@4.7.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.3/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.7.3/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.3/utils/Counters.sol";

contract BasicNFT is ERC721, ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;  

    Counters.Counter private _tokenIdCounter;

    uint256 MAX_SUPPLY = 100;

    constructor() ERC721("YeonnnnNFT", "YNFT") {}

    struct NFTInfo {
        uint256 tokenId;
        string tokenURI;
        string name;
        string description;
    }

    function getAllNFTs() external view returns (NFTInfo[] memory) {
    uint256 totalSupply = _tokenIdCounter.current();
    NFTInfo[] memory allNFTs = new NFTInfo[](totalSupply);

    for (uint256 i = 0; i < totalSupply; i++) {
        uint256 tokenId = i;
        allNFTs[i] = NFTInfo({
            tokenId: tokenId,
            tokenURI: tokenURI(tokenId),
            name: tokenName[tokenId],
            description: tokenDescription[tokenId]
        });
    }

    return allNFTs;
}


     function safeMint(string memory name, string memory description, string memory uri) public {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= MAX_SUPPLY, "YeonnnnNFTs are sold out!");
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _setTokenMetadata(tokenId, name, description);
    }

    function transferNFT(address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or not the owner");
        _transfer(msg.sender, to, tokenId);
    }

    function _setTokenMetadata(uint256 tokenId, string memory name, string memory description) internal {
        tokenName[tokenId] = name;
        tokenDescription[tokenId] = description;
    }

    mapping(uint256 => string) public tokenName;
    mapping(uint256 => string) public tokenDescription;

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }


    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function getOwnedNFTs(address owner) external view returns (uint256[] memory, string[] memory, string[] memory, string[] memory) {
    uint256 balance = balanceOf(owner);
    uint256[] memory ownedNFTs = new uint256[](balance);
    string[] memory tokenURIs = new string[](balance);
    string[] memory tokenNames = new string[](balance);
    string[] memory tokenDescriptions = new string[](balance);

    for (uint256 i = 0; i < balance; i++) {
        uint256 tokenId = tokenOfOwnerByIndex(owner, i);
        ownedNFTs[i] = tokenId;
        tokenURIs[i] = tokenURI(tokenId);
        tokenNames[i] = tokenName[tokenId];
        tokenDescriptions[i] = tokenDescription[tokenId];
    }

    return (ownedNFTs, tokenURIs, tokenNames, tokenDescriptions);
}

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}