Signboard
=============

A simple Kanban board using AngularJS, Flask, SQLite, jQuery and eventually D3 visualizations.

The kanban board allows you to organize your process management by creating "cards" then dragging and dropping those cards through each stage of a process until completion. The application keeps track of every card's movement history (it's 'flow') for later analysis.

Installation
-------------
The only dependency is on Flask - a python-based, web 'micro' framework. To install it type:
`pip install -r requirements.txt`

It's advised that you allow pip to install the dependencies in an isolated virtualenv.

Running the application
-------------
This application has only been run on Ubuntu and the latest version of Chrome (as of July 5th 2012). It will probably work on later versions of Firefox and it will probably not run on versions of IE early than 9.

To run the application simply type:
`./app.py`

Then navigate to:
`http://localhost:<port>/#?id=1`

The database comes preloaded with a test board at id=1. To reload that test board to its original state:
`$ python
 > import app; app.init_db()`
