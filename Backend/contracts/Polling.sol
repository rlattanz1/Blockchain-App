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

    uint public optionId;

    // creating an object of key value pairs for the Option structs
    // mapping(uint => Option) public Options;

    Option[] public options;    // creating an array of the Option structs

    function addOptions (string _name) private {
        optionId ++;
        options.push(Option(optionId, _name, 0));
    }

    function createPoll (string[] _options, string _name) public {
        require( _options.length >= 2 && _options.length <= 10, "number of options must be between 2 and 10");

        for (uint i = 0; i < _options.length; i++) {
            addOptions(_options[i]);
        }
        
    }


}
