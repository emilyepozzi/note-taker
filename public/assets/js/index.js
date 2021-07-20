var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// active notes watches notes in the textarea

var activeNote = {};

var gettingNote = function () {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

//saving note in the database

var savingNotes = function (note) {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

// const show = (elem) => {
//   elem.style.display = 'inline';
// };
// const hide = (elem) => {
//   elem.style.display = 'none';
// };

// deleting a note database
var deletingNotes = function (id) {
    return $.ajax({
        url: "api/notes/" + id, 
        method: "DELETE"
    });
};

// // activeNote is used to keep track of the note in the textarea

var deletingNotes = function (id) {
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE"
    });
};

var gettingAN = function () {
    $saveNoteBtn.hide();
    if (activeNote.id) {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
      } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }};

// const gettingNote = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

var handleNoteSave = function () {
    var newNote = {
        title: $noteTitle.val(), 
        text: $noteText.val()
    };
    savingNotes (newNote).then(function (data) {
    getAndRenderNotes();
    gettingAN();
});
};
// )  fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });


//deleting the clicked note?? maybe..
var handleNoteDelete = function (e) {
    e.stopPropagation();

    var note = $(this)
    .parent(".list-group-item")
    .data();

    if (activeNote.id === note.id) {
        activeNote = {};
    }

    deletingNotes(note.id).then(function () {
        getAndRenderNotes();
        gettingAN();
    });
};
// const deletingNotes = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// showing the activeNote
const gettingAN = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = function () {
  const newNote = {
    title: $noteTitle.value,
    text: $noteText.value,
  };
  savingNotes(newNote).then(function (data) {
    getAndRenderNotes();
    gettingAN();
  });
};

// Deleting the click notes
const handleNoteDelete = function (e) {
  // Prevents the click listener for the list from being called
  e.stopPropagation();

  const note = $(this)
  .parent(".list-group-item")
  .data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deletingNotes(note.id).then(function (e) {
    getAndRenderNotes();
    gettingAN();
  });
};

// Setting the active note
const handleNoteView = function() {
  activeNote = $(this).data();
  gettingAN();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const newNote = function () {
  activeNote = {};
  gettingAN();
};

//hiding the save button
const handleRenderSaveBtn = function () {
  if (!$noteTitle.value().trim() || !$noteText.value().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render the list of note titles
const renderNoteList = function (notes) {
    $noteList.empty();
  }

  let noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
      var note = notes[i];

      var $li = $("<li class='list-group-item'>").data(note);
      var $span = $("<span>").text(note.title);
      var $delBtn = $("<i class='fas")
  }
  // Returns HTML element with or without a delete button
//   const createLi = (text, delBtn = true) => {
//     const liEl = document.createElement('li');
//     liEl.classList.add('list-group-item');

//     const spanEl = document.createElement('span');
//     spanEl.classList.add('list-item-title');
//     spanEl.innerText = text;
//     spanEl.addEventListener('click', handleNoteView);

//     liEl.append(spanEl);

//     if (delBtn) {
//       const delBtnEl = document.createElement('i');
//       delBtnEl.classList.add(
//         'fas',
//         'fa-trash-alt',
//         'float-right',
//         'text-danger',
//         'delete-note'
//       );
//       delBtnEl.addEventListener('click', handleNoteDelete);

//       liEl.append(delBtnEl);
//     }

//     return liEl;
//   };

//   if (jsonNotes.length === 0) {
//     noteListItems.push(createLi('No saved Notes', false));
//   }

//   jsonNotes.forEach((note) => {
//     const li = createLi(note.title);
//     li.dataset.note = JSON.stringify(note);

//     noteListItems.push(li);
//   });

//   if (window.location.pathname === '/notes') {
//     noteListItems.forEach((note) => noteList[0].append(note));
//   }

// };

// notes from the database and then they go to the side bar to save
const getAndRenderNotes = function () {
return gettingNote().then(function (data) {
    renderNoteList(data);
});
};

  $saveNoteBtn.addEventListener('click', handleNoteSave);
  $noteList.on("click", newNote);
  $newNoteBtn.addEventListener('click', newNote);
  $noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  $noteText.addEventListener('keyup', handleRenderSaveBtn);


getAndRenderNotes();
