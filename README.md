Galvanize Reads
===============

[Live Site](https://galvanize-reeds.herokuapp.com/)

This is a full-stack project for the end of quarter 2 at Galvanize.  The objective was to create a site that served authors and books from a relational database using RESTFUL principals.

### Front-End Tech Stack
 + Jade templating
 + jQuery
 + Bootstrap

### Back-End Tech Stack

+ NodeJS
+ ExpressJS
+ postgreSQL
  + knexJS as a query builder


Thoughts/Concerns/Challenges
-----------------------------
+ (challenge) Promise.all() is the star of the show here, and once I was able to wrap my head around making multiple asynchronous function calls, the project seemed to unfold a lot nicer
+ Need to rework the way I access both relation tables (authors, books) on edit and delete
+ Bug on add author input field (showing [object object])
