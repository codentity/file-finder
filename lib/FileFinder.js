'use strict';

const path = require('path');
const minimatch = require('minimatch');

class FileFinder {
  constructor (config) {
    config = config || {};
    this._filePaths = this._getRelativeFilePaths(config.filePaths || []);
    this._baseDir = config.baseDir || '';
  }
  static make (config) {
    return new FileFinder(config);
  }
  from (filePaths) {
    this._filePaths = this._getRelativeFilePaths(filePaths);
    return this;
  }
  find (query) {
    return this._filePaths.filter(function (filePath) {
      return this._isMatch(query, filePath);
    }.bind(this));
  }
  findFirst (query) {
    for (let filePath of this._filePaths) {
      if (this._isMatch(query, filePath)) return filePath;
    }
  }
  _isMatch (query, filePath) {
    return minimatch(filePath, query);
  }
  _getRelativeFilePaths (filePaths) {
    return (filePaths || []).map((filePath) => {
      return path.relative(this._baseDir, filePath);
    });
  }
}

module.exports = FileFinder;
