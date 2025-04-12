import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is requiered");
    if (!formData.email.trim()) return toast.error("Email is requiered");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must atleast 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <section className="px-8 sm:px-16">
      <div className="py-10 mx-auto w-full max-w-screen-xl">
        <div className="mx-auto w-full max-w-xl">
          <h1 className="text-3xl font-bold text-center">SIGN UP</h1>

          <form
            className="flex flex-col space-y-5 mt-5"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="fullname"
              value={formData.fullname}
              onChange={(e) => {
                setFormData({ ...formData, fullname: e.target.value });
              }}
              className="input input-bordered input-md w-full"
            />
            <input
              type="text"
              placeholder="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              className="input input-bordered input-md w-full"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                autoComplete="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                className="input input-bordered input-md w-full pr-14"
              />
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-5 inset-y-0 flex items-center cursor-pointer text-xl"
              >
                {showPassword ? <LuEye /> : <LuEyeOff /> }
              </span>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex gap-2">
                  <span className="loading loading-spinner loading-xs flex "></span>
                  <span>Loading...</span>
                </div>
              ) : (
                <div>Create Account</div>
              )}
            </button>
          </form>

          <div className="text-center mt-3">
            <span>Already have an accont? </span>
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
