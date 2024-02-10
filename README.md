# Riot API Champion Info and Summoner Stats

This project utilizes Riot Games' API to retrieve information about League of Legends champions and summoners. It provides functionalities to fetch free champions, display detailed information about each champion and their skills, and retrieve summoner data including match history and level. The project is built using Vite, a fast build tool for modern web development.

## Deployment
https://clarktr1.github.io/league-tracker

## Features

- Retrieve free champions available in the current rotation.
- Display detailed information about each champion, including their skills and lore.
- Fetch summoner information such as match history and level.
- Intuitive user interface for easy navigation and interaction.

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/clarktr1/league-tracker
    ```

2. **Install dependencies:**

    ```bash
    cd league-tracker
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and add your Riot Games API key:

    ```plaintext
    RIOT_API_KEY=your_api_key_here
    ```

    Replace `your_api_key_here` with your actual Riot Games API key.

4. **Start the development server:**

    ```bash
    npm run dev
    ```

5. **Access the application:**

    Open your web browser and navigate to `http://localhost:3000`.

## Screenshots

![home](https://imgur.com/jH9xfo7.jpeg);
![all champions](https://imgur.com/TZpBT4s.jpeg)
![one champion](https://imgur.com/AJDCp7l.jpeg)

## Usage

- **Free Champions:**
  - Upon loading the application, the free champions available in the current rotation will be displayed.
- **Champion Details:**
  - Click on any champion to view detailed information about their abilities, lore, and more.
- **Summoner Stats:**
  - Enter a summoner name in the provided input field and click the "Search" button to retrieve information about the summoner, including match history and level.

## Technologies Used

- **Vite:** Fast build tool for modern web development.
- **React.js:** Progressive JavaScript framework for building user interfaces.
- **Riot Games API:** Official API provided by Riot Games for accessing League of Legends data.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
