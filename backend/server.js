require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Book library server is up and ready to roll on port ${PORT}`);
});
