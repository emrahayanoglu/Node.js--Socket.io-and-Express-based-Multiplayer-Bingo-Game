Roadmap of Bingo
================

1. Messaging between Client and Server is like that:
	* connectToServer(username) - Client
	* newUserOnline(tables,user) - Server
	* connectToTable(tableID) - Client
	* userConnectedToTable(tables,user) - Server
	* gameStarted(tables) - Server
	* numberChosen(table,number) - Server
	* gameFinished(table,winner) - Server
	* gameRestarted(tables) - Server
	* userLeaveFromTable(user) - Client
	* userDisconnectedFromTable(tables,players) - Server
	* userDisconnectedFromGame(tables,players) - Server
	* sendChatMessage(message) - Client
	* userSendChatMessage(user.message) - Server
	* sendChatMessageToUser(message,user) - Client
	* userSentChatMessageToUser(message,user) - Server
2. Messages should be implemented
3. Client design should be completed
4. Client implementation should be started
