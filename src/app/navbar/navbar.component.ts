import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent { 
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  scrollToSection(event: Event, section: string) {
    event.preventDefault(); // Prevent the default anchor click behavior
    this.menuActive = false; // Close the menu when a link is clicked
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
