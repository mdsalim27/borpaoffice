

import React, { useState } from "react";
import {
Gauge,
Zap,
Wallet,
CreditCard,
AlertTriangle,
Search,
BatteryCharging,
Smartphone,
Lightbulb,
ShieldCheck,
ChevronDown,
Copy,
Check,
ArrowRight,
CircleHelp,
RefreshCw,
Power,
Activity,
Calculator,
} from "lucide-react";

const PrepaidMeterHelp = () => {
const [search, setSearch] = useState("");
const [copiedCode, setCopiedCode] = useState("");
const [openFaq, setOpenFaq] = useState(null);

// =========================================================
// METER IMAGE
// পরে আপনার নিজের prepaid meter image এখানে বসাতে পারবেন
// =========================================================

const meterImage = "";

// =========================================================
// PREPAID METER CODES
// =========================================================

const meterCodes = [
{
code: "00",
title: "বর্তমান ব্যালেন্স",
description:
"মিটারে বর্তমানে কত টাকা/ব্যালেন্স আছে তা দেখার জন্য ব্যবহার করা হয়।",
icon: <Wallet size={22} />,
color: "green",
},
{
code: "01",
title: "মিটার নম্বর",
description:
"মিটারের Serial Number বা Meter Number দেখার জন্য ব্যবহার করা হয়।",
icon: <Gauge size={22} />,
color: "green",
},
{
code: "02",
title: "বর্তমান ব্যবহার",
description:
"বর্তমানে বিদ্যুৎ ব্যবহারের পরিমাণ বা Consumption তথ্য দেখার জন্য ব্যবহৃত হয়।",
icon: <Activity size={22} />,
color: "green",
},
{
code: "03",
title: "বর্তমান লোড",
description:
"মিটারে বর্তমানে কত লোড ব্যবহার হচ্ছে তা বোঝার জন্য ব্যবহার করা হয়।",
icon: <Zap size={22} />,
color: "green",
},
{
code: "04",
title: "ভোল্টেজ",
description:
"বর্তমানে মিটারে কত Voltage আছে তা দেখার জন্য ব্যবহার করা হয়।",
icon: <Power size={22} />,
color: "green",
},
{
code: "05",
title: "কারেন্ট",
description:
"মিটারে বর্তমানে কত Ampere Current প্রবাহিত হচ্ছে তা দেখার জন্য ব্যবহৃত হয়।",
icon: <BatteryCharging size={22} />,
color: "green",
},
{
code: "06",
title: "Power Factor",
description:
"বর্তমান Power Factor সম্পর্কিত তথ্য দেখার জন্য ব্যবহার করা হয়।",
icon: <Calculator size={22} />,
color: "green",
},
{
code: "07",
title: "Tariff / Rate",
description:
"বিদ্যুৎ ব্যবহারের Tariff বা Rate সম্পর্কিত তথ্য দেখার জন্য ব্যবহার করা হয়।",
icon: <CreditCard size={22} />,
color: "green",
},
];

// =========================================================
// BPMC SMART PREPAID METER
// Information based on the provided BPMC meter reference image
// =========================================================

const bpmcMeterStatus = [
  {
    event: "No Event",
    bangla: "কোনো সমস্যা নেই",
    code: "0000 0000",
    prompt: "—",
    icon: <Check size={22} />,
    type: "normal",
  },
  {
    event: "Meter Cover Open",
    bangla: "মিটারের কভার খোলা",
    code: "0000 0001",
    prompt: "Event 01",
    icon: <AlertTriangle size={22} />,
  },
  {
    event: "Terminal Cover Open",
    bangla: "টার্মিনাল কভার খোলা",
    code: "0000 0002",
    prompt: "Event 02",
    icon: <AlertTriangle size={22} />,
  },
  {
    event: "Overload",
    bangla: "অতিরিক্ত লোড",
    code: "0000 0004",
    prompt: "Event 03",
    icon: <Zap size={22} />,
  },
  {
    event: "Over Voltage",
    bangla: "অতিরিক্ত ভোল্টেজ",
    code: "0000 0008",
    prompt: "Event 04",
    icon: <Zap size={22} />,
  },
  {
    event: "Under Voltage",
    bangla: "কম ভোল্টেজ",
    code: "0000 0010",
    prompt: "Event 05",
    icon: <Zap size={22} />,
  },
  {
    event: "Over-current",
    bangla: "অতিরিক্ত কারেন্ট",
    code: "0000 0100",
    prompt: "Event 09",
    icon: <Activity size={22} />,
  },
  {
    event: "Reversal",
    bangla: "বিদ্যুৎ প্রবাহের বিপরীতমুখী অবস্থা",
    code: "0000 2000",
    prompt: "Event 14",
    icon: <RefreshCw size={22} />,
  },
  {
    event: "Low Battery Voltage",
    bangla: "ব্যাটারির ভোল্টেজ কম",
    code: "0002 0000",
    prompt: "Event 18",
    icon: <BatteryCharging size={22} />,
  },
  {
    event: "Magnetic Field Interference",
    bangla: "চৌম্বক ক্ষেত্রের হস্তক্ষেপ",
    code: "0004 0000",
    prompt: "Event 19",
    icon: <AlertTriangle size={22} />,
  },
  {
    event: "Bypass",
    bangla: "বাইপাস",
    code: "0040 0000",
    prompt: "Event 23",
    icon: <ShieldCheck size={22} />,
  },
  {
    event: "Module Cover Open",
    bangla: "মডিউল কভার খোলা",
    code: "0080 0000",
    prompt: "Event 24",
    icon: <AlertTriangle size={22} />,
  },
  {
    event: "Battery Removed",
    bangla: "ব্যাটারি খুলে ফেলা হয়েছে",
    code: "0100 0000",
    prompt: "Event 25",
    icon: <BatteryCharging size={22} />,
  },
  {
    event: "Warning of Balance",
    bangla: "ব্যালেন্স কমে যাওয়ার সতর্কতা",
    code: "8000 0000",
    prompt: "Event 32",
    icon: <Wallet size={22} />,
  },
];

const bpmcShortCodes = [
  {
    code: "00/9999",
    english: "Emergency Balance",
    bangla: "জরুরি ব্যালেন্স",
    icon: <Wallet size={22} />,
  },
  {
    code: "801/37",
    english: "Remaining Balance (Tk)",
    bangla: "অবশিষ্ট ব্যালেন্স (টাকা)",
    icon: <CreditCard size={22} />,
  },
  {
    code: "800/81",
    english: "Cumulative Active Energy (kWh)",
    bangla: "সর্বমোট ব্যবহৃত সক্রিয় বিদ্যুৎ শক্তি (kWh)",
    icon: <Activity size={22} />,
  },
  {
    code: "814/400",
    english: "Total Forward Active Energy for Current Month",
    bangla: "চলতি মাসের মোট Forward Active Energy",
    icon: <Zap size={22} />,
  },
  {
    code: "806/08",
    english: "Reason of Relay Operation",
    bangla: "রিলে অপারেশনের কারণ",
    icon: <Power size={22} />,
  },
  {
    code: "830",
    english: "Token of Last Time Recharge",
    bangla: "সর্বশেষ রিচার্জের Token",
    icon: <CreditCard size={22} />,
  },
  {
    code: "810/39",
    english: "Emergency Credit Limit",
    bangla: "জরুরি ক্রেডিট সীমা",
    icon: <Wallet size={22} />,
  },
  {
    code: "886/19",
    english: "Price of Current Tariff",
    bangla: "বর্তমান Tariff-এর মূল্য",
    icon: <CreditCard size={22} />,
  },
  {
    code: "808/60",
    english: "Total Instantaneous Power (kW)",
    bangla: "বর্তমান তাৎক্ষণিক মোট Power (kW)",
    icon: <Zap size={22} />,
  },
  {
    code: "869/12",
    english: "Sanction Load Limit (kW)",
    bangla: "অনুমোদিত Load Limit (kW)",
    icon: <Gauge size={22} />,
  },
  {
    code: "802/803",
    english: "Current Date & Time",
    bangla: "বর্তমান তারিখ ও সময়",
    icon: <Activity size={22} />,
  },
  {
    code: "922/13",
    english: "Consumption Amount of Current Month",
    bangla: "চলতি মাসের বিদ্যুৎ ব্যবহারের পরিমাণ",
    icon: <Calculator size={22} />,
  },
  {
    code: "870/52",
    english: "Voltage",
    bangla: "ভোল্টেজ",
    icon: <Power size={22} />,
  },
  {
    code: "874/55",
    english: "Current",
    bangla: "কারেন্ট",
    icon: <Activity size={22} />,
  },
];

// =========================================================
// COMMON PROBLEMS
// =========================================================

const problems = [
{
title: "মিটারে টাকা দেখাচ্ছে না",
icon: <Wallet size={25} />,
solution:
"মিটারের Display বা keypad পরীক্ষা করুন। ব্যালেন্স দেখার জন্য নির্ধারিত কোড ব্যবহার করুন। Display সম্পূর্ণ বন্ধ থাকলে মিটারের সংযোগ ও বিদ্যুৎ সরবরাহ পরীক্ষা করুন।",
},
{
title: "রিচার্জ করার পর টাকা আসেনি",
icon: <RefreshCw size={25} />,
solution:
"Token সঠিকভাবে Enter হয়েছে কিনা পরীক্ষা করুন। Token গ্রহণ না করলে Token Number, Meter Number এবং Recharge তথ্য যাচাই করুন।",
},
{
title: "মিটার Token নিচ্ছে না",
icon: <AlertTriangle size={25} />,
solution:
"Token-এর প্রতিটি Digit সঠিকভাবে Enter করুন। ভুল Meter-এর Token ব্যবহার করা হয়েছে কিনা যাচাই করুন। বারবার ব্যর্থ হলে অফিসে যোগাযোগ করুন।",
},
{
title: "মিটার বারবার ট্রিপ করছে",
icon: <Power size={25} />,
solution:
"একসাথে অতিরিক্ত লোড ব্যবহার করলে মিটার Trip করতে পারে। বড় Load যেমন Heater, Iron, Pump ইত্যাদি সাময়িক বন্ধ করে পুনরায় পরীক্ষা করুন।",
},
{
title: "লো ভোল্টেজ",
icon: <Zap size={25} />,
solution:
"বাড়ির একাধিক যন্ত্রে একই সমস্যা হলে Supply Voltage কম থাকতে পারে। স্থানীয় বিদ্যুৎ অফিসে অভিযোগ করুন।",
},
{
title: "মিটার Display অন্ধকার",
icon: <Lightbulb size={25} />,
solution:
"মিটারে Supply আছে কিনা পরীক্ষা করুন। MCB/Breaker পরীক্ষা করুন। সমস্যা থাকলে নিজে মিটার খুলবেন না।",
},
];

// =========================================================
// FAQ
// =========================================================

const faqs = [
{
question: "Prepaid Meter কী?",
answer:
"Prepaid Meter হলো এমন একটি বিদ্যুৎ মিটার যেখানে আগে টাকা রিচার্জ করে তারপর বিদ্যুৎ ব্যবহার করা হয়। রিচার্জ করা ব্যালেন্স অনুযায়ী বিদ্যুৎ ব্যবহার করা যায়।",
},
{
question: "মিটারে টাকা কীভাবে দেখব?",
answer:
"আপনার মিটারের নির্ধারিত Balance Code ব্যবহার করে Display-তে বর্তমান Balance দেখা যায়। বিভিন্ন Meter Model-এ Code ভিন্ন হতে পারে।",
},
{
question: "Emergency Balance কী?",
answer:
"মূল ব্যালেন্স শেষ হয়ে গেলে কিছু মিটারে নির্ধারিত শর্তে Emergency Credit সুবিধা পাওয়া যেতে পারে। এর Code ও Limit মিটার/Utility অনুযায়ী আলাদা হতে পারে।",
},
{
question: "মিটারে Load কীভাবে দেখব?",
answer:
"মিটারের Model অনুযায়ী Load/Power সম্পর্কিত Code ব্যবহার করে বর্তমান ব্যবহার দেখার সুবিধা থাকতে পারে। আপনার Meter-এর নির্দিষ্ট Code ব্যবহার করুন।",
},
{
question: "রিচার্জ করার পর Token কোথায় দেব?",
answer:
"Recharge করার পর পাওয়া Token মিটারের Keypad-এ Enter করতে হয়। Token গ্রহণ হলে সাধারণত মিটারের Display-তে confirmation বা updated balance দেখা যায়।",
},
{
question: "মিটারে Error দেখালে কী করব?",
answer:
"প্রথমে Error Code লিখে রাখুন। মিটার খুলবেন না বা কোনো তারে হাত দেবেন না। Error Code সহ বিদ্যুৎ অফিস/অভিযোগ কেন্দ্রে যোগাযোগ করুন।",
},
];

// =========================================================
// COPY CODE
// =========================================================

const copyCode = (code) => {
navigator.clipboard.writeText(code);
setCopiedCode(code);


setTimeout(() => {
  setCopiedCode("");
}, 1500);


};

// =========================================================
// FILTER
// =========================================================

const filteredCodes = meterCodes.filter((item) => {
const text =
`${item.code} ${item.title} ${item.description}`.toLowerCase();


return text.includes(search.toLowerCase());


});

return ( <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-800">

  {/* =====================================================
      HERO
  ====================================================== */}

  <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-teal-500">

    {/* Animated Background */}

    <div className="absolute -left-20 top-10 h-72 w-72 animate-pulse rounded-full bg-white/10 blur-3xl" />

    <div className="absolute -right-20 bottom-0 h-80 w-80 animate-pulse rounded-full bg-green-950/10 blur-3xl" />

    <div className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 animate-bounce rounded-full bg-white/5 blur-2xl" />

    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">

      <div className="grid items-center gap-10 lg:grid-cols-2">

        {/* Hero Text */}

        <div className="text-white">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-bold shadow-lg backdrop-blur-md">
            <Gauge size={18} className="animate-pulse" />
            Prepaid Meter Help BD
          </div>

          <h1 className="max-w-2xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Prepaid Meter

            <span className="mt-2 block text-green-100">
              সহজে বুঝুন, নিরাপদে ব্যবহার করুন
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-green-50 sm:text-base sm:leading-8">
            Prepaid Meter-এর ব্যালেন্স, রিচার্জ, Token, Emergency
            Balance, Load, Voltage, Current এবং বিভিন্ন সমস্যা সম্পর্কে
            সহজ বাংলায় প্রয়োজনীয় তথ্য।
          </p>

          <div className="mt-7 flex flex-wrap gap-3">

            <a
              href="#meter-codes"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-green-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Meter Codes দেখুন

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#problems"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
            >
              <CircleHelp size={18} />
              সমস্যা সমাধান
            </a>

          </div>

          {/* Hero Stats */}

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">

            <div className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur-md">
              <p className="text-2xl font-black">
                24/7
              </p>

              <p className="mt-1 text-[11px] text-green-50">
                Help Guide
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur-md">
              <p className="text-2xl font-black">
                Easy
              </p>

              <p className="mt-1 text-[11px] text-green-50">
                Bangla Guide
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur-md">
              <p className="text-2xl font-black">
                Safe
              </p>

              <p className="mt-1 text-[11px] text-green-50">
                Usage Tips
              </p>
            </div>

          </div>
        </div>

        {/* Meter Image Area */}

        <div className="relative flex justify-center">

          <div className="absolute h-72 w-72 animate-pulse rounded-full bg-white/20 blur-3xl" />

          <div className="relative w-full max-w-md">

            <div className="rounded-[2rem] border border-white/30 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">

              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white/20">

                {meterImage ? (
                  <img
                    src={meterImage}
                    alt="Prepaid Meter"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-white">

                    <div className="mx-auto mb-5 flex h-28 w-28 animate-pulse items-center justify-center rounded-3xl bg-white/20 shadow-xl">

                      <Gauge
                        size={70}
                        strokeWidth={1.5}
                        className="animate-[spin_8s_linear_infinite]"
                      />

                    </div>

                    <p className="text-lg font-black">
                      Prepaid Meter Image
                    </p>

                    <p className="mt-2 text-sm text-green-50">
                      এখানে আপনার Meter-এর ছবি যোগ করুন
                    </p>

                  </div>
                )}

              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-black/10 px-4 py-3 text-white">

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-300" />

                  <span className="text-sm font-bold">
                    Meter Help Center
                  </span>

                </div>

                <Gauge size={19} />

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  {/* =====================================================
      QUICK HELP CARDS
  ====================================================== */}

  <section className="relative mx-auto -mt-7 max-w-6xl px-4 sm:px-6 lg:px-8">

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {[
        {
          icon: <Wallet />,
          title: "Balance",
          text: "মিটারে কত টাকা আছে দেখুন",
          color: "green",
        },
        {
          icon: <CreditCard />,
          title: "Recharge",
          text: "Token ও রিচার্জ সহায়তা",
          color: "green",
        },
        {
          icon: <Zap />,
          title: "Load",
          text: "বর্তমান Load সম্পর্কে জানুন",
          color: "green",
        },
        {
          icon: <AlertTriangle />,
          title: "Problem",
          text: "সমস্যার কারণ ও সমাধান",
          color: "green",
        },
      ].map((item, index) => (

        <a
          key={index}
          href={
            index === 3
              ? "#problems"
              : index === 1
              ? "#recharge"
              : "#meter-codes"
          }
          className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
        >

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">

            {item.icon}

          </div>

          <h3 className="font-black text-slate-800">
            {item.title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {item.text}
          </p>

        </a>

      ))}

    </div>

  </section>

  {/* =====================================================
      METER CODES
  ====================================================== */}

  
  <section
    id="recharge"
    className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
  >

    <div className="mb-10 text-center">

      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
        <CreditCard size={14} />
        RECHARGE GUIDE
      </span>

      <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
        Prepaid Meter Recharge করার নিয়ম
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
        Recharge করার পর Token পাওয়া গেলে সেটি সঠিকভাবে Meter-এ Enter
        করতে হবে।
      </p>

    </div>

    <div className="grid gap-5 md:grid-cols-3">

      {[
        {
          number: "01",
          title: "Recharge করুন",
          text: "আপনার Meter Number ব্যবহার করে অনুমোদিত মাধ্যমে Recharge করুন।",
          icon: <CreditCard />,
        },
        {
          number: "02",
          title: "Token সংগ্রহ করুন",
          text: "Recharge সফল হলে Token Number সংরক্ষণ করুন।",
          icon: <Smartphone />,
        },
        {
          number: "03",
          title: "Meter-এ Token দিন",
          text: "Meter Keypad-এ Token Enter করে Confirm করুন।",
          icon: <Gauge />,
        },
      ].map((item) => (

        <div
          key={item.number}
          className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
        >

          <span className="absolute right-4 top-3 text-5xl font-black text-slate-50 transition-colors group-hover:text-green-50">
            {item.number}
          </span>

          <div className="relative">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
              {item.icon}
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-800">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {item.text}
            </p>

          </div>

        </div>

      ))}

    </div>

  </section>

  {/* =====================================================
      BPMC SMART PREPAID METER
  ====================================================== */}

  <section
    id="bpmc-smart-meter"
    className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-green-50 py-16"
  >
    <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />
    <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-black text-green-700">
          <Gauge size={15} />
          BPMC SMART PREPAID METER
        </span>

        <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          BPMC Smart Prepaid Meter
        </h2>

        <p className="mt-3 text-lg font-bold text-green-700">
          স্মার্ট প্রিপেইড মিটারের গুরুত্বপূর্ণ Code ও Status
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500">
          BPMC Smart Prepaid Meter-এর Event Code, Meter Status,
          Balance, Token, Voltage, Current, Load এবং অন্যান্য গুরুত্বপূর্ণ
          Short Code সহজে জানুন।
        </p>
      </div>

      {/* Status instruction */}
      <div className="mb-12 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-2xl sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-500/20 text-green-300">
              <Gauge size={30} />
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-green-400">
                Meter Status Indication
              </p>

              <h3 className="mt-1 text-xl font-black sm:text-2xl">
                Meter Status কীভাবে দেখবেন?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                মিটারের Status/Event দেখার জন্য প্রথমে
                <span className="font-black text-white"> 08 </span>
                চাপুন এবং তারপর
                <span className="font-black text-green-300">
                  {" "}Blue (OK/Enter) Button
                </span>
                চাপুন।
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-green-400/20 bg-green-500/10 px-6 py-4 text-center">
            <p className="text-xs font-bold text-green-300">
              STATUS CODE
            </p>
            <p className="mt-1 font-mono text-3xl font-black tracking-widest text-white">
              08
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Press → Blue OK/Enter
            </p>
          </div>
        </div>
      </div>

      {/* Event codes */}
      <div className="mb-14">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-black tracking-widest text-green-600">
              METER STATUS
            </span>
            <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Meter Event Code
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              মিটারে কোন Event/Status দেখা যাচ্ছে তা Code দিয়ে বুঝুন।
            </p>
          </div>

          <div className="rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500">
            Total Events: {bpmcMeterStatus.length}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bpmcMeterStatus.map((item, index) => (
            <div
              key={item.code}
              className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                item.type === "normal"
                  ? "border-green-200"
                  : "border-slate-100"
              }`}
            >
              <span className="absolute right-4 top-3 text-5xl font-black text-slate-50 transition-colors group-hover:text-green-50">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    item.type === "normal"
                      ? "bg-green-100 text-green-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {item.icon}
                </div>

                <h4 className="mt-5 text-base font-black text-slate-800">
                  {item.event}
                </h4>

                <p className="mt-1 text-sm font-bold text-green-700">
                  {item.bangla}
                </p>

                <div className="mt-4 rounded-xl bg-slate-900 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Event Code
                  </p>
                  <p className="mt-1 font-mono text-lg font-black tracking-widest text-white">
                    {item.code}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">
                    Prompt
                  </span>
                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-black ${
                      item.type === "normal"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {item.prompt}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Short codes */}
      <div>
        <div className="mb-7 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
            <Calculator size={14} />
            BASIC SHORT CODE FOR SPPM
          </span>

          <h3 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
            Basic Short Code for SPPM
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Smart Prepaid Meter-এর গুরুত্বপূর্ণ Short Code
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bpmcShortCodes.map((item, index) => (
            <div
              key={item.code}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl"
            >
              <span className="absolute right-3 top-2 text-5xl font-black text-slate-50 group-hover:text-green-50">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>

                  <span className="rounded-lg bg-slate-900 px-3 py-2 font-mono text-sm font-black tracking-wider text-white">
                    {item.code}
                  </span>
                </div>

                <h4 className="mt-5 text-sm font-black leading-6 text-slate-800">
                  {item.english}
                </h4>

                <p className="mt-2 text-sm font-bold leading-6 text-green-700">
                  {item.bangla}
                </p>

                <div className="mt-4 h-px bg-slate-100" />

                <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  SPPM Short Code
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important note */}
      <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle
            size={22}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <h4 className="font-black text-amber-800">
              Important Note / গুরুত্বপূর্ণ তথ্য
            </h4>
            <p className="mt-1 text-sm leading-7 text-amber-700">
              উপরের Code ও Event তথ্য আপনার দেওয়া BPMC Smart Prepaid Meter
              reference image অনুযায়ী দেওয়া হয়েছে। Meter model বা
              configuration অনুযায়ী কিছু Code-এর ব্যবহার ভিন্ন হতে পারে।
              মিটার খোলা, wiring পরিবর্তন বা electrical কাজ নিজে করবেন না।
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* =====================================================
      PROBLEMS
  ====================================================== */}

  <section
    id="problems"
    className="bg-slate-900 py-16 text-white"
  >

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <div className="mb-10">

        <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-black text-red-300">
          <AlertTriangle size={14} />
          COMMON PROBLEMS
        </span>

        <h2 className="mt-4 text-3xl font-black sm:text-4xl">
          Prepaid Meter-এর সমস্যা ও সমাধান
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          সাধারণ সমস্যাগুলো আগে বুঝে নিন। বৈদ্যুতিক ঝুঁকি থাকলে নিজে
          মিটার/তার খুলবেন না।
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {problems.map((problem, index) => (

          <div
            key={index}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-green-400/30 hover:bg-white/10"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              {problem.icon}
            </div>

            <h3 className="mt-5 text-lg font-black">
              {problem.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {problem.solution}
            </p>

          </div>

        ))}

      </div>

    </div>

  </section>

  {/* =====================================================
      SAFETY WARNING
  ====================================================== */}

  <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 to-emerald-600 p-7 text-white shadow-2xl sm:p-10">

      <div className="absolute -right-10 -top-10 h-48 w-48 animate-pulse rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col items-start gap-5 md:flex-row md:items-center">

        <div className="flex h-16 w-16 shrink-0 animate-pulse items-center justify-center rounded-2xl bg-white/15">
          <ShieldCheck size={34} />
        </div>

        <div>

          <h2 className="text-2xl font-black">
            নিরাপত্তা সবার আগে
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-green-50">
            Prepaid Meter, Service Cable, MCB বা বৈদ্যুতিক সংযোগ নিজে
            খুলবেন না। Spark, Burning Smell, exposed wire বা বড় ধরনের
            electrical fault দেখা দিলে নিরাপদ দূরত্বে থাকুন এবং দ্রুত
            সংশ্লিষ্ট বিদ্যুৎ অফিসে যোগাযোগ করুন।
          </p>

        </div>

      </div>

    </div>

  </section>

  {/* =====================================================
      FAQ
  ====================================================== */}

  <section className="bg-white py-16">

    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

      <div className="mb-10 text-center">

        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-black text-green-700">
          <CircleHelp size={14} />
          FAQ
        </span>

        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
          সাধারণ প্রশ্ন ও উত্তর
        </h2>

      </div>

      <div className="space-y-3">

        {faqs.map((faq, index) => {

          const isOpen = openFaq === index;

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-green-200 bg-green-50 shadow-md"
                  : "border-slate-100 bg-slate-50"
              }`}
            >

              <button
                onClick={() =>
                  setOpenFaq(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >

                <span className="font-black text-slate-800">
                  {faq.question}
                </span>

                <ChevronDown
                  size={20}
                  className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                    isOpen
                      ? "rotate-180 text-green-600"
                      : ""
                  }`}
                />

              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >

                <div className="overflow-hidden">

                  <p className="border-t border-green-100 px-5 pb-5 pt-4 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>

  </section>

  {/* =====================================================
      FINAL CTA
  ====================================================== */}

  <section className="bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 py-14 text-white">

    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

      <div className="mx-auto flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-white/15">
        <Zap size={32} />
      </div>

      <h2 className="mt-5 text-3xl font-black sm:text-4xl">
        বিদ্যুৎ সমস্যা হলে ভয় নয়
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-green-50">
        প্রথমে সমস্যাটি বুঝুন, নিরাপদ থাকুন এবং প্রয়োজন হলে বরপা
        সাব-জোনাল অফিসে অভিযোগ করুন।
      </p>

      <a
        href="/complaint"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-black text-green-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        অভিযোগ করুন
        <ArrowRight size={18} />
      </a>

    </div>

  </section>

  {/* =====================================================
      CUSTOM ANIMATION
  ====================================================== */}

  <style>{`
    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>

</div>


);
};

export default PrepaidMeterHelp;
