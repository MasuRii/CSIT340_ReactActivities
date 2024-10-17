### src/README.md
```markdown
# E-Bingo Application

## Overview

E-Bingo is a web-based Bingo application built with React. It allows players to join Bingo games, manage multiple Bingo cards, manually highlight numbers, and check for wins. The application interacts with external REST APIs to fetch Bingo cards and verify winning conditions.

## Features

- **Join a Bingo Game:** Enter a game code to join an existing Bingo game.
- **Manage Multiple Cards:** Players can add and manage multiple Bingo cards simultaneously.
- **Manual Highlighting:** Manually highlight numbers on your Bingo cards as they are called.
- **Automatic Highlighting:** Automatically highlight numbers that have been called in the game.
- **Check for Wins:** Verify if any of your Bingo cards have achieved a winning condition.

## Setup Instructions

1. **Install Dependencies**

   Navigate to the project directory and install the required dependencies:

   ```bash
   npm install
   ```

## Running the Application

Start the development server with the following command:

```bash
npm start
```

The application will run at `http://localhost:3000`. Open this URL in your web browser to use the E-Bingo application.

## Usage

1. **Join a Game**

   - On the homepage, enter the Game Code (e.g., `YvBGxsIG`) in the input field.
   - Click on the **Join Game** button to join the specified Bingo game.

2. **Add More Bingo Cards**

   - After joining a game, click on the **Add More Cards** button to generate additional Bingo cards.
   - Each new card fetched will have a unique `playcard_token`.

3. **Highlight Numbers**

   - **Manual Highlighting:** Click on any number in your Bingo card to manually highlight it. This is useful for marking numbers as they are called in real-time.
   - **Automatic Highlighting:** The application automatically highlights numbers that have been called, based on data fetched from the Bingo dashboard.

4. **Check for Win**

   - Click on the **Check Win** button on any Bingo card to verify if that specific card has achieved a winning condition.
   - A message will display **"You have a Bingo!"** if the card is a winner.

  ```▌