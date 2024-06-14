import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Note } from '../../interfaces/notes.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  noteForm: FormGroup;
  editMode = false;
  currentNoteId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize with six sample notes
    this.notes = [
      { id: 1, title: 'Note 1', content: 'Content of Note 1' },
      { id: 2, title: 'Note 2', content: 'Content of Note 2' },
      { id: 3, title: 'Note 3', content: 'Content of Note 3' },
      { id: 4, title: 'Note 4', content: 'Content of Note 4' },
      { id: 5, title: 'Note 5', content: 'Content of Note 5' },
      { id: 6, title: 'Note 6', content: 'Content of Note 6' }
    ];
  }

  createNote() {
    if (this.noteForm.valid) {
      const newNote: Note = {
        id: this.notes.length ? Math.max(...this.notes.map(note => note.id)) + 1 : 1,
        title: this.noteForm.value.title,
        content: this.noteForm.value.content
      };
      this.notes.push(newNote);
      this.noteForm.reset();
    }
  }

  editNoteById(noteId: number) {
    const note = this.notes.find(n => n.id === noteId);
    if (note) {
      this.noteForm.setValue({ title: note.title, content: note.content });
      this.editMode = true;
      this.currentNoteId = noteId;
    }
  }

  updateNote() {
    if (this.noteForm.valid && this.currentNoteId !== null) {
      const noteIndex = this.notes.findIndex(n => n.id === this.currentNoteId);
      if (noteIndex > -1) {
        this.notes[noteIndex] = {
          id: this.currentNoteId,
          title: this.noteForm.value.title,
          content: this.noteForm.value.content
        };
        this.editMode = false;
        this.currentNoteId = null;
        this.noteForm.reset();
      }
    }
  }

  deleteNoteById(noteId: number) {
    this.notes = this.notes.filter(n => n.id !== noteId);
    if (this.currentNoteId === noteId) {
      this.editMode = false;
      this.currentNoteId = null;
      this.noteForm.reset();
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.currentNoteId = null;
      this.noteForm.reset();
    }
  }
}
