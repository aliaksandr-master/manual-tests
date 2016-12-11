'use strict';

const path = require('path');
const glob = require('glob');
const fs = require('fs');
const fse = require('fs-extra');
const sha1 = require('crypto-js/sha1');

const FNAME = path.basename(__filename, path.extname(__filename));

const SRC_PATH = path.resolve(__dirname, FNAME, 'input');
const DEST_PATH = path.resolve(__dirname, FNAME, 'output');

glob
  .sync(path.join(SRC_PATH, '*.json'))
  .map((file) => JSON.parse(fs.readFileSync(file, 'utf8')))
  .map((questionsArray) =>
    questionsArray
      .map((question) => ({
        type: question.type || 'simple',
        tag: question.tags[0] || 'undefined',
        question: question.question,
        choices: Object.keys(question.answers).map((key) => question.answers[key].text),
        answers: question.truth.map((index) => index - 1)
      }))
      .map((question) =>
        Object.assign({}, question, {
          id: sha1(JSON.stringify(question)).toString()
        })
      )
  )
  .forEach((questionsArray) => {
    questionsArray.forEach((question) => {
      let content = new Buffer(JSON.stringify(question)).toString('base64');
      const salt = String(question.id);
      const place = Math.floor(content.length / 2);

      const fExt = '.dat4';

      fse.ensureDirSync(DEST_PATH);

      content = content.slice(0, place) + salt + content.slice(place);

      fs.writeFileSync(path.join(DEST_PATH, `${question.id}-${place.toString(36)}-${salt.length.toString(36)}${fExt}`), content, 'utf8');
    })
  })
;
