import { EquipamentoModel } from "../models/TecnicoModel";

export class EquipamentoController {
  static processarEntradaEquipamento(dados) {
    try {
      const { tagPatrimonio, tipoEquipamento, capacidadeRam } = dados ?? {};

      const equipamento = new EquipamentoModel(
        tagPatrimonio,
        tipoEquipamento,
        capacidadeRam
      );
      equipamento.registrarAtivo();

      return {
        sucesso: true,
        mensagem: `✅ Equipamento ${equipamento.tagPatrimonio} (${equipamento.tipoEquipamento}, ${equipamento.capacidadeRam}GB RAM) registrado com sucesso.`,
      };
    } catch (erro) {
      return {
        sucesso: false,
        mensagem: `❌ Falha ao registrar equipamento: ${erro.message}`,
      };
    }
  }

  static consultarCatalogo() {
    const inventario = EquipamentoModel.listarInventario();

    if (inventario.length === 0) {
      return "📭 Nenhum equipamento cadastrado no inventário.";
    }

    return `📋 Inventário de equipamentos (${inventario.length})`;
  }
}