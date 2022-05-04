const url = function(flag){
    if(flag==true ? mongoUrl='mongodb+srv://mongodb:mongodb@cluster0.lwq2w.mongodb.net/booktest?retryWrites=true&w=majority' :
    mongoUrl = 'mongodb://localhost:27017/BookStores');
    console.log("Success")
    return mongoUrl;
}

module.exports = url;
