export class TecnicoModel {
  static #equipe = [];
  static #TURNOS_VALIDOS = ["Manhã", "Tarde", "Noite"];

  constructor(nomeCompleto, credencialAcesso, turnoTrabalho) {
    this.nomeCompleto = nomeCompleto;
    this.credencialAcesso = credencialAcesso;
    this.turnoTrabalho = turnoTrabalho;
  }

  static contratarTecnico(nomeCompleto, credencialAcesso, turnoTrabalho) {
    if (
      credencialAcesso === undefined ||
      credencialAcesso === null ||
      String(credencialAcesso).trim() === ""
    ) {
      throw new Error("A Credencial de Acesso não pode ficar em branco.");
    }

    const turno = String(turnoTrabalho ?? "").trim();
    if (!TecnicoModel.#TURNOS_VALIDOS.includes(turno)) {
      throw new Error(
        `Turno inválido: "${turno}". Os turnos aceitos são: ${TecnicoModel.#TURNOS_VALIDOS.join(", ")}.`
      );
    }

    const tecnico = new TecnicoModel(
      String(nomeCompleto ?? "").trim(),
      String(credencialAcesso).trim(),
      turno
    );

    TecnicoModel.#equipe.push(tecnico);
    return tecnico;
  }

  static listarEquipe() {
    return TecnicoModel.#equipe.map((t) => ({ ...t }));
  }
}

module.exports = TecnicoModel;