# L2-B2-assignment-2

###how to run the express js application locally.

- First open terminal and init npm and setup package.json

```
npm init -y
```

- then create a file '.index.js' and configure exprss and listen to events

```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

```

- then run the index.js file

```
node app.js

```
