const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
const app = express();

const {mongoose} = require('./database');
//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//Routes
//Robot actions
app.use('/robot/actions/types',require('./routes/action.routes'));
app.use('/robot/emotions/types',require('./routes/emotion.routes'));
//Robot action logs
app.use('/robot/dialogs',require('./routes/speech.routes'));
app.use('/robot/listenings',require('./routes/listening.routes'));
app.use('/robot/actions',require('./routes/actionlog.routes'));
app.use('/robot/emotions',require('./routes/emotionlog.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port '+ app.get('port'));
});