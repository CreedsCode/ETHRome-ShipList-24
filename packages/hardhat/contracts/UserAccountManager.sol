//SPDX-License-Identifier: MIT


pragma solidity >=0.8.0 <0.9.0;
contract UserAccountManager {
    mapping(address => bool) public hasAccount;

    mapping(string => address) public usernameToAddress;
    struct User {
        string username;
        address userAddress;
        string profilePicURL;
        string socials;
    }


    mapping(address => User) public users;


    event UserCreated(address indexed userAddress, string username);
    modifier uniqueUser(string memory username) {
        require(!hasAccount[msg.sender], "An account already exists for this address");
        require(usernameToAddress[username] == address(0), "Username already taken");
        _;
    }
    function createUser(string memory username, string memory profilePicURL, string memory socials) public uniqueUser(username) {
        users[msg.sender] = User(username, msg.sender, profilePicURL, socials);
        hasAccount[msg.sender] = true;
        usernameToAddress[username] = msg.sender;
        emit UserCreated(msg.sender, username);
    }
    function getUser(address userAddress) public view returns (string memory, address, string memory, string memory) {
        User memory user = users[userAddress];
        return (user.username, user.userAddress, user.profilePicURL, user.socials);
    }
    function getUserByUsername(string memory username) public view returns (string memory, address, string memory, string memory) {
        address userAddress = usernameToAddress[username];
        require(userAddress != address(0), "No existing user");

        return (users[userAddress].username, userAddress, users[userAddress].profilePicURL, users[userAddress].socials);
    }
    function updateSocials(string memory _socials) public{
        if(hasAccount[msg.sender]){
            users[msg.sender].socials = _socials;
        }
    }
    function updateProfilePicURL(string memory _profilePicURL) public{
        if(hasAccount[msg.sender]){
            users[msg.sender].profilePicURL = _profilePicURL;
        }
    }
}
