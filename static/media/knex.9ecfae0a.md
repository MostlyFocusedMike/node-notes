https://stackoverflow.com/questions/14141266/postgresql-foreign-key-on-delete-cascade

https://www.techonthenet.com/sql_server/foreign_keys/foreign_delete.php

https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261


Ah then, just for anyone else who runs into something like this, here is the reset file that I used:

#### File: `/db/seeds/00_reset.js` 
```
exports.seed = async function (knex, Promise) {
    // Deletes ALL existing entries
    // must go in reverse order of creation so you don't disrupt foreign key dependencies
    await knex('tasks').del();
    await knex('users').del();
};
```
So you have to delete the `tasks` table first, and *then* you can delete `users`. That way, no data that a foreign key relies on is destroyed until *after* all the foreign keys themselves are deleted. With the delete actions being taken care of in this one file, our other seed files only need to worry about inserting data.

#### File: `/db/seeds/01_users.js`
```
exports.seed = function (knex, Promise) {
    return knex('users').insert([
        {
            id: 1, /* it auto increments, but we have to specify so we can properly link our tasks */
            email: 'tom@email.com',
            password: '12345',
        },
    ]);
};

```

#### File: `/db/seeds/02_tasks.js`
```
exports.seed = function (knex, Promise) {
    return knex('tasks').insert([
        {
            title: 'Clean the car',
            description: 'Wash, wax and vacuum the car',
            is_complete: false,
            user_id: 1,
        },
    ]);
};
```

There is also another option, you could set 

https://stackoverflow.com/questions/14141266/postgresql-foreign-key-on-delete-cascade