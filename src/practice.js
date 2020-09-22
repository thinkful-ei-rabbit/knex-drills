'use strict';

require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .where( 
      'date_viewed', 
      '>', 
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'region', order: 'ASC' },
      { column: 'views', order: 'DESC' }
    ])
    .then(res => {
      console.log(res);
    });
}

mostPopularVideosForDays(1);