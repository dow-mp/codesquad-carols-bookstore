const siteData = require('../data/siteData');
const Author = require('../models/authorModel');

module.exports = {
  all_authors: (request, response) => {
    Author.find({}, (error, allAuthors) => {
      if(error){
        return error;
      } else {
        response.render('pages/authors', {
          copyrightYear: siteData.year,
          authorArray: allAuthors
        });
      }
    });
  },
  author_detail: (request, response) => {
    const {_id} = request.params;
    Author.findOne({_id: _id}, (error, foundAuthor) => {
      if(error) {
        return error;
      } else {
        response.render('pages/authorDetail', {
          name: siteData.userName,
          copyrightYear: siteData.year,
          author: foundAuthor
      });
      }
    })
  },
  author_create_post: (request, response) => {
    if (request.isAuthenticated()) {
      const {firstName, lastName, birthYear, bio} = request.body;
      const newAuthor = new Author ({
        firstName: firstName,
        lastName: lastName,
        birthYear: birthYear,
        bio: bio
      });

      newAuthor.save();

      response.redirect("/admin/admin-authors"); 
    } else {
      response.redirect('/login');
    }
  },
  author_update_put: (request, response) => {
    if(request.isAuthenticated()) {
      const { _id } = request.params;
      const {firstName, lastName, birthYear, bio} = request.body;
      Author.findByIdAndUpdate(_id, {$set: {
        firstName: firstName,
        lastName: lastName,
        birthYear: birthYear,
        bio: bio
      }}, {new: true}, error => {
        if(error) {
          return error;
        } else {
          response.redirect("/admin/admin-authors");
        }
      }) 
    } else {
      response.redirect('/login');
    }   
  },
  author_delete: (request, response) => {
    if(request.isAuthenticated()) {
      const { _id } = request.params;
      Author.deleteOne({_id: _id}, error => {
        if(error) {
          return error;
        } else {
          response.redirect("/admin/admin-authors")
        }
      }); 
    } else {
      response.redirect('/login');
    }
  }
}