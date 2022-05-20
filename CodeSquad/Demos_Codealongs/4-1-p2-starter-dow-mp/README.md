# Unit 4.0 Period 4 Classwork
During this classwork, you will start to:
  - update all the handlers to use the the data located in the local MongoDB instead of the static js file.

<i>Remember, you can use all the files that is related to books as your guide to develop the authors.</i>

## Updating handlers in authorsCtrl.js 
- In your VSCode, open authorsCtrl.js
- Create a new variable called Author and require the authorModel.js file that is located in the models folder (you can comment out the authorData.js for now)
- You will need to updated all of the handlers to use the following Mongoose function
  - all_authors = .find()
  - author_detail = .findOne()
  - author_create_post = new Author() and the .save()
  - author_update_put = findByIdAndUpdate()
  - author_delete = deleteOne()


## Updating handlers in adminCtrl.js
- In your VSCode, open adminCtrl.js
- Create a new variable called Author and require the authorModel.js file that is located in the models folder (you can comment out the authorData.js for now)
- You will need to updated all of the handlers to use the following Mongoose function
  - admin_authors = .find()
  - author_update_get = findOne()
