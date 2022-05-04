const mongoose = require('mongoose');
const url = require('./common')
//mongodb+srv://mongodb:<password>@cluster0.lwq2w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb://localhost:27017/BookStores
const flag=false;
var mongoUrl;
// if(flag==true ? mongoUrl='mongodb+srv://mongodb:mongodb@cluster0.lwq2w.mongodb.net/booktest?retryWrites=true&w=majority' :
// mongoUrl = 'mongodb://localhost:27017/BookStores');
mongoUrl = url(flag);
mongoose.connect(mongoUrl, { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./book.model');
