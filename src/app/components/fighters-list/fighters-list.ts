import { Component, OnInit, Inject, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Fighter } from '../../services/fighter';
import { FighterCard } from '../fighter-card/fighter-card';
import { CommonModule } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-fighters-list',
  imports: [CommonModule, FighterCard, FormsModule],
  templateUrl: './fighters-list.html',
  styleUrl: './fighters-list.css',
})



export class FightersList implements OnInit {
  // Assuming Fighter is the service class name
  private fightersService = inject(Fighter); 
  private router = inject(Router);

  // The full list of fighters fetched from the service
  fighters: Fighter[] = []; 
  loading = true;
  searchQuery = ''; // Bound to the input field

  ngOnInit(): void {
    this.fetchFighters();
  }

  fetchFighters(): void {
    this.loading = true;
    this.fightersService.getFighters().subscribe({
      next: (data) => {
        // Assuming 'data' is the full array of fighters
        this.fighters = data; 
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching fighters:', err);
        this.loading = false;
      }
    });
  }

  // 🔎 NEW: Computed Property (Getter) for Filtering
  get filteredFighters(): Fighter[] {
    const query = this.searchQuery.toLowerCase().trim();
    
    // If the search query is empty, return the full list
    if (!query) {
      return this.fighters;
    }

    // Filter the list based on name or nickname
    return this.fighters.filter(fighter => 
      fighter.name.toLowerCase().includes(query) ||
      (fighter.nickname && fighter.nickname.toLowerCase().includes(query))
    );
  }

  goToDetails(fighterId: string): void {
    this.router.navigate(['/fighters', fighterId]);
  }
}