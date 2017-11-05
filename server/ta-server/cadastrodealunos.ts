import { Aluno } from '../../gui/ta-gui/src/app/aluno';

export class CadastroDeAlunos {
  alunos: Aluno[] = [];

  criar(aluno: Aluno): Aluno {
    var result = null;
    if (this.cpfNaoCadastrado(aluno.cpf)) {
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
    }
    return result;
  }

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = this.alunoComCPF(aluno.cpf);
    if (result) result.copyFrom(aluno);
    return result;
  }
  
  autoAvaliar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunoComCPF(aluno.cpf);
	 if (result) result.copyAutoAvalFrom(aluno.autoAval);
	 return result;
  }

  cpfNaoCadastrado(cpf: string): boolean {
     return !this.alunoComCPF(cpf);
  }
  
  alunoComCPF(cpf: string): boolean {
     return this.alunos.find(a => a.cpf == cpf);
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}
