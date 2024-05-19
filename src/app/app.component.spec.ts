import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ZipCodesState } from './models/zip-codes.models';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { getLoadZipCodes, getNavigateDashboard, selectLoading } from './store/zip-codes/zip-codes.selectors';
import { loadZipCodes } from './store/zip-codes/zip-codes.actions';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { zipCodesInitialState } from './store/zip-codes/zip-codes.reducers';

@Component({
  selector: 'demography-dashboard-main',
  template: '<div></div>'
})
class DashboardMainComponentMock {}

describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let store: MockStore<ZipCodesState>;

  let getLoadZipCodesSpy: any;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({
          initialState: zipCodesInitialState,
          selectors: [
            {
              selector: selectLoading,
              value: false
            },
            {
              selector: getLoadZipCodes,
              value: true
            },
            {
              selector: getNavigateDashboard,
              value: true
            }
          ]
        }),
        {
          provide: Router, useValue: mockRouter
        }
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.refreshState();
    getLoadZipCodesSpy = spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call the action to load the zip codes', () => {
    expect(getLoadZipCodesSpy).toHaveBeenCalledWith(loadZipCodes());
  });

  it('should navigate to dashboard on loaded zip codes', (): void => {
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});


