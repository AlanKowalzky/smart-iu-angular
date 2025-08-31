import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './cardList.component.html',
  styleUrls: ['./cardList.component.scss'],
})
export class CardListComponent {
  @Input() cards: Card[] = [];
}