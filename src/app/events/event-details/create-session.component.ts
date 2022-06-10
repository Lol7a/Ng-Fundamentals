import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared/index';

@Component({
  selector: 'create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss'],
})
export class CreateSessionComponent implements OnInit {
  // DEFINING OUTPUT PROPERTIES
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSession = new EventEmitter();

  // DEFINING FORM GROUPS AND FORM CONTROLS
  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [
      Validators.required,
      Validators.maxLength(400),
    ]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract,
    });
  }

  // METHOD WHEN CREATE SESSION FORM IS SUBMITTED,
  // IT EMITS SAVENEWSESSION METHOD FROM EVENT-DETAILS.COMPONENT.TS
  saveSession(formValues: any) {
    let session: ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: [],
    };
    this.saveNewSession.emit(session);
  }

  // METHOD ON CANCEL BUTTON IN PROFILE.COMPONENT.HTML,
  // IF CLICKED IT EMITS CANCELADDSESSION METHOD FROM EVENT-DETAILS.COMPONENT.TS
  cancel() {
    this.cancelAddSession.emit();
  }
}
