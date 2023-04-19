const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())
app.use(express.static("build"))

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];


  let persons=[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]


app.get("/", (req, res) => {
  res.send("<h1>Hello World!!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});



app.get("/api/notes/:id", (req, res)=>{
    const note = notes.find(n=>n.id===Number(req.params.id));
    if(note){
      res.json(note)
    }else{
      res.status(404).end()
    }
})


app.delete("/api/notes/:id", (req, res)=>{
  notes=notes.filter(n => n.id !== Number(req.params.id))
  res.status(204).end()
})


const generateId = (arr)=>{
  const maxId = arr.length>0 
  ? Math.max(...arr.map(n=>n.id)) 
  : 0;
  return maxId + 1
}

app.post('/api/notes', (req, res) => {
  const {body} = req;
if(!body.content){
  return res.status(400).json({error: "Content is missing"})
}

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes)
  }

  console.log(note);

  notes = notes.concat(note)
  res.json(note);
})

app.get("/api/persons", (req, res)=>{
  res.json(persons)
})

app.post("/api/persons", (req,res)=>{
  const newPerson = {
    name: req.body.name,
    number: req.body.number,
    id: generateId(persons)
  }

  console.log(req.body)
  res.json(newPerson)
})

app.delete("/api/persons/:id", (req,res)=>{
  persons = persons.filter(p=>p.id!==Number(req.params.id))
  res.json(persons)
})

app.put("/api/persons/:id", (req,res)=>{
  persons = persons.map(p=>{
    p.id===Number(req.params.id) ?
      {
        ...p,
        name: req.body.name,
        number: req.body.number
      }
      : p
    }) 
  res.json(persons)
  
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
