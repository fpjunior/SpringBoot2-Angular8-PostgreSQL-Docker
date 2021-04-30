import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumbs/breadcrumbs.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { DropdownStandard } from 'src/app/shared/models/dropdown.model';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';

import { UsuarioService } from '../service/usuario.service';
import { Usuario } from './model/usuario-form.model';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  providers: [UsuarioService,
    //  ProgressBarService
  ],

})
export class UsuarioFormComponent implements OnInit {

  usuarioForm: FormGroup;

  exit = false;
  showModalResponse = false;
  showModalConfirm = false;
  isErrorResponse = false;

  descricaoMaxLength = 30;

  contentResponse: string;
  breadcrumbItems: MenuItem[] = [{ label: `Usuarios`, command: () => this.cancelForm() }];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private usuarioService: UsuarioService,
    private breadcrumbService: BreadcrumbService,
    private progressBarService: ProgressBarService
  ) { }

  get f(): { [key: string]: AbstractControl; } { return this.usuarioForm.controls; }

  ngOnInit(): void {
    this.initForm(this.blankForm());
    this.isEdit();
    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
  }

  onHide = (): Promise<boolean> => this.exit && this.confirmExit();

  onShow = () => setTimeout(() => { if (!this.isErrorResponse) { this.showModalResponse = false; } }, 1500);

  cancelForm = (): boolean => this.showModalConfirm = true;

  onHideDialogConfirm = (): boolean => this.showModalConfirm = false;

  confirmExit = (): Promise<boolean> => this.route.navigate(['/gerencia-usuario/usuario/dashboard']);

  submitForm = (): void => {
    this.progressBarService.changeProgressBar(true);
    let usuarioObj = this.usuarioForm.getRawValue() as Usuario;

    this.saveForm(usuarioObj);
  }

  private isEdit = (): void => {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      this.progressBarService.changeProgressBar(true);
      this.usuarioService.loadById(id).subscribe(
        acert => {
          const aux: any = acert;
          this.initForm(aux.data)
          this.editUsuario(aux.data);
        },
        err => {
          this.showModalResponse = true;
          this.isErrorResponse = true;
          this.contentResponse = tryCatchError(err);
          this.progressBarService.changeProgressBar(false);

        },
        () => {
          this.progressBarService.changeProgressBar(false);
        })
      this.breadcrumbItems.push({ label: `Editar` });
      return;
    }
    this.breadcrumbItems.push({ label: `Cadastrar` });
  }

  private initForm = (usuario: Usuario): FormGroup => this.usuarioForm = this.formBuilder.group({
    codigo: [{ value: usuario.codigo, disabled: true }],
    codigoComNome: [usuario.codigoComNome],
    nome: [usuario.nome],
    email: [usuario.email],
    senha: [usuario.senha],
    dataCadastro: [usuario.dataCadastro]
  })

  private blankForm = (): Usuario => {
    return {
      codigo: null,
      descricao: null,
    } as Usuario;
  }

  private editUsuario(get: Usuario) {
    setTimeout(() => {
      this.progressBarService.changeProgressBar(false);
    }, 500)
  }

  private saveForm = (obj: Usuario) => {
    this.progressBarService.changeProgressBar(true);
    this.usuarioService.saveOrUpdate(obj).subscribe(
      res => {
        this.isErrorResponse = false;
        this.contentResponse = "Operação realizada sucesso!"
        this.exit = true;
        this.showModalResponse = true;
        this.progressBarService.changeProgressBar(false);
      },
      err => {
        this.exit = false;
        this.isErrorResponse = true;
        this.showModalResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      }
    )
  }
}
