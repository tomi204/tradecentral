// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {TradeCentral} from "../src/NewTradeCentral.sol";

contract testTradeCentral is Test {
    TradeCentral public trade;
    // create some test users addresses
    address alex = address(0x1);
    address tomi = address(0x2);
    address abel = address(0x3);
    address userAddress = vm.addr(uint256(uint160(tomi)));

    function setUp() public {
        trade = new TradeCentral();
    }

    // creates a test user with the address 0x1
    function testCreateUser() public {
        // create user
        string memory _email = "tomi@hotmail.com";
        string memory _name = "Tomi";
        string memory image = "https://i.imgur.com/1ZQZ1YR.png";
        // get user address
        vm.prank(userAddress);
        trade.createUser(_email, _name, image);
        // asset user lookup
    }

    function createTrade() public {
       ///create trade
       string memory _name = "Trade 1";
       string memory _description = "Trade 1 description";
       string memory _image = "https://i.imgur.com/1ZQZ1YR.png";
       string memory _category = "TV/MONITORES";
       string memory _location = "Argentina";

         trade.createTrade(200,_name, _description, _image, _category, _location);
    }

    function cancelTrade() public{
        // cancel trade
        trade.cancelTrade(1);
    }

    function updateUserProfile() public{
        vm.prank(tomi);
         string memory _email = "tomi@hotmail.com";
        string memory _name = "Tomi";
        string memory image = "https://i.imgur.com/1ZQZ1YR.png";

        trade.updateProfile(_email, _name, image);
    }
}
