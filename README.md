# codentity-file-finder

## Usage

```js
const FileFinder = require('file-finder');
const fs = require('fs');

let finder = FileFinder.make({
  filePaths: fs.readdirSync(`/Users/example/my-app`)
});

let jsFiles = finder.find('**.js'); // find all javascript files
```
