// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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
    //////////////  TREASURY LOGIC    ////////
    //////////////////////////////////////////

    uint256 public totalStaked = 0;
    uint256 public totalRewards = 0;
    uint256 public totalWithdrawn = 0;

    //////////////////////////////////////////
    //////////////  URI LOGIC    /////////////
    //////////////////////////////////////////
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
    //////////////  MINT LOGIC    ////////////
    //////////////////////////////////////////

    uint256 public stakeToMint = 100000000000000000;

    function depositMint(uint256 _hero) public payable {
        string memory heroString = Strings.toString(_hero);
        string memory uri = string(abi.encodePacked(heroString, ".png"));
        require(msg.value == stakeToMint);
        safeMint(msg.sender, uri);
        Hero memory hero = Hero({
            id: _tokenIdCounter.current(),
            prestige: 0,
            status: Status.Idle,
            heroType: HeroType.Swardarian
        });

        if (_hero == 1) {
            hero.heroType = HeroType.Barberino;
        } else if (_hero == 2) {
            hero.heroType = HeroType.Wallamaster;
        }

        idToHero[_tokenIdCounter.current()] = hero;
        _tokenIdCounter.increment();
        totalRewards += (stakeToMint * 10) / 100;
        totalStaked += stakeToMint - ((stakeToMint * 10) / 100);
    }

    function depositRewards() public payable {
        require(msg.value > 0);
        totalRewards += msg.value;
    }

    function reclaimStake(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);
        _burn(_tokenId);
        payable(msg.sender).transfer((stakeToMint * 90) / 100);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    ////////////////////////////////////////////////
    //////////  Character Stats Logic    ///////////
    ////////////////////////////////////////////////

    enum Status {
        Idle,
        Questing
    }
    enum HeroType {
        Swardarian,
        Barberino,
        Wallamaster
    }

    struct Hero {
        uint256 id;
        uint256 prestige;
        Status status;
        HeroType heroType;
    }

    mapping(uint256 => Hero) public idToHero;

    function getHero(uint256 _id) public view returns (Hero memory) {
        return idToHero[_id];
    }

    function prestigeUp(uint256 _id) public onlyOwner {
        require(ownerOf(_id) == msg.sender);
        idToHero[_id].prestige += 1;
    }

    function setStatus(uint256 _id, Status _status) public onlyOwner {
        require(ownerOf(_id) == msg.sender);
        idToHero[_id].status = _status;
    }

    function getAllHeroes() public view returns (Hero[] memory) {
        //return all heroes for a given address
        uint256 tokenCount = balanceOf(msg.sender);
        Hero[] memory heroes = new Hero[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            heroes[i] = idToHero[tokenOfOwnerByIndex(msg.sender, i)];
        }
        return heroes;
    }

    //////////////////////////////////////////
    //////////////  Game Logic    ////////////
    //////////////////////////////////////////

    function startGame(uint256 _id) public {
        require(ownerOf(_id) == msg.sender);
        require(idToHero[_id].status == Status.Idle, "Hero is not idle");
        idToHero[_id].status = Status.Questing;
    }

    function endGame(
        uint256 _id,
        uint256 rewardMultiplier,
        bool dead
    ) public onlyOwner {
        require(ownerOf(_id) == msg.sender);
        require(
            idToHero[_id].status == Status.Questing,
            "Hero is not Questing"
        );
        if (dead) {
            _burn(_id);
        } else {
            idToHero[_id].status = Status.Idle;
        }
        if (rewardMultiplier > 0) {
            idToHero[_id].prestige += 1;
            // send 10% of total rewards to owner
            payable(ownerOf(_id)).transfer(
                ((totalRewards * 10) / 100) *
                    (rewardMultiplier + idToHero[_id].prestige / 100)
            );
            totalRewards -= ((totalRewards * 10) / 100) * rewardMultiplier;
            totalWithdrawn += ((totalRewards * 10) / 100) * rewardMultiplier;
        }
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
