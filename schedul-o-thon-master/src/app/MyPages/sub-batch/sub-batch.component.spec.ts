import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBatchComponent } from './sub-batch.component';

describe('SubBatchComponent', () => {
  let component: SubBatchComponent;
  let fixture: ComponentFixture<SubBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
