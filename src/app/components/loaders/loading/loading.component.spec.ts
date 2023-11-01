import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoadingComponent } from "./loading.component";

describe(LoadingComponent.name, () => {
  let fixture: ComponentFixture<LoadingComponent>;
  let component: LoadingComponent;
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
