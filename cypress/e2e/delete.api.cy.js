/// <reference types="cypress" />

describe("Delete API test", () => {
  const body = require("../fixtures/body_cadastro.json");
  it("Deletando um produto", () => {
    cy.cadastrarDispositivo(body).then((response_api) => {
      expect(response_api.status).equal(200);
      //Começando a deletar o prduto
      cy.request({
        method: "DELETE",
        url: `https://api.restful-api.dev/objects/${response_api.body.id}`,
        failOnStatusCode: false,
      }).as("deleteResults");
      //Verificando se o produto foi deletado
      cy.get("@deleteResults").then((response_delete) => {
        expect(response_delete.status).equal(200);
        expect(response_delete.body.message).equal(
          `Object with id = ${response_api.body.id} has been deleted.`
        );
      });
    });
  });
});
