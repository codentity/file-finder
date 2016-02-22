/* globals describe, beforeEach, it */
var expect = require('chai').expect;
var Path = require('path');
var FileFinder = require('../lib/FileFinder');

var FILE_PATHS = [
  'file.js',
  'my-file.js',
  'file.json',
  'pkg/file.js',
  'pkg/FILE.js',
  'src/nested/pkg/file.js'
];

describe('FileFinder', function () {
  describe('.find', function () {
    describe('when relative file paths are used', function () {
      initFileFinder();
      findReturnsExpectedValues();
    });
    describe('when absolute file paths are used', function () {
      initFileFinder('/Users/someone/test');
      findReturnsExpectedValues();
    });
  });
  describe('.findFirst', function () {
    describe('when relative file paths are used', function () {
      initFileFinder();
      findFirstReturnsExpectedValues();
    });
    describe('when absolute file paths are used', function () {
      initFileFinder('/Users/someone/test');
      findFirstReturnsExpectedValues();
    });
  });
});

function initFileFinder (baseDir) {
  beforeEach(function () {
    this.finder = new FileFinder({
      baseDir: baseDir
    });
    this.filePaths = FILE_PATHS.map(function (filePath) {
      return Path.join(baseDir || '', filePath);
    });
    this.finder.from(this.filePaths);
  });
}

function findReturnsExpectedValues () {
  describe('with a file in the root directory', function () {
    it('returns the expected results', function () {
      var foundFiles = this.finder.find('file.js');
      expect(foundFiles).to.deep.equal([
        'file.js'
      ]);
    });
  });
  describe('with a nested file', function () {
    it('returns the expected results', function () {
      var foundFiles = this.finder.find('*/**/file.js');
      expect(foundFiles).to.deep.equal([
        'pkg/file.js',
        'src/nested/pkg/file.js'
      ]);
    });
  });
  describe('with a file that may be in the root or nested', function () {
    it('returns the expected results', function () {
      var foundFiles = this.finder.find('**/file.js');
      expect(foundFiles).to.deep.equal([
        'file.js',
        'pkg/file.js',
        'src/nested/pkg/file.js'
      ]);
    });
  });
  describe('with a directory', function () {
    it('returns the expected results', function () {
      var foundFiles = this.finder.find('pkg/*.js');
      expect(foundFiles).to.deep.equal([
        'pkg/file.js',
        'pkg/FILE.js'
      ]);
    });
  });
}

function findFirstReturnsExpectedValues () {
  describe('with a file', function () {
    it('returns the expected results', function () {
      var foundFiles = this.finder.findFirst('file.js');
      expect(foundFiles).to.deep.equal('file.js');
    });
  });
  describe('with a file path', function () {
    it('returns the expected results', function () {
      var foundFiles = this.finder.findFirst('pkg/file.js');
      expect(foundFiles).to.deep.equal('pkg/file.js');
    });
  });
}
