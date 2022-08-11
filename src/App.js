import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is our first note",
      date: "24/05/2022",
    },
    {
      id: nanoid(),
      text: "This is our second note",
      date: "21/06/2022",
    },
    {
      id: nanoid(),
      text: "This is our third note",
      date: "15/07/2022",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    console.log(savedNotes);
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    console.log(text);
    const date = new Date();
    console.log(date);
    const localDate = date.toLocaleDateString();
    console.log(localDate);

    const newNote = {
      id: nanoid(),
      text: text,
      date: localDate,
    };

    console.log(newNote);
    const newNotes = [...notes, newNote];

    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const restNotes = notes.filter((note) => note.id !== id);
    setNotes(restNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleModeToggle={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) => note.text.includes(searchText))}
          handleAddNote={addNote}
          handleDelNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
