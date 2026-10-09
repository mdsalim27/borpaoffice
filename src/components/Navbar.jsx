


import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  ShieldCheck,
  Home,
  FilePlus,
  Search,
  LayoutDashboard,
  Phone,
  ChevronRight,
  Zap,
  Gauge,
  Sparkles,
  CircleDot,
  Radio,
  BellRing,
  Megaphone,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* =================================================
      Active Route Check
  ================================================== */
  const isActive = (path) => {
    return location.pathname === path;
  };

  /* =================================================
      Close Mobile Menu When Route Changes
  ================================================== */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* =================================================
      Navbar Scroll Effect
  ================================================== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* =================================================
          TOP INFORMATION BAR
      ================================================== */}
      <div className="hidden bg-slate-950 text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs lg:px-6">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <CircleDot
                size={12}
                className="animate-pulse text-emerald-400"
              />
              <span>অনলাইন সেবা চালু আছে</span>
            </div>

            <div className="hidden items-center gap-1.5 lg:flex">
              <Radio size={13} className="text-blue-400" />
              <span>বরপা সাব-জোনাল অফিস</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Phone size={13} className="text-emerald-400" />
            <span>অভিযোগ হটলাইন: ১৬৯৯৯</span>
          </div>
        </div>
      </div>

      {/* =================================================
          MAIN NAVBAR
      ================================================== */}
      <nav
        className={`
          sticky top-0 z-50 w-full border-b border-slate-200
          bg-white/95 backdrop-blur-xl
          transition-all duration-300
          ${
            scrolled
              ? "shadow-lg shadow-slate-200/50"
              : "shadow-sm"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div
            className={`
              flex items-center justify-between
              transition-all duration-300
              ${scrolled ? "h-16" : "h-[72px]"}
            `}
          >
            {/* =================================================
                LOGO / BRAND
            ================================================== */}
            <Link
              to="/"
              className="group flex items-center gap-3"
            >
              {/* Logo Icon */}
              <div
                className="
                  relative flex h-11 w-11 shrink-0
                  items-center justify-center
                  overflow-hidden rounded-xl
                  bg-gradient-to-br
                  from-blue-600
                  via-blue-700
                  to-indigo-700
                  text-white
                  shadow-lg shadow-blue-200
                  transition-all duration-300
                  group-hover:scale-105
                  group-hover:shadow-xl
                "
              >
                <ShieldCheck
                  size={25}
                  strokeWidth={2}
                  className="relative z-10"
                />

                <span
                  className="
                    absolute -right-3 -top-3
                    h-8 w-8 rounded-full
                    bg-white/20 blur-md
                  "
                />
              </div>

              {/* Brand Text */}
              <div className="hidden sm:block">
                <div
                  className="
                    text-base font-black
                    leading-tight text-slate-800
                    transition-colors
                    group-hover:text-blue-700
                  "
                >
                  অভিযোগ সেবা
                </div>

                <div className="mt-0.5 text-[10px] font-medium text-slate-500">
                  বরপা সাব-জোনাল অফিস
                </div>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================== */}
            <div className="hidden items-center gap-1 md:flex">

              {/* HOME */}
              <NavItem
                to="/"
                icon={<Home size={17} />}
                label="হোম"
                active={isActive("/")}
              />

              {/* COMPLAINT */}
              <NavItem
                to="/complaint"
                icon={<FilePlus size={17} />}
                label="অভিযোগ"
                active={isActive("/complaint")}
              />

              {/* STATUS */}
              <NavItem
                to="/status"
                icon={<Search size={17} />}
                label="স্ট্যাটাস"
                active={isActive("/status")}
              />

              {/* =================================================
                  PREPAID METER
              ================================================== */}
              <Link
                to="/prepaid-help"
                className={`
                  group relative ml-1
                  flex items-center gap-2
                  rounded-xl px-3 py-2.5
                  text-sm font-bold
                  transition-all duration-300
                  active:scale-95
                  ${
                    isActive("/prepaid-help")
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200"
                      : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }
                `}
              >
                <span
                  className={`
                    flex h-7 w-7 items-center justify-center
                    rounded-lg transition-all duration-300
                    ${
                      isActive("/prepaid-help")
                        ? "bg-white/20"
                        : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100"
                    }
                  `}
                >
                  <Gauge
                    size={17}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>

                <span className="hidden xl:inline">
                  Prepaid Meter
                </span>
              </Link>

              {/* =================================================
                  LOAD SHEDDING BUTTON
                  Notice / Load Shedding Update
              ================================================== */}
              <Link
                to="/load-shedding"
                className={`
                  group relative ml-1
                  flex items-center gap-2
                  overflow-hidden
                  rounded-xl
                  border
                  px-3.5 py-2.5
                  text-sm font-bold
                  transition-all duration-300
                  active:scale-95
                  ${
                    isActive("/load-shedding")
                      ? `
                        border-red-600
                        bg-gradient-to-r
                        from-red-600
                        via-orange-500
                        to-amber-500
                        text-white
                        shadow-lg
                        shadow-red-200
                      `
                      : `
                        border-red-200
                        bg-gradient-to-r
                        from-red-50
                        via-orange-50
                        to-amber-50
                        text-red-700
                        hover:-translate-y-0.5
                        hover:border-red-400
                        hover:from-red-600
                        hover:via-orange-500
                        hover:to-amber-500
                        hover:text-white
                        hover:shadow-lg
                        hover:shadow-red-200
                      `
                  }
                `}
              >
                {/* Animated Shine Effect */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-12
                    w-8
                    -skew-x-12
                    bg-white/40
                    transition-all
                    duration-700
                    group-hover:left-[115%]
                  "
                />

                {/* Animated Background Glow */}
                <span
                  className="
                    pointer-events-none
                    absolute
                    -right-5
                    -top-5
                    h-12
                    w-12
                    rounded-full
                    bg-red-400/20
                    blur-xl
                    transition-all
                    duration-500
                    group-hover:scale-[2]
                  "
                />

                {/* Icon */}
                <span
                  className={`
                    relative
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    transition-all
                    duration-300
                    ${
                      isActive("/load-shedding")
                        ? "bg-white/20 text-white"
                        : "bg-red-100 text-red-600 group-hover:bg-white/20 group-hover:text-white"
                    }
                    group-hover:scale-110
                  `}
                >
                  <Zap
                    size={17}
                    strokeWidth={2.5}
                    className="
                      animate-pulse
                      transition-transform
                      duration-300
                      group-hover:rotate-6
                    "
                  />
                </span>

                {/* Button Text */}
                <span className="relative hidden whitespace-nowrap lg:inline">
                  Load Shedding
                </span>

                {/* Notice Badge */}
                <span
                  className={`
                    absolute
                    -right-1
                    -top-1
                    flex
                    items-center
                    gap-0.5
                    rounded-full
                    px-1.5
                    py-0.5
                    text-[8px]
                    font-black
                    tracking-wide
                    shadow-sm
                    ${
                      isActive("/load-shedding")
                        ? "bg-white text-red-600"
                        : "bg-red-600 text-white"
                    }
                  `}
                >
                  <BellRing
                    size={8}
                    className="animate-pulse"
                  />

                  NOTICE
                </span>
              </Link>

              {/* =================================================
                  ADMIN PANEL
              ================================================== */}
              <NavItem
                to="/admin"
                icon={<LayoutDashboard size={17} />}
                label="Admin"
                active={isActive("/admin")}
              />
            </div>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================== */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                border border-slate-200
                bg-white
                text-slate-700
                shadow-sm
                transition-all duration-300
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-700
                active:scale-95
                md:hidden
              "
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================== */}
        <div
          className={`
            overflow-hidden border-t border-slate-100
            bg-white transition-all duration-300 md:hidden
            ${
              isOpen
                ? "max-h-[700px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4">

            {/* =================================================
                MOBILE HOME
            ================================================== */}
            <MobileNavItem
              to="/"
              icon={<Home size={19} />}
              label="হোম"
              active={isActive("/")}
              onClick={() => setIsOpen(false)}
            />

            {/* =================================================
                MOBILE COMPLAINT
            ================================================== */}
            <MobileNavItem
              to="/complaint"
              icon={<FilePlus size={19} />}
              label="অভিযোগ করুন"
              active={isActive("/complaint")}
              onClick={() => setIsOpen(false)}
            />

            {/* =================================================
                MOBILE STATUS
            ================================================== */}
            <MobileNavItem
              to="/status"
              icon={<Search size={19} />}
              label="অভিযোগের স্ট্যাটাস"
              active={isActive("/status")}
              onClick={() => setIsOpen(false)}
            />

            {/* =================================================
                MOBILE PREPAID METER
            ================================================== */}
            <Link
              to="/prepaid-help"
              onClick={() => setIsOpen(false)}
              className={`
                group mt-2
                flex items-center justify-between
                rounded-xl
                border
                px-4 py-3.5
                transition-all duration-300
                active:scale-[0.98]
                ${
                  isActive("/prepaid-help")
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                    : "border-emerald-100 bg-emerald-50 text-emerald-700 hover:border-emerald-200 hover:bg-emerald-100"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl
                    ${
                      isActive("/prepaid-help")
                        ? "bg-white/20"
                        : "bg-white text-emerald-600"
                    }
                  `}
                >
                  <Gauge size={20} />
                </div>

                <div>
                  <div className="font-bold">
                    Prepaid Meter
                  </div>

                  <p
                    className={`
                      mt-0.5 text-[11px]
                      ${
                        isActive("/prepaid-help")
                          ? "text-emerald-50"
                          : "text-emerald-600"
                      }
                    `}
                  >
                    Prepaid Meter Help & Codes
                  </p>
                </div>
              </div>

              <ChevronRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* =================================================
                MOBILE LOAD SHEDDING BUTTON
                Notice / Latest Update
            ================================================== */}
            <Link
              to="/load-shedding"
              onClick={() => setIsOpen(false)}
              className={`
                group relative mt-2
                flex items-center justify-between
                overflow-hidden
                rounded-2xl
                border
                px-4 py-3.5
                transition-all duration-300
                active:scale-[0.98]
                ${
                  isActive("/load-shedding")
                    ? `
                      border-red-600
                      bg-gradient-to-r
                      from-red-600
                      via-orange-500
                      to-amber-500
                      text-white
                      shadow-lg
                      shadow-red-200
                    `
                    : `
                      border-red-200
                      bg-gradient-to-r
                      from-red-50
                      via-orange-50
                      to-amber-50
                      text-red-700
                      hover:border-red-300
                      hover:shadow-md
                    `
                }
              `}
            >
              {/* Animated Background Glow */}
              <span
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-red-300/20
                  blur-2xl
                  transition-transform
                  duration-500
                  group-hover:scale-150
                "
              />

              {/* Shine Animation */}
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-12
                  w-10
                  -skew-x-12
                  bg-white/30
                  transition-all
                  duration-700
                  group-hover:left-[115%]
                "
              />

              {/* Left Content */}
              <div className="relative flex min-w-0 items-center gap-3">

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-300
                    ${
                      isActive("/load-shedding")
                        ? "bg-white/20 text-white"
                        : "bg-red-100 text-red-600"
                    }
                    group-hover:scale-110
                  `}
                >
                  <Zap
                    size={21}
                    strokeWidth={2.5}
                    className="
                      animate-pulse
                      transition-transform
                      duration-300
                      group-hover:rotate-6
                    "
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">

                  {/* Title + Badge */}
                  <div className="flex flex-wrap items-center gap-2">

                    <span className="font-bold">
                      Load Shedding
                    </span>

                    {/* Notice Badge */}
                    <span
                      className={`
                        flex
                        items-center
                        gap-1
                        rounded-full
                        px-1.5
                        py-0.5
                        text-[8px]
                        font-black
                        tracking-wide
                        ${
                          isActive("/load-shedding")
                            ? "bg-white/20 text-white"
                            : "bg-red-600 text-white"
                        }
                      `}
                    >
                      <BellRing
                        size={8}
                        className="animate-pulse"
                      />

                      NOTICE
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    className={`
                      mt-0.5
                      text-[11px]
                      leading-4
                      ${
                        isActive("/load-shedding")
                          ? "text-red-50"
                          : "text-red-500"
                      }
                    `}
                  >
                    Load Shedding Notice ও সর্বশেষ আপডেট
                  </p>
                </div>
              </div>

              {/* Right Arrow */}
              <ChevronRight
                size={20}
                className="
                  relative
                  shrink-0
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:scale-110
                "
              />
            </Link>

            {/* =================================================
                MOBILE ADMIN
            ================================================== */}
            <MobileNavItem
              to="/admin"
              icon={<LayoutDashboard size={19} />}
              label="Admin Panel"
              active={isActive("/admin")}
              onClick={() => setIsOpen(false)}
            />

            {/* =================================================
                OFFICE INFORMATION CARD
            ================================================== */}
            <div
              className="
                mt-4 rounded-2xl
                border border-slate-200
                bg-gradient-to-br
                from-slate-50
                to-blue-50
                p-4
              "
            >
              <div className="flex items-start gap-3">

                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-blue-600
                    text-white
                    shadow-md shadow-blue-200
                  "
                >
                  <ShieldCheck size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">
                    বরপা সাব-জোনাল অফিস
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    নারায়ণগঞ্জ পল্লী বিদ্যুৎ সমিতি-১
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <CircleDot
                      size={10}
                      className="animate-pulse"
                    />
                    অনলাইন সেবা চালু আছে
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

/* =========================================================
   DESKTOP NAV ITEM
========================================================= */

const NavItem = ({
  to,
  icon,
  label,
  active,
}) => {
  return (
    <Link
      to={to}
      className={`
        group relative
        flex items-center gap-2
        rounded-xl
        px-3 py-2.5
        text-sm font-bold
        transition-all duration-300
        active:scale-95
        ${
          active
            ? `
              bg-blue-600
              text-white
              shadow-lg
              shadow-blue-200
            `
            : `
              text-slate-600
              hover:bg-blue-50
              hover:text-blue-700
            `
        }
      `}
    >
      <span
        className={`
          flex h-7 w-7
          items-center justify-center
          rounded-lg
          transition-all duration-300
          ${
            active
              ? "bg-white/20"
              : "bg-slate-100 group-hover:bg-blue-100"
          }
        `}
      >
        {icon}
      </span>

      <span className="hidden xl:inline">
        {label}
      </span>

      {/* Active Indicator */}
      {active && (
        <span
          className="
            absolute
            bottom-0.5
            left-1/2
            h-0.5
            w-5
            -translate-x-1/2
            rounded-full
            bg-white
          "
        />
      )}
    </Link>
  );
};

/* =========================================================
   MOBILE NAV ITEM
========================================================= */

const MobileNavItem = ({
  to,
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        group
        flex items-center justify-between
        rounded-xl
        px-4 py-3.5
        transition-all duration-300
        active:scale-[0.98]
        ${
          active
            ? `
              bg-blue-600
              text-white
              shadow-lg
              shadow-blue-100
            `
            : `
              text-slate-700
              hover:bg-blue-50
              hover:text-blue-700
            `
        }
      `}
    >
      <div className="flex items-center gap-3">

        <div
          className={`
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            transition-all duration-300
            ${
              active
                ? "bg-white/20"
                : "bg-slate-100 group-hover:bg-blue-100"
            }
          `}
        >
          {icon}
        </div>

        <span className="font-bold">
          {label}
        </span>
      </div>

      <ChevronRight
        size={19}
        className="
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />
    </Link>
  );
};

export default Navbar;
