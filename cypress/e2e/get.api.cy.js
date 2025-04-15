/// <reference types="cypress" />

const device_id = "7";
describe("GET api", () => {
  it("Buscar elemento específico", () => {
    cy.buscarDispositivoEspecífico(device_id)
    .then((response) => {
      expect(response.status).equal(200);
      expect(response.body.id).equal(device_id);
      expect(response.body.name).equal("Apple MacBook Pro 16");
      expect(response.body.data).to.deep.equal({
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      });
    });
  });
});
