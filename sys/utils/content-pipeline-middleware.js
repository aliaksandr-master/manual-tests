/* eslint-disable prefer-template */
'use strict';

const _ = require('lodash');
const fs = require('fs');
const url = require('url');

module.exports = (fileDir, pipeline) => (req, res) => {
  const filePath = fileDir + url.parse(req.url).pathname;
  let content = fs.readFileSync(filePath, { encoding: 'utf8' });

  if (!_.isArray(pipeline)) {
    pipeline = [ pipeline ];
  }

  _.each(pipeline, (pipeFunction) => {
    content = pipeFunction(content, filePath);
  });

  res.send(content);
};
