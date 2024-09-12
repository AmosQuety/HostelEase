import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [user, _setUser] = useState({
    name: "Amos",
    email: "amos@gmail.com",
    password: "123",
    checkbox: true,
  });
  const HandleSignUp = (e: any) => {
    e.preventDefault();
    if (!name || !email || !password || !checkbox) {
      toast.error("Please fill out all the fields");
      return;
    }
    if (
      name === user.name &&
      email === user.email &&
      password === user.password &&
      checkbox === user.checkbox
    ) {
      toast.success("Sign Up successful");
    } else {
      toast.error("Details are wrong");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 rounded-xl">
      <Card
        color="transparent"
        shadow={false}
        className="p-8 bg-white rounded-lg shadow-lg max-h-screen class"
      >
        <div className="gap-3">
          <h3 className="font-bold text-xl text-center">Register Here</h3>
        </div>
        <div className="mt-8 mb-2 w-full max-w-md">
          <div className="mb-6 flex flex-col gap-3">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 input"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 input"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900 input"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="gap-4">
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth onClick={HandleSignUp}>
              Sign Up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?
              <Link to="/login" className="font-medium text-blue-800 ml-2">
                Sign In
              </Link>
            </Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
