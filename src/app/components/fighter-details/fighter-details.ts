import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FighterDetail, FighterService } from '../../services/fighter';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-fighter-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fighter-details.html',
  styleUrl: './fighter-details.css',
})
export class FighterDetails implements OnInit {

  private fighterService = inject(FighterService);
  private route = inject(ActivatedRoute);
  public appRouter = inject(Router);

  fighter$: Observable<FighterDetail | null> = of(null);
  loading = true;
  error = false;

  ngOnInit(): void {
    this.fighter$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.error = true;
          this.loading = false;
          return of(null);
        }
        this.loading = true;
        this.error = false;
        return this.fighterService.getFighterById(id);
      }),
      switchMap(f => {
        this.loading = false;
        return of(f);
      })
    );
  }

  getDetail(v: string | undefined): string {
    return v && v !== '0' ? v : 'N/A';
  }
}
