

// import { useEffect, useState } from "react";
// import {
// User,
// Phone,
// FileText,
// MapPin,
// AlertTriangle,
// Send,
// CheckCircle,
// Hash,
// RotateCcw,
// Zap,
// ShieldAlert,
// ChevronDown,
// Sparkles,
// Radio,
// CircleDot,
// Activity,
// } from "lucide-react";

// // .env file থেকে Google Apps Script URL নেওয়া হবে
// const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

// function ComplaintForm() {
// const initialFormData = {
// name: "",
// mobile: "",
// consumerNo: "",
// address: "",
// type: "",
// details: "",
// };

// const [formData, setFormData] = useState(initialFormData);
// const [complaintId, setComplaintId] = useState("");
// const [loading, setLoading] = useState(false);

// // Live floating particles
// const particles = Array.from({ length: 18 });

// // Input change
// const handleChange = (e) => {
// setFormData({
// ...formData,
// [e.target.name]: e.target.value,
// });
// };

// // Complaint ID তৈরি
// const generateComplaintId = () => {
// const now = new Date();


// const date =
//   now.getFullYear() +
//   String(now.getMonth() + 1).padStart(2, "0") +
//   String(now.getDate()).padStart(2, "0");

// const random = Math.floor(1000 + Math.random() * 9000);

// return `BPO-${date}-${random}`;


// };

// // Submit
// const handleSubmit = async (e) => {
// e.preventDefault();


// if (!formData.name.trim()) {
//   alert("অনুগ্রহ করে অভিযোগকারীর নাম লিখুন।");
//   return;
// }

// if (!formData.mobile.trim()) {
//   alert("অনুগ্রহ করে মোবাইল নম্বর লিখুন।");
//   return;
// }

// if (!formData.address.trim()) {
//   alert("অনুগ্রহ করে ঠিকানা লিখুন।");
//   return;
// }

// if (!formData.type) {
//   alert("অনুগ্রহ করে অভিযোগের ধরন নির্বাচন করুন।");
//   return;
// }

// if (!formData.details.trim()) {
//   alert("অনুগ্রহ করে অভিযোগের বিস্তারিত লিখুন।");
//   return;
// }

// if (!API_URL) {
//   alert(
//     "Google Apps Script URL পাওয়া যাচ্ছে না।\n\n.env ফাইলে VITE_GOOGLE_SCRIPT_URL সেট করুন।"
//   );
//   return;
// }

// setLoading(true);

// try {
//   const id = generateComplaintId();

//   const data = new FormData();

//   data.append("complaintId", id);
//   data.append("name", formData.name);
//   data.append("mobile", formData.mobile);
//   data.append("consumerNo", formData.consumerNo);
//   data.append("address", formData.address);
//   data.append("type", formData.type);
//   data.append("details", formData.details);

//   const response = await fetch(API_URL, {
//     method: "POST",
//     body: data,
//   });

//   const result = await response.json();

//   console.log("Google Apps Script Response:", result);

//   if (result.success) {
//     setComplaintId(result.complaintId || id);
//   } else {
//     alert(
//       result.message ||
//         "অভিযোগ সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।"
//     );
//   }
// } catch (error) {
//   console.error("Submit Error:", error);

//   alert(
//     "Server-এর সাথে যোগাযোগ করা যাচ্ছে না।\n\n" +
//       "Google Apps Script URL এবং Deployment ঠিক আছে কিনা পরীক্ষা করুন।"
//   );
// } finally {
//   setLoading(false);
// }


// };

// // নতুন অভিযোগ
// const handleNewComplaint = () => {
// setComplaintId("");
// setFormData(initialFormData);
// };

// // =========================
// // SUCCESS SCREEN
// // =========================

// if (complaintId) {
// return ( <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 md:py-16">
// {/* Animated Background */} <div className="absolute inset-0 overflow-hidden"> <div className="absolute left-[-120px] top-[-120px] h-80 w-80 animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-green-500/20 blur-3xl" />


//       <div className="absolute bottom-[-120px] right-[-100px] h-96 w-96 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl" />

//       <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-500/10 blur-3xl" />
//     </div>

//     <div className="relative mx-auto max-w-2xl">
//       <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl">
//         {/* Success Header */}
//         <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-cyan-500 px-6 py-12 text-center text-white md:px-10">
//           {/* Moving circles */}
//           <div className="absolute -right-16 -top-16 h-56 w-56 animate-[spin_18s_linear_infinite] rounded-full border border-white/10" />

//           <div className="absolute -bottom-20 -left-16 h-64 w-64 animate-[spin_22s_linear_infinite_reverse] rounded-full border border-white/10" />

//           <div className="relative">
//             <div className="mx-auto mb-5 flex h-24 w-24 animate-[bounce_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-white shadow-2xl">
//               <CheckCircle
//                 size={58}
//                 className="text-green-600"
//               />
//             </div>

//             <div className="mb-3 flex items-center justify-center gap-2 text-green-100">
//               <Sparkles size={16} />
//               <span className="text-sm font-bold">
//                 Complaint Submitted Successfully
//               </span>
//               <Sparkles size={16} />
//             </div>

//             <h1 className="text-2xl font-black md:text-3xl">
//               অভিযোগ সফলভাবে জমা হয়েছে
//             </h1>

//             <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-green-50 md:text-base">
//               আপনার অভিযোগটি বরপা সাব-জোনাল অফিসে সফলভাবে
//               পাঠানো হয়েছে।
//             </p>
//           </div>
//         </div>

//         <div className="p-5 md:p-8">
//           {/* Complaint ID */}
//           <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-green-300 bg-green-50 p-6 text-center md:p-8">
//             <div className="absolute -right-10 -top-10 h-28 w-28 animate-pulse rounded-full bg-green-200/40 blur-2xl" />

//             <div className="relative">
//               <div className="mb-3 flex items-center justify-center gap-2 text-green-700">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
//                   <Hash size={20} />
//                 </div>

//                 <span className="font-extrabold">
//                   আপনার Complaint ID
//                 </span>
//               </div>

//               <div className="mt-4 rounded-2xl bg-white px-4 py-4 shadow-md">
//                 <div className="break-all text-2xl font-black tracking-wider text-green-700 md:text-3xl">
//                   {complaintId}
//                 </div>
//               </div>

//               <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-gray-600">
//                 এই Complaint ID সংরক্ষণ করুন। পরবর্তীতে
//                 অভিযোগের Status Check করতে এটি প্রয়োজন হবে।
//               </p>
//             </div>
//           </div>

//           {/* Information */}
//           <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50 p-5">
//             <div className="flex gap-3">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
//                 <ShieldAlert
//                   size={21}
//                   className="text-blue-600"
//                 />
//               </div>

//               <div>
//                 <h3 className="font-extrabold text-blue-800">
//                   গুরুত্বপূর্ণ তথ্য
//                 </h3>

//                 <ul className="mt-2 space-y-2 text-sm leading-6 text-blue-700">
//                   <li>
//                     • Complaint ID-এর ছবি বা স্ক্রিনশট রেখে দিন।
//                   </li>

//                   <li>
//                     • এই ID দিয়ে Status Check করা যাবে।
//                   </li>

//                   <li>
//                     • জরুরি বৈদ্যুতিক দুর্ঘটনা হলে নিরাপদ দূরত্ব
//                     বজায় রাখুন।
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* New Complaint */}
//           <button
//             type="button"
//             onClick={handleNewComplaint}
//             className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 font-extrabold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
//           >
//             <span className="absolute inset-y-0 -left-20 w-16 -skew-x-12 bg-white/30 transition-all duration-700 group-hover:left-[110%]" />

//             <RotateCcw
//               size={19}
//               className="relative transition-transform duration-500 group-hover:-rotate-180"
//             />

//             <span className="relative">
//               নতুন অভিযোগ করুন
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );


// }

// // =========================
// // COMPLAINT FORM
// // =========================

// return ( <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 md:py-12">
// {/* ================================================= */}
// {/* LIVE BACKGROUND */}
// {/* ================================================= */}


//   <div className="pointer-events-none absolute inset-0 overflow-hidden">
//     {/* Main glowing blobs */}
//     <div className="absolute -left-40 -top-40 h-[500px] w-[500px] animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-blue-600/20 blur-3xl" />

//     <div className="absolute -right-40 top-20 h-[450px] w-[450px] animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl" />

//     <div className="absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-indigo-600/15 blur-3xl" />

//     {/* Floating particles */}
//     {particles.map((_, index) => (
//       <span
//         key={index}
//         className="absolute h-1.5 w-1.5 animate-[bounce_4s_ease-in-out_infinite] rounded-full bg-cyan-300/40"
//         style={{
//           left: `${(index * 17) % 100}%`,
//           top: `${(index * 23) % 100}%`,
//           animationDelay: `${index * 0.25}s`,
//           animationDuration: `${3 + (index % 4)}s`,
//         }}
//       />
//     ))}

//     {/* Animated grid */}
//     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />
//   </div>

//   <div className="relative mx-auto max-w-4xl">
//     {/* ================================================= */}
//     {/* HERO */}
//     {/* ================================================= */}

//     <div className="group relative mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-500 p-6 text-white shadow-2xl shadow-blue-950/50 md:p-10">
//       {/* Rotating glow */}
//       <div className="absolute -right-20 -top-20 h-72 w-72 animate-[spin_20s_linear_infinite] rounded-full border border-white/10" />

//       <div className="absolute -bottom-24 -left-20 h-80 w-80 animate-[spin_25s_linear_infinite_reverse] rounded-full border border-cyan-200/10" />

//       {/* Lightning glow */}
//       <div className="absolute right-16 top-16 h-24 w-24 animate-pulse rounded-full bg-yellow-300/20 blur-2xl" />

//       <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
//         <div>
//           {/* Office */}
//           <div className="mb-5 flex items-center gap-3">
//             <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-md transition duration-500 group-hover:rotate-6 group-hover:scale-110">
//               <Zap
//                 size={30}
//                 className="animate-pulse fill-yellow-300 text-yellow-300"
//               />

//               <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-green-300" />
//             </div>

//             <div>
//               <p className="text-sm font-extrabold text-cyan-100">
//                 বরপা সাব-জোনাল অফিস
//               </p>

//               <p className="text-xs text-blue-100">
//                 নারায়ণগঞ্জ পল্লী বিদ্যুৎ সমিতি-১
//               </p>
//             </div>
//           </div>

//           <h1 className="text-3xl font-black tracking-tight md:text-5xl">
//             বিদ্যুৎ অভিযোগ ফরম
//           </h1>

//           <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-50 md:text-base">
//             বিদ্যুৎ সংক্রান্ত যেকোনো সমস্যা বা অভিযোগ
//             অনলাইনে সহজেই জমা দিন।
//           </p>

//           {/* Live Badge */}
//           <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/10 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md">
//             <span className="relative flex h-2.5 w-2.5">
//               <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
//               <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
//             </span>

//             <Radio size={14} />

//             Online Complaint Service
//           </div>
//         </div>

//         {/* Animated icon */}
//         <div className="hidden md:block">
//           <div className="relative">
//             <div className="absolute inset-0 animate-ping rounded-full bg-cyan-300/10 blur-2xl" />

//             <FileText
//               size={125}
//               strokeWidth={1}
//               className="relative text-white/20 transition duration-700 group-hover:scale-110 group-hover:rotate-3"
//             />

//             <Zap
//               size={38}
//               className="absolute bottom-3 right-3 animate-bounce fill-yellow-300 text-yellow-300"
//             />
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* ================================================= */}
//     {/* FORM */}
//     {/* ================================================= */}

//     <form
//       onSubmit={handleSubmit}
//       className="overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl shadow-black/20"
//     >
//       {/* =============================================== */}
//       {/* SECTION 1 */}
//       {/* =============================================== */}

//       <div className="border-b border-gray-100 p-5 md:p-8">
//         <div className="mb-7 flex items-center gap-4">
//           <div className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-sm transition duration-300 hover:rotate-6 hover:scale-110">
//             <User
//               size={22}
//               className="transition group-hover:scale-110"
//             />
//           </div>

//           <div>
//             <h2 className="text-xl font-black text-gray-800">
//               অভিযোগকারীর তথ্য
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               আপনার ব্যক্তিগত তথ্য প্রদান করুন
//             </p>
//           </div>

//           <div className="ml-auto hidden items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600 sm:flex">
//             <CircleDot size={13} className="animate-pulse" />
//             Step 01
//           </div>
//         </div>

//         <div className="grid gap-5 md:grid-cols-2">
//           {/* Name */}
//           <div className="group">
//             <label className="mb-2 block text-sm font-bold text-gray-700">
//               অভিযোগকারীর নাম
//               <span className="ml-1 text-red-500">*</span>
//             </label>

//             <div className="relative">
//               <User
//                 size={18}
//                 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-blue-500"
//               />

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="আপনার নাম লিখুন"
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 hover:border-blue-300 hover:bg-blue-50/30 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
//               />
//             </div>
//           </div>

//           {/* Mobile */}
//           <div className="group">
//             <label className="mb-2 block text-sm font-bold text-gray-700">
//               মোবাইল নম্বর
//               <span className="ml-1 text-red-500">*</span>
//             </label>

//             <div className="relative">
//               <Phone
//                 size={18}
//                 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-blue-500"
//               />

//               <input
//                 type="tel"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 placeholder="01XXXXXXXXX"
//                 maxLength="11"
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 hover:border-blue-300 hover:bg-blue-50/30 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
//               />
//             </div>
//           </div>

//           {/* Consumer */}
//           <div className="group md:col-span-2">
//             <label className="mb-2 block text-sm font-bold text-gray-700">
//               গ্রাহক / হিসাব নম্বর
//               <span className="ml-2 text-xs font-normal text-gray-400">
//                 (যদি থাকে)
//               </span>
//             </label>

//             <div className="relative">
//               <Hash
//                 size={18}
//                 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-blue-500"
//               />

//               <input
//                 type="text"
//                 name="consumerNo"
//                 value={formData.consumerNo}
//                 onChange={handleChange}
//                 placeholder="গ্রাহক / হিসাব নম্বর লিখুন"
//                 className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 hover:border-blue-300 hover:bg-blue-50/30 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =============================================== */}
//       {/* SECTION 2 */}
//       {/* =============================================== */}

//       <div className="border-b border-gray-100 p-5 md:p-8">
//         <div className="mb-7 flex items-center gap-4">
//           <div className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-sm transition duration-300 hover:-rotate-6 hover:scale-110">
//             <MapPin
//               size={22}
//               className="transition group-hover:scale-110"
//             />
//           </div>

//           <div>
//             <h2 className="text-xl font-black text-gray-800">
//               অভিযোগের তথ্য
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               সমস্যা কোথায় এবং কী ধরনের তা জানান
//             </p>
//           </div>

//           <div className="ml-auto hidden items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 sm:flex">
//             <Activity size={13} className="animate-pulse" />
//             Step 02
//           </div>
//         </div>

//         <div className="space-y-6">
//           {/* Address */}
//           <div className="group">
//             <label className="mb-2 block text-sm font-bold text-gray-700">
//               সমস্যার ঠিকানা
//               <span className="ml-1 text-red-500">*</span>
//             </label>

//             <div className="relative">
//               <MapPin
//                 size={18}
//                 className="absolute left-3.5 top-3.5 text-gray-400 transition group-focus-within:text-emerald-500"
//               />

//               <textarea
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows="3"
//                 placeholder="গ্রাম/মহল্লা, ইউনিয়ন, থানা, জেলা লিখুন"
//                 className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm leading-6 text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 hover:border-emerald-300 hover:bg-emerald-50/20 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
//               />
//             </div>
//           </div>

//           {/* Complaint Type */}
//           <div className="group">
//             <label className="mb-2 block text-sm font-bold text-gray-700">
//               অভিযোগের ধরন
//               <span className="ml-1 text-red-500">*</span>
//             </label>

//             <div className="relative">
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-11 text-sm text-gray-700 outline-none transition duration-300 hover:border-blue-300 hover:bg-blue-50/30 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
//               >
//                 <option value="">
//                   -- অভিযোগের ধরন নির্বাচন করুন --
//                 </option>

//                 <option value="বিদ্যুৎ নেই">বিদ্যুৎ নেই</option>
//                 <option value="লো ভোল্টেজ">লো ভোল্টেজ</option>
//                 <option value="হাই ভোল্টেজ">হাই ভোল্টেজ</option>
//                 <option value="মিটার সমস্যা">মিটার সমস্যা</option>
//                 <option value="প্রিপেইড মিটার">প্রিপেইড মিটার</option>
//                 <option value="মিটার রিচার্জ সমস্যা">
//                   মিটার রিচার্জ সমস্যা
//                 </option>
//                 <option value="মিটার ডিসপ্লে সমস্যা">
//                   মিটার ডিসপ্লে সমস্যা
//                 </option>
//                 <option value="সার্ভিস ড্রপ সমস্যা">
//                   সার্ভিস ড্রপ সমস্যা
//                 </option>
//                 <option value="খুঁটি সমস্যা">খুঁটি সমস্যা</option>
//                 <option value="লাইন সমস্যা">লাইন সমস্যা</option>
//                 <option value="তার ছিঁড়ে গেছে">তার ছিঁড়ে গেছে</option>
//                 <option value="ট্রান্সফরমার সমস্যা">
//                   ট্রান্সফরমার সমস্যা
//                 </option>
//                 <option value="স্পার্কিং / আগুন">
//                   স্পার্কিং / আগুন
//                 </option>
//                 <option value="শর্ট সার্কিট">শর্ট সার্কিট</option>
//                 <option value="রাস্তার বাতি">রাস্তার বাতি</option>
//                 <option value="নতুন সংযোগ">নতুন সংযোগ</option>
//                 <option value="সংযোগ বিচ্ছিন্ন">
//                   সংযোগ বিচ্ছিন্ন
//                 </option>
//                 <option value="লোড বৃদ্ধি">লোড বৃদ্ধি</option>
//                 <option value="বিল সংক্রান্ত">বিল সংক্রান্ত</option>
//                 <option value="অন্যান্য">অন্যান্য</option>
//               </select>

//               <ChevronDown
//                 size={19}
//                 className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//             </div>
//           </div>

//           {/* Details */}
//           <div className="group">
//             <label className="mb-2 block text-sm font-bold text-gray-700">
//               অভিযোগের বিস্তারিত
//               <span className="ml-1 text-red-500">*</span>
//             </label>

//             <div className="relative">
//               <AlertTriangle
//                 size={18}
//                 className="absolute left-3.5 top-3.5 text-gray-400 transition group-focus-within:text-orange-500"
//               />

//               <textarea
//                 name="details"
//                 value={formData.details}
//                 onChange={handleChange}
//                 rows="5"
//                 placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন..."
//                 className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm leading-6 text-gray-800 outline-none transition duration-300 placeholder:text-gray-400 hover:border-orange-300 hover:bg-orange-50/20 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
//               />
//             </div>

//             <p className="mt-2 text-xs leading-5 text-gray-400">
//               সমস্যাটি কখন থেকে হচ্ছে, কোথায় হচ্ছে এবং
//               প্রয়োজনীয় অন্যান্য তথ্য লিখুন।
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* =============================================== */}
//       {/* SAFETY */}
//       {/* =============================================== */}

//       <div className="p-5 md:p-8">
//         <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-5">
//           <div className="absolute -right-8 -top-8 h-28 w-28 animate-pulse rounded-full bg-yellow-200/30 blur-2xl" />

//           <div className="relative flex gap-3">
//             <div className="flex h-11 w-11 shrink-0 animate-pulse items-center justify-center rounded-xl bg-amber-100">
//               <AlertTriangle
//                 className="text-amber-600"
//                 size={22}
//               />
//             </div>

//             <div>
//               <h3 className="font-extrabold text-amber-800">
//                 নিরাপত্তা সতর্কতা
//               </h3>

//               <p className="mt-1 text-sm leading-6 text-amber-700">
//                 ছিঁড়ে যাওয়া বৈদ্যুতিক তার, স্পার্কিং বা আগুনের
//                 ক্ষেত্রে তার কাছাকাছি যাবেন না। নিরাপদ দূরত্ব
//                 বজায় রাখুন এবং দ্রুত বিদ্যুৎ অফিসে যোগাযোগ করুন।
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-500 px-5 py-4 text-base font-black text-white shadow-xl shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {/* Shine animation */}
//           {!loading && (
//             <span className="absolute inset-y-0 -left-24 w-20 -skew-x-12 bg-white/30 transition-all duration-700 group-hover:left-[110%]" />
//           )}

//           {loading ? (
//             <>
//               <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
//               অভিযোগ জমা হচ্ছে...
//             </>
//           ) : (
//             <>
//               <Send
//                 size={20}
//                 className="relative transition duration-300 group-hover:translate-x-1 group-hover:-rotate-6"
//               />

//               <span className="relative">
//                 অভিযোগ জমা দিন
//               </span>
//             </>
//           )}
//         </button>

//         <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
//           <ShieldAlert size={14} />

//           <p>
//             অভিযোগ জমা দেওয়ার পর আপনি একটি Complaint ID পাবেন।
//           </p>
//         </div>
//       </div>
//     </form>

//     {/* Bottom */}
//     <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-500">
//       <Zap size={13} className="animate-pulse text-cyan-400" />

//       <span>
//         Barpa Sub-Zonal Office • Narayanganj Palli Bidyut Samity-1
//       </span>
//     </div>
//   </div>
// </div>


// );
// }

// export default ComplaintForm;





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
  Activity,
  Image as ImageIcon,
  Video,
  X,
  Upload,
  PlayCircle
} from "lucide-react";

const API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

{/* ===================================================== */}
{/* FILE SIZE LIMIT */}
{/* ===================================================== */}
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; {/* 5 MB */}
const MAX_VIDEO_SIZE = 10 * 1024 * 1024; {/* 10 MB */}

{/* ===================================================== */}
{/* COMPLAINT TYPES */}
{/* ===================================================== */}
const complaintTypes = [
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
  "সংযোগ বিচ্ছিন্ন",
  "লোড বৃদ্ধি",
  "বিল সংক্রান্ত",
  "অন্যান্য"
];

{/* ===================================================== */}
{/* GENERATE COMPLAINT ID */}
{/* ===================================================== */}
function generateComplaintId() {
  const now = new Date();
  const date =
    now.getFullYear() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `BPO-${date}-${random}`;
}

{/* ===================================================== */}
{/* COMPONENT */}
{/* ===================================================== */}
export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    consumerNo: "",
    address: "",
    type: "",
    details: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  {/* =================================================== */}
  {/* INPUT CHANGE */}
  {/* =================================================== */}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  {/* =================================================== */}
  {/* IMAGE SELECT */}
  {/* =================================================== */}
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    {/* Size validation */}
    if (file.size > MAX_IMAGE_SIZE) {
      setError("ছবির সর্বোচ্চ সাইজ 5 MB হতে হবে।");
      e.target.value = "";
      return;
    }

    {/* Type validation */}
    if (!file.type.startsWith("image/")) {
      setError("শুধুমাত্র Image File নির্বাচন করুন।");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  {/* =================================================== */}
  {/* VIDEO SELECT */}
  {/* =================================================== */}
  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    {/* Size validation */}
    if (file.size > MAX_VIDEO_SIZE) {
      setError("ভিডিওর সর্বোচ্চ সাইজ 10 MB হতে হবে।");
      e.target.value = "";
      return;
    }

    {/* Type validation */}
    if (!file.type.startsWith("video/")) {
      setError("শুধুমাত্র Video File নির্বাচন করুন।");
      e.target.value = "";
      return;
    }

    setVideoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
  };

  {/* =================================================== */}
  {/* REMOVE IMAGE */}
  {/* =================================================== */}
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  {/* =================================================== */}
  {/* REMOVE VIDEO */}
  {/* =================================================== */}
  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview("");
  };

  {/* =================================================== */}
  {/* FILE → BASE64 */}
  {/* =================================================== */}
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  {/* =================================================== */}
  {/* SUBMIT */}
  {/* =================================================== */}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    {/* ------------------------------------------------- */}
    {/* VALIDATION */}
    {/* ------------------------------------------------- */}
    if (!formData.name.trim()) {
      setError("অভিযোগকারীর নাম দিন।");
      return;
    }

    if (!formData.mobile.trim()) {
      setError("মোবাইল নম্বর দিন।");
      return;
    }

    if (!formData.address.trim()) {
      setError("ঠিকানা দিন।");
      return;
    }

    if (!formData.type) {
      setError("অভিযোগের ধরন নির্বাচন করুন।");
      return;
    }

    if (!formData.details.trim()) {
      setError("অভিযোগের বিস্তারিত লিখুন।");
      return;
    }

    if (!API_URL) {
      setError("Google Apps Script URL পাওয়া যায়নি।");
      return;
    }

    try {
      setLoading(true);

      {/* ------------------------------------------------ */}
      {/* COMPLAINT ID */}
      {/* ------------------------------------------------ */}
      const newComplaintId = generateComplaintId();

      {/* ------------------------------------------------ */}
      {/* FORM DATA */}
      {/* ------------------------------------------------ */}
      const data = new FormData();
      data.append("action", "createComplaint");
      data.append("complaintId", newComplaintId);
      data.append("name", formData.name);
      data.append("mobile", formData.mobile);
      data.append("consumerNo", formData.consumerNo);
      data.append("address", formData.address);
      data.append("type", formData.type);
      data.append("details", formData.details);

      {/* ------------------------------------------------ */}
      {/* IMAGE → BASE64 */}
      {/* ------------------------------------------------ */}
      if (imageFile) {
        const imageBase64 = await fileToBase64(imageFile);
        data.append("imageData", imageBase64);
        data.append("imageName", imageFile.name);
        data.append("imageMimeType", imageFile.type);
      }

      {/* ------------------------------------------------ */}
      {/* VIDEO → BASE64 */}
      {/* ------------------------------------------------ */}
      if (videoFile) {
        const videoBase64 = await fileToBase64(videoFile);
        data.append("videoData", videoBase64);
        data.append("videoName", videoFile.name);
        data.append("videoMimeType", videoFile.type);
      }

      {/* ------------------------------------------------ */}
      {/* SEND TO GOOGLE APPS SCRIPT */}
      {/* ------------------------------------------------ */}
      const response = await fetch(API_URL, {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Complaint submit failed");
      }

      {/* ------------------------------------------------ */}
      {/* SUCCESS */}
      {/* ------------------------------------------------ */}
      setComplaintId(result.complaintId || newComplaintId);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "অভিযোগ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  {/* =================================================== */}
  {/* NEW COMPLAINT */}
  {/* =================================================== */}
  const handleNewComplaint = () => {
    setFormData({
      name: "",
      mobile: "",
      consumerNo: "",
      address: "",
      type: "",
      details: ""
    });

    setImageFile(null);
    setVideoFile(null);
    setImagePreview("");
    setVideoPreview("");
    setComplaintId("");
    setError("");
  };

  {/* =================================================== */}
  {/* SUCCESS SCREEN */}
  {/* =================================================== */}
  if (complaintId) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-slate-900 shadow-2xl">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative p-8 sm:p-12 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-400/30">
                <CheckCircle className="text-emerald-400" size={48} />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                অভিযোগ সফলভাবে জমা হয়েছে
              </h1>

              <p className="mt-3 text-slate-400">
                আপনার অভিযোগটি বরপা সাব-জোনাল অফিসে পাঠানো হয়েছে।
              </p>

              <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
                <p className="text-sm text-slate-400">আপনার Complaint ID</p>

                <div className="mt-2 text-2xl sm:text-3xl font-black tracking-wider text-cyan-400">
                  {complaintId}
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  এই Complaint ID সংরক্ষণ করুন। পরবর্তীতে অভিযোগের Status দেখতে এটি প্রয়োজন হবে।
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5 text-left">
                <div className="flex gap-3">
                  <ShieldAlert className="mt-1 shrink-0 text-emerald-400" size={22} />
                  <div>
                    <h3 className="font-bold text-white">নিরাপত্তা সতর্কতা</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      বৈদ্যুতিক তার, খুঁটি বা স্পার্কিংয়ের কাছে নিজে গিয়ে কাজ করার চেষ্টা করবেন না। নিরাপদ দূরত্ব বজায় রাখুন।
                    </p>
                  </div>
                </div>
              </div>

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

  {/* =================================================== */}
  {/* MAIN FORM */}
  {/* =================================================== */}
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-500 p-7 sm:p-10 shadow-2xl">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                <Radio className="animate-pulse" size={14} />
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
              বিদ্যুৎ সংক্রান্ত সমস্যা দ্রুত জানাতে নিচের ফর্মটি পূরণ করুন। প্রয়োজন হলে সমস্যার ছবি বা ভিডিও সংযুক্ত করতে পারেন।
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-5 flex gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
            <AlertTriangle className="mt-0.5 shrink-0" size={22} />
            <p className="text-sm leading-6">{error}</p>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* USER INFORMATION */}
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
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  নাম *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="আপনার নাম"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3.5 pl-10 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* MOBILE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  মোবাইল নম্বর *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3.5 pl-10 pr-4 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* CONSUMER */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">
                  গ্রাহক / মিটার নম্বর
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
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

          {/* ADDRESS */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <MapPin size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">ঠিকানা</h2>
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

          {/* COMPLAINT TYPE */}
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

            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3.5 pr-12 text-white outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              >
                <option value="">অভিযোগের ধরন নির্বাচন করুন</option>

                {complaintTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            </div>

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

          {/* MEDIA UPLOAD */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Upload size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  ছবি / ভিডিও সংযুক্ত করুন
                </h2>
                <p className="text-sm text-slate-500">
                  সমস্যা বুঝতে সহায়তা করার জন্য ছবি বা ভিডিও দিতে পারেন
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* IMAGE */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="text-purple-400" size={20} />
                    <span className="font-semibold text-white">ছবি</span>
                  </div>

                  <span className="text-xs text-slate-500">Max 5 MB</span>
                </div>

                {!imageFile ? (
                  <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 bg-slate-900/60 px-4 text-center transition hover:border-purple-500 hover:bg-purple-500/5">
                    <ImageIcon className="mb-3 text-slate-500" size={34} />
                    <span className="font-semibold text-slate-300">
                      ছবি নির্বাচন করুন
                    </span>
                    <span className="mt-1 text-xs text-slate-500">
                      JPG, PNG, WEBP
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-black">
                    <img
                      src={imagePreview}
                      alt="Complaint preview"
                      className="h-56 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
                    >
                      <X size={18} />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="truncate text-sm text-white">
                        {imageFile.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* VIDEO */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="text-cyan-400" size={20} />
                    <span className="font-semibold text-white">ভিডিও</span>
                  </div>

                  <span className="text-xs text-slate-500">Max 10 MB</span>
                </div>

                {!videoFile ? (
                  <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 bg-slate-900/60 px-4 text-center transition hover:border-cyan-500 hover:bg-cyan-500/5">
                    <Video className="mb-3 text-slate-500" size={34} />
                    <span className="font-semibold text-slate-300">
                      ভিডিও নির্বাচন করুন
                    </span>
                    <span className="mt-1 text-xs text-slate-500">
                      MP4, WEBM ইত্যাদি
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      capture="environment"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-black">
                    <video
                      src={videoPreview}
                      controls
                      className="h-56 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-purple-500/10 bg-purple-500/5 p-4">
              <div className="flex gap-3">
                <PlayCircle className="mt-0.5 shrink-0 text-purple-400" size={20} />
                <p className="text-xs leading-6 text-slate-400">
                  ছবি বা ভিডিও দেওয়া বাধ্যতামূলক নয়। তবে বৈদ্যুতিক তার ছিঁড়ে যাওয়া, খুঁটি সমস্যা, স্পার্কিং, ট্রান্সফরমার সমস্যা ইত্যাদির ক্ষেত্রে ছবি/ভিডিও দিলে সমস্যাটি দ্রুত বুঝতে সুবিধা হবে।
                </p>
              </div>
            </div>
          </section>

          {/* SAFETY WARNING */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="mt-1 shrink-0 text-red-400" size={22} />
              <div>
                <h3 className="font-bold text-red-300">জরুরি নিরাপত্তা সতর্কতা</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  বৈদ্যুতিক তার ছিঁড়ে গেলে, স্পার্কিং বা আগুন দেখা দিলে তার কাছাকাছি যাবেন না এবং অন্যদেরও দূরে রাখুন।
                </p>
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
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
                <Send className="transition group-hover:translate-x-1" size={20} />
                অভিযোগ জমা দিন
                <Sparkles size={18} />
              </>
            )}
          </button>
        </form>

        {/* FOOTER NOTE */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-600">
          <FileText size={14} />
          বরপা সাব-জোনাল অফিস — অনলাইন অভিযোগ সেবা
        </div>
      </div>
    </div>
  );
}