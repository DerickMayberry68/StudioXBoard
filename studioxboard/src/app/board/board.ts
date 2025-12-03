import { Component, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Card {
  id: string;
  title: string;
  description: string;
  effort: number;
}

interface Column {
  id: string;
  name: string;
  color: string;
  cards: Card[];
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent {
  newTitle = '';
  newDescription = '';

  columns = signal<Column[]>([
    { id: 'backlog', name: 'Backlog', color: '#ef4444', cards: [] },
    { id: 'todo', name: 'To Do', color: '#f59e0b', cards: [] },
    { id: 'inprogress', name: 'In Progress', color: '#3b82f6', cards: [] },
    { id: 'qa', name: 'QA', color: '#8b5cf6', cards: [] },
    { id: 'done', name: 'Done', color: '#10b981', cards: [] }
  ]);

  addCard() {
    if (!this.newTitle.trim()) return;
    const newCard: Card = {
      id: Date.now().toString(),
      title: this.newTitle,
      description: this.newDescription,
      effort: 3
    };
    this.columns.update(cols => {
      cols[0].cards.push(newCard);
      return [...cols];
    });
    this.newTitle = '';
    this.newDescription = '';
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.columns.update(cols => [...cols]); // trigger change detection
  }

  decompose() {
    alert('Decompose button works! Supabase Edge Function will go here.');
  }
}
