pragma solidity 0.8.24;

contract Polling {

    struct Option {
        uint id;
        string name;
        uint count;
    }


    struct Group {
        uint id;
        string name;
        address[] members;
    }


    struct Poll {
        uint id;
        string name;
        Option[] options;
        Group[] voters;
    }

    // storing the option id as a uint variable
    // uint public optionId;

    // storing the poll id as a uint variable
    uint public pollId, groupId;
    // uint public groupId;


    // creating an object of key value pairs for the Option structs
    // mapping(uint => Option) public options;

    Option[] public options;    // creating an array of the Option structs

    // creating an object of key value pairs for the Option structs
    mapping(uint => Poll) public polls;

    mapping(address => Poll[]) private userPolls;

    mapping(uint => Group) private pollGroup;


    function createPoll (string[] memory _options, address[] memory _group, string memory _name) public { //need a calldata/memory call in front of _options
        require( _options.length >= 2 && _options.length <= 10, "number of options must be between 2 and 10");
        require( _group.length >= 2, "must have at least 2 people for a poll");

        pollId++;
        groupId++;
        for (uint i = 0; i < _options.length; i++) {
            polls[pollId].options.push(Option(i+1, _options[i], 0));
        }

        for (uint i = 0; i < _group.length; i++) {
            polls[pollId].voters.push(Group());
        }

        polls[pollId].id = pollId;
        polls[pollId].name = _name;
        userPolls[msg.sender].push(polls[pollId]);
    }


}
