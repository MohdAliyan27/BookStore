const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

router.get('/', (req, res) => {
    res.render("book/addOrEdit", {
        viewTitle: "Insert Book"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var book = new Book();
    book.fullName = req.body.fullName;
    book.email = req.body.email;
    book.mobile = req.body.mobile;
    book.city = req.body.city;
    book.save((err, doc) => {
        if (!err)
            res.redirect('book/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("book/addOrEdit", {
                    viewTitle: "Insert Book",
                    book: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Book.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('book/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("book/addOrEdit", {
                    viewTitle: 'Update Book',
                    book: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Book.find((err, docs) => {
        if (!err) {
            res.render("book/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving Book list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Book.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("book/addOrEdit", {
                viewTitle: "Update Book",
                book: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/book/list');
        }
        else { console.log('Error in book delete :' + err); }
    });
});

module.exports = router;
