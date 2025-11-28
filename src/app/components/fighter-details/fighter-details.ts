// src/app/components/fighter-details/fighter-details.ts (Updated)

import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { switchMap } from 'rxjs';
// FIX: Importing the new, dedicated interface
import { Fighter, FighterDetail } from '../../services/fighter';

@Component({
  selector: 'app-fighter-details',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './fighter-details.html',
  styleUrl: './fighter-details.css',
})
export class FighterDetails implements OnInit{
  
  private route = inject(ActivatedRoute); 
  // FIX: Using the FightersService name, as the imported 'Fighter' was likely the interface
  private fighterService = inject(Fighter); 
  public appRouter = inject(Router);         

  // FIX: Using the new FighterDetail type
  fighter: FighterDetail | undefined; 
  loading = true;
  error = false;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.loading = true;
          this.error = false;
          // Call the service method, which now returns FighterDetail
          return this.fighterService.getFighterById(id);
        } else {
          this.appRouter.navigate(['/fighters']); 
          throw new Error('Fighter ID not found in route.');
        }
      })
    ).subscribe({
      next: (data) => {
        this.fighter = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load fighter details:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  // Helper method remains the same
  public getDetail(value: string | undefined): string {
    return value && value !== '0' ? value : 'N/A';
  }
}