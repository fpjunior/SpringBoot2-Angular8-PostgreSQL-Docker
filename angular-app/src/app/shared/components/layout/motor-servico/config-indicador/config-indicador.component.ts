import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { min } from 'rxjs/operators';
import { extractHourDate, formatDate } from 'src/app/shared/helpers/formatString.helper';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';
import { ValidateFields } from 'src/app/shared/validators/fields.validator';

import { BreadcrumbService } from '../../../breadcrumbs/breadcrumbs.service';
import { ProgressBarService } from '../../../progress-bar/progress-bar.service';
import { ConfigIndicador } from '../model/config-indicador.model';
import { ConfigIndicadorService } from '../service/config-indicador.service';


@Component({
  selector: 'app-config-config-indicador',
  templateUrl: './config-indicador.component.html',
  styleUrls: ['./config-indicador.component.scss'],
  providers: [DatePipe]
})
export class ConfigIndicadorComponent implements OnInit {

  @ViewChild('calendarInput') calendarInput;

  configIndicadorForm: FormGroup;
  modelSteps: MenuItem[];
  activeIndex = 0;
  configIndicadorResults: ConfigIndicador[] = [];
  activeRestoreDefault: boolean;
  minValueAceitavel = false;
  contentResponse: string;
  exit = false;
  showModalResponse = false;
  showModalConfirm = false;
  isErrorResponse = false;
  descricaoMaxLength = 6;
  showModalRestoreDefault = false;
  minDate = new Date();
  maxDate = new Date();
  br: any;
  critico: string;
  disableSubmit = true;
  disableNext: boolean;
  disablePrevious = true;
  codigoDivergenciaPreco = 1
  valuePlaceHolder: string;
  msgInvalid = 'Não é permitido valores superiores a 24:00.';

  breadcrumbItems: MenuItem[] = [
    { label: `Motor de Serviços`, command: () => this.cancelForm() },
    { label: `Configurações` },
    { label: `Indicadores` },
  ];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private formBuilder: FormBuilder,
    private route: Router,
    private progressBarService: ProgressBarService,
    private configIndicadorService: ConfigIndicadorService,
    public validator: ValidateFields,
    public datepipe: DatePipe,

  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 2);
    this.initForm(this.blankForm());
  }

  get f(): { [key: string]: AbstractControl; } { return this.configIndicadorForm.controls; }

  ngOnInit() {
    this.activeRestoreDefault = true;
    this.initSteps();
    this.setValueForm();
    this.disableCalendar();
    this.activeButtonRestoreDefault();
    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
    setTimeout(() => {
      this.progressBarService.changeProgressBar(true);
      this.incrementValue(this.f['confNivel2'].value, 'confNivel2');
      this.progressBarService.changeProgressBar(false);
    }, 500)

  }

  private blankForm = (): ConfigIndicador => {
    return {
      confNivel1: null,
      confNivel2: null,
      confFrequencia: null,
    } as ConfigIndicador
  }


  maskRecieve(value: string, controlName: string): void {
    let [hour, min] = value.split(':');
    if (controlName === 'confNivel2') {
      if (Number(hour) > 999) {
        const ajustHour = `999:${min}`;
        this.f[controlName].setValue(ajustHour);
      }
      if (Number(min) > 59) {
        const ajustMin = `${hour}:59`;
        this.f[controlName].setValue(ajustMin);
      }
      if (Number(hour) === 999) {
        const ajustHour = `999:00`;
        this.f[controlName].setValue(ajustHour);
      }
    } else {
      if (Number(hour) > 997) {
        const ajustHour = `997:${min}`;
        this.f[controlName].setValue(ajustHour);
      }
      if (Number(min) > 59) {
        const ajustMin = `${hour}:59`;
        this.f[controlName].setValue(ajustMin);
      }
      if (Number(hour) === 997) {
        const ajustHour = `997:00`;
        this.f[controlName].setValue(ajustHour);
      }
    }
  }

  maskOut(value: string, controlName: string): void {
    let [hour, min] = value.split(':');
    if (!min || Number(min) === 0) {
      const ajustMin = `${hour}:00`;
      this.f[controlName].setValue(ajustMin);
    }
    if ((!min || Number(min) === 0) && Number(hour) === 0) {
      const ajustValue = `000:01`;
      this.f[controlName].setValue(ajustValue);
    } else if ((!min || Number(min) === 0) && hour.length === 2) {
      const ajustValue = `0${hour}:00`;
      this.f[controlName].setValue(ajustValue);
    } else if ((!min || Number(min) === 0) && hour.length === 1) {
      const ajustValue = `00${hour}:00`;
      this.f[controlName].setValue(ajustValue);
    }
    if (Number(min) <= 9) {
      const ajustValue = `${hour}:${min}0`;
      this.f[controlName].setValue(ajustValue);
    }
    this.incrementValue(this.f[controlName].value, controlName);
  }

  incrementValue(value: string, controlName: string): void {
    let [hour, min] = value.split(':');
    if (controlName === 'confNivel1') {
      let newHour = (Number(hour) + 1).toString();
      let newMin = (Number(min) + 1).toString();

      if (newHour.length === 2) {
        newHour = '0' + newHour;
      } else if (newHour.length === 1) {
        newHour = '00' + newHour;
      }

      if (newMin.length === 1) {
        newMin = '0' + newMin;
      }
      const hourMin = (`${newHour}:${min}`);
      this.f['confNivel2'].setValue(hourMin);
      this.f['critico'].setValue(hourMin);

      if (Number(newMin) >= 60) {
        newMin = '00';
        newHour = (Number(newHour) + 1).toString();
      }
      const hourFinal = (`${newHour}:${newMin}`)
      this.f['critico'].setValue(hourFinal);
    }

    else if (controlName === 'confNivel2') {
      let [firstHour, firstMin] = this.f['confNivel1'].value.split(':');
      let secondHour = hour;
      let secondMin = min;

      if (Number(secondHour) < Number(firstHour)) {
        secondHour = (Number(firstHour) + 1).toString();
        if (secondHour.length === 2) {
          secondHour = '0' + secondHour;
        } else if (secondHour.length === 1) {
          secondHour = '00' + secondHour;
        }
        secondMin = firstMin;
        this.minValueAceitavel = true;
      } else if (Number(secondHour) === Number(firstHour)) {
        if (Number(secondMin) < Number(firstMin) || Number(secondMin) === Number(firstMin)) {
          secondMin = (Number(firstMin) + 1).toString();
          if (secondMin.length === 1) {
            secondMin = '0' + secondMin;
          }
        }
      }
      const newHourFirst = (`${secondHour}:${secondMin}`)
      this.f['confNivel2'].setValue(newHourFirst);

      let [critHour, critMin] = newHourFirst.split(':');
      critMin = (Number(critMin) + 1).toString();

      if (critHour.length === 2) {
        critHour = '0' + critHour;
      } else if (critHour.length === 1) {
        critHour = '00' + critHour;
      }

      if (critMin.length === 1) {
        critMin = '0' + critMin;
      }

      if (Number(critMin) >= 60) {
        critMin = '00';
        critHour = (Number(critHour) + 1).toString();
      }
      const critHourFinal = (`${critHour}:${critMin}`)
      this.f['critico'].setValue(critHourFinal);
    }
  }

  initForm(configIndicador: ConfigIndicador): void {
    this.configIndicadorForm = this.formBuilder.group({
      codigo: this.codigoDivergenciaPreco,
      confNivel1: [configIndicador.confNivel1, Validators.compose([Validators.required])],
      confNivel2: [configIndicador.confNivel2, Validators.compose([Validators.required, Validators.pattern(
        /[0-9]{1}[0-9]{1}[0-9]{1}:[0-5]{1}[0-9]{1}/)])],
      critico: [{ value: this.critico, disabled: true }, Validators.compose([Validators.required, Validators.pattern(
        /[0-9]{1}[0-9]{1}[0-9]{1}:[0-5]{1}[0-9]{1}/)])],
      confFrequencia: [configIndicador.confFrequencia, Validators.compose([Validators.pattern(
        /^(24:00)|((0[1-9]|1\d|2[0-3]):([0-5]\d))|(00:(0[1-5]|[1-9]0|[1-5][1-9]))$/)])],
      confDataProximaAtualizacao: [{ value: configIndicador.confDataProximaAtualizacao, disabled: true }, [Validators.required]],
      descricao: '',
    })
  }

  restoreValueDefault(): void {

    let valueConfNivel1 = this.f['confNivel1'].value
    let valueConfNivel2 = this.f['confNivel2'].value
    let valueConfFrequencia = this.f['confFrequencia'].value
    let valueCritico = this.f['critico'].value

    this.progressBarService.changeProgressBar(true);
    this.configIndicadorService.getRestoreConfigIndicador().subscribe(configIndicador => {
      if (configIndicador !== null) {
        this.initForm(configIndicador)
      }
      if (this.activeIndex == 0) {
        this.f['confNivel1'].setValue(configIndicador.confNivel1);
        this.f['confNivel2'].setValue(configIndicador.confNivel2);
        this.f['critico'].setValue('048:01');
        this.f['confFrequencia'].setValue(valueConfFrequencia);
      }
      if (this.activeIndex == 1) {
        this.f['confFrequencia'].setValue(configIndicador.confFrequencia);
        this.f['confNivel1'].setValue(valueConfNivel1);
        this.f['confNivel2'].setValue(valueConfNivel2);
        this.f['critico'].setValue(valueCritico);
      }
      this.detectInputChanges();
      this.progressBarService.changeProgressBar(false);
      this.showModalRestoreDefault = false;
    }, err => {
      this.exit = false;
      this.isErrorResponse = true;
      this.showModalResponse = true;
      this.contentResponse = tryCatchError(err);
      this.progressBarService.changeProgressBar(false);
    })
  }

  setValueForm(): void {
    this.progressBarService.changeProgressBar(true);
    this.configIndicadorService.getConfigIndicador().subscribe(configIndicador => {
      if (configIndicador !== null) {
        this.initForm(configIndicador)
        this.activeButtonRestoreDefault();
      }
      this.detectInputChanges()
      this.progressBarService.changeProgressBar(false);
      this.showModalRestoreDefault = false;
    }, err => {
      this.exit = false;
      this.isErrorResponse = true;
      this.showModalResponse = true;
      this.contentResponse = tryCatchError(err);
      this.progressBarService.changeProgressBar(false);
    });

  }

  editCalendar() {
    if (this.configIndicadorForm.controls.confDataProximaAtualizacao.status === 'DISABLED') {
      this.configIndicadorForm.controls.confDataProximaAtualizacao.enable();
      setTimeout(() => {
        this.calendarInput.inputfieldViewChild.nativeElement.dispatchEvent(new Event('click'))
      }, 10);
    }
  }

  disableCalendar() {
    this.configIndicadorForm.controls.confDataProximaAtualizacao.disable();
  }

  restoreDefault = (): boolean => (this.showModalRestoreDefault = true);

  detectInputChanges() {
    this.f['confNivel1'].valueChanges.subscribe(change => {
      change !== '024:00' ? this.activeRestoreDefault = false : this.activeRestoreDefault = true;
      if (change === '000:00') {
        this.f['confNivel1'].setErrors({ 'min': true })
      }
    });
    this.f['confNivel2'].valueChanges.subscribe(change => {
      change !== '048:00' ? this.activeRestoreDefault = false : this.activeRestoreDefault = true;
    });

    this.f['confFrequencia'].valueChanges.subscribe(change => {
      change !== '23:59' ? this.activeRestoreDefault = false : this.activeRestoreDefault = true;
      let [hour, min] = this.f['confFrequencia'].value.split(':');
      if (change) {
        if (Number(min) > 59) {
          const ajustMin = `${hour}:59`;
          this.f['confFrequencia'].setValue(ajustMin);
        }
      }
    })
  }

  onHide = (): Promise<boolean> => this.exit && this.confirmExit();

  onShow = () => setTimeout(() => { if (!this.isErrorResponse) { this.showModalResponse = false; } }, 1500);

  confirmExit = (): Promise<boolean> => this.route.navigate(['/home']);

  cancelForm = (): boolean => this.showModalConfirm = true;

  onHideDialogConfirm = (): boolean => this.showModalConfirm = false;

  onHideDialogConfirmRestoreDefault() {
    this.showModalRestoreDefault = false;
    this.activeButtonRestoreDefault();
  }

  submitForm(): void {

  }

  previousEvent() {
    this.activeIndex--;
    this.disableNext = false;
    this.disablePrevious = true;
    this.activeButtonRestoreDefault()
  }

  nextEvent() {
    this.activeIndex++;
    this.disableNext = true;
    this.disablePrevious = false;
    this.activeButtonRestoreDefault();
  }

  private activeButtonRestoreDefault() {
    this.activeIndex == 0 ?
      (this.f['confNivel1'].value !== '024:00' || this.f['confNivel2'].value !== '048:00' ? this.activeRestoreDefault = false : this.activeRestoreDefault = true)
      :
      (this.f['confFrequencia'].value !== '23:59' ? this.activeRestoreDefault = false : this.activeRestoreDefault = true);
  }

  private initSteps = (): MenuItem[] => (
    this.modelSteps = [
      {
        label: 'SEMÁFOROS', command: () => {
          this.activeIndex = 0;
          this.disableNext = false;
          this.activeButtonRestoreDefault()
        }
      },
      {
        label: 'FREQUÊNCIA', command: () => {
          this.activeIndex = 1;
          this.disableNext = true
          this.activeButtonRestoreDefault()

        }
      }
    ]
  )

  maskDateCalendar(event: any) {
    if (event.target.value.match(/^\d{2}$/) !== null) {
      event.target.value = event.target.value.replace(/^(\d{2})/, '$1/');
    } else if (event.target.value.match(/^\d{2}\/\d{2}$/) !== null) {
      event.target.value = event.target.value.replace(/^(\d{2})\/(\d{2})$/, '$1/$2/');
    } else if (event.target.value.length > 10) {
      event.target.value = event.target.value.slice(0, 10);
    }
  }

  submitConfiguracaoIndicadores(): void {
    const obj = this.configIndicadorForm.getRawValue() as ConfigIndicador;
    if (typeof obj.confDataProximaAtualizacao !== 'string') {
      let date = formatDate(obj.confDataProximaAtualizacao);
      let hour = extractHourDate(obj.confDataProximaAtualizacao);

      let [hora, min] = hour.split(':');
      let newMin = (Number(min)) + 2;
      let hour2 = (`${hora}:${newMin}`)
      obj.confDataProximaAtualizacao = `${date} ${hour2}`
      console.log(hour2)
    }
    this.saveConfiguracaoIndicadores(obj);
  }

  saveConfiguracaoIndicadores(obj: ConfigIndicador): void {
    this.progressBarService.changeProgressBar(true);
    this.configIndicadorService.saveConfigIndicador(obj).subscribe(
      res => {
        this.isErrorResponse = false;
        this.contentResponse = "Configurações salva com sucesso!"
        // this.exit = true;
        this.progressBarService.changeProgressBar(false);
        this.showModalResponse = true;
      },
      err => {
        this.exit = false;
        this.isErrorResponse = true;
        this.showModalResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      },
    );
  }
}
