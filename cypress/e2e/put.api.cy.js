/// <reference types="cypress" />

describe("Put api teste", () => {
  const body_post = require("../fixtures/body_cadastro.json");
  const body_put = require("../fixtures/atualizar_body.json");

  it("Atualizando um produto", () => {
    const dataAtual = new Date().toISOString().slice(0, 10);

    cy.cadastrarDispositivo(body_post).then((response_api) => {
      expect(response_api.status).equal(200);
      expect(response_api.body.name).equal(body_post.name);

      cy.request({
        method: "PUT",
        url: `/objects/${response_api.body.id}`,
        failOnStatusCode: false,
        body: body_put,
      }).as("putResponse");
      cy.get("@putResponse").then((responsePut_api) => {
        expect(responsePut_api.status).equal(200);
        expect(responsePut_api.body.id).equal(response_api.body.id);
        expect(responsePut_api.body.name).not.equal(response_api.body.name);
        expect(responsePut_api.body.updatedAt.slice(0, 10)).equal(dataAtual);
        expect(responsePut_api.body.data).to.deep.equal({
          year: 2025,
          price: 2000.0,
          "CPU model": "Intel Core i9",
          "Hard disk size": "2 TB",
        });
      });
    });
  });
});
