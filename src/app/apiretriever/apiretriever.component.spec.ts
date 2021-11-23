import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiretrieverComponent } from './apiretriever.component';

describe('ApiretrieverComponent', () => {
  let component: ApiretrieverComponent;
  let fixture: ComponentFixture<ApiretrieverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiretrieverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiretrieverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
