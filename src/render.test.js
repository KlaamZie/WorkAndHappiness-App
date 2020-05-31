import React from 'react'
import ReactDOM from 'react-dom'

import Login from './Components/Auth/Login/Login'
import SignupUser from './Components/Auth/Signup/User/SignupUser'
import SignupEntreprise from './Components/Auth/Signup/Entreprise/SignupEntreprise'
import Confirmation from "./Components/Auth/Signup/Entreprise/Confirmation";
import ForgotPassword from "./Components/Auth/ForgotPassword/ForgotPassword";
import CheckCode from "./Components/Auth/ForgotPassword/CheckCode";
import ResetPassword from "./Components/Auth/ForgotPassword/ResetPassword";

describe('Auth render', function () {
    it('renders Login', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Login/>, div)
    })

    it('renders Signup User', () => {
        const div = document.createElement('div')
        ReactDOM.render(<SignupUser/>, div)
    })

    it('renders Signup Entreprise', () => {
        const div = document.createElement('div')
        ReactDOM.render(<SignupEntreprise/>, div)
    })

    it('renders Confirmation Création Entreprise', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Confirmation/>, div)
    })

    it('renders Forgot Password', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ForgotPassword/>, div)
    })

    it('renders Check Code', () => {
        const div = document.createElement('div')
        ReactDOM.render(<CheckCode/>, div)
    })

    it('renders Reset Password', () => {
        const div = document.createElement('div')
        ReactDOM.render(<ResetPassword/>, div)
    })

});

import Admin from "./Components/Admin/Admin"
import EmployeesValidation from "./Components/Admin/EmployeesValidation/EmployeesValidation";

describe('Admin render', function () {
    it('renders Admin', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Admin/>, div)
    })

    it('renders EmployeesValidation', () => {
        const entreprise = {
            employeesToValidate: [{
                email: "test@test.com",
                firstname: "Test",
                lastname: "Test",
                _id: "5eb4012a366a0237b993456d"
            }],
            validatedEmployees: [{
                email: "enzo.viry@gmail.com",
                firstname: "Enzo",
                isAdmin: true,
                isModo: true,
                lastname: "Viry",
                uid: "5eb3fe4033eb643557817115",
                _id: "5eb3fe4033eb643557817116"
            }]
        }
        const div = document.createElement('div')
        ReactDOM.render(<EmployeesValidation entreprise={entreprise}/>, div)
    })

    it('renders EmployeesValidation without employeesToValidate', () => {
        const entreprise = {
            employeesToValidate: [],
            validatedEmployees: [{
                email: "enzo.viry@gmail.com",
                firstname: "Enzo",
                isAdmin: true,
                isModo: true,
                lastname: "Viry",
                uid: "5eb3fe4033eb643557817115",
                _id: "5eb3fe4033eb643557817116"
            }]
        }
        const div = document.createElement('div')
        ReactDOM.render(<EmployeesValidation entreprise={entreprise}/>, div)
    })

    it('renders EmployeesValidation without validatedEmployees', () => {
        const entreprise = {
            employeesToValidate: [{
                email: "test@test.com",
                firstname: "Test",
                lastname: "Test",
                _id: "5eb4012a366a0237b993456d"
            }],
            validatedEmployees: []
        }
        const div = document.createElement('div')
        ReactDOM.render(<EmployeesValidation entreprise={entreprise}/>, div)
    })

    it('renders EmployeesValidation without any data', () => {
        const entreprise = {
            employeesToValidate: [],
            validatedEmployees: []
        }
        const div = document.createElement('div')
        ReactDOM.render(<EmployeesValidation entreprise={entreprise}/>, div)
    })
});

import Dashboard from "./Components/Dashboard/Dashboard";
import DashboardGraph from "./Components/Dashboard/Graph";

describe('Dashboard render', function () {
    it('renders Dashboard', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Dashboard/>, div)
    })

    it('renders Graph on Dashboard', () => {
        let chart = {
            general: [],
            group1: [],
            group2: [],
            group3: [],
            month: []
        }
        const div = document.createElement('div')
        ReactDOM.render(<DashboardGraph />, div)
    })
});

import Home from "./Components/Home/Home";
import HomeGraph from "./Components/Home/Graph";

describe('Home render', function () {
    it('renders Home', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Home/>, div)
    })

    it('renders Graph on Home', () => {
        let chart = {
            general: [],
            group1: [],
            group2: [],
            group3: [],
            month: []
        }
        const div = document.createElement('div')
        ReactDOM.render(<HomeGraph/>, div)
    })
});