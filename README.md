## Discord Bot

A Basic Bot for Discord `under developed`

## Feature

- Join to Create Voice Channel Room's
- Slash command bot

## Installation

 **1.** Install [node.js v14](https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode) or higher

 **2.** Download this repo and unzip it   |   or git clone it
 
 **3.** Install all of the packages with **`npm install`**     |  the packages are   **`npm install node.js discord.js glob ascii-table mongoose`**
 
 **4.** start the bot with **`node index.js` or `npm start`**

## Setup config.json in root project

```javascript
// config.json
{
  "Token": "Your bot token",
  "DatabaseUrl": "Your DB url connect", // rec: mongoDB
  "voiceChannelId": "your discord voice channel ID",
  "serverId": "your server ID"
}
```

## **NOTE:**

*If you are having errors/problems with starting, delete the `package.json` & `package-lock.json` file and do, before you install the packages `npm init -y`*
