const express = require('express');
const morgan = require('morgan');
const app = express();

const {mongoose} = require('./database');
//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
//Robot actions
app.use('/api/actions',require('./routes/action.routes'));
app.use('/api/emotions',require('./routes/emotion.routes'));
//Robot action logs
app.use('/api/dialogs',require('./routes/dialogs.routes'));
app.use('/api/listenings',require('./routes/listenings.routes'));
app.use('/api/actions/types',require('./routes/listenings.routes'));
app.use('/api/emotions/types',require('./routes/listenings.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port '+ app.get('port'));
});