Gutendex Book Explorer

Overview

This project is a Book Explorer Web App that allows users to browse, search, and access books from the Gutendex API (a repository of freely available books from Project Gutenberg). Users can filter books by category/genre, search by title or author, and open the books in the preferred format.

![image](https://github.com/user-attachments/assets/77af5813-412f-40eb-949a-8b5cb7acb0dc)
![image](https://github.com/user-attachments/assets/345a51f9-9f35-4f3f-84b2-2259cfa37fec)


Features

Genre-Based Navigation: Users can select a genre to view books from that category.

Infinite Scrolling: Books are loaded dynamically as the user scrolls down the page.

Search Functionality: Users can search for books by title or author while maintaining the selected category filter.

Book Preview: Clicking on a book opens the web browser with the best available format in the following priority:

HTML

PDF

TXT

Error Handling: If no supported format is available, an alert message is displayed: "No viewable version available."

API Filtering: The app only fetches books that contain covers.

![image](https://github.com/user-attachments/assets/538f9e66-8c2f-4102-bebc-57aeb5ed9caf)

Tech Stack

Frontend: ReactJs

State Management: React state management

API Source: Gutendex API

Installation & Setup

Clone the repository:

Install dependencies:

Run the development server:

Open http://localhost:5173 in your browser.

API Usage

The app interacts with the Gutendex API to fetch book data. The following endpoints are used:

List Books: /books (fetches all books, sorted by popularity)

Filter by Genre: /books?topic=<genre>

Search by Title/Author: /books?search=<query>

Preferred Formats: HTML, PDF, or TXT (excluding ZIP files)

Project Structure

Deployment

To deploy the app, you can use Netlify:

Alternatively, you can build and serve the app manually:

License

This project is open-source and follows the MIT License.

Author

Developed by Dhakshinamoorthi.
