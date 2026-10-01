import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiHeart,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
} from "react-icons/fi";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // Submit handler
  // --------------------------------------------------
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      if (state === "Sign Up") {
        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          {
            name,
            password,
            email,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);

          toast.success(data.message || "Account created successfully");

          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/user/login`,
          {
            password,
            email,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);

          toast.success(data.message || "Login successful");

          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Redirect authenticated user
  // --------------------------------------------------
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // --------------------------------------------------
  // Switch Login / Signup
  // --------------------------------------------------
  const switchMode = () => {
    setState((prev) => (prev === "Sign Up" ? "Login" : "Sign Up"));

    setEmail("");
    setPassword("");
    setName("");
    setShowPassword(false);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] w-full overflow-x-hidden bg-gray-50 px-3 py-8 sm:px-4 sm:py-10 md:px-6 md:py-14">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-blue-100/50 sm:rounded-3xl md:grid-cols-2">
        {/* ==================================================
            LEFT INFORMATION PANEL
        ================================================== */}
        <section className="relative hidden overflow-hidden bg-blue-600 md:flex">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-blue-400/30 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-8 lg:p-10">
            <div>
              {/* Logo / Brand */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                  <FiHeart className="text-xl" />
                </div>

                <div>
                  <p className="text-lg font-bold text-white">
                    PULSE-MEET
                  </p>

                  <p className="text-[10px] uppercase tracking-wider text-white/60">
                    Healthcare made simple
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                  <FiShield />
                  Trusted Healthcare
                </div>

                <h2 className="mt-5 text-3xl font-bold leading-tight text-white lg:text-4xl">
                  Your health.
                  <span className="block text-white/80">
                    Your appointments.
                  </span>
                  <span className="block">Simplified.</span>
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
                  Connect with trusted healthcare professionals and manage
                  your appointments through a simple and convenient experience.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/90">
                <FiCheckCircle className="shrink-0 text-white" />
                Find trusted doctors
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90">
                <FiCheckCircle className="shrink-0 text-white" />
                Book appointments easily
              </div>

              <div className="flex items-center gap-3 text-sm text-white/90">
                <FiCheckCircle className="shrink-0 text-white" />
                Manage your healthcare journey
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            FORM PANEL
        ================================================== */}
        <section className="flex w-full items-center justify-center p-5 sm:p-8 md:p-10 lg:p-12">
          <form
            onSubmit={onSubmitHandler}
            className="w-full max-w-md"
          >
            {/* Mobile brand */}
            <div className="mb-7 flex items-center gap-3 md:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FiHeart className="text-xl" />
              </div>

              <div>
                <p className="text-lg font-bold text-gray-900">
                  PULSE-MEET
                </p>

                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                  Healthcare made simple
                </p>
              </div>
            </div>

            {/* Heading */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                <FiShield />
                Secure Account
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {state === "Sign Up"
                  ? "Create your account"
                  : "Welcome back"}
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {state === "Sign Up"
                  ? "Create an account to book and manage your appointments."
                  : "Login to continue managing your healthcare appointments."}
              </p>
            </div>

            {/* ==================================================
                FULL NAME
            ================================================== */}
            {state === "Sign Up" && (
              <div className="mt-6">
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm"
                >
                  Full Name
                </label>

                <div className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="
                      min-h-[46px] w-full rounded-xl border border-gray-200
                      bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none
                      transition-all duration-300
                      placeholder:text-gray-400
                      focus:border-blue-500 focus:bg-white focus:ring-4
                      focus:ring-blue-50
                    "
                  />
                </div>
              </div>
            )}

            {/* ==================================================
                EMAIL
            ================================================== */}
            <div className={state === "Sign Up" ? "mt-4" : "mt-6"}>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm"
              >
                Email Address
              </label>

              <div className="relative">
                <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="
                    min-h-[46px] w-full rounded-xl border border-gray-200
                    bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none
                    transition-all duration-300
                    placeholder:text-gray-400
                    focus:border-blue-500 focus:bg-white focus:ring-4
                    focus:ring-blue-50
                  "
                />
              </div>
            </div>

            {/* ==================================================
                PASSWORD
            ================================================== */}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm"
              >
                Password
              </label>

              <div className="relative">
                <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={
                    state === "Sign Up"
                      ? "new-password"
                      : "current-password"
                  }
                  className="
                    min-h-[46px] w-full rounded-xl border border-gray-200
                    bg-gray-50 pl-10 pr-11 text-sm text-gray-800 outline-none
                    transition-all duration-300
                    placeholder:text-gray-400
                    focus:border-blue-500 focus:bg-white focus:ring-4
                    focus:ring-blue-50
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute right-2 top-1/2 flex h-9 w-9
                    -translate-y-1/2 items-center justify-center
                    rounded-lg text-gray-400 transition-colors
                    hover:bg-gray-100 hover:text-blue-600
                  "
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Security note */}
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-xs leading-5 text-blue-700">
              <FiShield className="mt-0.5 shrink-0" />

              <p>
                Your account information is handled securely.
              </p>
            </div>

            {/* ==================================================
                SUBMIT BUTTON
            ================================================== */}
            <button
              type="submit"
              disabled={loading}
              className="
                group mt-5 flex min-h-[48px] w-full items-center
                justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3
                text-sm font-semibold text-white shadow-lg shadow-blue-100
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl
                active:scale-[0.98]
                disabled:cursor-not-allowed disabled:bg-blue-400
                disabled:shadow-none
              "
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  {state === "Sign Up"
                    ? "Creating Account..."
                    : "Logging In..."}
                </>
              ) : (
                <>
                  {state === "Sign Up"
                    ? "Create Account"
                    : "Login"}

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>

            {/* ==================================================
                SWITCH MODE
            ================================================== */}
            <p className="mt-5 text-center text-xs text-gray-500 sm:text-sm">
              {state === "Sign Up"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={switchMode}
                className="font-semibold text-blue-600 underline-offset-2 transition-colors hover:text-blue-700 hover:underline"
              >
                {state === "Sign Up"
                  ? "Login here"
                  : "Create one"}
              </button>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;