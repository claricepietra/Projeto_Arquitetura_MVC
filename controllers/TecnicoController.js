const TecnicoModel = require("../models/TecnicoModel.js");

class TecnicoController {
  static processarAdmissao(nomeCompleto, credencialAcesso, turnoTrabalho) {
    try {
      const tecnico = TecnicoModel.contratarTecnico(
        nomeCompleto,
        credencialAcesso,
        turnoTrabalho
      );

      return {
        status: 201,
        sucesso: true,
        mensagem: "Técnico admitido com sucesso!",
        dados: tecnico,
      };
    } catch (erro) {
      return {
        status: 400,
        sucesso: false,
        mensagem: "Falha na admissão do técnico.",
        erro: erro.message,
      };
    }
  }

  static consultarEquipe() {
    try {
      const equipe = TecnicoModel.listarEquipe();

      return {
        status: 200,
        sucesso: true,
        total: equipe.length,
        dados: equipe,
      };
    } catch (erro) {
      return {
        status: 500,
        sucesso: false,
        mensagem: "Erro ao consultar a equipe.",
        erro: erro.message,
      };
    }
  }
}

module.exports = TecnicoController;