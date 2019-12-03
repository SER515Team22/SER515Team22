const controller = require("./controllers/expressionController");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Evaluate!", () => {
    it("evaluates the expression passed", done => {
      chai
        .request(controller)
        .post("/evaluate")
        .send({
            "exp": "12 / (2.3 + 0.1) + 1000",
            "u_id": "121",
            "valid": "1"
        })
        .end((err, res) => {
        // Math JS being a stand alone function works any time should give only 200 response.
          expect(res).to.have.status(200);
          expect(res.body.status).to.equals("success");
          done();
        });
    });
}
);




