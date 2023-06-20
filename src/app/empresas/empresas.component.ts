import { EmpresasService } from '../empresas.service';
import { Empresas } from './empresas';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent {

  empresas: Empresas[] = [];
  formGroupEmpresas!: FormGroup;

  constructor (private EmpresasService: EmpresasService, private FormBuilder: FormBuilder){
    this.formGroupEmpresas = FormBuilder.group({
      id: [''],
      nome: [''],
      contato: [''],
      categoria: [''],
      localizaçao: ['']
    })
  }

  getEmpresas() {
    this.EmpresasService.getEmpresas().subscribe({
      next: (data) => {
        this.empresas = data;
        console.log(this.empresas);
      },
      error: () => console.log('Erro ao chamar o endpoint'),
    });
  }

  save() {
    this.EmpresasService.save(this.formGroupEmpresas.value).subscribe({
      next: (data) => {
        this.empresas.push(data);
          console.log(this.empresas);
      },
    });
    this.formGroupEmpresas.reset();
  }


}
