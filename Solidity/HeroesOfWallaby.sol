// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact markeljan19@gmail.com
contract HeroesOfWallaby is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    string public baseURIConstructor;

    constructor(
        string memory _baseURIConstructor
    ) ERC721("Heroes of Wallaby", "HoW") {
        baseURIConstructor = _baseURIConstructor;
    }

    //////////////////////////////////////////
    //////////////  URI LOGIC    //////////////
    ///////////////////////////////////////////
    function _baseURI() internal view override returns (string memory) {
        return baseURIConstructor;
    }

    function updateBaseURI(string memory _newURI) public onlyOwner {
        baseURIConstructor = _newURI;
    }

    function updateTokenURI(
        uint256 tokenId,
        string memory uri
    ) public onlyOwner {
        _setTokenURI(tokenId, uri);
    }

    //////////////////////////////////////////
    //////////////  MINT LOGIC    /////////////
    ///////////////////////////////////////////

    //0.1 tFil
    uint256 stakeToMint = 100000000000000000;

    function depositMint() public payable {
        require(msg.value == stakeToMint);
        _safeMint(msg.sender, _tokenIdCounter.current());
        //send 10% to rewardPool
        payable(owner()).transfer(10000000000000000);
    }

    function reclaimStake(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);
        _burn(_tokenId);
        payable(msg.sender).transfer(90000000000000000);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
