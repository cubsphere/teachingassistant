import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
	selector: 'discrepancias',
	templateUrl: './discrepancias.component.html',
	styleUrls: ['./discrepancias.component.css']
})
export class DiscrepanciasComponent implements OnInit {
	constructor(private alunoService: AlunoService) {}
	alunos: Aluno[];
	porcentagemDiscrepantes: number[] = [];
	avaliacaoDiscrepante: boolean[] = [];

	ngOnInit(): void {
		this.alunoService.getAlunos()
		.then(alunos => {
			this.alunos = alunos;
			for(let a in alunos){
				this.porcentagemDiscrepantes[a] = this.calculaPorcentagemDiscrepantes(alunos[a]);
				this.avaliacaoDiscrepante[a] = (this.porcentagemDiscrepantes[a] >= 0.25);
			}
		})
		.catch(erro => alert(erro));
	}
	
	calculaPorcentagemDiscrepantes(aluno: Aluno): number {
		var retorno = 0, counter = 0;
		for (let i in aluno.metas) {
			counter++;
			if(this.metaDiscrepante(aluno, i)) {
				retorno += 1;
			}
		}
		return retorno/counter;
	}
	
	metaDiscrepante(aluno: Aluno, i: string): boolean {
		return ((aluno.autoAval[i] === "MA" && (aluno.metas[i]==="MPA" || aluno.metas[i]==="MANA")) ||
		(aluno.autoAval[i] === "MPA" && aluno.metas[i]==="MANA"));
	}
}
