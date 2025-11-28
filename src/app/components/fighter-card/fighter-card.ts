import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Fighter } from '../../services/fighter'; // Assumes Fighter interface is imported from here
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-fighter-card',
  standalone: true, 
  imports: [RouterLink, CommonModule],
  templateUrl: './fighter-card.html',
  styleUrl: './fighter-card.css',
})
export class FighterCard {
  @Input({ required: true }) fighter!: Fighter;
  
  // Output event to notify the parent list component of a click
  @Output() cardClicked = new EventEmitter<string>(); 

  // The (click) on the outer <a> tag triggers this, 
  // but the [routerLink] handles the actual navigation.
  viewDetails(): void {
    // DIAGNOSTIC: Check your browser console! If this log appears, 
    // the click is registering, and the failure is in the routing configuration.
    console.log(`Fighter Card Clicked for ID: ${this.fighter.id}. Attempting navigation via [routerLink]...`);
    this.cardClicked.emit(this.fighter.id);
  }
}