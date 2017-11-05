import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'autoAval',
  templateUrl: './autoAval.component.html',
  styleUrls: ['./autoAval.component.css']
})
export class AutoAvalComponent {
	constructor(private alunoService: AlunoService) {}

	a : Aluno = new Aluno();
	sucesso: boolean = false;
	erro: boolean = false;

	autoAvaliar(): void {
		if (this.a.autoAvalFaltandoMetas()) {
			this.sucesso = false;
			this.erro = true;
			alert("Preencha todas as metas!");
			return;
		}
		this.alunoService.submeterAutoAval(this.a)
        .then(ab => {
        if (ab) {
			this.sucesso = true;
			this.erro = false;
        } else {
			this.sucesso = false;
			this.erro = true;
			alert("CPF não cadastrado!");
		}
        })
        .catch(erro => {
			alert(erro);
            this.sucesso = false;
            this.erro = true;
		});
	}
	
	wipeMessages(): void {
		this.sucesso = false;
		this.erro = false;
	}
}
