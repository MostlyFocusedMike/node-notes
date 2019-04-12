# Prologue:  pgAdmin setup

## configuration of initial server
- pgAdmin is a free gui for using postgres
- when you first load it up, it won't have any servers, you have to add a new
  connection 
- Do this by going to, in the top menu: `Object > Connect Server > `
- Then just fill out the name of the server, probably "PostgreSQL 10", 
  and the rest should be autofilled for you
- Once the connection has been made to the main server, you should see all 
  your databases



##  Basics of pgAdmin
### Object Pane
- the pane on the left of the window is the "object pane", and it's where you can 
  see all your stuff in a tree view 
- to find the schema of a table do: 

> [db name] > Schemas > Public > Tables > [table name] > columns
    
- that will show you the column names 

### Query Tools
- there is also a query writer and viewer, to use this just click a db and then 
  in the menu choose Tools > Query Tool
   - there is also a shortcut, in the 'Object Pane' there is a lightning bolt button,
     click that to open up new query tabs
- this opens up a new tab for you to execute queries and see the output in 
  a spreadsheet 
- To run the query, either hit F5 or hit the lighting bolt button on the query tab 
  (not the one in the object pane, that will open another query tab)
- to set the shortcut to something less terrible than F5, go to 
  
> File > Preferences > Query Tool > Keyboard shortcuts

- currently I have it to `ctrl-r`
- you can also export a query result to a .csv by clicking the button all the way 
  to the right on the sub menu bar where the lighting bolt button was 
    - if you want to configure the csv, do it in the same preferences menu as 
      where you altered the keyboard shortcuts

## What is ANSI? 

> SQL comes in several variants, which are generally tied to specific
database systems.
> The American National Standards Institute (ANSI) and
International Organization for Standardization (ISO),set standards
for products and technologies, 
> The good news is that the variants don’t stray far from the
standard, so once you learn the SQL conventions for one database, you can transfer 
that knowledge to other systems.
- some examples in this doc will be PG specific later on, and those will be noted

----------------------------------------------------------------------
# Ch.1: Creating Your First DB and Table 
- A table is a grid of rows and columns that store data. 
    - each row holds a collection of columns, 
    - each column contains data of a specified type: most commonly,
      **numbers, characters, and dates.**
- a table itself usually refers to an *entity*, that contains smaller bits of 
  information
   - the 'entity' would be a class, and the students would be inside 
- Relational Databases are so powerful because entities can point to another.
- A class table could have merely student **ids** instead of student info
- these ids are keys to another table, a **students** table, and by following the
  key id, you can find out much more info on the student:

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
- this allows us to save duplicate info from  going on the tables (Davis is 
  signed up for two classes), and instead we can put the minimal info on each
  table (just the student and class ids appear on tables)

- when we DO want to see all info, including duplicates, we can do a join query, 
  which we'll talk about later, 

## Creating a Database 
- The PostgreSQL program is technically a *database management system*, the same
  way iTerm is not a terminal, it's a terminal emulator
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
- here we have 2 keywords, CREATE and DATABASE, followed by the name of the DB we 
  want to create 
- most ANSI based SQL languages require a semi colon, so it's good practice to put
  them at the end of each query


## Executing SQL in pgAdmin
- basically just click the DB you want to execute statements on, and then click 
  the lighting bolt 
- to save the query, you just click the floppy disk icon in the left hand corner, 
- to open a previously saved query, click the folder icon


## Creating a table 
- here is the actual sql command

```sql
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(25),
    last_name VARCHAR(50),
    school VARCHAR(50),
    hire_date date,
    salary numeric
);
```

- the two keywords are `create` and `table`, followed by the name of the table 
- inside the parenthesis are the names of the columns (sometimes called fields 
  or attributes) and their assigned `data types`
- these specify the type of data that is allowed in the common, here are the 
  some of the basic ones: 

  - SERIAL
    - This is pg's way of handling auto increments. `serial`, `smallserial`, and 
      `bigserial` cover different ranges.
    - `serial` goes up to about 2 billion, if you need bigger, go to `bigserial`
  
  - PRIMARY KEY
    - technically, this is a constraint not a data type 
    - A primary key is used to uniquely identify a row on a table, so there can 
      only be one per table (but should pretty much be on every table)
    - It's really shorthand for the contstraints `NOT NULL` and `UNIQUE`
    -the names for columns that use these are usually 'id'

  - VARCHAR(len), TEXT
    - these two are for string types, with VARCHAR() specifying a hard limit on
      the length, while TEXT has no limit 
    - require single quotes when entering

  - DATE
    - stores date values, requires quotes, goes in '2011-10-30' format
    - again, must use single quotes

  - NUMERIC, INTEGER, FLOAT
    - INTEGER is a 4 bit number, float is a decimal, and numeric can have no limit

- Here are desciptions of [more data types
](http://www.postgresqltutorial.com/postgresql-data-types/) but we will cover them
  ourselves in ch. 3 

- after you run that query, (don't forget the closing parens and ';'), see the table 
  by going to the object browser on the left, left clicking to hit 
  'refresh', and then navigate to: 

> [db name] > Schemas > Public > Tables > [table name] > columns

- click the plus sign to see more detail, like column names 


## Inserting Rows into a Table
- use the `INSERT` and `INTO` keywords to specify which table and what rows
- use `VALUES` to actually put out the values 
    
```sql
 INSERT INTO teachers (first_name, last_name, school, hire_date, salary)
 VALUES ('Janet', 'Smith', 'F.D. Roosevelt HS', '2011-10-30', 36200),
    ('Lee', 'Reynolds', 'F.D. Roosevelt HS', '1993-05-22', 65000),
    ('Samuel', 'Cole', 'Myers Middle School', '2005-08-01', 43500),
    ('Samantha', 'Bush', 'Myers Middle School', '2011-10-30', 36200),
    ('Betty', 'Diaz', 'Myers Middle School', '2005-08-30', 43500),
    ('Kathleen', 'Roush', 'F.D. Roosevelt HS', '2010-10-22', 38500);
```

- each value set is enclosed in parens and separated by commas
- think of them like an array that match the order given in the `INSERT INTO` 
  clause 
- the order of the given values inside parens doesn't matter as long as it matches 
  the order of the `INSERT INTO` clause 
- not all values must be given, any left out will be given NULL values, or 
  defaults specified (more on that later)
- this is what happens to our id column, it auto increments 
- if no column names are given, SQL will assume all the values go left to right
  in the db with no spaces between them

### view table data without SQL
- queries can be used to see data, but if you just want to see rows quick,
  right click the table name and go to 'views', and select 'all rows', or whatever
  option listed that you want 

### Formatting SQL for Readability
- Keywords and data types are usually all caps (not always data types, but I will)
- use snake case for variables
- tab or space where it makes sense for code blocks of SQL

### Droping tables and DB
- simple but PERMANENT: 

```sql
DROP TABLE table_name;
DROP DATABASE db_name;
```

- use with caution because all the data will be lost 
- If you want to delete all data from a table, but keep the schema use: 

```sql
DELETE FROM table_name;
```

### quotes 
- per https://stackoverflow.com/questions/41396195/what-is-the-difference-between
-single-quotes-and-double-quotes-in-postgresql

> Double quotes are for names of tables or fields. 
> Sometimes You can omit them. The single quotes are for string constants. 
> This is the SQL standard. In the verbose form your query look like this:

```sql
select * from "employee" where "employee_name"='elina';
```

# Beginning Data Exploration with SELECT
- the `SELECT` keyword selects all rows and columns from a table, or can select 
  along more specific parameters 
- here's the most basic: 

```sql
SELECT * FROM teachers;
```

- this would select every row and column from teachers 
- the '*' is a wildcard, and it's shorthand for 'everything'
- you can also select only certain columns by specifying them in a list

```sql
SELECT last_name, first_name, salary 
FROM teachers;
```

- that would only return the given columns

```plaintext
last_name    first_name    salary
---------    ----------    ------
Smith        Janet         36200
Reynolds     Lee           65000
Cole         Samuel        43500
Bush         Samantha      36200

#etc etc
```
- you can also use aliases to change the name of the printed column with AS: 

```sql
SELECT first_name AS "first", last_name AS "last", salary 
FROM teachers;
```

```plaintext
last         first         salary
---------    ----------    ------
Smith        Janet         36200
Reynolds     Lee           65000
Cole         Samuel        43500
Bush         Samantha      36200

#etc etc
```

- it might seem basic, but it's good to start all queries like this, just to see
  if the data is formed the way it should be, or if anything weird jumps out

## Using DISTINCT to Find Unique Values
- to remove duplicates, you can use the `DISTINCT` keyword: 

```sql
SELECT DISTINCT school
FROM teachers;
```

```plaintext
school
-------------------
F.D. Roosevelt HS
Myers Middle School
```

- be careful though, adding another column means "find distinct combos", like this
  will find only school name, salary distinct combos: 




```sql
SELECT DISTINCT school, salary
FROM teachers;
```

```plaintext
school               salary
-------------------  ------
Myers Middle School  43500
Myers Middle School  36200
F.D. Roosevelt HS    65000
F.D. Roosevelt HS    38500
F.D. Roosevelt HS    36200 
```

- there were two people at myers who ade $43,500, so one was removed


## Sorting Data with ORDER BY clause
- you can also specify the order of output with `ORDER BY`

```sql
SELECT first_name, last_name, salary
FROM teachers
ORDER BY salary DESC;
```

```plaintext
first_name  last_name  salary
----------  ---------  ------
Lee         Reynolds   65000
Samuel      Cole       43500
Betty       Diaz       43500
Kathleen    Roush      38500
Janet       Smith      36200
Samantha    Bush       36200 
```

- you can specify `DESC` or `ASC`, but the default is ascending, so if that's what 
  you want, you can just leave it off
  - be careful when sorting mixed numbers/strings/punctuation, as usual, it will sort 
    things oddly. Try to sort only numbers and pure strings,
  - you can view how the server collates things by running `SHOW ALL;` and checking 
    the lc_collate value, althought this also shows a lot of other info as well

- you can sort by more than one thing at a time as well: 

```sql 
SELECT last_name, school, hire_date
FROM teachers
ORDER BY school ASC, hire_date DESC;
```

```plaintext
last_name school hire_date
--------- ------------------- ----------
Smith F.D. Roosevelt HS 2011-10-30
Roush F.D. Roosevelt HS 2010-10-22
Reynolds F.D. Roosevelt HS 1993-05-22
Bush Myers Middle School 2011-10-30
Diaz Myers Middle School 2005-08-30
Cole Myers Middle School 2005-08-01
```

- firt it sorts by school name, and then within that parameter, it sorts by most 
  recent hire date 
- be careful doing more than 2 sort by orders at once, it will dillute your message


## Filtering Rows with WHERE comparisons
- limit columns with the column list, but limit what rows are returned with the 
  `WHERE` keyword: 


```sql
SELECT last_name, school, hire_date
FROM teachers
WHERE school = 'Myers Middle School';
```

- that would only show the columns in rows where the school name was myers 
- that '=' is not an assignment like code, it's being used as comparator
- here are all operations: 


| Operator    | Function         | Example |
---------     |----------        |---------| 
| =           | Equal to         | WHERE school = 'Baker Middle'
| <> or !=    | Not equal to*    | WHERE school <> 'Baker Middle'
| >           | Greater than     | WHERE salary > 20000
| <           | Less than        | WHERE salary < 60500
| >=          | Greater than or equal to | WHERE salary >= 20000
| <=          | Less than or equal to | WHERE salary <= 60500
| BETWEEN     | Within a range | WHERE salary BETWEEN 20000 AND 40000
| IN          | Match one of a set of values | WHERE last_name IN ('Bush', 'Roush')
| LIKE        | Match a pattern (case sensitive) | WHERE first_name LIKE 'Sam%'
| ILIKE       | Match a pattern (case insensitive) |WHERE first_name ILIKE 'sam%'
| NOT         |Negates a condition | WHERE first_name NOT ILIKE 'sam%'

### using IN and BETWEEN 
```sql

SELECT first_name, last_name, school, salary
FROM teachers
WHERE salary BETWEEN 40000 AND 65000;

SELECT first_name, last_name, school, salary
FROM teachers
WHERE salary NOT BETWEEN 40000 AND 65000;

SELECT *
FROM teachers
WHERE id IN (1, 2);

SELECT *
FROM teachers
WHERE id NOT IN (1, 2);
```
- between compares two standalone values, while in takes a list given in parens


### Using LIKE and ILIKE with WHERE
- these two have two special symbols: 

> Percent sign (%) A wildcard matching one or more characters
> Underscore (_) A wildcard matching just one character
> 
> so if we were looking for 'baker', these all work:
```sql
 LIKE 'b%'
 LIKE '%ak%'
 LIKE '_aker'
 LIKE 'ba_er'
```
> would all work


- `ILIKE` works exactly the same, it's just case insensitive
- Here they are in real examples: 

```sql
SELECT first_name
FROM teachers
WHERE first_name LIKE 'Sam%';

SELECT first_name
FROM teachers
WHERE first_name NOT ILIKE 'sam%';
```

## Combining Operators with AND and OR
- you can use more than one check, just like regular coding: 

```sql
SELECT *
FROM teachers
WHERE school = 'Myers Middle School'
AND salary < 40000;

SELECT *
FROM teachers
WHERE last_name = 'Cole'
OR last_name = 'Bush';

SELECT *
FROM teachers
WHERE school = 'F.D. Roosevelt HS'
AND (salary < 38000 OR salary > 40000);
```

- `AND` means all must be true, `OR` just needs at least one to be true
- notice you can use parens to make little sub comparisons 

### using dates 
- when comparing and using dates, if they are both date type objects, you can 
  use comparisons like a timeline

```sql
SELECT *
FROM teachers
WHERE hire_date > to_date('2010-01-01', 'YYYY/MM/DD');

SELECT *
FROM teachers
WHERE hire_date 
BETWEEN to_date('2010-01-01', 'YYYY/MM/DD') AND to_date('2011-01-01', 'YYYY/MM/DD');
```

- if you want the current date, use `CURRENT_DATE`
- you can also search by things like, since that date: 

```sql 
SELECT *
FROM teachers
WHERE hire_date > (CURRENT_DATE - INTERVAL '10 years');
```
-[SO link
](https://stackoverflow.com/questions/5465484/
how-to-list-records-with-date-from-the-last-10-days)

### Putting It All Together
- here's the basic format so far: 

```sql
SELECT column_names
FROM table_name
WHERE criteria
AND/OR criteria
ORDER BY column_names;
```

--------------------------------------------------------------------------------
# CH.3 Understanding data types 
- a 'data dictonary' is a document that tells you what each columns data type is 
- you can generate a rough one using this query: 

```sql
select column_name, data_type 
from information_schema.columns 
where table_name = 'teachers'
```

- on the command line its `\d+ table_name`
- there are 3 main types of data that you will encounter: 
 - Characters Any character or symbol
 - Numbers Includes whole numbers and fractions
 - Dates and times Types holding temporal information


> ## Character Types

- CHAR(len)
  - old, it expects all strings inside to be the length specified, if they are 
    shorter, they are padded by spaces
  - can also be specified as CHARACTER(len), but both are old and rare
- VARCHAR(len)
  - this time it's a variable length, with only the upper limit specified
  - can also be called VARYING(len)
  - max len just for fun is 10485760 characters (about 1 gig, like TEXT)
- TEXT
  - unlike the others, it has no length (technically the length is 1gig)
  - not ANSI standard, but many DB langs have a similar concept

- there is no big dif between the types and performanyoevs, like a state code being 
  a VARCHAR(2) to show what you expect 
- if limit is surpassed the data will be rejected

### aside: COPY keyword 
- you can tell pg to copy tables to a random file: 

```sql
  COPY teachers TO '/Users/me/Desktop/testerino.txt'
  WITH (FORMAT CSV, HEADER, DELIMITER '|');
  
  COPY teachers TO '/Users/me/Desktop/testerino.csv'
  WITH (FORMAT CSV, HEADER, DELIMITER ',');
```

- while most GUI's can do something like this, this is how you would export from
  the command line 
- if you export the file as a .csv and use ',' as the delimeter you can open it 
  in excell (more on this in ch.4)
- include HEADER if you want the column names at the top, and the delimeter can
  be whatever


## Number types 
- use number types when calculations need to be carried out IN the SQL
- there are Integers, Fixed-Point, and Floating-Point number types 

### Integers
There are 3 main types of integers (whole numbers: )

|Data Type | Storage Size | Range             |
|----------|--------------|-------------------|
|SMALLINT  | 2 bytes      | −32768 to +32767  |
|INTEGER   | 4 bytes      | −2147483648 to +2147483647 |
|BIGINT    | 8 bytes      | −9223372036854775808 to +9223372036854775807|

- basically use whatever number seems appropriate, the go to is INTEGER, but if 
  you know something is small, like day of the month, use SMALLINT to save size
- if you try oversizing something, you'll get an `out of range error`

### Auto-Incrementing Integers
- Integers can auto increment if you tell them to, these types are serials, and
  they go off their INT counterparts: 

| Data type | Storage | size Range|
|-----------|---------|-------------|
| smallserial| 2 bytes | 1 to 32767 |
| serial     | 4 bytes | 1 to 2147483647 |
| bigserial  | 8 bytes | 1 to 9223372036854775807 |

- they will start at one and with each new row increase by one
- as we see PRIMARY KEY implementation it is based off of this, and appears to have
  no limit
- with serials, EVERY row that is about to be created increments, which means you
  may get gaps if data is rolled back and never inserted. It's ok to see gaps in 
  your table with serials


## Decimal Numbers 
- the two main types of decimal are Fixed-Point and Floating-Point
  - the Fixed point type is numeric (or decimal)
  - Floating Point types are real and double precision
 
### Fixed-Point
- fixed point takes both a precision and scale like so: `NUMERIC(5,3)` 
  - that's `NUMERIC(precision, scale)` also works `DECIMAL(precision, scale)`
- precision means the maximum length of the digits on either side of the decimal
- scale is how many digits _must_ be on the right of the decimal
- so a Numeric of NUMERIC(5,3), if given .7 would store 0.700, but 2.1357 as 2.136. 
  - The scale takes precedence, yes there are 5 digits allowed for precision, but 
    only 3 are allowed for scale. 
  - digits out of scale are rounded out 
- something to be carefule about is putting an integer into a numeric with scale 
- lets say we put in 700, that would break since our require .000 would mean we have 
  700.000, which is six digits and too big for our precision of 5
- Also, NUMERIC without precision or scale defaults to scale 0, meaning it allows
  131072 digits, which is basically an unlimited size integer

### Floating-Point Types
- REAL and DOUBLE PRECISION allow for 6 and 15 decimal digit precision, ignore
  scale
- that's the float,the decimal can float anywhere within those digits
- since there is no defined scale, these types wont insert 0's to the left of the 
  decimal like fixed does 

## Number types compared 

| Data type | Storage size  | Storage type | Range |
|-----------|---------------|--------------|-------|
| numeric, decimal | variable | Fixed-point | Up to 131072 digits before the
decimal point; up to 16383 digits after the decimal point |
| real | 4 bytes | Floating-point | 6 decimal digits precision | 
| double precision | 8 bytes |  Floating-point | 15 decimal digits precision | 

- and here they are in a query: 

```sql
CREATE TABLE number_data_types (
    numeric_column numeric(20,5),
    real_column real,
    double_column double precision
);

INSERT INTO number_data_types
VALUES
   (.7, .7, .7),
   (2.13579, 2.13579, 2.13579),
   (2.1357987654, 2.1357987654, 2.1357987654);
   
SELECT * FROM number_data_types;
```

```plaintext
numeric_column real_column double_column
-------------- ----------- -------------
 0.70000       0.7         0.7
 2.13579       2.13579     2.13579
 2.13580       2.1358      2.1357987654
```

- a weird note not to confuse, that 2.1358 is like that because it rounded the 
  6th digit to a zero, but since it was a 0, it was ignored, leaving only 5 digits
  it's not like there was some weird PG thing, that's just math

## trouble with Floating-Point math
- long story short, math with floats is weird (or 'inexact')so heads up
- look at what we get from the table data given above:

```sql
SELECT
   numeric_column * 10000000 AS "Fixed",
   real_column * 10000000 AS "Float"
FROM number_data_types
WHERE numeric_column = .7;
```

```
Fixed Float
------------- ----------------
7000000.00000 6999999.88079071
```

- this is why you use integer types whenever possible, then numeric, and lastly 
  floating points. Those should only be used when precision really doesn't matter

---------------------------------------------------------------
## Dates and Times 
- here are the various date and time types: 

| Data type | Storage size | Description | Range |
|-----------|--------------|-------------|-------|
| timestamp | 8 bytes      | Date and time | 4713 BC to 294276 AD |
| date      | 4 bytes | Date (no time) | 4713 BC to 5874897 AD |
| time      | 8 bytes | Time (no date) | 00:00:00 to 24:00:00 | 
|interval   | 16 bytes     | Time interval | +/− 178,000,000 years |

- timestamp, timestamp with time zone, timestamptz
  - stores both the date and time info of a moment
  - you can also include 'with time zone' to specify the timezone
  - timestamptz is a pg specific shortcut, 'with time zone' is ANSI

- date
  - just the date info, no time
- time, time with time zone
  - just the time, you can also add the time zone 

- interval

> interval Holds a value representing a unit of time expressed in the
format quantity unit. 
> It doesn’t record the start or end of a time period,
only its length. 
> (The PostgreSQL documentation at 
https://www.postgresql.org/docs/current/static/datatype-datetime.html 
lists unit values ranging from microsecond to millennium.)

### seeing the types in action

```sql
CREATE TABLE date_time_types (
 timestamp_column timestamp with time zone,
 interval_column interval

INSERT INTO date_time_types
VALUES
 ('2018-12-31 01:00 EST','2 days'),
 ('2018-12-31 01:00 -8','1 month'),
 ('2018-12-31 01:00 Australia/Melbourne','1 century'),
 (now(),'1 week');

SELECT * FROM date_time_types;
```

```plaintext
timestamp_column                interval_column
-----------------------------   ---------------
2018-12-31 01:00:00-05          2 days
2018-12-31 04:00:00-05          1 mon
2018-12-30 09:00:00-05          100 years
2019-01-25 21:31:15.716063-05   7 days
```

- those timestamps use the ISO format of YYYY-MM-DD HH:MM:SS, which is recomended,
  although pg can handle others like MM/DD/YYYY
- notice that we use both abbreviation for time zones as well as UTC offset, 
  both are valid, and these affect the time saved, relative to your system timezone
- [timezones](https://en.wikipedia.org/
wiki/Coordinated_Universal_Time#/media/File:Standard_World_Time_Zones.png.)
- we also use location based time zone in the third entry 
- [timezone db](https://en.wikipedia.org/wiki/Tz_database.)
- as for the interval, notice how it standardizes the inputs, specified by this link:
  [interval](https://www.postgresql.org/docs/current/static/datatype-datetime.html)
- finally, we use pg's now() function to note the exact time an action occurs 


## Using the interval Data Type in Calculations
- you can use the interval mathematically against columns that incororate time:

```sql
SELECT
 timestamp_column,
 interval_column,
 timestamp_column - interval_column AS new_date
FROM date_time_types;
```

```plaintext
timestamp_column               interval_column  new_date
-----------------------------  ---------------  -----------------------------
2018-12-31 01:00:00-05         2 days           2018-12-29 01:00:00-05
2018-12-31 04:00:00-05         1 mon            2018-11-30 04:00:00-05
2018-12-30 09:00:00-05         100 years        1918-12-30 09:00:00-05
2019-01-25 21:31:15.716063-05  7 days           2019-01-18 21:31:15.716063-05
```

- heads up, the third column is called a computed column, or an expression
- the calculated value of interval from timestamp is timestamp with timezone

### Random other types pg supports
- check out this handy list quoted directly from the book: 

- A Boolean type that stores a value of `true` or `false`
- Geometric types that include points, lines, circles, and other two 
  dimensional objects
- Network address types, such as IP or MAC addresses
- A Universally Unique Identifier (UUID) type, sometimes used as a unique 
  key value in tables (THESE WILL COME INTO PLAY IN BIG SYSTEMS )
- XML and JSON data types that store information in those structured formats

## Transforming Values from One Type to Another with CAST
- when you need to convert one type to another, like an int as a string for printing,
  you can do so with the CAST() pg function
  - a shorthand is just using '::'

```sql
 SELECT timestamp_column, CAST(timestamp_column AS varchar(10))
FROM date_time_types;
```
- returns each row as: 2018-12-31 01:00:00-05 and 2018-12-31

```sql
SELECT numeric_column,
  CAST(numeric_column AS integer),
  CAST(numeric_column AS varchar(6))
FROM number_data_types;
```

```plaintext
numeric_column numeric_column numeric_column 
--------       --             --------
70.000  	   70	          70.000
2.136	       2	          2.136
2.136	       2	          2.136
```

```sql
SELECT CAST(char_column AS integer) FROM char_data_types;
```
- the first one casts to keep only the first 10 digits, the rest are tossed 
  - in this case, that removes the time and keeps only the date 
- the second rounds on integer, but just chops off the excess digits for varchar
- and the third will fail, since characters can't be converted to letters 
- and here's the shortcut way to make the same query: 

```sql
SELECT timestamp_column, CAST(timestamp_column AS varchar(10))
FROM date_time_types;

SELECT timestamp_column::varchar(10)
FROM date_time_types;
```
- those are identical




--------------------------------------------------------------------------------
# CH4 Importing and Exporting Data
- tables and their data can be copied over in 'delimited' text files 
- each line of text is a row, values separated by a comma or other character 
- use the COPY() command to import/export these files 
  - this is pg specific command

- using it for imports is simple: 

> 1. Prep the source data in the form of a delimited text file.
> 2. Create a table to store the data.
> 3. Write a COPY script to perform the import.

- this is all pg specific, for cross db compatibility check [this page
](https://wiki.postgresql.org/wiki/ )
  - search Converting from other Databases to PostgreSQL


## Working with Delimited Text Files
- just lines with delimited (separated) values
- most common is CSV (comma separated files)
  - example line: tom,smith,45,CT
  - notice that there are no spaces, just commas, software separates out only on 
    this given value 
- a lot of times you'll see quoted values to get around a string containing a comma
- the quotes are called a "text qualifier", most of the times its a " character
  for CSVs
  - pg does this by default but you can change it if you really need to

## Handling Header Rows
- header rows are the first line and they are the column names
- they are optional
- eg: 

```plaintext
FIRSTNAME,LASTNAME,STREET,CITY,STATE,PHONE
John,Doe,"123 Main St., Apartment 200",Hyde Park,NY,845-555-1212
```
- some DBs need them, but they are optional in pg 

## Using COPY to Import Data
- here is the sql to import table's data (you must have built the schema before)

```sql
COPY table_name
FROM '/users/me/Desktop/your_file.csv'
WITH (FORMAT CSV, HEADER);
```

- the COPY command is followed by the table name where you are inserting 
- FROM is followed by the file that you are importing from 
- WITH tells you the FORMAT, ussually CSV, and alwaywas required, the HEADERS 
  part is optional 
  - other options are TEXT or BINARY
  - if TEXT is used, tabs become the deafult delimeter
  - [more info](https://wiki.postgresql.org/wiki/COPY)
- COPY FROM appends data to a table, so if there is data in it already it is not
  overwritten by the copy
- other options (the delete lets you run it a bunch over and over): 

```sql
DELETE FROM teachers;

COPY teachers
FROM '/users/mikecronin/Desktop/testerino.csv'
WITH (FORMAT CSV, HEADER, DELIMITER '|');
```
- DELIMITER let's you specify the character used as delimiter
- HEADER tells you there is a header row, just include it if there is
- QUOTE tells you what the text qualifier is like `QUOTE 'quote_character'` 
  - the character in question is surrounded by single quotes
 

## Importing a Subset of Columns with COPY
- sometimes your csv file is missing a column, so you can tell it what columns 
  are present in the CSV to import those, and simply null the missing column: 

```sql
COPY supervisor_salaries (town, supervisor, salary)
FROM 'C:\YourDirectory\supervisor_salaries.csv'
WITH (FORMAT CSV, HEADER);
```
```plaintext
town      county supervisor start_date salary       benefits
----      ------ ---------- ---------- ----------   --------
Anytown          Jones                 $27,000.00
Bumblyburg       Baker                 $24,999.00 
```
- after the table name, just list the columns present in the CSV
- that assumes your table had extra columns setup already


## Adding a Default Value to a Column During Import











pg 76/392