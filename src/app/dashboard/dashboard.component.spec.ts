import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { TabSwitcherComponent } from '../tab-switcher/tab-switcher.component';
import { CardListComponent } from '../card-list/card-list.component';
import { MOCK_DATA } from '../mock-data';
import { ElementRef } from '@angular/core';
import { ActiveDeviceDirective } from '../active-device.directive';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, TabSwitcherComponent, CardListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render all tab titles from mock-data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    for (const tab of MOCK_DATA) {
      expect(compiled.textContent).toContain(tab.title);
    }
  });

  it('should render all card titles from the active tab', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const activeTab = MOCK_DATA[0];
    for (const card of activeTab.cards) {
      expect(compiled.textContent).toContain(card.title);
    }
  });

  it('should render all device and sensor labels from the first card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = MOCK_DATA[0].cards[0];
    for (const item of firstCard.items) {
      expect(compiled.textContent).toContain(item.label);
    }
  });

  it('should render group switch if card has 2+ devices', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Szukamy karty z 2+ urządzeniami
    const cardWithGroup = MOCK_DATA[0].cards.find(card =>
      card.items.filter(i => i.type === 'device').length > 1
    );
    if (cardWithGroup) {
      expect(compiled.textContent).toContain('Wszystkie urządzenia');
    }
  });
});

describe('ActiveDeviceDirective', () => {
  it('should create an instance', () => {
    const mockElement = { nativeElement: document.createElement('div') } as ElementRef;
    const directive = new ActiveDeviceDirective(mockElement);
    expect(directive).toBeTruthy();
  });
});
