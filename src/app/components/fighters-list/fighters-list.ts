import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fighter, FighterService } from '../../services/fighter';
import { FighterCard } from '../fighter-card/fighter-card';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { shareReplay, catchError, of } from 'rxjs';


@Component({
  selector: 'app-fighters-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FighterCard],
  templateUrl: './fighters-list.html',
  styleUrl: './fighters-list.css',
})
export class FightersList implements OnInit {

  private fighterService = inject(FighterService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fighters$: Observable<Fighter[]> | null = null;
  loading = false;
  error = false;

  searchQuery = '';

  ngOnInit(): void {
    this.fighters$ = this.route.queryParamMap.pipe(
    tap(params => {
      const q = params.get('q') || '';
      this.searchQuery = q;
      this.loading = true;
    }),
    switchMap(params => {
      const q = params.get('q') || '';
      return this.fighterService.getFighters(q).pipe(
        catchError(err => {
          this.error = true;
          this.loading = false;
          return of([]);
        })
      );
    }),
    tap(() => {
      this.loading = false;
      this.error = false;
    }),
    shareReplay(1)  // <-- VERY IMPORTANT
  );
}

  onSearchChange(value: string) {
    this.router.navigate([], {
      queryParams: { q: value },
      queryParamsHandling: 'merge',
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/fighters', id]);
  }
}
