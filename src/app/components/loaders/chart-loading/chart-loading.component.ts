import { ChangeDetectionStrategy, Component } from "@angular/core";
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'demography-chart-loading',
  templateUrl: './chart-loading.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SkeletonModule
  ]
})
export class ChartLoadingComponent {}
