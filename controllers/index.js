import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { EquipamentoController } from "./controllers/EquipamentoController.js";
import { TecnicoController } from "./controllers/TecnicoController.js";
import { AuditoriaController } from "./controllers/AuditoriaController.js";

const rl = readline.createInterface({ input, output });

function exibir(resposta) {
    console.log("");
    if (typeof resposta === "string") {
        console.log(resposta);
    } else {
        console.log(JSON.stringify(resposta, null, 2));
    }
}

async function iniciarSistema() {
    console.log("=== TECHPRIME INFRAESTRUTURA - GESTÃO DE TI ===");

    let opcao;

    do {
        console.log("\nSelecione uma opção:");
        console.log("1 - Cadastrar Equipamento");
        console.log("2 - Listar Equipamentos");
        console.log("3 - Cadastrar Técnico");
        console.log("4 - Listar Técnicos");
        console.log("5 - Relatório de Auditoria Geral");
        console.log("0 - Sair do Sistema");

        opcao = (await rl.question("Digite a opção desejada: ")).trim();

        switch (opcao) {
            case "1": {
                const tagPatrimonio = await rl.question("Digite a Tag de Patrimônio: ");
                const tipoEquipamento = await rl.question("Digite o tipo (Desktop, Notebook ou Servidor): ");
                const capacidadeRam = await rl.question("Digite a capacidade de RAM (GB): ");
                const resposta = EquipamentoController.processarEntradaEquipamento({
                    tagPatrimonio,
                    tipoEquipamento,
                    capacidadeRam,
                });
                exibir(resposta);
                break;
            }
            case "2": {
                exibir(EquipamentoController.consultarCatalogo());
                break;
            }
            case "3": {
                const nomeCompleto = await rl.question("Digite o nome completo: ");
                const credencialAcesso = await rl.question("Digite a credencial de acesso (crachá): ");
                const turnoTrabalho = await rl.question("Digite o turno (Manhã, Tarde ou Noite): ");
                const resposta = TecnicoController.processarAdmissao({
                    nomeCompleto,
                    credencialAcesso,
                    turnoTrabalho,
                });
                exibir(resposta);
                break;
            }
            case "4": {
                exibir(TecnicoController.consultarEquipe());
                break;
            }
            case "5": {
                exibir(AuditoriaController.gerarRelatorioGeral());
                break;
            }
            case "0":
                console.log("Encerrando o sistema. Até logo!");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }

    } while (opcao !== "0");

    rl.close();
}

iniciarSistema();