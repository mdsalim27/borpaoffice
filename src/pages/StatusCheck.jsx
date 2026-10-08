// import { useState } from "react";
// import {
//   Search,
//   CheckCircle2,
//   Clock3,
//   Loader2,
//   AlertCircle,
//   FileText,
//   User,
//   Phone,
//   MapPin,
//   CalendarDays,
//   Zap,
//   RefreshCw,
// } from "lucide-react";

// const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

// function StatusCheck() {
//   const [complaintId, setComplaintId] = useState("");
//   const [complaint, setComplaint] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ==========================================
//   // Search Complaint
//   // ==========================================
//   const searchComplaint = async (e) => {
//     e.preventDefault();

//     const id = complaintId.trim();

//     if (!id) {
//       setError("অনুগ্রহ করে Complaint ID লিখুন।");
//       setComplaint(null);
//       return;
//     }

//     if (!API_URL) {
//       setError(
//         "Google Apps Script URL পাওয়া যায়নি। .env ফাইল চেক করুন।"
//       );
//       setComplaint(null);
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setComplaint(null);

//     try {
//       const url =
//         `${API_URL}?action=getComplaint&complaintId=` +
//         encodeURIComponent(id);

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error("Server response failed");
//       }

//       const result = await response.json();

//       if (result.success && result.complaint) {
//         setComplaint(result.complaint);
//       } else {
//         setError(
//           result.message || "এই Complaint ID পাওয়া যায়নি।"
//         );
//       }
//     } catch (error) {
//       console.error("Status Check Error:", error);

//       setError(
//         "তথ্য পাওয়া যাচ্ছে না। Internet connection এবং Google Apps Script URL চেক করুন।"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // Status Information
//   // ==========================================
//   const getStatusInfo = (status) => {
//     switch (status) {
//       case "Processing":
//         return {
//           text: "কাজ চলছে",
//           className:
//             "border-blue-200 bg-blue-100 text-blue-700",
//           icon: <Loader2 size={20} />,
//         };

//       case "Resolved":
//         return {
//           text: "সমাধান হয়েছে",
//           className:
//             "border-green-200 bg-green-100 text-green-700",
//           icon: <CheckCircle2 size={20} />,
//         };

//       case "Pending":
//       default:
//         return {
//           text: "অপেক্ষমাণ",
//           className:
//             "border-yellow-200 bg-yellow-100 text-yellow-700",
//           icon: <Clock3 size={20} />,
//         };
//     }
//   };

//   // ==========================================
//   // Reset Search
//   // ==========================================
//   const resetSearch = () => {
//     setComplaintId("");
//     setComplaint(null);
//     setError("");
//   };

//   const statusInfo = complaint
//     ? getStatusInfo(complaint.status)
//     : null;

//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-10">
//       <div className="mx-auto max-w-4xl">

//         {/* ======================================
//             Header
//         ====================================== */}
//         <div className="mb-8 text-center">

//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
//             <Search size={30} />
//           </div>

//           <h1 className="text-3xl font-bold text-slate-800">
//             অভিযোগের Status Check
//           </h1>

//           <p className="mt-2 text-slate-500">
//             আপনার Complaint ID লিখে বর্তমান অবস্থা দেখুন।
//           </p>
//         </div>

//         {/* ======================================
//             Search Card
//         ====================================== */}
//         <div className="rounded-2xl bg-white p-5 shadow-md sm:p-7">

//           <form
//             onSubmit={searchComplaint}
//             className="flex flex-col gap-3 sm:flex-row"
//           >

//             <input
//               type="text"
//               value={complaintId}
//               onChange={(e) =>
//                 setComplaintId(e.target.value)
//               }
//               placeholder="যেমন: BPO-20261008-1234"
//               className="h-12 flex-1 rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? (
//                 <>
//                   <Loader2
//                     size={19}
//                     className="animate-spin"
//                   />
//                   খোঁজা হচ্ছে...
//                 </>
//               ) : (
//                 <>
//                   <Search size={19} />
//                   Search
//                 </>
//               )}
//             </button>

//           </form>

//           {/* ======================================
//               Error Message
//           ====================================== */}
//           {error && (
//             <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

//               <AlertCircle
//                 size={21}
//                 className="mt-0.5 shrink-0"
//               />

//               <div>
//                 <p className="font-semibold">
//                   অভিযোগ পাওয়া যায়নি
//                 </p>

//                 <p className="mt-1 text-sm">
//                   {error}
//                 </p>
//               </div>

//             </div>
//           )}
//         </div>

//         {/* ======================================
//             Complaint Result
//         ====================================== */}
//         {complaint && (
//           <div className="mt-7 overflow-hidden rounded-2xl bg-white shadow-lg">

//             {/* ==================================
//                 Result Header
//             ================================== */}
//             <div className="border-b bg-slate-50 p-5 sm:p-6">

//               <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//                 <div>
//                   <p className="text-sm text-slate-500">
//                     Complaint ID
//                   </p>

//                   <h2 className="mt-1 text-xl font-bold text-slate-800">
//                     {complaint.complaintId}
//                   </h2>
//                 </div>

//                 {/* Status Badge */}
//                 <div
//                   className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-semibold ${statusInfo.className}`}
//                 >
//                   {statusInfo.icon}
//                   {statusInfo.text}
//                 </div>

//               </div>
//             </div>

//             {/* ==================================
//                 Status Progress
//             ================================== */}
//             <div className="border-b p-5 sm:p-7">

//               <h3 className="mb-6 text-lg font-bold text-slate-800">
//                 অভিযোগের অগ্রগতি
//               </h3>

//               <div className="flex items-center justify-between">

//                 {/* Pending */}
//                 <div className="flex flex-col items-center">

//                   <div
//                     className={`flex h-11 w-11 items-center justify-center rounded-full ${
//                       complaint.status === "Pending" ||
//                       complaint.status === "Processing" ||
//                       complaint.status === "Resolved"
//                         ? "bg-yellow-500 text-white"
//                         : "bg-slate-200 text-slate-500"
//                     }`}
//                   >
//                     <Clock3 size={20} />
//                   </div>

//                   <span className="mt-2 text-xs font-medium sm:text-sm">
//                     Pending
//                   </span>

//                 </div>

//                 {/* Line */}
//                 <div
//                   className={`h-1 flex-1 ${
//                     complaint.status === "Processing" ||
//                     complaint.status === "Resolved"
//                       ? "bg-blue-500"
//                       : "bg-slate-200"
//                   }`}
//                 />

//                 {/* Processing */}
//                 <div className="flex flex-col items-center">

//                   <div
//                     className={`flex h-11 w-11 items-center justify-center rounded-full ${
//                       complaint.status === "Processing" ||
//                       complaint.status === "Resolved"
//                         ? "bg-blue-600 text-white"
//                         : "bg-slate-200 text-slate-500"
//                     }`}
//                   >
//                     <Loader2 size={20} />
//                   </div>

//                   <span className="mt-2 text-xs font-medium sm:text-sm">
//                     Processing
//                   </span>

//                 </div>

//                 {/* Line */}
//                 <div
//                   className={`h-1 flex-1 ${
//                     complaint.status === "Resolved"
//                       ? "bg-green-500"
//                       : "bg-slate-200"
//                   }`}
//                 />

//                 {/* Resolved */}
//                 <div className="flex flex-col items-center">

//                   <div
//                     className={`flex h-11 w-11 items-center justify-center rounded-full ${
//                       complaint.status === "Resolved"
//                         ? "bg-green-600 text-white"
//                         : "bg-slate-200 text-slate-500"
//                     }`}
//                   >
//                     <CheckCircle2 size={20} />
//                   </div>

//                   <span className="mt-2 text-xs font-medium sm:text-sm">
//                     Resolved
//                   </span>

//                 </div>

//               </div>
//             </div>

//             {/* ==================================
//                 Complaint Details
//             ================================== */}
//             <div className="p-5 sm:p-7">

//               <h3 className="mb-5 text-lg font-bold text-slate-800">
//                 অভিযোগের বিস্তারিত
//               </h3>

//               <div className="grid gap-4 sm:grid-cols-2">

//                 {/* Name */}
//                 <div className="rounded-xl border border-slate-200 p-4">

//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <User size={17} />
//                     অভিযোগকারীর নাম
//                   </div>

//                   <p className="mt-2 font-semibold text-slate-800">
//                     {complaint.name || "—"}
//                   </p>

//                 </div>

//                 {/* Mobile */}
//                 <div className="rounded-xl border border-slate-200 p-4">

//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <Phone size={17} />
//                     মোবাইল
//                   </div>

//                   <p className="mt-2 font-semibold text-slate-800">
//                     {complaint.mobile || "—"}
//                   </p>

//                 </div>

//                 {/* Consumer Number */}
//                 <div className="rounded-xl border border-slate-200 p-4">

//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <Zap size={17} />
//                     Consumer No
//                   </div>

//                   <p className="mt-2 font-semibold text-slate-800">
//                     {complaint.consumerNo || "—"}
//                   </p>

//                 </div>

//                 {/* Date */}
//                 <div className="rounded-xl border border-slate-200 p-4">

//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <CalendarDays size={17} />
//                     অভিযোগের তারিখ
//                   </div>

//                   <p className="mt-2 font-semibold text-slate-800">
//                     {complaint.date || "—"}
//                   </p>

//                 </div>

//                 {/* Complaint Type */}
//                 <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">

//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <FileText size={17} />
//                     অভিযোগের ধরন
//                   </div>

//                   <p className="mt-2 font-semibold text-slate-800">
//                     {complaint.type || "—"}
//                   </p>

//                 </div>

//                 {/* Address */}
//                 <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">

//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <MapPin size={17} />
//                     ঠিকানা
//                   </div>

//                   <p className="mt-2 font-semibold text-slate-800">
//                     {complaint.address || "—"}
//                   </p>

//                 </div>

//                 {/* Details */}
//                 <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">

//                   <div className="flex items-center gap-2 text-sm text-slate-500">
//                     <FileText size={17} />
//                     অভিযোগের বিবরণ
//                   </div>

//                   <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-700">
//                     {complaint.details || "—"}
//                   </p>

//                 </div>

//               </div>

//               {/* ==================================
//                   Buttons
//               ================================== */}
//               <div className="mt-6 flex flex-col gap-3 sm:flex-row">

//                 <button
//                   onClick={searchComplaint}
//                   disabled={loading}
//                   className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-100 disabled:opacity-60"
//                 >
//                   <RefreshCw
//                     size={18}
//                     className={
//                       loading ? "animate-spin" : ""
//                     }
//                   />

//                   Status Refresh
//                 </button>

//                 <button
//                   onClick={resetSearch}
//                   className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
//                 >
//                   নতুন Complaint ID Search
//                 </button>

//               </div>

//             </div>
//           </div>
//         )}

//         {/* ======================================
//             Example
//         ====================================== */}
//         {!complaint && !error && (
//           <div className="mt-6 text-center text-sm text-slate-500">

//             উদাহরণ:{" "}

//             <span className="font-semibold text-blue-600">
//               BPO-20261008-1234
//             </span>

//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default StatusCheck;



import { useState } from "react";
import {
Search,
LoaderCircle,
CheckCircle2,
Clock3,
FileText,
User,
Phone,
Hash,
MapPin,
CalendarDays,
AlertCircle,
ShieldCheck,
Zap,
ArrowRight,
RotateCcw,
CircleDot,
} from "lucide-react";

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

function StatusCheck() {
const [complaintId, setComplaintId] = useState("");
const [complaint, setComplaint] = useState(null);

const [loading, setLoading] = useState(false);
const [searched, setSearched] = useState(false);
const [error, setError] = useState("");

// =========================================
// Search Complaint
// =========================================
const handleSearch = async (e) => {
e.preventDefault();


const id = complaintId.trim();

if (!id) {
  setError("অনুগ্রহ করে Complaint ID লিখুন।");
  setComplaint(null);
  setSearched(false);
  return;
}

if (!API_URL) {
  setError(
    "Google Apps Script URL পাওয়া যায়নি। .env ফাইল চেক করুন।"
  );
  return;
}

try {
  setLoading(true);
  setError("");
  setComplaint(null);
  setSearched(false);

  const url =
    `${API_URL}?action=getComplaint&complaintId=${encodeURIComponent(
      id
    )}&t=${Date.now()}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.success) {
    throw new Error(
      data.message || "Complaint পাওয়া যায়নি।"
    );
  }

  if (!data.complaint) {
    throw new Error(
      "এই Complaint ID-এর কোনো তথ্য পাওয়া যায়নি।"
    );
  }

  setComplaint(data.complaint);
  setSearched(true);
} catch (err) {
  console.error(err);

  setComplaint(null);
  setSearched(true);
  setError(
    err.message ||
      "Complaint search করতে সমস্যা হয়েছে।"
  );
} finally {
  setLoading(false);
}


};

// =========================================
// Reset Search
// =========================================
const handleReset = () => {
setComplaintId("");
setComplaint(null);
setError("");
setSearched(false);
};

// =========================================
// Normalize Status
// =========================================
const status =
complaint?.status || "Pending";

// =========================================
// Timeline
// =========================================
const timeline = [
{
key: "submitted",
title: "Complaint Submitted",
bangla: "অভিযোগ জমা হয়েছে",
description:
"আপনার অভিযোগটি সফলভাবে গ্রহণ করা হয়েছে।",
active: true,
completed:
status === "Processing" ||
status === "Resolved",
icon: <FileText size={19} />,
},


{
  key: "received",
  title: "Complaint Received",
  bangla: "অফিসে অভিযোগ গ্রহণ",
  description:
    "অভিযোগটি অফিসের সিস্টেমে গ্রহণ করা হয়েছে।",
  active: true,
  completed:
    status === "Processing" ||
    status === "Resolved",
  icon: <ShieldCheck size={19} />,
},

{
  key: "processing",
  title: "Processing",
  bangla: "অভিযোগের কাজ চলছে",
  description:
    "অভিযোগটি বর্তমানে যাচাই/প্রক্রিয়াধীন রয়েছে।",
  active:
    status === "Processing" ||
    status === "Resolved",
  completed: status === "Resolved",
  icon: <LoaderCircle size={19} />,
},

{
  key: "resolved",
  title: "Resolved",
  bangla: "অভিযোগ সমাধান হয়েছে",
  description:
    "অভিযোগের কাজ সম্পন্ন হয়েছে।",
  active: status === "Resolved",
  completed: status === "Resolved",
  icon: <CheckCircle2 size={19} />,
},


];

return ( <div className="min-h-screen bg-slate-50 text-slate-800">


  {/* =====================================
      Hero
  ===================================== */}
  <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600 text-white">

    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

    <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-teal-300/10 blur-3xl" />

    <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">

      <div className="mx-auto max-w-3xl text-center">

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-md">
          <CircleDot
            size={14}
            className="animate-pulse"
          />
          Complaint Tracking System
        </div>

        <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
          অভিযোগের অবস্থা জানুন
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-50 sm:text-base">
          আপনার Complaint ID ব্যবহার করে অভিযোগের
          বর্তমান অবস্থা এবং সম্পূর্ণ Tracking Timeline
          দেখুন।
        </p>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="mx-auto mt-8 max-w-2xl"
        >
          <div className="flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">
              <Hash
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={complaintId}
                onChange={(e) =>
                  setComplaintId(
                    e.target.value
                  )
                }
                placeholder="যেমন: BPO-20261008-1234"
                className="h-14 w-full rounded-2xl border border-white/20 bg-white pl-11 pr-4 text-sm font-bold text-slate-800 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 text-sm font-black text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={19} />
                  Check Status
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-100">
          <ShieldCheck size={14} />
          আপনার Complaint ID নিরাপদে ব্যবহার করুন
        </div>
      </div>
    </div>
  </section>

  {/* =====================================
      Main
  ===================================== */}
  <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">

    {/* Error */}
    {error && (
      <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">

        <AlertCircle
          size={20}
          className="mt-0.5 shrink-0"
        />

        <div className="flex-1">
          <p className="font-bold">
            Complaint পাওয়া যায়নি
          </p>

          <p className="mt-1 text-sm">
            {error}
          </p>
        </div>
      </div>
    )}

    {/* =====================================
        Empty State
    ===================================== */}
    {!complaint && !loading && !error && !searched && (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
          <Search size={32} />
        </div>

        <h2 className="mt-6 text-2xl font-black text-slate-900">
          Complaint ID দিয়ে খুঁজুন
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
          উপরের Search Box-এ আপনার Complaint ID
          লিখে অভিযোগের সর্বশেষ অবস্থা দেখুন।
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-bold text-slate-500">
          <span className="rounded-full bg-slate-100 px-4 py-2">
            Complaint Status
          </span>

          <span className="rounded-full bg-slate-100 px-4 py-2">
            Customer Details
          </span>

          <span className="rounded-full bg-slate-100 px-4 py-2">
            Tracking Timeline
          </span>
        </div>
      </div>
    )}

    {/* =====================================
        Complaint Result
    ===================================== */}
    {complaint && (
      <div className="space-y-6">

        {/* Result Header */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <FileText size={24} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Complaint ID
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    {complaint.complaintId}
                  </h2>
                </div>
              </div>

              <StatusBadge status={status} />
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">

            <InfoCard
              icon={<User size={18} />}
              label="Customer"
              value={complaint.name}
            />

            <InfoCard
              icon={<Phone size={18} />}
              label="Mobile"
              value={complaint.mobile}
            />

            <InfoCard
              icon={<Hash size={18} />}
              label="Consumer No"
              value={complaint.consumerNo}
            />

            <InfoCard
              icon={<CalendarDays size={18} />}
              label="Date"
              value={complaint.date}
            />
          </div>
        </section>

        {/* =====================================
            Current Status
        ===================================== */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Current Status
              </p>

              <h3 className="mt-1 text-2xl font-black text-slate-900">
                {getBanglaStatus(status)}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {getStatusDescription(status)}
              </p>
            </div>

            <StatusBadge
              status={status}
              large
            />
          </div>
        </section>

        {/* =====================================
            Timeline
        ===================================== */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="mb-8">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ActivityIcon />
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 sm:text-xl">
                  Complaint Tracking Timeline
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  আপনার অভিযোগ কোন পর্যায়ে আছে তা দেখুন
                </p>
              </div>
            </div>
          </div>

          <div className="relative">

            {/* Vertical Line */}
            <div className="absolute left-[19px] top-5 bottom-5 hidden w-0.5 bg-slate-200 sm:block" />

            <div className="space-y-7">

              {timeline.map((step, index) => {

                const isLast =
                  index === timeline.length - 1;

                const isCompleted =
                  step.completed;

                const isCurrent =
                  !step.completed &&
                  (
                    step.key ===
                    "submitted" &&
                    status === "Pending"
                  ) ||
                  (
                    step.key ===
                    "processing" &&
                    status === "Processing"
                  ) ||
                  (
                    step.key ===
                    "resolved" &&
                    status === "Resolved"
                  );

                return (
                  <div
                    key={step.key}
                    className="relative flex gap-4 sm:gap-5"
                  >

                    {/* Icon */}
                    <div
                      className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-sm ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isCurrent
                          ? "bg-blue-500 text-white animate-pulse"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div
                      className={`flex-1 rounded-2xl border p-4 transition ${
                        isCompleted
                          ? "border-emerald-100 bg-emerald-50/60"
                          : isCurrent
                          ? "border-blue-100 bg-blue-50/60"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h4
                            className={`font-black ${
                              isCompleted
                                ? "text-emerald-700"
                                : isCurrent
                                ? "text-blue-700"
                                : "text-slate-500"
                            }`}
                          >
                            {step.bangla}
                          </h4>

                          <p className="mt-1 text-xs font-bold text-slate-500">
                            {step.title}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1 text-[10px] font-black ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-700"
                              : isCurrent
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {isCompleted
                            ? "COMPLETED"
                            : isCurrent
                            ? "CURRENT"
                            : "UPCOMING"}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================
            Complaint Details
        ===================================== */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="mb-5 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FileText size={19} />
            </div>

            <div>
              <h3 className="font-black text-slate-900">
                Complaint Details
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                আপনার জমা দেওয়া অভিযোগের তথ্য
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <InfoCard
              icon={<AlertCircle size={18} />}
              label="Complaint Type"
              value={complaint.type}
            />

            <InfoCard
              icon={<MapPin size={18} />}
              label="Address"
              value={complaint.address}
            />
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Complaint Description
            </p>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {complaint.details ||
                "কোনো বিস্তারিত তথ্য দেওয়া হয়নি।"}
            </p>
          </div>
        </section>

        {/* =====================================
            Actions
        ===================================== */}
        <section className="flex flex-col gap-3 sm:flex-row sm:justify-center">

          <button
            onClick={handleReset}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <RotateCcw size={17} />
            Search Another Complaint
          </button>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Check Again
            <ArrowRight size={17} />
          </button>
        </section>
      </div>
    )}

    {/* =====================================
        Bottom Help
    ===================================== */}
    <section className="mt-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-xl sm:p-8">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Zap
              size={19}
              className="text-emerald-400"
            />

            <h3 className="font-black">
              অভিযোগ সংক্রান্ত সাহায্য প্রয়োজন?
            </h3>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Complaint ID সংরক্ষণ করুন এবং প্রয়োজন হলে
            বরপা সাব-জোনাল অফিসে যোগাযোগ করুন।
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-xs font-bold text-slate-200">
          <ShieldCheck size={16} />
          Barpa Sub-Zonal Office
        </div>
      </div>
    </section>
  </main>
</div>


);
}

// =========================================
// Status Badge
// =========================================
function StatusBadge({ status, large = false }) {
const config = getStatusConfig(status);

return (
<div
className={`inline-flex w-fit items-center gap-2 rounded-full border font-black ${
        large
          ? "px-4 py-2.5 text-sm"
          : "px-3 py-1.5 text-xs"
      } ${config.className}`}
>
{config.icon}


  {config.label}
</div>


);
}

// =========================================
// Status Config
// =========================================
function getStatusConfig(status) {
if (status === "Resolved") {
return {
label: "Resolved",
className:
"border-emerald-200 bg-emerald-50 text-emerald-700",
icon: <CheckCircle2 size={16} />,
};
}

if (status === "Processing") {
return {
label: "Processing",
className:
"border-blue-200 bg-blue-50 text-blue-700",
icon: ( <LoaderCircle
       size={16}
       className="animate-spin"
     />
),
};
}

return {
label: "Pending",
className:
"border-amber-200 bg-amber-50 text-amber-700",
icon: <Clock3 size={16} />,
};
}

// =========================================
// Bangla Status
// =========================================
function getBanglaStatus(status) {
if (status === "Resolved") {
return "অভিযোগ সমাধান হয়েছে";
}

if (status === "Processing") {
return "অভিযোগের কাজ চলছে";
}

return "অভিযোগ প্রক্রিয়াধীন";
}

// =========================================
// Status Description
// =========================================
function getStatusDescription(status) {
if (status === "Resolved") {
return "আপনার অভিযোগের কাজ সম্পন্ন হয়েছে।";
}

if (status === "Processing") {
return "অভিযোগটি বর্তমানে যাচাই/সমাধানের প্রক্রিয়ায় রয়েছে।";
}

return "আপনার অভিযোগটি অফিসে গ্রহণ করা হয়েছে এবং পরবর্তী কার্যক্রমের অপেক্ষায় রয়েছে।";
}

// =========================================
// Info Card
// =========================================
function InfoCard({ icon, label, value }) {
return ( <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">


  <div className="flex items-start gap-3">

    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold leading-6 text-slate-800">
        {value || "N/A"}
      </p>
    </div>
  </div>
</div>


);
}

// =========================================
// Activity Icon
// =========================================
function ActivityIcon() {
return ( <svg
   width="19"
   height="19"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
 > <path d="M3 12h4l3-8 4 16 3-8h4" /> </svg>
);
}

export default StatusCheck;
