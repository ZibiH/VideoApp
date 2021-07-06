import { Component } from '@angular/core';

// import { }

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  onSelect(event: Event): void {
    const target = event.target as Element;
    this.addIndicator(target);
  }

  onLogoClick(): void {
    const target = document.querySelector(
      '.header__action-link--accent'
    ) as Element;
    this.addIndicator(target);
  }

  addIndicator(target: Element): void {
    document.querySelectorAll('.header__action-link').forEach((element) => {
      if (element.classList.contains('isSelected')) {
        element.classList.remove('isSelected');
      }
    });

    target.classList.add('isSelected');
  }
}
