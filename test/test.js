const controller = require("../backend/controllers/expressionController");
const assignemnt = require('../backend/controllers/assignmentController');
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


describe("Show assignments!", () => {
  it("SHould display non empty records of assignments", done => {
    chai
      .request(assignemnt)
      .get("/viewass")
      .send({
        "standard": "1"
      })
      .end((err, res) => {
      // For empty records in DB it should give status as fail!
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Fail");
        done();
      });
  });
}
);



