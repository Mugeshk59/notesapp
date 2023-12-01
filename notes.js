const { default: chalk } = require("chalk");
const fs = require("fs");


const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((notes) => {
    return notes.title === title;
  });
  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log("Note added successfully!");
  } else {
    console.log("Note title taken! Please ue different Title.");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  console.log("Removing Notes! title : " + title);
  console.log("title : " + title);
  const removedNotes = notes.filter((notes) => {
    return notes.title !== title;
  });
  if (notes.length === removedNotes.length)
    console.log(chalk.red("title not found in notes!"));
  else {
    saveNotes(removedNotes);
    console.log(chalk.green("Note removed SuccessFully!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  return notes.map((note) => note.title);
};

const readNote = (title) => {
  const notes = loadNotes();
  return notes.find((note) => note.title == title);
};
const saveNotes = function (notes) {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJson);
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
