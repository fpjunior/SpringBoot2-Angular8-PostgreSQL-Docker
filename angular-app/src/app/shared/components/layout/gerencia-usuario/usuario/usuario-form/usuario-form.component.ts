import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumbs/breadcrumbs.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';

import { UsuarioService } from '../service/usuario.service';
import { Usuario } from './model/usuario-form.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {

  usuarioForm: FormGroup;
  showModalConfirm = false;

  exit = false;

  showModalResponse = false;
  isErrorResponse: boolean;
  contentResponse: string;
  breadcrumbItems: MenuItem[] = [{ label: `Gerência de Usuários`, command: () => this.cancelForm() }, { label: `Usuários`, command: () => this.cancelForm() }, { label: `Visualizar` }];
  url: SafeResourceUrl;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private usuarioService: UsuarioService,
    private breadcrumbService: BreadcrumbService,
    private sanitizer: DomSanitizer,
    private progressBarService: ProgressBarService
  ) { }

  get f(): { [key: string]: AbstractControl; } { return this.usuarioForm.controls; }

  ngOnInit(): void {
    this.initForm(this.blankForm());
    this.setForm();
    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
  }

  onHide = (): Promise<boolean> => this.exit && this.confirmExit()

  cancelForm = (): boolean => this.showModalConfirm = true;

  onHideDialogConfirm = (): boolean => this.showModalConfirm = false;

  confirmExit = (): Promise<boolean> => this.route.navigate(['/home/gerencia-usuario/usuario/dashboard']);

  private setForm = (): void => {
    this.progressBarService.changeProgressBar(true);
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.usuarioService.loadById(id).subscribe(
      acert => {
        const aux: any = acert;
        this.initForm(aux.data)
        this.loadSignature(aux.data.assinatura)
      },
      err => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      }, () => {
        this.progressBarService.changeProgressBar(false);
      })
  }

  private initForm = (usuario: Usuario): FormGroup => this.usuarioForm = this.formBuilder.group({
    codigo: [{ value: usuario.codigo, disabled: true }],
    nome: [{ value: usuario.nome, disabled: true }],
    cpfCnpj: [{ value: usuario.cpfCnpj, disabled: true }],
    email: [{ value: usuario.email, disabled: true }],
    ativo: [{ value: usuario.ativo, disabled: true }],
    gerirUsuario: [{ value: usuario.gerirUsuario, disabled: true }],
    assinatura: [{ value: usuario.assinatura, disabled: true }]
  })

  private blankForm = (): Usuario => {
    return {
      codigo: null,
      nome: null,
      cpfCnpj: null,
      email: null,
      ativo: null,
      gerirUsuario: null,
      assinatura: null,
    } as Usuario;
  }

  private loadSignature = (arg: string): SafeResourceUrl => this.url = this.sanitizer.bypassSecurityTrustResourceUrl(arg);
}
