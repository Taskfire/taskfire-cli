"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handlerError;
// import chalk from 'chalk'

function handlerError(err, exit) {
  console.log(err);
  if (exit !== false) process.exit(1);
}