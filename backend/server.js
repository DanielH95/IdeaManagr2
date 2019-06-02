const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Idea = require('./models/Idea');

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/idea-managr', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () =>
{
  console.log('Connected to MongoDB')
});


// Get all existing ideas
router.route('/ideas').get((req,res) =>
{
  Idea.find((err,foundIdeas) =>
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.json(foundIdeas);
    }
  })
});

// Get specific existing idea
router.route('/ideas/:id').get((req,res) =>
{
  Idea.findById(req.params.id, (err,foundIdea) =>
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.json(foundIdea);
    }
  });
});

// Post (create) new idea
router.route('/ideas/add').post((req,res) =>
{
  let idea = new idea(req.body);
  idea.save()
    .then(idea =>
    {
      res.status(200).json({'idea': 'New idea was added successfully'});
    })
    .catch(err =>
    {
      res.status(400).send('Failed to create new record');
    });
});

// Post (edit) specific existing idea
router.route('/ideas/update/:id').post((req,res) =>
{
  Idea.findById(req.params.id, (err,foundIdea) =>
  {
    if(!idea)
    {
      return next(new Error('Could not find or load document'));
    }
    else
    {
      foundIdea.title = req.body.title;
      foundIdea.textBox1 = req.body.textBox1;
      foundIdea.textBox2 = req.body.textBox2;
      foundIdea.textBox3 = req.body.textBox3;
      foundIdea.textBox4 = req.body.textBox4;
      foundIdea.textBox5 = req.body.textBox5;
      foundIdea.textBox6 = req.body.textBox6;

      foundIdea.save()
        .then(foundIdea =>
        {
          res.json('Idea updated successfully')
        })
        .catch(err =>
        {
          res.status(400).send('Failed to update existing record');
        });
    }
  });
});

// Get (delete) specific existing idea
router.route('/ideas/delete/:id').get((req,res) =>
{
  Idea.findByIdAndRemove({_id: req.params.id}, (err,foundIdea) =>
  {
    if(err)
    {
      res.json(err);
    }
    else
    {
      res.json('Delete idea successfully');
    }
  });
});



app.use('/', router);

app.get('/', (req,res) => res.send('Connected to Server!'));

app.listen(4000, () => console.log("Connected to Express (Port: 4000)"));