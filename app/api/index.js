/*eslint-disable*/
'use strict';

var mtApi = exports;
var Db = require('./Db');
var Utils = require('./Utils');
var _ = require('lodash');

var questionDb = Db('questionDb');
var tagDb = Db('tagDb');
var programDb = Db('programDb');
var testsDb = Db('testsDb');
var usersDb = Db('usersDb');
var answersDb = Db('answersDb');

mtApi.getAllQuestions = function () {
  return questionDb.data;
};

mtApi.QUESTION_TYPE = {
  SIMPLE: 1
};

mtApi.createQuestion = function (type, questionText, variantTexts, answers, tags) {
  console.log(arguments);
  return questionDb.setById(null, {
    type: type,
    question: questionText,
    variants: variantTexts,
    answers: answers,
    tags: tags
  });
};

mtApi.updateQuestion = function (questionId, type, questionText, variantTexts, answers, tags) {
  return questionDb.setById(questionId, {
    type: type,
    question: questionText,
    variants: variantTexts,
    answers: answers,
    tags: tags
  });
};

mtApi.findTagByName = function (tagName) {
};

mtApi.setTag = function (tagName) {
  tagName = String(tagName).trim();

  var tagId = tagName.toLowerCase();

  var tag = tagDb.getById(tagId);

  if (tag) {
    return tag;
  }

  return tagDb.setById(tagId, { name: tagName, questions: [] });
};

mtApi.getTestById = function (testId) {
  return testsDb.getById(testId);
};

mtApi.removeTest = function (testId) {
  return testsDb.deleteById(testId);
};

mtApi.updateTest = function (testId, name, count, tags) {
  return testsDb.setById(testId, {
    name: name,
    count: count,
    tags: tags || []
  });
};

mtApi.createTest = function (name, count, tags) {
  return testsDb.setById(null, {
    name: name,
    count: count,
    tags: tags || []
  });
};

mtApi.attachQuestionTag = function (questionId, tagId) {
  var question = questionDb.getById(questionId);
  var tag = tagDb.getById(tagId);

  if (question && tag) {
    question.tags.push(tagId);
    tag.questions.push(questionId);

    question.tags = _.uniq(question.tags);

    tag.questions = _.uniq(tag.questions);

    questionDb.setById(questionId, question);
  }

  questionDb.setById(questionId)
};

mtApi.answer = function (userId, questionId, answers) {
  return answersDb.setById(null, {
    user: userId,
    question: questionId,
    answers: answers
  });
};

mtApi.getActiveTests = function () {
  return testsDb.getByCriteria(function (record) {
    return !record._deleted;
  });
};

mtApi.getQuestionById = function (questionId) {
  return questionDb.getById(questionId);
};

mtApi.getAllActiveQuestions = function () {
  return questionDb.getByCriteria(function (record) {
    return !record._deleted;
  });
};

mtApi.login = function (firstName, lastName, group) {
  var id = String(group).toLowerCase().trim() + '-' + String(firstName).toLowerCase().trim() + '-' + String(lastName).toLowerCase().trim();

  var user = usersDb.getById(id);

  if (user) {
    return user;
  }

  return usersDb.setById(id, {
    isAdmin: group === '123123123123admin',
    group: group,
    lastName: lastName,
    firstName: firstName
  });
};
