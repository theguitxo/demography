import { Component } from "@angular/core";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'demography-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  imports: [
    ProgressSpinnerModule
  ]
})
export class LoadingComponent {}
