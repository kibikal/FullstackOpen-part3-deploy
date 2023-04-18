const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors())

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


app.post('/api/notes', (req, res) => {
const generateId = ()=>{
  const maxId = notes.length>0 
  ? Math.max(...notes.map(n=>n.id)) 
  : 0;
  return maxId + 1
}
  const {body} = req;
if(!body.content){
  return res.status(400).json({error: "Content is missing"})
}

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId()
  }

  console.log(note);

  notes = notes.concat(note)
  res.json(note);
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
