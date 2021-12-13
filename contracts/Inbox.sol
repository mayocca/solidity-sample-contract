// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Inbox {
    string public message;

    constructor(string memory _initialMessage) {
        message = _initialMessage;
    }

    function setMessage(string memory _message) public {
        message = _message;
    }

}
