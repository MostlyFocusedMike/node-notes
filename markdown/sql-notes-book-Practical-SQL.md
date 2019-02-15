
# Prologue:  pgAdmin setup

## configuration of initial server
- pgAdmin is a free gui for using postgres
- when you first load it up, it won't have any servers, you have to add a new connection 
- Do this by going to, in the top menu: 
   - Object > Connect Server > 
- Then just fill out the name of the server, probably "PostgreSQL 10", and the rest should be autofilled for you
    - Once the connection has been made to the main server, you should see all your databases



##  Basics of pgAdmin
### Object Pane
- the pane on the left of the window is the "object pane", and it's where you can see all your stuff in a tree view 
- to find the schema of a table do: 
> [db name] > Schemas > Public > Tables > [table name] > columns
    
- that will show you the column names 

### Query Tools
- there is also a query writer and viewer, to use this just click a db and then in the menu choose Tools > Query Tool
   - there is also a shortcut, in the 'Object Pane' there is a lightning bolt button, click that to open up new query tabs
- this opens up a new tab for you to execute queries and see the output in a spreadsheet 
- To run the query, either hit F5 or hit the lighting bolt button on the query tab (not the one in the object pane, that will open another query tab)
   - to set the shortcut to something less terrible than F5, go to File > Preferences > Query Tool > Keyboard shortcuts > and then just set it, currently I have it to <ctrl-r>
- you can also export a query result to a .csv by clicking the button all the way to the right on the sub menu bar where the lighting bolt button was 
    - if you want to configure the csv, do it in the same preferences menu as where you altered the keyboard shortcuts

## What is ANSI? 
> SQL comes in several variants, which are generally tied to specific
database systems.
> The American National Standards Institute (ANSI) and
International Organization for Standardization (ISO),set standards
for products and technologies, 
> The good news is that the variants don’t stray far from the
standard, so once you learn the SQL conventions for one database, you can transfer that knowledge to other systems.
- some examples in this doc will be PG specific later on, and those will be noted
----------------------------------------------------------------------
# Ch.1: Creating Your First DB and Table 
- A table is a grid of rows and columns that store data. 
    - each row holds a collection of columns, 
    - each column contains data of a specified type: most commonly, **numbers, characters, and dates.**
- a table itself usually refers to an *entity*, that contains smaller bits of information
   - the 'entity' would be a class, and the students would be inside 
- Relational Databases are so powerful because entities can point to another.
- A class table could have merely student **ids** instead of student info
- these ids are keys to another table, a **students** table, and by following the key id, you can find out much more info on the student:

```plaintext
student_id class_id    class_section semester
---------- ----------  -------------  ---------
CHRISPA004 COMPSCI101  3             Fall 2017
DAVISHE010 COMPSCI101  3             Fall 2017
ABRILDA002 ENG101      40            Fall 2017
DAVISHE010 ENG101      40            Fall 2017
RILEYPH002 ENG101      40            Fall 2017 
```
- those ids then point to info on this table:

```plaintext
student_id first_name last_name dob
---------- ---------- --------- ----------
ABRILDA002 Abril      Davis     1999-01-10
CHRISPA004 Chris      Park      1996-04-10
DAVISHE010 Davis      Hernandez 1987-09-14
RILEYPH002 Riley      Phelps    1996-06-15
```

- which allows us to join the tables and do: 

```plaintext
class_id    first_name  last_name
----------  ----------  ---------
COMPSCI101  Davis       Hernandez
COMPSCI101  Chris       Park
ENG101      Abril       Davis
ENG101      Davis       Hernandez
ENG101      Riley       Phelps
```
- this allows us to save duplicate info from  going on the tables (Davis is signed up for two classes), and instead we can put the minimal info on each table (just the student and class ids appear on tables)

- when we DO want to see all info, including duplicates, we can do a join query, which we'll talk about later, 

## Creating a Database 
- The PostgreSQL program is technically a *database management system*, the same way iTerm is not a terminal, it's a terminal emulator
   - the PG program lets you talk to databases according to how PG works

> When PostgreSQL is installed, it creates a default database
server—an instance of the application running on your computer—that
includes a default database called 'postgres'  

- leave it alone for now, let's make our own
- Queries start out super simple: 

```sql
CREATE DATABASE analysis;
```
- typically you capitalize SQL keywords so you can tell what is a name or parameter
- here we have 2 keywords, CREATE and DATABASE, followed by the name of the DB we want to create 
- most ANSI based SQL languages require a semi colon, so it's good practice to put them at the end of each query
-

