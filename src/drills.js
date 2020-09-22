'use strict';

require('dotenv').config();
const knex = require('knex');
const prompt = require('prompt-sync')();

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function getItemsWithText(searchTerm) {
  db.from('shopping_list')
    .select('item_id','item_name', 'price', 'category')
    .where('item_name','ILIKE',`%${searchTerm}%`)
    .then(res => {
      console.log(res);
      db.destroy();
    });
}

const searchTerm = prompt('What would you like to search for? ');
getItemsWithText(searchTerm);

function paginateList(pageNumber) {
  const offset = 6 * (pageNumber - 1);
  db
    .from('shopping_list')
    .select('item_id', 'item_name', 'price', 'category')
    .limit(6)
    .offset(offset)
    .then(res => {
      console.log(res);
      db.destroy();
    });
}

const page = prompt('Which page of items would you like to see? ');
paginateList(page);

function findItemsAfterDate(daysAgo) {
  db
    .from('shopping_list')
    .select('item_id', 'item_name', 'price', 'category','date_added')
    .where('date_added',
      '>',
      db.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(res => {
      console.log(res);
      db.destroy();
    });
}

const days = prompt('How many days ago? ');
findItemsAfterDate(parseInt(days));

function totalCostPerCategory() {
  db
    .select('category')
    .sum('price AS total')
    .from('shopping_list')
    .groupBy('category')
    .then(res => {
      console.log(res);
      db.destroy();
    });
}

totalCostPerCategory();