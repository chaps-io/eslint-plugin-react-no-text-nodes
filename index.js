'use strict';

const has = require('has');

const allRules = {
  'jsx-no-textnodes': require('./lib/rules/jsx-no-textnodes'),
};

function filterRules(rules, predicate) {
  const result = {};
  for (const key in rules) {
    if (has(rules, key) && predicate(rules[key])) {
      result[key] = rules[key];
    }
  }
  return result;
}

function configureAsError(rules) {
  const result = {};
  for (const key in rules) {
    if (!has(rules, key)) {
      continue;
    }
    result[`react/${key}`] = 2;
  }
  return result;
}

const activeRules = filterRules(allRules, rule => !rule.meta.deprecated);
const activeRulesConfig = configureAsError(activeRules);

const deprecatedRules = filterRules(allRules, rule => rule.meta.deprecated);

module.exports = {
  deprecatedRules: deprecatedRules,
  rules: allRules,
  configs: {
    recommended: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'react/jsx-no-comment-textnodes': 2
      }
    },
    all: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: activeRulesConfig
    }
  }
};
