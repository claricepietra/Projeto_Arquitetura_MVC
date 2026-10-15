
export class AuditoriaController {
  static gerarRelatorioGeral() {
    try {
      const equipamentos = EquipamentoModel.listarInventario();
      const tecnicos = TecnicoModel.listarEquipe();

      return {
        status: 200,
        sucesso: true,
        titulo: "Relatório de Auditoria Geral - TechPrime Infraestrutura",
        resumo: {
          totalEquipamentos: equipamentos.length,
          totalTecnicos: tecnicos.length,
          totalGeral: equipamentos.length + tecnicos.length,
        },
        equipamentos,
        tecnicos,
      };
    } catch (erro) {
      return {
        mensagem: `❌ Falha ao gerar o relatório de auditoria: ${erro.message}`,
      };
    }
  }
}
