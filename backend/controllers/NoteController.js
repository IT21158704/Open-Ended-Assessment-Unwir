import Note from "../models/NoteModel.js"

export const addNote = (req,res)=>{

    const title = req.body.title;
    const content = req.body.content;

    const newNote = new Note({
        title,
        content
    })

    newNote.save().then(()=>{
        res.status(200).send({status: "Note Added"})
    }).catch((err)=>{
        res.status(500).send({status: "Error with adding data",error:err.message});
    })

}


export const getNote = (req,res)=>{

    Note.find().then((notes)=>{
        res.status(200).send(notes)
    }).catch((err)=>{
        res.status(500).send({status: "Error with fetching data",error:err.message});
    })

}

export const updateNote = async (req, res) =>{
    let id = req.params.id;
    const {
        title,
        content} = req.body;

    const updateNote = {
        title,
        content
    }

    const update = await Note.findByIdAndUpdate(id, updateNote)
    .then(()=>{
        res.status(200).send({status: "Note Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data",error:err.message});
    })
}

//Delete Note by ID
export const deleteNote = async (req, res) => {
    try {
        let id = req.params.id;
        await Note.findByIdAndDelete(id);
        res.status(200).send({ status: "Note Deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with delete", error: err.message });
    }
};