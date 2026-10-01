import React, { useEffect, useState, useContext } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FiChevronDown,
  FiHome,
  FiInfo,
  FiCalendar,
  FiMail,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";

import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token,
    setToken,
    userData,
    setUserData,
  } = useContext(AppContext);

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goTo = (path) => {
    setMobileOpen(false);
    setProfileOpen(false);

    navigate(path);

    setTimeout(() => {
      scrollToTop();
    }, 50);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken("");
    setUserData(false);

    setProfileOpen(false);
    setMobileOpen(false);

    navigate("/login?mode=login");

    setTimeout(() => {
      scrollToTop();
    }, 50);
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: FiHome,
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: FiCalendar,
    },
    {
      name: "About",
      path: "/about",
      icon: FiInfo,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: FiMail,
    },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* =========================
          DESKTOP / MAIN NAVBAR
      ========================== */}
      <header
  className="
    sticky top-0 z-[100]
    w-full
    border-b border-gray-200/80
    bg-white/95
    shadow-sm
    backdrop-blur-xl
  "
>
        <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[76px] lg:px-8">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => goTo("/")}
            className="group flex min-w-0 items-center"
            aria-label="PULSE-MEET Home"
          >
            <img
              src={assets.logo}
              alt="PULSE-MEET"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11 lg:h-12"
            />
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active =
                location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={scrollToTop}
                  className={`
                    group relative flex items-center gap-2
                    rounded-xl px-4 py-2.5
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                    }
                  `}
                >
                  <Icon
                    className={`text-base transition-transform duration-200 ${
                      active
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  />

                  <span>{item.name}</span>

                  {active && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-600" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* DESKTOP ACCOUNT */}
          <div className="hidden items-center gap-3 lg:flex">

            {/* NOT LOGGED IN */}
            {!token ? (
              <>
                {/* LOGIN */}
                <button
                  type="button"
                  onClick={() =>
                    goTo("/login?mode=login")
                  }
                  className="
                    flex min-h-11 items-center gap-2
                    rounded-xl border border-gray-200
                    bg-white px-5
                    text-sm font-semibold text-gray-700
                    shadow-sm
                    transition-all duration-200
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                    active:scale-95
                  "
                >
                  <FiLogIn />

                  <span>Login</span>
                </button>

                {/* REGISTER */}
                <button
                  type="button"
                  onClick={() =>
                    goTo("/login?mode=signup")
                  }
                  className="
                    flex min-h-11 items-center gap-2
                    rounded-xl bg-blue-600 px-5
                    text-sm font-semibold text-white
                    shadow-md shadow-blue-600/20
                    transition-all duration-200
                    hover:bg-blue-700
                    hover:shadow-lg
                    active:scale-95
                  "
                >
                  <FiUserPlus />

                  <span>Register</span>
                </button>
              </>
            ) : (
              /* LOGGED IN */
              <div className="relative">

                {/* PROFILE BUTTON */}
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen((prev) => !prev)
                  }
                  className="
                    flex min-h-11 items-center gap-2
                    rounded-xl border border-gray-200
                    bg-white px-2.5 py-1.5
                    shadow-sm
                    transition-all duration-200
                    hover:border-blue-200
                    hover:bg-blue-50
                  "
                >
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt={userData?.name || "Profile"}
                      className="h-9 w-9 rounded-full border border-blue-100 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FiUser />
                    </div>
                  )}

                  <div className="hidden max-w-[130px] text-left xl:block">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {userData?.name || "My Account"}
                    </p>

                    <p className="text-xs text-gray-500">
                      Patient
                    </p>
                  </div>

                  <FiChevronDown
                    className={`text-gray-500 transition-transform ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* PROFILE DROPDOWN */}
                {profileOpen && (
                  <div
                    className="
                      absolute right-0 top-[calc(100%+10px)]
                      w-60 overflow-hidden
                      rounded-2xl border border-gray-100
                      bg-white p-2
                      shadow-xl shadow-gray-200/60
                    "
                  >
                    {/* USER INFO */}
                    <div className="mb-1 border-b border-gray-100 px-3 py-3">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {userData?.name ||
                          "My Account"}
                      </p>

                      {userData?.email && (
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {userData.email}
                        </p>
                      )}
                    </div>

                    {/* PROFILE */}
                    <button
                      type="button"
                      onClick={() =>
                        goTo("/my-profile")
                      }
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-left text-sm font-medium
                        text-gray-700
                        transition-colors
                        hover:bg-blue-50
                        hover:text-blue-600
                      "
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                        <FiUser />
                      </span>

                      <span>My Profile</span>
                    </button>

                    {/* APPOINTMENTS */}
                    <button
                      type="button"
                      onClick={() =>
                        goTo("/my-appointments")
                      }
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-left text-sm font-medium
                        text-gray-700
                        transition-colors
                        hover:bg-blue-50
                        hover:text-blue-600
                      "
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                        <FiCalendar />
                      </span>

                      <span>My Appointments</span>
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    {/* LOGOUT */}
                    <button
                      type="button"
                      onClick={logout}
                      className="
                        flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-left text-sm font-medium
                        text-red-600
                        transition-colors
                        hover:bg-red-50
                      "
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                        <FiLogOut />
                      </span>

                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() =>
              setMobileOpen((prev) => !prev)
            }
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl border border-gray-200
              bg-white text-gray-700 shadow-sm
              transition-all duration-200
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-600
              active:scale-95
              lg:hidden
            "
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
          >
            {mobileOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="
            fixed inset-0 z-[90]
            bg-gray-900/40
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <aside
        className={`
          fixed right-0 top-0 z-[110]
          flex h-dvh
          w-[min(88%,380px)]
          flex-col
          overflow-y-auto
          bg-white shadow-2xl
          transition-transform duration-300
          lg:hidden
          ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* MOBILE HEADER */}
        <div className="flex min-h-[68px] items-center justify-between border-b border-gray-100 px-4">
          <button
            type="button"
            onClick={() => goTo("/")}
          >
            <img
              src={assets.logo}
              alt="PULSE-MEET"
              className="h-10 w-auto object-contain"
            />
          </button>

          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              flex h-10 w-10 items-center
              justify-center rounded-xl
              border border-gray-200
              text-gray-600
              hover:bg-gray-50
            "
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* MOBILE USER */}
        {token && (
          <div className="mx-4 mt-4 rounded-2xl bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              {userData?.image ? (
                <img
                  src={userData.image}
                  alt={userData?.name || "Profile"}
                  className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <FiUser className="text-lg" />
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">
                  {userData?.name ||
                    "My Account"}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {userData?.email ||
                    "Patient account"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MOBILE NAVIGATION */}
        <nav className="flex flex-1 flex-col px-4 py-5">
          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Navigation
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const active =
                location.pathname ===
                item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setMobileOpen(false);
                    scrollToTop();
                  }}
                  className={`
                    flex min-h-12 items-center gap-3
                    rounded-xl px-3
                    text-sm font-semibold
                    transition-all duration-200
                    ${
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }
                  `}
                >
                  <span
                    className={`
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      ${
                        active
                          ? "bg-white/15"
                          : "bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="text-lg" />
                  </span>

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* MOBILE ACCOUNT */}
          <div className="my-5 border-t border-gray-100" />

          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            Account
          </p>

          {!token ? (
            <div className="grid grid-cols-2 gap-3">
              {/* LOGIN */}
              <button
                type="button"
                onClick={() =>
                  goTo("/login?mode=login")
                }
                className="
                  flex min-h-12
                  items-center justify-center gap-2
                  rounded-xl border border-gray-200
                  bg-white px-3
                  text-sm font-semibold text-gray-700
                  transition-all
                  hover:border-blue-200
                  hover:bg-blue-50
                  hover:text-blue-600
                  active:scale-95
                "
              >
                <FiLogIn />

                <span>Login</span>
              </button>

              {/* REGISTER */}
              <button
                type="button"
                onClick={() =>
                  goTo("/login?mode=signup")
                }
                className="
                  flex min-h-12
                  items-center justify-center gap-2
                  rounded-xl bg-blue-600
                  px-3 text-sm font-semibold text-white
                  shadow-md shadow-blue-600/20
                  transition-all
                  hover:bg-blue-700
                  active:scale-95
                "
              >
                <FiUserPlus />

                <span>Register</span>
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {/* PROFILE */}
              <button
                type="button"
                onClick={() =>
                  goTo("/my-profile")
                }
                className="
                  flex min-h-12 w-full
                  items-center gap-3
                  rounded-xl px-3
                  text-left text-sm font-semibold
                  text-gray-700
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <FiUser />
                </span>

                <span>My Profile</span>
              </button>

              {/* APPOINTMENTS */}
              <button
                type="button"
                onClick={() =>
                  goTo("/my-appointments")
                }
                className="
                  flex min-h-12 w-full
                  items-center gap-3
                  rounded-xl px-3
                  text-left text-sm font-semibold
                  text-gray-700
                  hover:bg-blue-50
                  hover:text-blue-600
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <FiCalendar />
                </span>

                <span>My Appointments</span>
              </button>

              {/* LOGOUT */}
              <button
                type="button"
                onClick={logout}
                className="
                  flex min-h-12 w-full
                  items-center gap-3
                  rounded-xl px-3
                  text-left text-sm font-semibold
                  text-red-600
                  hover:bg-red-50
                "
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                  <FiLogOut />
                </span>

                <span>Logout</span>
              </button>
            </div>
          )}
        </nav>

        {/* MOBILE FOOTER */}
        <div className="border-t border-gray-100 p-4">
          <div className="rounded-2xl bg-gray-50 p-4">
            <p className="text-xs font-semibold text-gray-500">
              PULSE-MEET
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              Your trusted healthcare appointment
              platform.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;