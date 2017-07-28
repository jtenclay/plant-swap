# Plant Swap

Project #3 for General Assembly's Web Development Immersive Bootcamp.

Premise: If you find that you have too many plants (in real life), you might be looking to give some away to your friends and get some kinds that you haven't collected yet. Plant Swap is a place to find other people in your area that you can trade plants with.

## User Story

* A user can sign up for an account and post open swaps (their available plants).
* Another user can search swaps by location, tag, etc. to find a plant they might be interested in.
  * This user can reply to an open swap with a public comment (e.g. "I love that!") or with a private comment ("Let's meet up at 429 Main St. to swap!").
* User 1 goes to their dashboard to close the swap (taking it out of the search results) after the exchange has been completed in real life.

## Technologies Used

* HTML
* CSS \(LESS\)
* Angular 4
* Ruby server \(Sinatra\)
* PostgreSQL \(Active Record\)

## Database Schema

![Database Schema](https://github.com/jtenclay/plant-swap/blob/master/db-structure.png)

## In the Future

* Due to time constraints, I wasn't able to style as much as I'd have liked to.
* Although I achieved my MVP, there are a number of features that should be smoothed out, inluding:
	* Search functionality
  * A user uploading their own photos
  * Closing out a swap with another person's swap \(as reflected in the database's `swaps.coswap_id`\)
  * Private messaging outside of comments
  * Editing one's account information
  * General copy and imagery
* [Trello Board](https://trello.com/b/5yZKuyCT) for reference