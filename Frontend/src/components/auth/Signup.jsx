
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { Loader2 } from "lucide-react";
import axios from "axios";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNo: "",
    role: "",
    file: "",
    password: "",
  });

  // Correct use of useNavigate
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNo", input.phoneNo);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // This should be outside the headers object
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);

      // Check if err.response exists before accessing err.response.data.message
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-3">
            <label className="mb-2">Full Name</label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Like chanchal Rajput"
            />
          </div>
          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="chanchalrajput112@gmail.com"
            />
          </div>
          <div className="my-3">
            <Label>Phone No.</Label>
            <Input
              type="text"
              value={input.phoneNo}
              name="phoneNo"
              onChange={changeEventHandler}
              placeholder="98XXXXXXXX"
            />
          </div>
          <div className="my-3">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="1234@#hghj"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="r1" />
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <label htmlFor="r1">Student</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="r2" />
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <label htmlFor="r2">Recruiter</label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <label>Profile</label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span>
            Already have an Account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
