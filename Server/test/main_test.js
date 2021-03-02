var assert = require('assert');
const { Contact } = require('../models/book');
const request = require('request');

describe('Testing the Book API', function(){
    describe('Testing the Book Model - Simple cases', function(){
        it('Success 1 - Test creation of a valid Book with parameters matching', function(){
            
        });
        it('Success 2 - Test the insertion of a valid Book (Book.save) - Success Msg test', function(){

        });
        it('Success 3 - Test the update of a valid Book (Book.update) - Success Msg test', function(){
            
        });
        it('Success 4 - Test the deletetion of a valid Book (Book.delete) - Success Msg test', function(){
            
        });
        it('Success 5 - Test the retrieval of a book by id (Book.getBookById) - Success Msg test', function(){
            
        });
        it('Success 6 - Test the retrieval of all books (Book.getBooks) - Success Msg test', function(){
            
        });
    });
    describe('Testing the Book API - Complex Cases', function(){
        it('Success 1 - POST /books, DELETE /books/:id', function(){

        });
        it('Success 2 - POST /books, GET /books (retrieval greater than 1), DELETE /book/:id', function(){
            
        });
        it('Success 3 - POST /books, GET /books/:id, DELETE /book/:id', function(){
            
        });
        it('Success 4 - POST /books, PUT /books/:id, GET /books/:id, DELETE /book/:id', function(){
            
        });
        it('Success 5 - (Optional) Open', function(){

        });
        it('Success 6 - (Optional) Open', function(){

        });
    });
});