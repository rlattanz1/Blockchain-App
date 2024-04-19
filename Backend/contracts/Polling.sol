pragma solidity 0.8.24;

contract Polling {

    struct Option {
        uint id;
        string name;
        uint count;
    }



    // struct Poll {
    //     uint id;
    //     string name;
    //     Option[] options;
    // }

    // storing the option id as a uint variable
    uint public optionId;

    // storing the poll id as a uint variable
    // uint public pollId;


    // creating an object of key value pairs for the Option structs
    // mapping(uint => Option) public options;

    Option[] public options;    // creating an array of the Option structs

    // creating an object of key value pairs for the Option structs
    // mapping(uint => Poll) public polls;

    function addOption (string memory _name) private {
        optionId++;

        // Option storage option = options[options.length - 1]

        options.push(Option(optionId, _name, 0));
    }
    // If we use Poll struct then we need an additional argument of "string memory _name" to name the Poll instance
    function createPoll (string[] memory _options) public { //need a calldata/memory call in front of _options
        require( _options.length >= 2 && _options.length <= 10, "number of options must be between 2 and 10");
        // pollId++;

        for (uint i = 0; i < _options.length; i++) {
            addOption(_options[i]);
        }
    //    polls[pollId] = Poll(pollId, _name, options);

    }


    // Function to return the options currently created
    function getOptions() public view returns (Option[] memory) {
        return options;
    }

    mapping(uint256 => mapping(address => bool)) private hasVoted;

    function vote(uint256 _optionId) public {
        require(_optionId < options.length, "Invalid option ID");
        require(
            hasVoted[msg.sender] != true,
            "You have already voted for this proposal"
        );
        options[_optionId].count++;
        hasVoted[msg.sender] = true;
    }


}
