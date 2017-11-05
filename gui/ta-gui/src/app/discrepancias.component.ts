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
	tests: discrepantesWrapper[] = [];

	ngOnInit(): void {
		this.alunoService.getAlunos()
		.then(alunos => {
			for(let a in alunos){				
				this.tests[a] = new discrepantesWrapper();
				this.tests[a].aluno = alunos[a];
				this.tests[a].porcentagemDiscrepantes = this.calculaPorcentagemDiscrepantes(alunos[a]);
				this.tests[a].avaliacaoDiscrepante = this.tests[a].porcentagemDiscrepantes >= 0.25;
			}
			this.tests.sort(this.discrepantesCompare);
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
	
	discrepantesCompare(a:discrepantesWrapper, b:discrepantesWrapper): number {
		return b.porcentagemDiscrepantes - a.porcentagemDiscrepantes;
	}
}

class discrepantesWrapper {
	constructor(){}
	aluno: Aluno;
	porcentagemDiscrepantes: number;
	avaliacaoDiscrepante: boolean;
}