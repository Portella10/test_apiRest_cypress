/// <reference types="cypress" />

describe("Post API test", () => {
  const body = require("../fixtures/body_cadastro.json");
  it("Adicionando um produto ", () => {
    const dataAtual = new Date().toISOString().slice(0, 10);

    cy.cadastrarDispositivo(body).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.id).not.empty;
      expect(response.body.name).equal("Celular do joão");
      expect(response.body.createdAt.slice(0, 10)).equal(dataAtual);
      expect(response.body.data).to.deep.equal({
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      });
    });
  });
});
