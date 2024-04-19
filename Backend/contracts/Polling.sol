pragma solidity 0.8.24;

contract Polling {

    struct Option {
        uint id;
        string name;
        uint count;
    }



    struct Poll {
        uint id;
        string name;
        Option[] options;
    }

    // storing the option id as a uint variable
    uint public optionId;

    // storing the poll id as a uint variable
    uint public pollId;


    // creating an object of key value pairs for the Option structs
    // mapping(uint => Option) public options;

    Option[] public options;    // creating an array of the Option structs

    // creating an object of key value pairs for the Option structs
    mapping(uint => Poll) public polls;

    function addOption (string _name) private {
        optionId++;
        options.push(Option(optionId, _name, 0));
    }

    function createPoll (string[] memory _options, string memory _name) public returns (Poll memory) { //need a calldata/memory call in front of _options
        require( _options.length >= 2 && _options.length <= 10, "number of options must be between 2 and 10");
        pollId++;

        for (uint i = 0; i < _options.length; i++) {
            addOption(_options[i]);
        }

    `   polls[pollId] = Poll(pollId, _name, _options);
    }


}
