import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";



import React, { Component } from "react";

const INITIAL_STATE = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role:"user"
};
const confirmPass = "";
const ERROR_STATE = {
  first_name: " ",
  last_name: " ",
  email: " ",
  password: " ",

};
const SignupStatus = "";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      SignupStatus,
      confirmPass,
      ERROR_STATE,
    };
  }
  onValueChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      ERROR_STATE: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      
      }
      ,passErr:" ",

    });
    if (
      event.target.name === "confirmPass" &&
      this.state.password !== event.target.value
    ) {
      this.setState({ passErr: "Passwords do not match" });
    } else {
      this.setState({ passErr: "" });
    }
  };

  onSubmitSignup = (event) => {
    event.preventDefault();
console.log(this.state)
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        // console.log(res)
        if (res.status === 201) {
          this.setState({ SignupStatus: "success" });
          setTimeout(() => {
            window.location.replace("/sign-up");
          }, 1500);
        } else {
          
          return res.json();
        }
      })
      .then((resp) => {
       if (resp.errors){
        this.setState({ ERROR_STATE: resp.errors });
       }

        
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  render() {
    return (
      <>
        <>
       
        <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
        <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
          <a href="/Home" className="flex items-center">
            <span className="self-center whitespace-nowrap text-xl font-semibold">
              GBC Park & Recreation
            </span>
          </a>
          <div className="mt-2 sm:mt-0 sm:flex md:order-2">
                <a
                  type="button"
                  href="/auth/sign-in"
                  className="rounde mr-3 focus:outline-none hidden border border-blue-700 py-1.5 px-6 text-center text-sm font-medium text-blue-700 focus:outline-none focus:ring-4  md:inline-block rounded-lg"
                >
                  Login
                </a>
                <a
                  type="button"
                  href="/auth/sign-up"
                  className="rounde mr-3 focus:outline-none hidden bg-blue-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  md:mr-0 md:inline-block rounded-lg"
                >
                  Register
                </a>
               
              </div>
          <div
            className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
              <li>
                <a
                  href="/Home"
                  className="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-blue-700"
                 
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/ParkList"
                  className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
                  aria-current="page"
                >
                  Park List
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="relative">
  <img
    src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
    className="absolute inset-0 z-0 h-full w-full object-cover"
  />
  <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
  <div className="container mx-auto p-4">
    <div className="h-screen  overflow-y-auto">
     
        
            <Card className="m-10 top-3/4 left-2/4 w-full max-w-[24rem] -translate-y-3/4 -translate-x-2/4">
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-2 grid h-28 place-items-center"
              >
                    {this.state.SignupStatus? (
                        <div className="flex rounded-md bg-green-100 p-3">
                        <svg
                          className="mr-2 h-8 w-8 flex-shrink-0 stroke-current stroke-2 text-green-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M0 0h24v24H0z" stroke="none" />
                          <circle cx="12" cy="12" r="9" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                        <div className="text-green-700">
                          <div className="text-xl font-bold">
                            You have registed Successfully 
                          </div>
                        </div>
                      </div>
                      ) : null}
                <Typography variant="h3" color="white">
            
                  Sign Up
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <form className="space-y-4 md:space-y-6" action="#">
                <select 
  className="w-full py-2 px-3 bg-white border border-gray-400 rounded-lg appearance-none focus:outline-none focus:shadow-outline"
  label="Select Account" 
  name="role" 
  onChange={this.onValueChanged}
>
  <option 
    className="text-gray-700 m-2 hover:bg-gray-200" 
    value="" 
  >Please select an account</option>
  <option 
  class="text-gray-700   hover:bg-gray-100"
    value="admin"
  >Admin Account</option>
  <option 
    className="p-2 bg-white" 
    value="client"
  >Client Account</option>
  <option selected
    className="p-2 bg-white" 
    value="user"
  >User Account</option>
</select>
                  <div>
                    <label
                      for="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Email
                    </label>

                    <input
                      value={this.state.email}
                      onChange={(event) => this.onValueChanged(event)}
                      name="email"
                      type="text"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="name@company.com"
                      required=""
                    />
                    <h3>
                    {this.state.ERROR_STATE && this.state.ERROR_STATE.email ? (
  <div className="text-red-600">
    {this.state.ERROR_STATE.email}
  </div>
) : null}
                    </h3>
                  </div>
                  <div>
                    <label
                      for="first_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>

                    <input
                      value={this.state.first_name}
                      onChange={(event) => this.onValueChanged(event)}
                      name="first_name"
                      type="text"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="ABCD"
                      required=""
                    />
                    <h3>
                      {" "}
                      {this.state.ERROR_STATE && this.state.ERROR_STATE.first_name ? (
                        <div className="text-red-600">
                          {this.state.ERROR_STATE.first_name}
                        </div>
                      ) : null}
                    </h3>
                  </div>

                  <div>
                    <label
                      for="last_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>

                    <input
                      value={this.state.last_name}
                      onChange={(event) => this.onValueChanged(event)}
                      name="last_name"
                      type="text"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="XYZ"
                      required=""
                    />
                    <h3>
                      {" "}
                      {this.state.ERROR_STATE && this.state.ERROR_STATE.last_name ? (
                        <div className="text-red-600">
                          {this.state.ERROR_STATE.last_name}
                        </div>
                      ) : null}
                    </h3>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password{" "}
                    </label>

                    <input
                      value={this.state.password}
                      onChange={(event) => this.onValueChanged(event)}
                      name="password"
                      type="password"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="•••••••"
                      required=""
                    />
                    <h3>
                      {" "}
                      {this.state.ERROR_STATE && this.state.ERROR_STATE.password ? (
                        <div className="text-red-600">
                          {this.state.ERROR_STATE.password}
                        </div>
                      ) : null}
                    </h3>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password{" "}
                    </label>

                    <input
                      value={this.state.confirmPass}
                      onChange={(event) => this.onValueChanged(event)}
                      name="confirmPass"
                      type="password"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                      placeholder="•••••••"
                      required=""
                    />
                    <h3>
                      {this.state.passErr ? (
                        <div className="text-red-600">
                          {this.state.passErr}
                        </div>
                      ) : null}
                    </h3>
                  </div>
                </form>
                <div className="-ml-2.5">
                  <Checkbox label="I agree the Terms and Conditions" />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
            <Button
              type="submit"
              onClick={this.onSubmitSignup}
              variant="gradient"
              fullWidth
            >
              Sign In
            </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Already have an account?
                  <Link to="/auth/sign-in">
                    <Typography
                      as="span"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                    >
                      Sign in
                    </Typography>
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
          </div>
          </div>
          </div>
        </>
      </>
    );
  }
}
