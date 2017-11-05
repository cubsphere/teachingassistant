export class Aluno {
  nome: string;
  cpf: string;
  email: string;
  metas: Map<string,string>;
  autoAval: Map<string,string>;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "";
    this.cpf = "";
    this.email = "";
    this.metas = this.mapInit(new Map<string,string>());
    this.autoAval = this.mapInit(new Map<string,string>());
  }
  
  mapInit(mappy: Map<string,string>): Map<string,string> {
     mappy['requisitos'] = "";
     mappy['gerDeConfiguracao'] = "";
	 return mappy;
  }

  clone(): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.metas = new Map<string,string>();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
    this.copyMetasFrom(from.metas);
    this.copyAutoAvalFrom(from.autoAval);
  }

  copyMetasFrom(from: Map<string,string>): void {
    this.metas = new Map<string,string>();
    for (let key in from) {
      this.metas[key] = from[key];
    }
  }
  
  copyAutoAvalFrom(from: Map<string,string>): void {
    this.autoAval = new Map<string,string>();
    for (let key in from) {
      this.autoAval[key] = from[key];
    }
  }
  
  autoAvalFaltandoMetas(): boolean {
    for (let key in this.autoAval) {
	  if (this.autoAval[key] === "") {return true;}
	}
	return false;
  }
}
