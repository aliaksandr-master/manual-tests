'use strict';

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const fse = require('fs-extra');
const sha1 = require('crypto-js/sha1');

const FNAME = path.basename(__filename, path.extname(__filename));

const SRC_PATH = path.resolve(__dirname, FNAME, 'input');
const DEST_PATH = path.resolve(__dirname, FNAME, 'output');

let counter = Date.now();

const qArr = glob
  .sync(path.join(SRC_PATH, '*.json'))
  .map((file) => JSON.parse(fs.readFileSync(file, 'utf8')))
  .map((qArr) =>
    qArr
      .map((question, index) => ({
        id: sha1(String(++counter)).toString(),
        type: question.type || 'simple',
        tag: question.tags[0] || 'undefined',
        question: question.question,
        choices: Object.keys(question.answers).map((key) => question.answers[key].text),
        answers: question.truth.map((index) => index - 1)
      }))
  )
  .reduce((result, qArr) => result.concat(qArr), []);

const id = sha1(String(JSON.stringify(qArr))).toString();

const lines = qArr.map((q) => `${q.id} ${new Buffer(JSON.stringify(q)).toString('base64')}`);

fse.ensureDirSync(DEST_PATH);

fs.writeFileSync(path.join(DEST_PATH, `${Date.now().toString(36)}-${id}.dat4`), lines.join('\n'), 'utf8');
