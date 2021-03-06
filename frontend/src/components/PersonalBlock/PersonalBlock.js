import React, {Component} from "react";
import {Login} from "./Login";
import {Registration} from "./Registration";
import {UserOrders} from "../UserOrders/UserOrders";
import Cookies from 'js-cookie';
import Axios from "axios";
import CartContainer from "../../containers/components/CartContainer";
import {Link} from "react-router-dom";

const marginRight = {
    marginRight: 10
};

const marignTopAndRight = {
    marginTop: 6,
    marginRight: 10
}

export class PersonalBlock extends Component{

    constructor(props) {
        super(props)

        this.onChangeToken = this.onChangeToken.bind(this)
        this.logout = this.logout.bind(this)
    }

    onChangeToken(token) {
        this.props.onChangeToken(token)
    }

    logout() {
        let token = Cookies.get("token")
        Axios.delete('http://localhost:3000/logout', {
            headers: {
                token: token
            }
        }).then(res => {
            this.onChangeToken(null)
        }).catch(err => {
            console.log(err.message)
        })
    }

    render() {
        let authorized = <div className="nav navbar-nav d-inline-flex">
            <span style={marignTopAndRight}>Welcome {
                this.props.user ? this.props.user.firstname : null
            }</span>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal" style={marginRight}>
                Cart <span className="badge bg-secondary">{this.props.countCartItems}</span>
            </button>

            <CartContainer />

            <button type="button" className="btn btn-secondary" style={marginRight} data-bs-toggle="modal" data-bs-target="#userOrdersModal">
                My orders
            </button>

            <button type="button" className="btn btn-danger" onClick={this.logout}>
                Logout
            </button>
            <UserOrders user={this.props.user} />
        </div>

        let admin = <div className="nav navbar-nav d-inline-flex">
            <span style={marignTopAndRight}>Welcome {
                this.props.user ? this.props.user.firstname : null
            }</span>

            <Link className="nav-link" className="btn btn-outline-success" style={marginRight} to="/admin">
                Orders <span className="badge bg-secondary">5</span>
            </Link>

            <div className="dropdown" style={marginRight}>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    Content manager
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link className="dropdown-item" to="/add-book">Add book</Link></li>
                    <li><Link className="dropdown-item" to="/add-author">Add author</Link></li>
                    <li><Link className="dropdown-item" to="/add-genre">Add genre</Link></li>
                </ul>
            </div>

            <button type="button" className="btn btn-danger" onClick={this.logout}>
                Logout
            </button>
        </div>

        let nonAuthorized = <div className="nav navbar-nav d-inline-flex">
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" style={marginRight}>
                Login
            </button>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registrationModal">
                Registration
            </button>
            <Login onChangeToken={this.onChangeToken} />
            <Registration />
        </div>

        return(
            this.props.user ? this.props.user.group_id === 1 ? admin : authorized : nonAuthorized
        )
    }
}