const request = require("supertest")
const app = require("../app")
const chai = require("chai")
const sinon = require("sinon")
const nodemailer = require("nodemailer")
const users = require("../models/users")

const expect = chai.expect

describe('Authentication Test Cases', function () {
    describe('POST /register', function () {

        before('drop collection', function (done) {
            users.deleteMany({})
                .then(() => {
                    const transport = {
                        sendMail: () => Promise.resolve()
                    }
                    mailerStub = sinon.stub(nodemailer, 'createTransport').returns(transport)
                })
                .then(() => done())
                .catch((error) => { done(error) })
        })

        it('should register successfully', function (done) {
            request(app).post('/api/auth/register')
                .send({
                    email: "test@gmail.com",
                    password: "123",
                    userName: "jani123",
                })
                .end((err, res) => {
                    console.log(err)
                    console.log(res.body)
                    expect(res.body.message).equal('registered successful')
                    expect(res.body.data.email).equal('test@gmail.com')
                    expect(res.body.data.userName).equal('jani123')
                    expect(res.body.data).not.have.property('')
                    done(err)
                })
        })
        it('should register failed when email is not provided', function (done) {
            request(app).post('/api/auth/register')
                .send({
                    password: "123",
                    userName: "jani123",
                })
                .end((err, res) => {
                    console.log(err)
                    console.log(res.body)
                    expect(res.body.message).equal('register failed')
                    expect(res.body.error).equal('email, userName or password is not found')
                    done(err)
                })
        })
    })
    describe('POST /login',function(){
        
        it('should login successfully', function (done) {
            request(app).post('/api/auth/login')
                .send({
                    email: "test@gmail.com",
                    password: "123",
                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(res.body.message).equal('login successful')
                    expect(res.body).have.have.property('access_token')
                    expect(res.body).not.have.property('password')

                    done(err)
                })

            })
            it('should login fail when invalid password is provided', function (done) {
                request(app).post('/api/auth/login')
                  .send({
                    email: 'test@test.com',
                    password: 'invalid'
                  })
                  .end((err, res) => {
                    expect(res.body.message).equal('login failed')
                    expect(res.body.error).equal('User not found')
                    done(err)
                  })
              })

        })
})