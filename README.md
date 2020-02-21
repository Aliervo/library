From the Odin Project's [curriculum](https://www.theodinproject.com/courses/javascript/lessons/library)

This project shows some of the Object Oriented aspects of JavaScript.

I decided to use a factory function over a constructor for my book objects to avoid some of the [potential issues with constructors](https://tsherif.wordpress.com/2013/08/04/constructors-are-bad-for-javascript/).

For the optional persistent storage step, I opted to set up a [Firebase](firebase.google.com) Realtime Database. Feel free to try adding and removing books!

At this stage, all project requirements are met, but I may eventually add:
* Better styling.
* An API integration to automatically pull things like Cover Images (GoodReads and/or Google Books might be possibilities for this).
* Add a button to "unread" a book (sometimes people like to read things more than once)
* Integrate firebase authentication to allow each user to have their own library stored in the database.
