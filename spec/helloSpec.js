var request = require("request");

var base_url = "http://localhost:3000/probatest";

describe("Hello World Server", function() {
    describe("GET /probatest", function() {
        it("returns status code 200", function(done) {
            request.get(base_url, function(error, response) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns Hello World", function(done) {
            request.get(base_url, function(error, response, body) {
                expect(body).toBe("Hello World");
                done();
            });
        });
    });
});

/*
describe('test suite',function() {
    it("should respond with hello world", function(done) {
        request("http://localhost:3000/probatest", function(error, response, body){
            expect(body).toEqual("Hello World");
            done();
        });
    });
});*/