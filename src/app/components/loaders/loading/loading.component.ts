import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'demography-loading',
  templateUrl: './loading.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ProgressSpinnerModule
  ]
})
export class LoadingComponent {}
