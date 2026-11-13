// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Cryto69
/// @notice A basic fixed-supply ERC-20 token, written as a learning project.
///
/// How it works:
/// - The whole supply (69,000,000 CRYTO69) is created once, in the
///   constructor, and given to the wallet that deploys the contract.
/// - There is no mint function, so no more can ever be created.
/// - Holders can transfer tokens, and can approve other addresses to
///   spend on their behalf (the standard ERC-20 pattern exchanges use).
///
/// This is the standard ERC-20 interface, implemented from scratch with
/// no external dependencies, so it compiles as-is in Remix.
contract Cryto69 {
    string public name = "Cryto69";
    string public symbol = "CRYTO69";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    /// @notice The wallet that deployed the contract (also the first holder).
    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed tokenOwner, address indexed spender, uint256 value);

    constructor() {
        owner = msg.sender;
        // Fixed supply: 69,000,000 tokens with 18 decimal places,
        // all minted to the deployer in this one transaction.
        totalSupply = 69_000_000 * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    /// @notice Send `amount` of your tokens to address `to`.
    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    /// @notice Allow `spender` to spend up to `amount` of your tokens.
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /// @notice Move `amount` from `from` to `to`, if you were approved to.
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, "Cryto69: allowance too low");
        if (allowed != type(uint256).max) {
            allowance[from][msg.sender] = allowed - amount;
        }
        _transfer(from, to, amount);
        return true;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "Cryto69: cannot send to the zero address");
        require(balanceOf[from] >= amount, "Cryto69: insufficient balance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }
}
