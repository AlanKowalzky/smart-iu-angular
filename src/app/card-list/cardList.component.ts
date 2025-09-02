import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models';
import { CardComponent } from '../card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectIsEditing } from '../dashboard-page/+state/dashboard.reducer';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialogComponent } from '../components/add-card-dialog/addCardDialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './cardList.component.html',
  styleUrls: ['./cardList.component.scss'],
})
export class CardListComponent {
  @Input() cards: Card[] = [];
  @Input() activeTabId = ''; // To know which tab this card list belongs to
  @Output() addCard = new EventEmitter<{ tabId: string, layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout' }>();
  @Output() removeCard = new EventEmitter<{ tabId: string, cardId: string }>();
  @Output() reorderCard = new EventEmitter<{ tabId: string, cardId: string, newIndex: number }>();

  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  readonly isEditing = this.store.selectSignal(selectIsEditing);

  // For reordering with numeric input
  newIndex: number | null = null;

  onAddCard(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCard.emit({ tabId: this.activeTabId, layout: result });
      }
    });
  }

  onRemoveCard(cardId: string): void {
    this.removeCard.emit({ tabId: this.activeTabId, cardId });
  }

  onReorderCard(cardId: string, newIndex: number): void {
    if (newIndex >= 0 && newIndex < this.cards.length) {
      this.reorderCard.emit({ tabId: this.activeTabId, cardId, newIndex });
    }
  }
}