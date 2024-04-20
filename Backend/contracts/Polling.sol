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
        address[] voters;
    }

    // storing the poll id as a uint variable
    uint public pollId;

    // creating an object of key value pairs for the Option structs
    mapping(uint => Poll) public polls;

    mapping(address => Poll[]) private userPolls;


    function createPoll (string[] memory _options, address[] memory _group, string memory _name) public { //need a calldata/memory call in front of _options
        require( _options.length >= 2 && _options.length <= 10, "number of options must be between 2 and 10");
        require( _group.length >= 2, "must have at least 2 people for a poll");

        pollId++;

        for (uint i = 0; i < _options.length; i++) {
            polls[pollId].options.push(Option(i+1, _options[i], 0));
        }

        polls[pollId].id = pollId;
        polls[pollId].name = _name;
        polls[pollId].voters = _group;
        polls[pollId].voters.push(msg.sender);
        userPolls[msg.sender].push(polls[pollId]);

    }

    function exists1(address sender, address[] memory group) public view returns (bool) {
        for (uint i = 0; i < group.length; i++) {
            if (group[i] == sender) {
                return true;
            }
        }

        return false;
    }

    mapping(uint256 => mapping(address => bool)) public pollVoters;

    function Vote(uint256 _pollId, uint256 _optionId) public {
        require(_pollId > 0 && _pollId <= pollId, "Invalid poll");
        require(!pollVoters[_pollId][msg.sender], "You have already voted");
        require(_optionId >= 0 && _optionId < polls[_pollId].options.length, "Invalid option");
        require(exists1(msg.sender, polls[_pollId].voters), "You are not allowed to vote in this poll");

        polls[_pollId].options[_optionId].count++;

        pollVoters[_pollId][msg.sender] = true;

    }

    function getPolls() public view returns (Poll[] memory)  {
        return userPolls[msg.sender];
    }

    function getOptions(uint _pollId) public view returns (Option[] memory) {
        return polls[_pollId].options;
    }


}
