const express = require('express');
const bodyParser = require('body-parser');
const appealRoutes = require('./routes/appealRoutes');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', appealRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});