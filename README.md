<div id="top"><div>
	
	
<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stars][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GPL-3.0 License][license-shield]][license-url]

	
<!-- PROJECT LOGO -->
<br />
<div align="center">
	<a href="https://github.com/dionannd/gremory-discord">
    <img src="src/assets/profile.png" alt="Logo" width="100" height="100">
  </a>
	
  <h3 align="center">Gremory</h3>

  <p align="center">
    DISCORD BOT
    <br />
   <br />
    <a href="https://github.com/dionannd/gremory-discord">View Demo</a>
    ·
    <a href="https://github.com/dionannd/gremory-discord/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/dionannd/gremory-discord/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </p>
</div>
	
<!-- TABLE OF CONTENT -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#description">Description</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
		<li><a href="#roadmap">Roadmap</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
 </ol>
</details>

<!-- DESCRIPTION -->
## Description
A Basic Bot for create temporary voice channel in Discord!
	
desired project:
* easy for setup.
* Used multiple servers.
* 24/7 online.
	
### Built With
	
* [Node.js](https://nodejs.org)
* [Discord.js](https://discord.js.org)
* [DisTube](https://distube.js.org)
* [MongoDB](https://www.mongodb.com)

<!-- ROADMAP -->
## Roadmap
	
- [x] Add Play Music in voice channel
- [x] Add commands for music
- [x] Add Advance clear chat
- [ ] Add custom prefix
	
<p align="right">(<a href="#top">back to top</a>)</p>
	

<!-- GETTING STARTED -->
## Getting Started

For running this project locally, follow these simple steps.
	
### Prerequisites
* npm
  ```sh
  npm install npm@latest -g
  ```
	
* dependencies (optional)
	```sh
  npm install node.js discord.js glob ascii-table mongoose dotenv
  ```
	
### Installation
_Installing and setting up this project, follow these steps._
	
1. Clone the repo
	 ```sh
   git clone https://github.com/dionannd/gremory-discord.git
   ```
2. Install all of the packages
	 ```sh
   npm install
   ```
3. Setup configuration `.env` in root project. (**Note:** if the file doesn't exist, please create one)
	 ```js
   TOKEN=your_bot_token
	 DATABASE_URL=your_db_url_connection
	 SERVER_ID=your_server_id
	 VOICECHANNEL_ID=your_voice_channel_id
   ```
4. start the project with **`node index.js` or `npm start`**
	
#### **NOTE:** _If you are having errors/problems with starting, delete the `package.json` & `package-lock.json` file and do, before you install the packages `npm init -y` and install the depedencies again_
	
<p align="right">(<a href="#top">back to top</a>)</p>


## Usage

For usage this bot, please refer to the [Documentation](https://github.com/dionannd/gremory-discord/wiki) for see all commands
	
<p align="right">(<a href="#top">back to top</a>)</p>
	
	
<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
	
<p align="right">(<a href="#top">back to top</a>)</p>
	
	
<!-- LICENSE -->
## License

Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.	

<p align="right">(<a href="#top">back to top</a>)</p>
	
	
<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dionannd/gremory-discord.svg?style=for-the-badge
[contributors-url]: https://github.com/dionannd/gremory-discord/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dionannd/gremory-discord.svg?style=for-the-badge
[forks-url]: https://github.com/dionannd/gremory-discord/network/members
[stars-shield]: https://img.shields.io/github/stars/dionannd/gremory-discord.svg?style=for-the-badge
[stars-url]: https://github.com/dionannd/gremory-discord/stargazers
[issues-shield]: https://img.shields.io/github/issues/dionannd/gremory-discord.svg?style=for-the-badge
[issues-url]: https://github.com/dionannd/gremory-discord/issues
[license-shield]: https://img.shields.io/github/license/dionannd/gremory-discord.svg?style=for-the-badge
[license-url]: https://github.com/dionannd/gremory-discord/blob/main/LICENSE
[product-screenshot]: images/screenshot.png
