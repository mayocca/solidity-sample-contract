pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    function Inbox(string _initialMessage) public {
        message = _initialMessage;
    }

    function setMessage(string _message) public {
        message = _message;
    }

}
