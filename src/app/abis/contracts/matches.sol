// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import {FunctionsClient} from "@chainlink/contracts@1.1.1/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts@1.1.1/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts@1.1.1/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title Owner
 * @dev Set & change owner
 */
contract FunctionsConsumerExample is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes public s_lastResponse;
    bytes public s_lastError;
    bytes32 public s_lastRequestId;

    error UnexpectedRequestID(bytes32 requestId);

    event Response(bytes32 indexed requestId, bytes response, bytes err);

    struct Bet {
        address bettor;
        uint8 winner;
    }

    mapping(uint256 => Bet[]) betsByMatchId;

    mapping(uint256 => uint256) winnersCount;

    mapping(uint256 => uint256) pools;

    address private owner;

    uint256 private pool;

    uint256 private numberOfMatches;

    uint256 private totalBets;

    function getNumberOfWinners(
        uint256 _matchId
    ) external view returns (uint256) {
        return winnersCount[_matchId];
    }

    function getNumberOfMatch() external view returns (uint256) {
        return numberOfMatches;
    }

    function getMatchPool(uint256 _matchId) external view returns (uint256) {
        return pools[_matchId];
    }

    function getTotalBets() external view returns (uint256) {
        return totalBets;
    }

    function getTotalPool() external view returns (uint256) {
        return pool;
    }

    function getNumberOfMatches() external view returns (uint256) {
        return numberOfMatches;
    }

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // modifier to check if caller is owner
    modifier isOwner() {
        // If the first argument of 'require' evaluates to 'false', execution terminates and all
        // changes to the state and to Ether balances are reverted.
        // This used to consume all gas in old EVM versions, but not anymore.
        // It is often a good idea to use 'require' to check if functions are called correctly.
        // As a second argument, you can also provide an explanation about what went wrong.
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor(
        address router
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        console.log("Owner contract deployed by:", msg.sender);
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    /**
     * @dev Return owner address
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }

    function getBetsByMatchId(
        uint256 _matchId
    ) public view returns (Bet[] memory) {
        return betsByMatchId[_matchId];
    }

    function CountWinners(uint256 _matchId, uint8 _winner) public {
        if (winnersCount[_matchId] != 0)
            CheckWinner(_matchId, _winner);
        require(
            winnersCount[_matchId] == 0,
            "Winners already accounted for this match"
        );

        Bet[] memory bets = getBetsByMatchId(_matchId);

        for (uint256 i = 0; i < bets.length; i++) {
            if (bets[i].winner == _winner) winnersCount[_matchId]++;
        }
		CheckWinner(_matchId, _winner);
    }

    function CheckWinner(uint256 _matchId, uint8 _winner) public {
        Bet[] memory bets = getBetsByMatchId(_matchId);

        for (uint256 i = 0; i < bets.length; i++) {
            if (msg.sender == bets[i].bettor && _winner == bets[i].winner)
                sendPrize(_matchId, bets[i].bettor);
        }
    }

    function sendPrize(uint256 _matchId, address _recipient) internal {
        uint256 winners = winnersCount[_matchId];

        uint256 amount = (pool / numberOfMatches) / winners;

        payable(_recipient).transfer(amount);
    }

    function setBet(uint256 _matchId, uint8 _winner) public payable {
        require(msg.value == 1e14, "Invalid amount");

        Bet memory newBet = Bet({bettor: msg.sender, winner: _winner});

        if (betsByMatchId[_matchId].length == 0) numberOfMatches++;

        betsByMatchId[_matchId].push(newBet);

        totalBets++;

        pools[_matchId] += msg.value;

        pool += msg.value;
    }

    function sendRequest(
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        if (args.length > 0) req.setArgs(args);
        if (bytesArgs.length > 0) req.setBytesArgs(bytesArgs);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;
        s_lastError = err;
        emit Response(requestId, s_lastResponse, s_lastError);
    }
}
