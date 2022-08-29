# About PinkSlipBets

PinkSlipBets is the first peer to peer betting marketplace where all the edge goes to the users. Although ambitions lie beyond just sports betting, that is what the current implementation focusses on. Sports betting is an industry notorious for being secretive and taking away potential profits from its users. PinkSlipBets is here to change that notion and give the power back to the people that are actually taking on most of the risk.

# How it works
Anyone has the ability to place a bet on a team they believe will win. Currently their are 10 different sports to chose from with games occuring every day. 
To begin, a user would connect a wallet and deposit the amount of funds they intend to bet with. This amount will essentially be staked until a bet is filled or the user changes their mind and withdraws those staked funds. However, any bets that were placed with the staked funds as collateral will be removed until the user can once again back their bets. If a bet becomes filled (a match was made between user and an opposition), then the users staked funds will automatically be transferred and locked in escrow via a smart contract. This comes at no additional cost to the user and the funds will be locked there until a winner is determined. The winner of a bet gets determined via aggregating a bunch of various sports betting site for results (via the odds api) at the end of every hour. There exists an upkeeper from chainlink which is responsible for paying out the winner of the bet. This means that the entire process from placing a bet to receiving earnings from winning bets is done autonomously and with much more visiblity. 
# Tech Stack

Frontend -> Vanilla Javascript heavily utilizing Jquery
Backend -> Typescript using express.js for webapp framework
Database -> Simple no-sql in the form of json files
Webserver -> nginx
Hosted -> aws

# Demo
https://youtu.be/B7DVf8jOFFo

# Deployed Site
https://www.pinkslipbets.com/
