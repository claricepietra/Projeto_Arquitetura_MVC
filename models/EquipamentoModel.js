export class EquipamentoModel {
  static #bancoDeDados = [];

  static #RAMMINIMAGB = 8;

  constructor(tagPatrimonio, tipoEquipamento, capacidadeRam) {
    this.tagPatrimonio = tagPatrimonio;
    this.tipoEquipamento = tipoEquipamento;
    this.capacidadeRam = capacidadeRam;
  }

 
  registrarAtivo() {
    const tag =
      typeof this.tagPatrimonio === "string" ? this.tagPatrimonio.trim() : "";

    if (tag === "") {
      throw new Error("A tag de patrimônio não pode ser vazia.");
    }

    const ram = Number(this.capacidadeRam);
    if (!Number.isFinite(ram) || ram < EquipamentoModel.#RAMMINIMAGB) {
      throw new Error(
        `Capacidade de RAM insuficiente: mínimo de ${EquipamentoModel.#RAMMINIMAGB}GB exigido (informado: ${this.capacidadeRam}).`
      );
    }

    const tagExiste = EquipamentoModel.#bancoDeDados.some(
      (ativo) => ativo.tagPatrimonio === tag
    );
    if (tagExiste) {
      throw new Error(`Já existe um equipamento com a tag "${tag}".`);
    }

    this.tagPatrimonio = tag;
    this.capacidadeRam = ram;

    EquipamentoModel.#bancoDeDados.push(this);
    return this;
  }

  static listarInventario() {
    return [...EquipamentoModel.#bancoDeDados];
  }
}
