

import { useState } from "react";

import {
  User,
  Phone,
  FileText,
  MapPin,
  AlertTriangle,
  Send,
  CheckCircle,
  Hash,
  RotateCcw,
  Zap,
  ShieldAlert,
  ChevronDown,
  Sparkles,
  Radio,
  CircleDot,
  Activity
} from "lucide-react";


// =====================================================
// GOOGLE APPS SCRIPT API
// =====================================================

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;


// =====================================================
// COMPLAINT TYPES
// =====================================================

const complaintTypes = [
    "সংযোগ বিচ্ছিন্ন",
  "লোড বৃদ্ধি",
  "বিল সংক্রান্ত",
  "লো ব্যাটারি",
  "বাটন নষ্ট",
  "ব্যাটারি কভার ওপেন",
  "টার্মিনাল কভার ওপেন",
  "সার্ভিস তার ছিড়ে গিয়েছে",
  "মিটারে আগুন লেগেছে",
  "ট্রান্সফরমারের আওতায় বিদ্যুৎ নেই",
  "ট্রান্সফরমারের ফিউজ পোড়া",
  "পুল টু পুল তার ছিড়ে গিয়েছে",
  "বিদ্যুৎ নেই",
  "লো ভোল্টেজ",
  "হাই ভোল্টেজ",
  "মিটার সমস্যা",
  "প্রিপেইড মিটার",
  "মিটার রিচার্জ সমস্যা",
  "মিটার ডিসপ্লে সমস্যা",
  "সার্ভিস ড্রপ সমস্যা",
  "খুঁটি সমস্যা",
  "লাইন সমস্যা",
  "তার ছিঁড়ে গেছে",
  "ট্রান্সফরমার সমস্যা",
  "স্পার্কিং / আগুন",
  "শর্ট সার্কিট",
  "রাস্তার বাতি",
  "নতুন সংযোগ",

  "অন্যান্য"
];


// =====================================================
// GENERATE COMPLAINT ID
// =====================================================

const generateComplaintId = () => {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  const random = Math.floor(
    1000 + Math.random() * 9000
  );

  return `BPO-${year}${month}${day}-${random}`;
};


// =====================================================
// COMPONENT
// =====================================================

export default function ComplaintForm() {

  // ===================================================
  // FORM DATA
  // ===================================================

  const [formData, setFormData] = useState({
    name: "",
    fatherHusbandName: "",
    mobile: "",
    consumerNo: "",
    address: "",
    type: "",
    details: ""
  });


  // ===================================================
  // STATES
  // ===================================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [complaintId, setComplaintId] =
    useState("");


  // ===================================================
  // HANDLE CHANGE
  // ===================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;


    // =================================================
    // MOBILE NUMBER
    // ONLY DIGITS + MAX 11
    // =================================================

    if (name === "mobile") {

      const onlyDigits =
        value
          .replace(/\D/g, "")
          .slice(0, 11);


      setFormData((prev) => ({
        ...prev,
        mobile: onlyDigits
      }));


      return;
    }


    // =================================================
    // OTHER INPUTS
    // =================================================

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // ===================================================
  // HANDLE SUBMIT
  // ===================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // -------------------------------------------------
    // NAME VALIDATION
    // -------------------------------------------------

    if (!formData.name.trim()) {

      setError(
        "গ্রাহকের নাম দিন।"
      );

      return;
    }


    // -------------------------------------------------
    // FATHER / HUSBAND NAME VALIDATION
    // -------------------------------------------------

    if (!formData.fatherHusbandName.trim()) {

      setError(
        "পিতা/স্বামীর নাম দিন।"
      );

      return;
    }


    // -------------------------------------------------
    // MOBILE VALIDATION
    // -------------------------------------------------

    if (!formData.mobile.trim()) {

      setError(
        "মোবাইল নম্বর দিন।"
      );

      return;
    }


    // EXACTLY 11 DIGITS
    if (!/^01\d{9}$/.test(formData.mobile)) {

      setError(
        "সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন। যেমন: 01712345678"
      );

      return;
    }


    // -------------------------------------------------
    // ADDRESS
    // -------------------------------------------------

    if (!formData.address.trim()) {

      setError(
        "ঠিকানা দিন।"
      );

      return;
    }


    // -------------------------------------------------
    // COMPLAINT TYPE
    // -------------------------------------------------

    if (!formData.type) {

      setError(
        "অভিযোগের ধরন নির্বাচন করুন।"
      );

      return;
    }


    // -------------------------------------------------
    // DETAILS
    // -------------------------------------------------

    if (!formData.details.trim()) {

      setError(
        "অভিযোগের বিস্তারিত লিখুন।"
      );

      return;
    }


    // -------------------------------------------------
    // API URL
    // -------------------------------------------------

    if (!API_URL) {

      setError(
        "Google Apps Script URL পাওয়া যায়নি। .env ফাইল পরীক্ষা করুন।"
      );

      return;
    }


    try {

      setLoading(true);


      // ------------------------------------------------
      // GENERATE COMPLAINT ID
      // ------------------------------------------------

      const newComplaintId =
        generateComplaintId();


      // ------------------------------------------------
      // URL SEARCH PARAMS
      // ------------------------------------------------

      const data =
        new URLSearchParams();


      data.append(
        "action",
        "createComplaint"
      );


      data.append(
        "complaintId",
        newComplaintId
      );


      // =================================================
      // CUSTOMER NAME
      // =================================================

      data.append(
        "name",
        formData.name.trim()
      );


      // =================================================
      // FATHER / HUSBAND NAME
      // THIS WILL GO TO GOOGLE SHEET COLUMN D
      // =================================================

      data.append(
        "fatherHusbandName",
        formData.fatherHusbandName.trim()
      );


      // =================================================
      // MOBILE
      // =================================================

      data.append(
        "mobile",
        formData.mobile.trim()
      );


      // =================================================
      // CONSUMER NUMBER
      // =================================================

      data.append(
        "consumerNo",
        formData.consumerNo.trim()
      );


      // =================================================
      // ADDRESS
      // =================================================

      data.append(
        "address",
        formData.address.trim()
      );


      // =================================================
      // COMPLAINT TYPE
      // =================================================

      data.append(
        "type",
        formData.type
      );


      // =================================================
      // DETAILS
      // =================================================

      data.append(
        "details",
        formData.details.trim()
      );


      // =================================================
      // IMAGE CODE COMMENTED
      // =================================================

      /*
      if (imageFile) {

        console.log(
          "Preparing image..."
        );

        const imageBase64 =
          await fileToBase64(imageFile);

        data.append(
          "imageData",
          imageBase64
        );

        data.append(
          "imageName",
          imageFile.name
        );

        data.append(
          "imageMimeType",
          imageFile.type ||
          "image/jpeg"
        );
      }
      */


      // =================================================
      // VIDEO CODE COMMENTED
      // =================================================

      /*
      if (videoFile) {

        console.log(
          "Preparing video..."
        );

        const videoBase64 =
          await fileToBase64(videoFile);

        data.append(
          "videoData",
          videoBase64
        );

        data.append(
          "videoName",
          videoFile.name
        );

        data.append(
          "videoMimeType",
          videoFile.type ||
          "video/mp4"
        );
      }
      */


      // =================================================
      // SEND TO GOOGLE APPS SCRIPT
      // =================================================

      console.log(
        "Sending complaint..."
      );


      const response =
        await fetch(API_URL, {
          method: "POST",
          body: data
        });


      console.log(
        "HTTP Status:",
        response.status
      );


      // ------------------------------------------------
      // READ RESPONSE
      // ------------------------------------------------

      const rawResponse =
        await response.text();


      console.log(
        "Google Apps Script Response:",
        rawResponse
      );


      let result;


      try {

        result =
          JSON.parse(
            rawResponse
          );

      } catch (jsonError) {

        console.error(
          "JSON Parse Error:",
          jsonError
        );


        throw new Error(
          "Google Apps Script থেকে সঠিক response পাওয়া যায়নি।"
        );

      }


      // ------------------------------------------------
      // API ERROR
      // ------------------------------------------------

      if (!result.success) {

        throw new Error(
          result.message ||
          "অভিযোগ জমা দিতে সমস্যা হয়েছে।"
        );

      }


      // ------------------------------------------------
      // SUCCESS
      // ------------------------------------------------

      console.log(
        "Complaint submitted successfully:",
        result
      );


      setComplaintId(
        result.complaintId ||
        newComplaintId
      );


    } catch (err) {

      console.error(
        "Complaint Submit Error:",
        err
      );


      setError(
        err.message ||
        "অভিযোগ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );


    } finally {

      setLoading(false);

    }

  };


  // ===================================================
  // NEW COMPLAINT
  // ===================================================

  const handleNewComplaint = () => {


    // =================================================
    // IMAGE / VIDEO RESET COMMENTED
    // =================================================

    /*
    removeImage();
    removeVideo();
    */


    // =================================================
    // RESET FORM
    // =================================================

    setFormData({

      name: "",

      fatherHusbandName: "",

      mobile: "",

      consumerNo: "",

      address: "",

      type: "",

      details: ""

    });


    setComplaintId("");

    setError("");


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // ===================================================
  // SUCCESS SCREEN
  // ===================================================

  if (complaintId) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-2xl">

          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-900 shadow-2xl">


            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-emerald-500/20 blur-3xl" />


            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />


            <div className="relative p-8 sm:p-12 text-center">


              {/* SUCCESS ICON */}

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">

                <CheckCircle
                  className="text-emerald-400"
                  size={48}
                />

              </div>


              {/* TITLE */}

              <h1 className="text-3xl sm:text-4xl font-bold text-white">

                অভিযোগ সফলভাবে জমা হয়েছে

              </h1>


              <p className="mt-3 text-slate-400">

                আপনার অভিযোগটি বরপা সাব-জোনাল অফিসে পাঠানো হয়েছে।

              </p>


              {/* COMPLAINT ID */}

              <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">

                <p className="text-sm text-slate-400">

                  আপনার Complaint ID

                </p>


                <div className="mt-2 text-2xl sm:text-3xl font-black tracking-wider text-cyan-400">

                  {complaintId}

                </div>


                <p className="mt-3 text-xs text-slate-500">

                  এই Complaint ID সংরক্ষণ করুন। পরবর্তীতে অভিযোগের Status দেখতে এটি প্রয়োজন হবে।

                </p>

              </div>


              {/* =================================================
                  IMAGE / VIDEO SUCCESS SECTION COMMENTED
                  ================================================= */}

              {/*
              {(imageFile || videoFile) && (

                <div className="mt-5 rounded-2xl border border-purple-400/10 bg-purple-400/5 p-5 text-left">

                  <div className="flex gap-3">

                    <Upload
                      className="mt-1 shrink-0 text-purple-400"
                      size={22}
                    />

                    <div>

                      <h3 className="font-bold text-white">
                        সংযুক্ত ফাইল
                      </h3>


                      {imageFile && (

                        <p className="mt-1 text-sm text-slate-400">
                          📷 {imageFile.name}
                        </p>

                      )}


                      {videoFile && (

                        <p className="mt-1 text-sm text-slate-400">
                          🎥 {videoFile.name}
                        </p>

                      )}

                    </div>

                  </div>

                </div>

              )}
              */}


              {/* SAFETY */}

              <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5 text-left">

                <div className="flex gap-3">

                  <ShieldAlert
                    className="mt-1 shrink-0 text-emerald-400"
                    size={22}
                  />


                  <div>

                    <h3 className="font-bold text-white">

                      নিরাপত্তা সতর্কতা

                    </h3>


                    <p className="mt-1 text-sm leading-6 text-slate-400">

                      বৈদ্যুতিক তার, খুঁটি বা স্পার্কিংয়ের কাছে নিজে গিয়ে কাজ করার চেষ্টা করবেন না। নিরাপদ দূরত্ব বজায় রাখুন।

                    </p>

                  </div>

                </div>

              </div>


              {/* BUTTONS */}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">


                <button
                  onClick={handleNewComplaint}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
                >

                  <RotateCcw size={18} />

                  নতুন অভিযোগ

                </button>


                <a
                  href="/status"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3.5 font-bold text-white transition hover:bg-slate-700"
                >

                  <Activity size={18} />

                  Status দেখুন

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    );

  }


  // ===================================================
  // MAIN FORM
  // ===================================================

  return (

    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:py-12">

      <div className="mx-auto max-w-5xl">


        {/* =================================================
            HERO
            ================================================= */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-500 p-7 sm:p-10 shadow-2xl">


          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />


          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />


          <div className="relative">


            <div className="flex flex-wrap items-center gap-2">


              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">

                <Radio
                  className="animate-pulse"
                  size={14}
                />

                Online Complaint

              </span>


              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-3 py-1.5 text-xs font-semibold text-emerald-100">

                <CircleDot size={13} />

                Barpa Sub-Zonal Office

              </span>

            </div>


            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">

              অনলাইনে অভিযোগ করুন

            </h1>


            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-7 text-blue-100">

              বিদ্যুৎ সংক্রান্ত সমস্যা দ্রুত জানাতে নিচের ফর্মটি পূরণ করুন।

            </p>

          </div>

        </div>


        {/* =================================================
            ERROR
            ================================================= */}

        {error && (

          <div className="mt-5 flex gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">


            <AlertTriangle
              className="mt-0.5 shrink-0"
              size={22}
            />


            <p className="text-sm leading-6">

              {error}

            </p>

          </div>

        )}


        {/* =================================================
            FORM
            ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-6"
        >


          {/* =================================================
              USER INFORMATION
              ================================================= */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-xl">


            <div className="mb-6 flex items-center gap-3">


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">

                <User size={22} />

              </div>


              <div>

                <h2 className="text-xl font-bold text-white">

                  অভিযোগকারীর তথ্য

                </h2>


                <p className="text-sm text-slate-500">

                  আপনার সঠিক তথ্য প্রদান করুন

                </p>

              </div>

            </div>


            <div className="grid gap-5 md:grid-cols-2">


              {/* =================================================
                  CUSTOMER NAME
                  ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">

                  নাম (গ্রাহকের নাম) *

                </label>


                <div className="relative">

                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />


                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="নাম (গ্রাহকের নাম)"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3.5 pl-10 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                </div>

              </div>


              {/* =================================================
                  FATHER / HUSBAND NAME
                  ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">

                  পিতা/স্বামীর নাম *

                </label>


                <div className="relative">

                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />


                  <input
                    type="text"
                    name="fatherHusbandName"
                    value={formData.fatherHusbandName}
                    onChange={handleChange}
                    placeholder="পিতা/স্বামীর নাম"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3.5 pl-10 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                </div>

              </div>


              {/* =================================================
                  MOBILE
                  ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">

                  মোবাইল নম্বর *

                </label>


                <div className="relative">

                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />


                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    inputMode="numeric"
                    maxLength={11}
                    pattern="01[0-9]{9}"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3.5 pl-10 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                </div>


                <p className="mt-1.5 text-xs text-slate-500">

                  ১১ সংখ্যার মোবাইল নম্বর দিন

                </p>

              </div>


              {/* =================================================
                  CONSUMER
                  ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-300">

                  গ্রাহক / মিটার নম্বর

                </label>


                <div className="relative">

                  <Hash
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />


                  <input
                    type="text"
                    name="consumerNo"
                    value={formData.consumerNo}
                    onChange={handleChange}
                    placeholder="গ্রাহক নম্বর / মিটার নম্বর"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3.5 pl-10 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                </div>

              </div>


            </div>

          </section>


          {/* =================================================
              ADDRESS
              ================================================= */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-xl">


            <div className="mb-6 flex items-center gap-3">


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

                <MapPin size={22} />

              </div>


              <div>

                <h2 className="text-xl font-bold text-white">

                  ঠিকানা

                </h2>


                <p className="text-sm text-slate-500">

                  সমস্যার স্থানটি বিস্তারিত লিখুন

                </p>

              </div>

            </div>


            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="গ্রাম, রাস্তা, বাড়ি নম্বর, এলাকার নাম..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />

          </section>


          {/* =================================================
              COMPLAINT TYPE
              ================================================= */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-xl">


            <div className="mb-6 flex items-center gap-3">


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">

                <Zap size={22} />

              </div>


              <div>

                <h2 className="text-xl font-bold text-white">

                  অভিযোগের তথ্য

                </h2>


                <p className="text-sm text-slate-500">

                  সমস্যার ধরন নির্বাচন করুন

                </p>

              </div>

            </div>


            {/* COMPLAINT TYPE */}

            <div className="relative">


              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 pr-12 text-white outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              >


                <option value="">

                  অভিযোগের ধরন নির্বাচন করুন

                </option>


                {complaintTypes.map((item) => (

                  <option
                    key={item}
                    value={item}
                  >

                    {item}

                  </option>

                ))}


              </select>


              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={20}
              />

            </div>


            {/* DETAILS */}

            <div className="mt-5">


              <label className="mb-2 block text-sm font-semibold text-slate-300">

                বিস্তারিত অভিযোগ *

              </label>


              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows="5"
                placeholder="সমস্যাটি কখন থেকে হচ্ছে, কী ধরনের সমস্যা হচ্ছে ইত্যাদি লিখুন..."
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 text-white outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />

            </div>


          </section>


          {/* =================================================
              IMAGE / VIDEO UPLOAD SECTION
              COMPLETELY COMMENTED
              ================================================= */}

          {/*
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-xl">

            IMAGE / VIDEO CODE

          </section>
          */}


          {/* =================================================
              SAFETY WARNING
              ================================================= */}

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">


            <div className="flex gap-3">


              <AlertTriangle
                className="mt-1 shrink-0 text-red-400"
                size={22}
              />


              <div>


                <h3 className="font-bold text-red-300">

                  জরুরি নিরাপত্তা সতর্কতা

                </h3>


                <p className="mt-1 text-sm leading-6 text-slate-400">

                  বৈদ্যুতিক তার ছিঁড়ে গেলে, স্পার্কিং বা আগুন দেখা দিলে তার কাছাকাছি যাবেন না এবং অন্যদেরও দূরে রাখুন।

                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              SUBMIT BUTTON
              ================================================= */}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 px-6 py-4 text-base font-black text-white shadow-xl shadow-cyan-500/10 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >


            {loading ? (

              <>

                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                অভিযোগ পাঠানো হচ্ছে...

              </>

            ) : (

              <>

                <Send
                  className="transition group-hover:translate-x-1"
                  size={20}
                />

                অভিযোগ জমা দিন

                <Sparkles size={18} />

              </>

            )}

          </button>


        </form>


        {/* =================================================
            FOOTER
            ================================================= */}

        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-600">

          <FileText size={14} />

          বরপা সাব-জোনাল অফিস — অনলাইন অভিযোগ সেবা

        </div>


      </div>

    </div>

  );

}