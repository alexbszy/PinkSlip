# About PinkSlipBets

PinkSlipBets is the first peer to peer betting marketplace where all the edge goes to the users. Although ambitions lie beyond just sports betting, that is what the current implementation focuses on. Sports betting is an industry notorious for being secretive and taking away potential profits from its users. PinkSlipBets is here to change that notion and give the power back to the people that are actually taking on most of the risk.

# How it works
Anyone has the ability to place a bet on a team they believe will win. Currently their are 10 different sports to choose from with games occuring every day. To begin, a user would connect a wallet and decide on a game to bet on. After filling out the pink slip at the bottom right of the screen, metamask (or any other wallet provider) will prompt you to confirm a transaction with the amount you wagered. This amount will essentially be staked until a bet is filled or the user changes their mind and withdraws those staked funds. However, any bets that were placed with the staked funds as collateral will be removed until the user can once again back their bets. If a bet becomes filled (a match was made between user and an opposition), then the users staked funds will automatically be transferred and locked in escrow via a smart contract. This comes at no additional cost to the user and the funds will be locked there until a winner is determined. The winner of a bet gets determined via aggregating a bunch of various sports betting sites for results (via the odds api) at the end of every hour. There exists an upkeeper from chainlink which is responsible for paying out the winner of the bet. This means that the entire process from placing a bet to receiving earnings from winning bets is done autonomously and with much more visibility. 
# Tech Stack

Frontend -> Vanilla Javascript heavily utilizing Jquery<br>
Backend -> Typescript using express.js for webapp framework<br>
Database -> Simple no-sql in the form of json files<br>
Webserver -> nginx<br>
Hosted -> aws<br>

# Sports Api Used
https://the-odds-api.com/ <br>
This api aggregates sport scores and odds. 500 requests a month are included in free tier.

# Chainlink Keepers
https://docs.chain.link/docs/chainlink-keepers/introduction/ <br>
These keepers are great. They allow me to pay out bet winners without having to do so manually.

# Future Expansions
- Adding ability for users to create their own bets on anything (think weather, elections, price of cryptocurrency) and having that be verfifable by a third party
- Adding a script that auto generates bets (market making bot)
- Cleaning up codebase

# Demo
https://youtu.be/B7DVf8jOFFo

# Deployed Site
https://www.pinkslipbets.com/

# Local Set Up
1. git clone project
2. npm install (yarn)
3. yarn hardhat compile
4. npm start
5. connect to localhost:8443 through browser
