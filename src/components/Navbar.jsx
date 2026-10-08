
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// import {
//   Menu,
//   X,
//   ShieldCheck,
//   Home,
//   FilePlus,
//   Search,
//   LayoutDashboard,
//   Phone,
//   ChevronRight,
// } from "lucide-react";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const location = useLocation();

//   // ================= SCROLL EFFECT =================

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // ================= CLOSE MOBILE MENU =================

//   useEffect(() => {
//     setIsOpen(false);
//   }, [location.pathname]);

//   // ================= ACTIVE LINK =================

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <>
//       {/* =====================================================
//           TOP INFORMATION BAR
//       ====================================================== */}

//       <div className="hidden md:block bg-green-700 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           <div className="h-9 flex items-center justify-between text-sm">

//             <p>
//               নারায়ণগঞ্জ পল্লী বিদ্যুৎ সমিতি-১
//             </p>

//             <div className="flex items-center gap-2">
//               <Phone size={15} />

//               <span>
//                 বিদ্যুৎ সংক্রান্ত অভিযোগের জন্য অনলাইনে অভিযোগ করুন
//               </span>
//             </div>

//           </div>

//         </div>
//       </div>


//       {/* =====================================================
//           MAIN NAVBAR
//       ====================================================== */}

//       <nav
//         className={`
//           bg-white sticky top-0 z-50
//           transition-all duration-300
//           ${
//             isScrolled
//               ? "shadow-lg border-b border-gray-200"
//               : "shadow-md"
//           }
//         `}
//       >

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           <div className="flex items-center justify-between h-16">


//             {/* =================================================
//                 LOGO
//             ================================================== */}

//             <Link
//               to="/"
//               onClick={() => setIsOpen(false)}
//               className="flex items-center gap-3 group"
//             >

//               {/* Logo Icon */}

//               <div
//                 className="
//                   bg-green-600
//                   text-white
//                   p-2.5
//                   rounded-xl
//                   shadow-sm
//                   group-hover:bg-green-700
//                   group-hover:scale-105
//                   transition-all
//                   duration-200
//                 "
//               >
//                 <ShieldCheck size={25} />
//               </div>


//               {/* Logo Text */}

//               <div className="leading-tight">

//                 <h1 className="text-lg font-bold text-gray-800">
//                   অভিযোগ সেবা
//                 </h1>

//                 <p className="text-[11px] sm:text-xs text-gray-500">
//                   বরপা সাব-জোনাল অফিস
//                 </p>

//               </div>

//             </Link>


//             {/* =================================================
//                 DESKTOP MENU
//             ================================================== */}

//             <div className="hidden md:flex items-center gap-1">


//               {/* Home */}

//               <NavItem
//                 to="/"
//                 icon={<Home size={17} />}
//                 text="Home"
//                 active={isActive("/")}
//               />


//               {/* Complaint */}

//               <NavItem
//                 to="/complaint"
//                 icon={<FilePlus size={17} />}
//                 text="অভিযোগ করুন"
//                 active={isActive("/complaint")}
//               />


//               {/* Status */}

//               <NavItem
//                 to="/status"
//                 icon={<Search size={17} />}
//                 text="অভিযোগের অবস্থা"
//                 active={isActive("/status")}
//               />


//               {/* Admin */}

//               <Link
//                 to="/admin"
//                 className={`
//                   flex items-center gap-2
//                   ml-2
//                   px-4
//                   py-2.5
//                   rounded-lg
//                   font-semibold
//                   text-sm
//                   transition-all
//                   duration-200
//                   ${
//                     isActive("/admin")
//                       ? "bg-blue-700 text-white"
//                       : "bg-blue-600 text-white hover:bg-blue-700"
//                   }
//                 `}
//               >

//                 <LayoutDashboard size={17} />

//                 <span>
//                   Admin Panel
//                 </span>

//               </Link>

//             </div>


//             {/* =================================================
//                 MOBILE MENU BUTTON
//             ================================================== */}

//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="
//                 md:hidden
//                 p-2
//                 rounded-lg
//                 text-gray-700
//                 hover:bg-gray-100
//                 transition
//               "
//               aria-label="Toggle menu"
//               aria-expanded={isOpen}
//             >

//               {isOpen ? (
//                 <X size={27} />
//               ) : (
//                 <Menu size={27} />
//               )}

//             </button>

//           </div>


//           {/* =================================================
//               MOBILE MENU
//           ================================================== */}

//           <div
//             className={`
//               md:hidden
//               overflow-hidden
//               transition-all
//               duration-300
//               ${
//                 isOpen
//                   ? "max-h-[500px] opacity-100 pb-4"
//                   : "max-h-0 opacity-0"
//               }
//             `}
//           >

//             <div className="border-t border-gray-100 pt-3 space-y-1">


//               {/* Mobile Home */}

//               <MobileNavItem
//                 to="/"
//                 icon={<Home size={19} />}
//                 text="Home"
//                 active={isActive("/")}
//                 onClick={() => setIsOpen(false)}
//               />


//               {/* Mobile Complaint */}

//               <MobileNavItem
//                 to="/complaint"
//                 icon={<FilePlus size={19} />}
//                 text="অভিযোগ করুন"
//                 active={isActive("/complaint")}
//                 onClick={() => setIsOpen(false)}
//               />


//               {/* Mobile Status */}

//               <MobileNavItem
//                 to="/status"
//                 icon={<Search size={19} />}
//                 text="অভিযোগের অবস্থা"
//                 active={isActive("/status")}
//                 onClick={() => setIsOpen(false)}
//               />


//               {/* Mobile Admin */}

//               <Link
//                 to="/admin"
//                 onClick={() => setIsOpen(false)}
//                 className={`
//                   flex items-center justify-between
//                   px-4
//                   py-3
//                   rounded-lg
//                   mt-2
//                   font-semibold
//                   ${
//                     isActive("/admin")
//                       ? "bg-blue-700 text-white"
//                       : "bg-blue-600 text-white hover:bg-blue-700"
//                   }
//                 `}
//               >

//                 <div className="flex items-center gap-3">

//                   <LayoutDashboard size={19} />

//                   <span>
//                     Admin Panel
//                   </span>

//                 </div>

//                 <ChevronRight size={18} />

//               </Link>


//               {/* Mobile Office Info */}

//               <div className="mt-3 px-4 py-3 bg-green-50 rounded-lg border border-green-100">

//                 <div className="flex items-center gap-2 text-green-700">

//                   <Phone size={17} />

//                   <span className="font-semibold text-sm">
//                     বরপা সাব-জোনাল অফিস
//                   </span>

//                 </div>

//                 <p className="text-xs text-gray-500 mt-1">
//                   বিদ্যুৎ সংক্রান্ত সমস্যা হলে অভিযোগ করুন।
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>

//       </nav>
//     </>
//   );
// };


// /* =========================================================
//    DESKTOP NAV ITEM
// ========================================================= */

// function NavItem({
//   to,
//   icon,
//   text,
//   active,
// }) {
//   return (
//     <Link
//       to={to}
//       className={`
//         flex
//         items-center
//         gap-2
//         px-3
//         py-2.5
//         rounded-lg
//         text-sm
//         font-medium
//         transition-all
//         duration-200
//         ${
//           active
//             ? "bg-green-50 text-green-700"
//             : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
//         }
//       `}
//     >

//       {icon}

//       <span>
//         {text}
//       </span>

//     </Link>
//   );
// }


// /* =========================================================
//    MOBILE NAV ITEM
// ========================================================= */

// function MobileNavItem({
//   to,
//   icon,
//   text,
//   active,
//   onClick,
// }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className={`
//         flex
//         items-center
//         justify-between
//         px-4
//         py-3
//         rounded-lg
//         transition-all
//         duration-200
//         ${
//           active
//             ? "bg-green-50 text-green-700 font-semibold"
//             : "text-gray-700 hover:bg-gray-50"
//         }
//       `}
//     >

//       <div className="flex items-center gap-3">

//         {icon}

//         <span>
//           {text}
//         </span>

//       </div>

//       <ChevronRight size={17} />

//     </Link>
//   );
// }


// export default Navbar;





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
} from "lucide-react";

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);

const location = useLocation();

// ================= SCROLL EFFECT =================

useEffect(() => {
const handleScroll = () => {
if (window.scrollY > 10) {
setIsScrolled(true);
} else {
setIsScrolled(false);
}
};


window.addEventListener("scroll", handleScroll);

return () => {
  window.removeEventListener("scroll", handleScroll);
};


}, []);

// ================= CLOSE MOBILE MENU =================

useEffect(() => {
setIsOpen(false);
}, [location.pathname]);

// ================= ACTIVE LINK =================

const isActive = (path) => {
return location.pathname === path;
};

return (
<>
{/* =====================================================
TOP INFORMATION BAR
====================================================== */}


  <div className="relative hidden overflow-hidden bg-gradient-to-r from-emerald-700 via-green-700 to-teal-700 text-white md:block">
    {/* Animated light */}
    <div className="absolute inset-0 animate-[pulse_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-9 items-center justify-between text-xs lg:text-sm">
        {/* Office */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-300" />
          </span>

          <p className="font-semibold">
            নারায়ণগঞ্জ পল্লী বিদ্যুৎ সমিতি-১
          </p>
        </div>

        {/* Online Service */}
        <div className="flex items-center gap-2 text-green-50">
          <Radio size={14} className="animate-pulse" />

          <span>
            বিদ্যুৎ সংক্রান্ত অভিযোগের জন্য অনলাইনে অভিযোগ করুন
          </span>

          <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-green-100 lg:inline-block">
            ONLINE
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* =====================================================
      MAIN NAVBAR
  ====================================================== */}

  <nav
    className={`
      sticky top-0 z-50 overflow-visible
      bg-white/95 backdrop-blur-xl
      transition-all duration-500
      ${
        isScrolled
          ? "border-b border-gray-200 shadow-xl shadow-slate-200/60"
          : "border-b border-gray-100 shadow-md"
      }
    `}
  >
    {/* Animated top line */}
    <div
      className={`
        absolute left-0 top-0 h-0.5
        bg-gradient-to-r from-green-500 via-cyan-500 to-blue-600
        transition-all duration-500
        ${
          isScrolled
            ? "w-full opacity-100"
            : "w-1/3 opacity-70"
        }
      `}
    />

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        className={`
          flex items-center justify-between
          transition-all duration-500
          ${isScrolled ? "h-14" : "h-16"}
        `}
      >
        {/* =================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3"
        >
          {/* Logo Icon */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-green-400/30 blur-md transition duration-500 group-hover:bg-cyan-400/40" />

            <div
              className="
                relative flex h-11 w-11 items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-green-600 via-emerald-600 to-teal-500
                text-white
                shadow-lg shadow-green-200
                transition-all duration-500
                group-hover:-rotate-3
                group-hover:scale-110
                group-hover:shadow-xl
              "
            >
              <ShieldCheck
                size={25}
                className="transition-transform duration-500 group-hover:scale-110"
              />

              {/* Live dot */}
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
              </span>
            </div>
          </div>

          {/* Logo Text */}
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-black tracking-tight text-gray-800 sm:text-lg">
                অভিযোগ সেবা
              </h1>

              <Sparkles
                size={13}
                className="animate-pulse text-green-500"
              />
            </div>

            <p className="mt-0.5 text-[10px] font-medium text-gray-500 sm:text-xs">
              বরপা সাব-জোনাল অফিস
            </p>
          </div>
        </Link>

        {/* =================================================
            DESKTOP MENU
        ================================================== */}

        <div className="hidden items-center gap-1.5 md:flex">
          {/* Home */}
          <NavItem
            to="/"
            icon={<Home size={17} />}
            text="Home"
            active={isActive("/")}
          />

          {/* Complaint */}
          <NavItem
            to="/complaint"
            icon={<FilePlus size={17} />}
            text="অভিযোগ করুন"
            active={isActive("/complaint")}
          />

          {/* Status */}
          <NavItem
            to="/status"
            icon={<Search size={17} />}
            text="অভিযোগের অবস্থা"
            active={isActive("/status")}
          />

          {/* =================================================
              PREPAID METER HELP
          ================================================== */}

          <Link
            to="/prepaid-help"
            className={`
              group relative ml-1 flex items-center gap-2
              overflow-hidden rounded-xl
              px-3.5 py-2.5
              text-sm font-bold
              transition-all duration-300
              ${
                isActive("/prepaid-help")
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200"
                  : "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 hover:-translate-y-0.5 hover:from-orange-500 hover:to-amber-500 hover:text-white hover:shadow-lg hover:shadow-orange-200"
              }
            `}
          >
            {/* Shine */}
            <span className="absolute inset-y-0 -left-10 w-8 -skew-x-12 bg-white/40 transition-all duration-700 group-hover:left-[110%]" />

            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition duration-300 group-hover:bg-white/20 group-hover:text-white">
              <Gauge
                size={16}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </span>

            <span className="relative hidden lg:inline">
              
              প্রিপেইড মিটার
            </span>

            {/* New Badge */}
            <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] font-black text-white shadow-sm">
              NEW
            </span>
          </Link>

          {/* =================================================
              ADMIN
          ================================================== */}

          <Link
            to="/admin"
            className={`
              group relative ml-1 flex items-center gap-2
              overflow-hidden rounded-xl
              px-4 py-2.5
              text-sm font-bold
              text-white
              transition-all duration-300
              ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg shadow-blue-200"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-200"
              }
            `}
          >
            {/* Shine */}
            <span className="absolute inset-y-0 -left-10 w-8 -skew-x-12 bg-white/30 transition-all duration-700 group-hover:left-[110%]" />

            <LayoutDashboard
              size={17}
              className="relative transition-transform duration-300 group-hover:rotate-6"
            />

            <span className="relative">
              Admin Panel
            </span>

            <ChevronRight
              size={15}
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================== */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            relative flex h-11 w-11 items-center justify-center
            rounded-xl border border-gray-200
            bg-gray-50 text-gray-700
            shadow-sm
            transition-all duration-300
            hover:border-green-200
            hover:bg-green-50
            hover:text-green-700
            active:scale-95
            md:hidden
          "
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {/* Button glow */}
          <span
            className={`
              absolute inset-0 rounded-xl
              bg-green-400/10 blur-md
              transition-opacity
              ${isOpen ? "opacity-100" : "opacity-0"}
            `}
          />

          <span className="relative">
            {isOpen ? (
              <X
                size={26}
                className="rotate-90 transition-transform duration-300"
              />
            ) : (
              <Menu
                size={26}
                className="transition-transform duration-300"
              />
            )}
          </span>
        </button>
      </div>

      {/* =================================================
          MOBILE MENU
      ================================================== */}

      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-500 ease-in-out
          ${
            isOpen
              ? "max-h-[700px] pb-5 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="border-t border-gray-100 pt-4">
          {/* Mobile Home */}
          <MobileNavItem
            to="/"
            icon={<Home size={19} />}
            text="Home"
            active={isActive("/")}
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Complaint */}
          <MobileNavItem
            to="/complaint"
            icon={<FilePlus size={19} />}
            text="অভিযোগ করুন"
            active={isActive("/complaint")}
            onClick={() => setIsOpen(false)}
          />

          {/* Mobile Status */}
          <MobileNavItem
            to="/status"
            icon={<Search size={19} />}
            text="অভিযোগের অবস্থা"
            active={isActive("/status")}
            onClick={() => setIsOpen(false)}
          />

          {/* =================================================
              MOBILE PREPAID
          ================================================== */}

          <Link
            to="/prepaid-help"
            onClick={() => setIsOpen(false)}
            className={`
              group relative mt-1 flex items-center justify-between
              overflow-hidden rounded-xl px-4 py-3.5
              transition-all duration-300
              ${
                isActive("/prepaid-help")
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                  : "border border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100"
              }
            `}
          >
            <div className="relative flex items-center gap-3">
              <div
                className={`
                  flex h-9 w-9 items-center justify-center rounded-xl
                  ${
                    isActive("/prepaid-help")
                      ? "bg-white/20 text-white"
                      : "bg-orange-100 text-orange-600"
                  }
                `}
              >
                <Gauge
                  size={19}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    প্রিপেইড মিটার 

                  </span>

                  <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] font-black text-white">
                    NEW
                  </span>
                </div>

                <p
                  className={`mt-0.5 text-[11px] ${
                    isActive("/prepaid-help")
                      ? "text-orange-50"
                      : "text-orange-500"
                  }`}
                >
                  মিটার কোড, ব্যালেন্স ও রিচার্জ সহায়তা
                </p>
              </div>
            </div>

            <ChevronRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Mobile Admin */}
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className={`
              group mt-2 flex items-center justify-between
              rounded-xl px-4 py-3.5
              font-bold
              text-white
              transition-all duration-300
              ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-blue-700 to-indigo-700 shadow-lg"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <LayoutDashboard size={19} />
              </div>

              <div>
                <span>Admin Panel</span>

                <p className="mt-0.5 text-[11px] font-normal text-blue-100">
                  অফিস ব্যবস্থাপনা
                </p>
              </div>
            </div>

            <ChevronRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {/* Mobile Office Info */}
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
            <div className="absolute -right-5 -top-5 h-20 w-20 animate-pulse rounded-full bg-green-200/30 blur-xl" />

            <div className="relative">
              <div className="flex items-center gap-2 text-green-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                  <Phone size={16} />
                </div>

                <span className="font-bold text-sm">
                  বরপা সাব-জোনাল অফিস
                </span>

                <span className="ml-auto flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[9px] font-bold text-green-700">
                  <CircleDot
                    size={10}
                    className="animate-pulse"
                  />
                  LIVE
                </span>
              </div>

              <p className="mt-2 pl-10 text-xs leading-5 text-gray-500">
                বিদ্যুৎ সংক্রান্ত সমস্যা হলে অনলাইনে অভিযোগ করুন।
              </p>
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

function NavItem({ to, icon, text, active }) {
return (
<Link
to={to}
className={`         group relative flex items-center gap-2
        overflow-hidden rounded-xl
        px-3.5 py-2.5
        text-sm font-bold
        transition-all duration-300
        ${
          active
            ? "bg-green-50 text-green-700 shadow-sm"
            : "text-gray-700 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-700"
        }
      `}
>
{/* Active / hover bottom line */}
<span
className={`           absolute bottom-0 left-1/2 h-0.5
          -translate-x-1/2
          bg-gradient-to-r from-green-500 to-cyan-500
          transition-all duration-300
          ${
            active
              ? "w-1/2 opacity-100"
              : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"
          }
        `}
/>


  <span
    className={`
      transition-transform duration-300
      group-hover:scale-110
      ${active ? "text-green-600" : ""}
    `}
  >
    {icon}
  </span>

  <span>{text}</span>
</Link>

);
}

/* =========================================================
MOBILE NAV ITEM
========================================================= */

function MobileNavItem({
to,
icon,
text,
active,
onClick,
}) {
return (
<Link
to={to}
onClick={onClick}
className={`         group mb-1 flex items-center justify-between
        rounded-xl px-4 py-3.5
        transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-green-50 to-emerald-50 font-bold text-green-700 shadow-sm"
            : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
        }
      `}
> <div className="flex items-center gap-3">
<span
className={`             transition-all duration-300
            group-hover:scale-110
            ${
              active
                ? "text-green-600"
                : "text-gray-500 group-hover:text-green-600"
            }
          `}
>
{icon} </span>


    <span>{text}</span>
  </div>

  <ChevronRight
    size={17}
    className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-green-500"
  />
</Link>


);
}

export default Navbar;
