import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loaders/loading/loading.component';
import { ZipCodesState } from './models/zip-codes.models';
import { Store } from '@ngrx/store';
import { loadZipCodes } from './store/zip-codes/zip-codes.actions';
import { Observable } from 'rxjs';
import { getLoadZipCodes, getNavigateDashboard, selectLoading } from './store/zip-codes/zip-codes.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingComponent
  ]
})
export class AppComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store<ZipCodesState>);
  router = inject(Router);

  loading!: Observable<boolean>;

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions(): void {
    this.loading = this.store.select(selectLoading);

    this.store.select(getLoadZipCodes)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: boolean) => {
        if (value) {
          this.store.dispatch(loadZipCodes());
        }
      });

    this.store.select(getNavigateDashboard)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: boolean) => {
        if (value) {
          this.router.navigate(['dashboard']);
        }
      });
  }
}


