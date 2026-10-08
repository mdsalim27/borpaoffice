


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FilePlus,
  Search,
  ShieldCheck,
  Zap,
  TriangleAlert,
  PhoneCall,
  House,
  Cable,
  CircleCheck,
  Clock3,
  ClipboardCheck,
  ArrowUp,
  Sparkles,
  Activity,
  CheckCircle2,
  Radio,
  Lightbulb,
  ChevronRight,
} from "lucide-react";

function Home() {
  // ================= SCROLL TO TOP BUTTON =================

  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] overflow-hidden bg-gray-100">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-emerald-600 text-white">

        {/* Animated Background */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute -left-20 -top-20 h-72 w-72 animate-pulse rounded-full bg-green-300/20 blur-3xl" />

          <div
            className="absolute -right-20 top-20 h-80 w-80 animate-pulse rounded-full bg-emerald-200/20 blur-3xl"
            style={{
              animationDelay: "1s",
            }}
          />

          <div
            className="absolute bottom-0 left-1/3 h-64 w-64 animate-pulse rounded-full bg-yellow-200/10 blur-3xl"
            style={{
              animationDelay: "2s",
            }}
          />

        </div>


        {/* Floating Icons */}

        <div className="pointer-events-none absolute inset-0">

          <Zap
            className="absolute left-[8%] top-[25%] animate-bounce text-yellow-300/20"
            size={55}
          />

          <Lightbulb
            className="absolute right-[10%] top-[20%] animate-pulse text-yellow-300/20"
            size={60}
          />

          <Activity
            className="absolute bottom-[18%] left-[15%] animate-pulse text-white/10"
            size={65}
          />

          <Radio
            className="absolute bottom-[15%] right-[15%] animate-bounce text-white/10"
            size={55}
          />

        </div>


        <div className="relative mx-auto max-w-6xl px-4 py-20 text-center md:py-28">

          {/* Small Badge */}

          <div className="mb-5 flex justify-center">

            <div className="inline-flex animate-pulse items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-300" />

              </span>

              Online Complaint Service

            </div>

          </div>


          <p className="mb-3 font-medium text-green-200">
            নারায়ণগঞ্জ পল্লী বিদ্যুৎ সমিতি-১
          </p>


          <h1 className="text-4xl font-black tracking-tight drop-shadow-lg md:text-6xl">

            বরপা সাব-জোনাল অফিস

          </h1>


          <h2 className="mt-4 text-2xl font-bold text-green-100 md:text-3xl">

            Complaint Management System

          </h2>


          <p className="mx-auto mt-6 max-w-2xl text-green-100 leading-8">

            বিদ্যুৎ সংক্রান্ত যেকোনো অভিযোগ সহজে জমা দিন এবং
            Complaint ID ব্যবহার করে আপনার অভিযোগের বর্তমান
            অবস্থা জানতে পারবেন।

          </p>


          {/* Buttons */}

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              to="/complaint"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-green-700 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-green-50 hover:shadow-2xl"
            >

              <FilePlus
                size={20}
                className="transition group-hover:rotate-12"
              />

              অভিযোগ করুন

              <ChevronRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </Link>


            <Link
              to="/status"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 font-bold backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-green-700"
            >

              <Search size={20} />

              অভিযোগের Status দেখুন

            </Link>

          </div>


          {/* Live Status */}

          <div className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-5 py-3 backdrop-blur">

            <div className="flex items-center gap-2">

              <span className="relative flex h-3 w-3">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300" />

                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />

              </span>

              <span className="text-sm font-medium text-green-100">
                System Online
              </span>

            </div>

            <span className="text-white/30">|</span>

            <span className="text-sm text-green-100">
              অভিযোগ গ্রহণ চলছে
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK FEATURES
      ====================================================== */}

      <section className="relative mx-auto max-w-6xl px-4 py-14">

        <div className="mb-10 text-center">

          <div className="mb-3 flex justify-center">

            <Sparkles
              className="animate-pulse text-green-600"
              size={30}
            />

          </div>

          <h2 className="text-3xl font-black text-gray-800">
            আমাদের সেবাসমূহ
          </h2>

          <p className="mt-3 text-gray-500">
            সহজে অভিযোগ করুন, Status দেখুন এবং দ্রুত সমাধান পান।
          </p>

        </div>


        <div className="grid gap-6 md:grid-cols-3">

          <FeatureCard
            icon={<FilePlus size={38} />}
            iconClass="text-green-600"
            bgClass="bg-green-50"
            title="অভিযোগ জমা দিন"
            text="আপনার বিদ্যুৎ সংক্রান্ত সমস্যা অনলাইনে সহজেই জানান।"
          />


          <FeatureCard
            icon={<Search size={38} />}
            iconClass="text-blue-600"
            bgClass="bg-blue-50"
            title="Status Check"
            text="Complaint ID দিয়ে আপনার অভিযোগের বর্তমান অবস্থা দেখুন।"
          />


          <FeatureCard
            icon={<ShieldCheck size={38} />}
            iconClass="text-purple-600"
            bgClass="bg-purple-50"
            title="দ্রুত সমাধান"
            text="অফিস থেকে অভিযোগের Status ও Remarks Update করা যাবে।"
          />

        </div>

      </section>


      {/* =====================================================
          ELECTRIC SAFETY WARNING
      ====================================================== */}

      <section className="mx-auto max-w-6xl px-4 pb-14">

        <div className="overflow-hidden rounded-3xl border border-red-200 bg-red-50 shadow-sm">

          {/* Warning Header */}

          <div className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-500 px-6 py-5 text-white">

            <div className="absolute right-0 top-0 opacity-10">

              <TriangleAlert size={130} />

            </div>

            <div className="relative flex items-center gap-3">

              <div className="animate-pulse">

                <TriangleAlert size={30} />

              </div>

              <div>

                <h2 className="text-xl font-bold">
                  ⚠️ বিদ্যুৎ নিরাপত্তা সতর্কতা
                </h2>

                <p className="mt-1 text-sm text-red-100">
                  বিদ্যুৎ নিয়ে অসতর্কতা জীবন ও সম্পদের জন্য মারাত্মক ঝুঁকিপূর্ণ।
                </p>

              </div>

            </div>

          </div>


          {/* Warning Items */}

          <div className="grid gap-5 p-6 md:grid-cols-2">

            <SafetyItem
              icon={<Zap size={22} />}
              title="ছেঁড়া বা ঝুলন্ত তার থেকে দূরে থাকুন"
              text="ছেঁড়া, ছুটে যাওয়া বা নিচে পড়ে থাকা বৈদ্যুতিক তার কখনো স্পর্শ করবেন না।"
            />


            <SafetyItem
              icon={<Cable size={22} />}
              title="ভেজা হাতে সুইচ ধরবেন না"
              text="ভেজা হাত বা ভেজা অবস্থায় বৈদ্যুতিক সুইচ, সকেট ও যন্ত্রপাতি স্পর্শ করবেন না।"
            />


            <SafetyItem
              icon={<House size={22} />}
              title="বৈদ্যুতিক লাইনের কাছে কাজ নয়"
              text="বৈদ্যুতিক লাইনের কাছাকাছি গাছ কাটা, নির্মাণকাজ বা ধাতব বস্তু ব্যবহার করার সময় বিশেষ সতর্ক থাকুন।"
            />


            <SafetyItem
              icon={<ShieldCheck size={22} />}
              title="নিজে বিদ্যুৎ লাইন মেরামত করবেন না"
              text="লাইন, মিটার, সার্ভিস তার বা বৈদ্যুতিক সরঞ্জামের ত্রুটি হলে প্রশিক্ষিত ব্যক্তি বা সংশ্লিষ্ট অফিসে যোগাযোগ করুন।"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          SAFETY TIPS
      ====================================================== */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-6xl px-4">

          <div className="mb-11 text-center">

            <div className="mb-3 flex justify-center">

              <ShieldCheck
                className="animate-pulse text-green-600"
                size={45}
              />

            </div>

            <h2 className="text-3xl font-black text-gray-800">
              বিদ্যুৎ দুর্ঘটনা থেকে নিরাপদ থাকার পরামর্শ
            </h2>

            <p className="mt-3 text-gray-500">
              আপনার পরিবার ও আশপাশের মানুষের নিরাপত্তার জন্য নিচের নিয়মগুলো মেনে চলুন।
            </p>

          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            <SafetyCard
              number="01"
              title="বিদ্যুৎ লাইনে হাত দেবেন না"
              text="বিদ্যুৎ চলে গেছে মনে হলেও ছেঁড়া বা পড়ে থাকা তারে হাত দেবেন না।"
            />

            <SafetyCard
              number="02"
              title="বজ্রপাতের সময় সতর্ক থাকুন"
              text="বজ্রপাতের সময় খোলা জায়গা, বৈদ্যুতিক খুঁটি ও গাছের নিচে অবস্থান করবেন না।"
            />

            <SafetyCard
              number="03"
              title="পানির কাছ থেকে দূরে রাখুন"
              text="বৈদ্যুতিক যন্ত্রপাতি ও মাল্টিপ্লাগ পানি থেকে নিরাপদ দূরত্বে রাখুন।"
            />

            <SafetyCard
              number="04"
              title="ওভারলোড করবেন না"
              text="একটি সকেট বা মাল্টিপ্লাগে অতিরিক্ত বৈদ্যুতিক যন্ত্র সংযোগ করবেন না।"
            />

            <SafetyCard
              number="05"
              title="শিশুদের নিরাপদ রাখুন"
              text="শিশুদের সকেট, সুইচবোর্ড ও বৈদ্যুতিক তার থেকে দূরে রাখুন।"
            />

            <SafetyCard
              number="06"
              title="ত্রুটি হলে দ্রুত জানান"
              text="বৈদ্যুতিক লাইনে সমস্যা দেখা দিলে দ্রুত সংশ্লিষ্ট অফিসে অভিযোগ করুন।"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          EMERGENCY SECTION
      ====================================================== */}

      <section className="mx-auto max-w-6xl px-4 py-16">

        <div className="relative overflow-hidden rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-sm md:p-8">

          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />

          <div className="relative flex flex-col items-start gap-5 md:flex-row">

            <div className="rounded-2xl bg-yellow-100 p-4 shadow-sm">

              <PhoneCall
                className="animate-pulse text-yellow-700"
                size={35}
              />

            </div>


            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                জরুরি বৈদ্যুতিক সমস্যায় করণীয়
              </h2>

              <p className="mt-2 leading-7 text-gray-600">
                বৈদ্যুতিক তার ছিঁড়ে যাওয়া, খুঁটি ক্ষতিগ্রস্ত হওয়া,
                ট্রান্সফরমারে সমস্যা বা অন্য কোনো বিপজ্জনক
                পরিস্থিতি দেখতে পেলে নিরাপদ দূরত্ব বজায় রাখুন
                এবং সংশ্লিষ্ট বিদ্যুৎ অফিসে দ্রুত অভিযোগ জানান।
              </p>


              <Link
                to="/complaint"
                className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-lg"
              >

                <PhoneCall
                  size={19}
                  className="transition group-hover:rotate-12"
                />

                জরুরি অভিযোগ করুন

                <ChevronRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMPLAINT PROCESS
      ====================================================== */}

      <section className="bg-gray-50 py-16">

        <div className="mx-auto max-w-6xl px-4">

          <div className="mb-11 text-center">

            <h2 className="text-3xl font-black text-gray-800">
              অভিযোগ ব্যবস্থাপনা কীভাবে কাজ করে?
            </h2>

            <p className="mt-3 text-gray-500">
              মাত্র কয়েকটি ধাপে আপনার অভিযোগ জমা ও অনুসরণ করুন।
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-4">

            <ProcessCard
              number="01"
              icon={<FilePlus size={30} />}
              title="অভিযোগ জমা"
              text="অনলাইনে অভিযোগের তথ্য প্রদান করুন।"
            />


            <ProcessCard
              number="02"
              icon={<ClipboardCheck size={30} />}
              title="Complaint ID"
              text="আপনার অভিযোগের জন্য একটি ID তৈরি হবে।"
            />


            <ProcessCard
              number="03"
              icon={<Clock3 size={30} />}
              title="Status Update"
              text="অভিযোগের কাজের অগ্রগতি আপডেট করা হবে।"
            />


            <ProcessCard
              number="04"
              icon={<CircleCheck size={30} />}
              title="সমাধান"
              text="সমাধান হলে অভিযোগের Status আপডেট হবে।"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          LIVE SYSTEM CTA
      ====================================================== */}

      <section className="bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 text-white">

        <div className="mx-auto max-w-5xl px-4 py-16 text-center">

          <div className="mb-5 flex justify-center">

            <div className="rounded-full bg-white/10 p-4 backdrop-blur">

              <Activity
                size={40}
                className="animate-pulse"
              />

            </div>

          </div>


          <h2 className="text-3xl font-black md:text-4xl">
            আপনার সমস্যার কথা আমাদের জানান
          </h2>


          <p className="mx-auto mt-4 max-w-2xl text-green-100">
            বিদ্যুৎ সংক্রান্ত যেকোনো সমস্যা হলে অভিযোগ করুন।
            আপনার Complaint ID সংরক্ষণ করুন এবং পরবর্তীতে Status Check করুন।
          </p>


          <Link
            to="/complaint"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-green-700 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-green-50 hover:shadow-2xl"
          >

            <FilePlus
              size={20}
              className="transition group-hover:rotate-12"
            />

            অভিযোগ জমা দিন

            <ChevronRight
              size={18}
              className="transition group-hover:translate-x-1"
            />

          </Link>

        </div>

      </section>


      {/* =====================================================
          SCROLL TO TOP BUTTON
      ====================================================== */}

      {showTopButton && (

        <button
          onClick={scrollToTop}
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-green-600
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:scale-110
            hover:bg-green-700
            focus:outline-none
            focus:ring-4
            focus:ring-green-200
          "
          title="উপরে যান"
          aria-label="উপরে যান"
        >

          <ArrowUp
            size={24}
            className="transition-transform duration-300 group-hover:-translate-y-1"
          />

        </button>

      )}

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  iconClass,
  bgClass,
  title,
  text,
}) {

  return (

    <div className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">

      <div
        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${bgClass} ${iconClass} transition duration-500 group-hover:rotate-6 group-hover:scale-110`}
      >
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-800">
        {title}
      </h3>

      <p className="mt-2 leading-6 text-gray-500">
        {text}
      </p>

      <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-green-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        বিস্তারিত
        <ChevronRight size={16} />
      </div>

    </div>

  );
}


/* =========================================================
   SAFETY ITEM COMPONENT
========================================================= */

function SafetyItem({
  icon,
  title,
  text,
}) {

  return (

    <div className="group flex gap-4 rounded-2xl border border-red-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md">

      <div className="mt-1 text-red-600 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>

      <div>

        <h3 className="font-bold text-gray-800">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {text}
        </p>

      </div>

    </div>

  );
}


/* =========================================================
   SAFETY CARD COMPONENT
========================================================= */

function SafetyCard({
  number,
  title,
  text,
}) {

  return (

    <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl">

      <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700 transition duration-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white">

        {number}

      </div>

      <h3 className="text-lg font-bold text-gray-800">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {text}
      </p>

    </div>

  );
}


/* =========================================================
   PROCESS CARD COMPONENT
========================================================= */

function ProcessCard({
  number,
  icon,
  title,
  text,
}) {

  return (

    <div className="group relative rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">

      {/* Number */}

      <div className="absolute right-4 top-4 text-xs font-black text-gray-200">
        {number}
      </div>


      {/* Icon */}

      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white">

        {icon}

      </div>


      <h3 className="text-lg font-bold text-gray-800">
        {title}
      </h3>


      <p className="mt-2 text-sm leading-6 text-gray-500">
        {text}
      </p>


      <div className="mx-auto mt-5 h-1 w-0 rounded-full bg-green-500 transition-all duration-500 group-hover:w-12" />

    </div>

  );
}


export default Home;

