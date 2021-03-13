import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Perfil } from 'src/app/core/model/perfil.model';
import { UserPermission } from 'src/app/core/model/user-permission.model';
import { BreadcrumbService } from 'src/app/shared/components/breadcrumbs/breadcrumbs.service';
import { ProgressBarService } from 'src/app/shared/components/progress-bar/progress-bar.service';
import { tryCatchError } from 'src/app/shared/utils/erro-handler.util';
import { UnidadeOrigemService } from '../../usuario/service/unidade-origem.service';
import { UsuarioOrigemService } from '../../usuario/service/usuario-origem.service';
import { UnidadeOrigem } from '../../usuario/usuario-form/model/unidade-origem.model';
import { Usuario } from '../../usuario/usuario-form/model/usuario-form.model';
import { UsuarioOrigem } from '../../usuario/usuario-form/model/usuario-origem.model';
import { PerfilService } from '../service/perfil.service';
import { PermissaoService } from '../service/permissao.service';
import { PermissoesAssociadaService } from '../service/permissoes-associada.service';
import { AssociacaoPerfil, AssociarPerfil } from './model/perfil.model';


/**
 * DISCLAIMER:
 * Nessa tela existem 3 cenários, 2 deles o habitual Cadastrar e Editar Perfil com os métodos "Perfil Associado"
 * e um extra vindo do fluxo de Usuário, gerando a tela de "Associar Perfil" com os métodos "Associar Perfil"
 */
@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss'],
})
export class PerfilFormComponent implements OnInit {
  perfilForm: FormGroup;
  activeIndex = 0;
  contentResponse: string;
  modelButtons = 'steps';
  labelDescription = 'Descrição';
  picklistHeader = 'Funcionalidades ';
  isErrorResponse: boolean;
  showModalEditarUsuario: boolean;
  showModalResponse = false;
  showModalConfirm = false;
  exit = false;
  disableNext = true;
  page = 'perfil';

  sourceList: UserPermission[];
  targetList: Array<any> = [];
  sourceListStrings = [];
  targetListString = []

  optionsUnidadePadrao: UnidadeOrigem[] = [];
  optionsUsuarioOrigem: UsuarioOrigem[] = [];
  disabledUnidadePadrao = true;
  usuarioOrigem: UsuarioOrigem;
  unidadePadrao: UnidadeOrigem;

  descricaoMaxLength = 30;
  lastStepLabel = 'Cadastrar';

  cpfMOCK: string;

  permissionsActionsList: Array<any> = [];

  /**
   * Essa variavel serve para salvar o DTO do /api/v1/usuario/perfil/associacao/{codigoUsuario} - buscarPerfisPorUsuario
   * como medida provisória
   */
  perfilPorUsuario: AssociacaoPerfil;

  breadcrumbItems: MenuItem[] = [
    { label: `Gerência de Usuários`, command: () => this.cancelForm() },
  ];
  modelSteps: MenuItem[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private perfilService: PerfilService,
    private permissoesAssociadaService: PermissoesAssociadaService,
    private permissaoService: PermissaoService,
    private usuarioOrigemService: UsuarioOrigemService,
    private unidadeOrigemService: UnidadeOrigemService,
    private breadcrumbService: BreadcrumbService,
    private progressBarService: ProgressBarService
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.perfilForm.controls;
  }

  ngOnInit(): void {
    this.initForm(this.blankForm());
    this.isEdit();
    if (!this.hasAssociar()) {
      this.initSteps();
    }
    this.breadcrumbService.setBreadcrumb(this.breadcrumbItems);
  }

  onHide = (): void => {
    this.showModalResponse = false;
    this.exit && this.confirmExit()
  };

  onShow = () =>
    setTimeout(() => {
      if (!this.isErrorResponse) {
        this.showModalResponse = false;
      }
    }, 1500);

  cancelForm = (): boolean => (this.showModalConfirm = true);

  onHideDialogConfirm = (): boolean => (this.showModalConfirm = false);

  openModalEditarUsuario = (): boolean => (this.showModalEditarUsuario = true);

  confirmExit = (): Promise<boolean> => {
    if (this.hasAssociar()) {
      return this.route.navigate(['/home/gerencia-usuario/usuario/dashboard']);
    }
    return this.route.navigate(['/home/gerencia-usuario/perfil/dashboard']);
  };

  submitForm = (): void => {
    if (this.hasAssociar()) {
      let tempUsuario = this.perfilForm.getRawValue();
      if (tempUsuario.descricao !== tempUsuario.nome) {
        const descricao = tempUsuario.descricao;
        tempUsuario.nome = descricao;
        delete tempUsuario.descricao;
      }
      const perfis = this.targetList as Perfil[];
      const usuario = tempUsuario as Usuario;
      const obj = { perfis, usuario } as AssociacaoPerfil;
      this.saveAssociarForm(obj);
    } else {
      const perfil = this.perfilForm.getRawValue() as Perfil;
      const permissoes = this.targetList as UserPermission[];
      const obj = { perfil, permissoes } as AssociarPerfil;
      if (this.hasId()) {
        this.putForm(obj);
      } else {
        this.saveForm(obj);
      }
    }
  };

  previousEvent() {
    this.activeIndex--;
  }

  nextEvent() {
    this.activeIndex++;
  }

  /**
   * QUANDO ALGUM ITEM DO SOURCE VAI PARA O TARGET
   */
  onMoveToTarget(event): MenuItem[] | void {
    const auxSteps: MenuItem[] = [];
    if (!this.hasAssociar()) {
      this.targetList.forEach((e) => {
        if (e.listaAcao?.length > 0 && auxSteps.length !== 2) {
          auxSteps.push({
            label: 'Funcionalidades',
            command: () => {
              this.activeIndex = 0;
            },
          });
          auxSteps.push({
            label: 'Permissões',
            command: () => {
              this.activeIndex = 1;
            },
          });
          this.disableNext = false;
          return (this.modelSteps = auxSteps);
        }
      });

      event.items.forEach((item) => {
        if(item.listaAcao?.length > 0 ){
          item.listaAcao.headerAccordion = item.descricao;
          this.permissionsActionsList.push(item.listaAcao);
        }
      })

    }
  }

  onMoveToSource(event): MenuItem[] | void {
    const auxSteps: MenuItem[] = [];
    if (!this.hasAssociar()) {
      this.sourceList.forEach((e) => {
        if (e.listaAcao?.length > 0) {
          auxSteps.push({
            label: 'Funcionalidades',
            command: () => {
              this.activeIndex = 0;
            },
          });
          this.disableNext = true;
          return (this.modelSteps = auxSteps);
        }
      });

      let listaAcao = [];
      let tgList = this.targetList;
      this.targetList.forEach((item, index) => {
          if(item.listaAcao?.length > 0 ){
            item.listaAcao.headerAccordion = item.descricao;
            listaAcao.push(item.listaAcao);
          }
          if(index+1 === tgList.length) {
            this.permissionsActionsList = listaAcao;
          }
          if(tgList.length === 0) {this.permissionsActionsList = listaAcao;}
      })
    }
  }

  hasAssociar(): boolean {
    const associar = this.activatedRoute.snapshot.queryParams['associar'];
    if (associar) {
      return true;
    }
    return false;
  }

  filterUsuario(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    // let query = event.query;
    // for(let i = 0; i < this.countries.length; i++) {
    //     let country = this.countries[i];
    //     if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
    //         filtered.push(country);
    //     }
    // }

    // this.filteredCountries = filtered;
  }


  checkboxChange(event, acaoCodigo, permissaoCodigo){
    this.targetList.forEach((e) => {
      if (e.codigo === permissaoCodigo){
        e.listaAcao.forEach((acao) => {
          if (acao.acaoCodigo === acaoCodigo){
            acao.flagAtivo = event.checked;
          }
        })
      }
    })
  }

  private initSteps = (): MenuItem[] => {
    const auxSteps: MenuItem[] = [];
    auxSteps.push({
      label: 'Funcionalidades',
      command: () => {
        this.activeIndex = 0;
      },
    });
    if (this.targetList.length > 0) {
      this.targetList.forEach((e) => {
        if (e.listaAcao.length > 0 && auxSteps.length === 1) {
          auxSteps.push({
            label: 'Permissões',
            command: () => {
              this.activeIndex = 1;
            },
          });
          this.disableNext = false;
        }
        if(e.listaAcao.length > 0 ){
          e.listaAcao.headerAccordion = e.descricao;
          this.permissionsActionsList.push(e.listaAcao);
        }
      });
    }
    return (this.modelSteps = auxSteps);
  };

  private isEdit = (): void => {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (this.hasAssociar()) {
      return this.initAssociarPerfil(id);
    } else {
      this.getPicklistValuesPermissoes();
      if (this.hasId()) {
        return this.initPerfilAssociado(id);
      }
    }
    this.breadcrumbItems.push(
      { label: `Perfil`, command: () => this.cancelForm() },
      { label: `Cadastrar` }
    );
  };

  private hasId(): boolean {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    if (id) {
      return true;
    }
    return false;
  }

  private initPerfilAssociado(id: number): void {
    this.progressBarService.changeProgressBar(true);
    this.breadcrumbItems.push(
      { label: `Perfil`, command: () => this.cancelForm() },
      { label: `Editar` }
    );
    this.permissoesAssociadaService.loadById(id).subscribe(
      (acert) => {
        const aux: any = acert;
        this.initForm(aux.data.perfil);
        this.targetList = aux.data.permissoes;
        let arrayStrings =[]
        aux.data.permissoes.map((e) => arrayStrings.push(e.codigoComDescricao));
        this.targetListString = arrayStrings;
      },
      (err) => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      },
      () => {
        this.targetList.length > 0 && this.initSteps();
        this.progressBarService.changeProgressBar(false);
      }
    );
  }

  private initAssociarPerfil(id: number): void {
    this.progressBarService.changeProgressBar(true);
    this.breadcrumbItems.push(
      { label: `Usuários`, command: () => this.cancelForm() },
      { label: `Associar` }
    );
    this.picklistHeader = 'Perfis ';
    this.page = 'usuario';
    this.modelButtons = 'three-center';
    this.labelDescription = 'Nome';
    this.getPicklistValuesPerfil();
    this.getAssociacaoUsuario(id);
  }

  private initForm = (perfil: Perfil): FormGroup =>
    (this.perfilForm = this.formBuilder.group({
      codigo: [{ value: perfil.codigo, disabled: true }],
      descricao: [
        perfil.descricao,
        [Validators.required, Validators.maxLength(this.descricaoMaxLength)],
      ],
      codigoComDescricao: [perfil.codigoComDescricao],
    }));

  private blankForm = (): Perfil => {
    return {
      codigo: null,
      descricao: null,
    } as Perfil;
  };

  private saveForm = (obj: AssociarPerfil): void => {
    this.progressBarService.changeProgressBar(true);
    this.permissoesAssociadaService.saveOrUpdate(obj).subscribe(
      (res) => {
        this.showModalResponse = true;
        this.isErrorResponse = false;
        this.contentResponse = 'Perfil salvo com sucesso!';
        this.exit = true;
      },
      (error) => {
        this.exit = false;
        this.showModalResponse = true;
        this.contentResponse = error;
        this.progressBarService.changeProgressBar(false);
      },
      () => {
        this.progressBarService.changeProgressBar(false);
      }
    );
  };

  private putForm = (obj: AssociarPerfil): void => {
    this.permissoesAssociadaService.updatePerfil(obj).subscribe(
      (res) => {
        this.showModalResponse = true;
        this.isErrorResponse = false;
        this.contentResponse = 'Perfil atualizado com sucesso!';
        this.exit = true;
      },
      (error) => {
        this.exit = false;
        this.showModalResponse = true;
        this.contentResponse = error;
      }
    );
  };

  private saveAssociarForm = (obj: AssociacaoPerfil): void => {
    this.progressBarService.changeProgressBar(true);
    this.permissoesAssociadaService.saveAssociacaoUsuario(obj).subscribe(
      (res) => {
        this.showModalResponse = true;
        this.isErrorResponse = false;
        this.contentResponse = 'Perfil salvo com sucesso!';
        this.exit = true;
        this.progressBarService.changeProgressBar(false);
      },
      (error) => {
        this.exit = false;
        this.showModalResponse = true;
        this.contentResponse = error;
        this.progressBarService.changeProgressBar(false);
      }
    );
  };

  private filterPickList(): UserPermission[] {
    this.progressBarService.changeProgressBar(true);
    const codeArr = this.targetList.map((e) => e.codigo);
    let arr = this.sourceList.filter(function (e) {
      return this.indexOf(e.codigo) < 0;
    }, codeArr);
    let arrayStrings = []
    arr.map((e) => arrayStrings.push(e.codigoComDescricao));
    this.sourceListStrings = arrayStrings;
    this.progressBarService.changeProgressBar(false);
    return (this.sourceList = arr);
  }

  private getAssociacaoUsuario(id: number): void {
    this.progressBarService.changeProgressBar(true);
    this.permissoesAssociadaService.getAssociacaoUsuario(id).subscribe(
      (acert) => {
        const aux: any = acert;
        this.perfilPorUsuario = aux;
        const objForm = {
          codigo: aux.usuario.codigo,
          descricao: aux.usuario.nome,
        };
        this.cpfMOCK = aux.usuario.cpfCnpj;
        this.initForm(objForm);
      },
      (err) => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      },
      () => {
        const auxArr = this.perfilPorUsuario.perfis.map((e) => ({
          codigo: e.codigo,
          codigoComDescricao: e.codigoComDescricao,
        }));
        this.targetList = auxArr;
        let arrayStrings = []
        auxArr.map((e) => arrayStrings.push(e.codigoComDescricao));
        this.targetListString = arrayStrings;
        this.progressBarService.changeProgressBar(false);
      }
    );
  }

  private getPicklistValuesPermissoes(): void {
    this.progressBarService.changeProgressBar(true);
    this.permissaoService.getPermissoes().subscribe(
      (perfils) => {
        let auxPerfil = perfils;
        this.sourceList = auxPerfil;
        let arrayStrings = []
        auxPerfil.map((e) => arrayStrings.push(e.codigoComDescricao));
        this.sourceListStrings = arrayStrings;
      },
      (err) => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      },
      () => {
        setTimeout(() => {
          if (this.targetList.length && this.sourceList.length) {
            this.filterPickList();
          }
        }, 500);
      
        this.progressBarService.changeProgressBar(false);
      }
    );
  }

  private getPicklistValuesPerfil(): void {
    this.progressBarService.changeProgressBar(true);
    this.perfilService.getPerfil().subscribe(
      (perfils) => {
        let auxPerfil = perfils;
        this.sourceList = auxPerfil;
        let arrayStrings =[]
        auxPerfil.map((e) => arrayStrings.push(e.codigoComDescricao));
        this.sourceListStrings = arrayStrings;
      },
      (err) => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      },
      () => {
        this.progressBarService.changeProgressBar(false);

        setTimeout(() => {
          if (this.targetList.length && this.sourceList.length) {
            this.filterPickList();
          }
        }, 500);
      }
    );
  }

  saveUsuarioOrigem(): void {
    const usuaraioOrigem = {
      usuario: this.usuarioOrigem.usuario,
      unidade: this.unidadePadrao.unidade,
      cpf: this.cpfMOCK,
      nome: this.usuarioOrigem.nome,
    } as UsuarioOrigem;

    this.progressBarService.changeProgressBar(true);
    this.usuarioOrigemService.saveUsuario(usuaraioOrigem).subscribe(
      () => {
        this.progressBarService.changeProgressBar(false);
        this.showModalEditarUsuario = false;
      },
      (err) => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      }
    );
  }

  usuarioOrigemSelected(value: UsuarioOrigem): void {
    const adptValue = value.usuario;
    this.disabledUnidadePadrao = false;
    this.getTodosUnidadesPadrao(adptValue);
  }

  getTodosUsuarioOrigem(filter: any): void {
    const filteredValue = filter.query.toUpperCase();
    this.progressBarService.changeProgressBar(true);
    this.usuarioOrigemService.loadWithFilter(filteredValue).subscribe(
      (usuario) => {
        const auxPerfil: any = usuario;
        this.optionsUsuarioOrigem = auxPerfil.content;
      },
      (err) => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      },
      () => {
        this.progressBarService.changeProgressBar(false);
        // FILTRAR O DROPDOWN AQUI
        // if (this.targetList.length && this.sourceList.length) { this.filterPickList(); }
      }
    );
  }

  getTodosUnidadesPadrao(filter: any): void {
    const filteredValue = filter;
    this.progressBarService.changeProgressBar(true);
    this.unidadeOrigemService.getUnidadeAcesso(filteredValue).subscribe(
      (unidades) => {
        const auxPerfil: any = unidades;
        this.optionsUnidadePadrao = auxPerfil.data;
      },
      (err) => {
        this.showModalResponse = true;
        this.isErrorResponse = true;
        this.contentResponse = tryCatchError(err);
        this.progressBarService.changeProgressBar(false);
      },
      () => {
        this.progressBarService.changeProgressBar(false);
      }
    );
  }
}
