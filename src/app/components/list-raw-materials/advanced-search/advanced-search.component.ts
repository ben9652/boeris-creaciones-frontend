import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  @Input() isVisible: boolean = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
