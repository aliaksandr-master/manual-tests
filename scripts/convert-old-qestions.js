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

glob
  .sync(path.join(SRC_PATH, '*.json'))
  .map((file) => JSON.parse(fs.readFileSync(file, 'utf8')))
  .forEach((questionsArray) =>
    questionsArray
      .map((question, index) => ({
        id: sha1(String(++counter)).toString(),
        type: question.type || 'simple',
        tag: question.tags[0] || 'undefined',
        question: question.question,
        choices: Object.keys(question.answers).map((key) => question.answers[key].text),
        answers: question.truth.map((index) => index - 1)
      }))
      .forEach((question) => {
        let content = new Buffer(JSON.stringify(question)).toString('base64');

        fse.ensureDirSync(DEST_PATH);

        fs.writeFileSync(path.join(DEST_PATH, `${question.id}.dat4`), content, 'utf8');
      })
  )
;
