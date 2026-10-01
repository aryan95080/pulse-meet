import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FiUploadCloud,
  FiUser,
  FiMail,
  FiLock,
  FiBriefcase,
  FiDollarSign,
  FiAward,
  FiMapPin,
  FiFileText,
  FiEye,
  FiEyeOff,
  FiPlus,
  FiLoader,
} from "react-icons/fi";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, aToken } = useContext(AdminContext);

  /* --------------------------------
     Image Preview
  --------------------------------- */
  useEffect(() => {
    if (!docImg) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(docImg);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [docImg]);

  /* --------------------------------
     Image Selection
  --------------------------------- */
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    setDocImg(file);
  };

  /* --------------------------------
     Reset Form
  --------------------------------- */
  const resetForm = () => {
    setDocImg(null);
    setPreviewUrl("");
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setExperience("1 Year");
    setFees("");
    setAbout("");
    setSpeciality("General physician");
    setDegree("");
    setAddress1("");
    setAddress2("");
  };

  /* --------------------------------
     Submit
  --------------------------------- */
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (loading) return;

    if (!docImg) {
      toast.error("Please select a doctor image.");
      return;
    }

    if (!aToken) {
      toast.error("Admin authentication token is missing.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree.trim());

      formData.append(
        "address",
        JSON.stringify({
          line1: address1.trim(),
          line2: address2.trim(),
        })
      );

      formData.append("about", about.trim());

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Doctor added successfully.");
        resetForm();
      } else {
        toast.error(data.message || "Unable to add doctor.");
      }
    } catch (error) {
      console.error("Add Doctor Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     Reusable Input Classes
  --------------------------------- */
  const inputClasses = `
    w-full
    rounded-xl
    border border-gray-200
    bg-white
    px-4
    py-3
    text-sm
    text-gray-800
    outline-none
    placeholder:text-gray-400
    transition-all
    duration-200
    focus:border-blue-500
    focus:ring-4
    focus:ring-blue-500/10
    hover:border-gray-300
  `;

  const labelClasses = `
    mb-1.5
    flex
    items-center
    gap-2
    text-sm
    font-semibold
    text-gray-700
  `;

  const fieldIconClasses = "text-blue-500";

  return (
    <div className="min-h-full w-full bg-gray-50/70 p-3 sm:p-5 md:p-6 lg:p-8">
      <form
        onSubmit={onSubmitHandler}
        className="mx-auto w-full max-w-6xl"
      >
        {/* =====================================
            PAGE HEADER
        ====================================== */}
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FiUser className="text-lg" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Add Doctor
                </h1>

                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  Create a new doctor profile and add their details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            MAIN CARD
        ====================================== */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Card Header */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 via-white to-white px-4 py-4 sm:px-6 sm:py-5 md:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <FiPlus className="text-lg" />
              </div>

              <div>
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                  Doctor Information
                </h2>

                <p className="text-xs text-gray-500 sm:text-sm">
                  Fill in the required information below.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================
              FORM BODY
          ====================================== */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* =====================================
                IMAGE UPLOAD
            ====================================== */}
            <div className="mb-7 rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Image */}
                <label
                  htmlFor="doc-img"
                  className="
                    group
                    relative
                    mx-auto
                    block
                    h-28
                    w-28
                    shrink-0
                    cursor-pointer
                    overflow-hidden
                    rounded-2xl
                    border-2
                    border-dashed
                    border-blue-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-blue-400
                    hover:shadow-md
                    sm:mx-0
                    sm:h-32
                    sm:w-32
                  "
                >
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Doctor preview"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <FiUploadCloud className="text-2xl text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 px-3 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FiUploadCloud className="text-xl" />
                      </div>

                      <span className="text-[11px] font-semibold text-gray-500">
                        Upload Image
                      </span>
                    </div>
                  )}
                </label>

                <input
                  id="doc-img"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Upload Details */}
                <div className="min-w-0 text-center sm:text-left">
                  <h3 className="text-sm font-bold text-gray-800 sm:text-base">
                    Doctor Profile Picture
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    Upload a clear professional photo of the doctor.
                  </p>

                  <p className="mt-2 text-[11px] text-gray-400">
                    JPG, JPEG, PNG • Maximum 5MB
                  </p>

                  {docImg && (
                    <p className="mt-2 truncate text-xs font-medium text-blue-600">
                      Selected: {docImg.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* =====================================
                BASIC INFORMATION
            ====================================== */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-blue-600" />
                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Doctor Name */}
                <div>
                  <label htmlFor="doctor-name" className={labelClasses}>
                    <FiUser className={fieldIconClasses} />
                    Doctor Name
                  </label>

                  <input
                    id="doctor-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                    type="text"
                    placeholder="Enter doctor's full name"
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="doctor-email" className={labelClasses}>
                    <FiMail className={fieldIconClasses} />
                    Email Address
                  </label>

                  <input
                    id="doctor-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                    type="email"
                    placeholder="doctor@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="doctor-password" className={labelClasses}>
                    <FiLock className={fieldIconClasses} />
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="doctor-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`${inputClasses} pr-12`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="
                        absolute
                        right-2
                        top-1/2
                        flex
                        h-9
                        w-9
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-400
                        transition-colors
                        hover:bg-gray-100
                        hover:text-gray-700
                      "
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className={labelClasses}>
                    <FiBriefcase className={fieldIconClasses} />
                    Experience
                  </label>

                  <select
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className={inputClasses}
                    required
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={`${i + 1} Year`}>
                        {i + 1} Year
                      </option>
                    ))}

                    <option value="More than 10">
                      More than 10
                    </option>
                  </select>
                </div>

                {/* Fees */}
                <div>
                  <label htmlFor="fees" className={labelClasses}>
                    <FiDollarSign className={fieldIconClasses} />
                    Consultation Fees
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                      ₹
                    </span>

                    <input
                      id="fees"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      className={`${inputClasses} pl-9`}
                      type="number"
                      min="0"
                      placeholder="Enter consultation fee"
                      required
                    />
                  </div>
                </div>

                {/* Speciality */}
                <div>
                  <label htmlFor="speciality" className={labelClasses}>
                    <FiAward className={fieldIconClasses} />
                    Speciality
                  </label>

                  <select
                    id="speciality"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className={inputClasses}
                    required
                  >
                    <option value="General physician">
                      General physician
                    </option>
                    <option value="Gynecologist">
                      Gynecologist
                    </option>
                    <option value="Dermatologist">
                      Dermatologist
                    </option>
                    <option value="Pediatricians">
                      Pediatricians
                    </option>
                    <option value="Neurologist">
                      Neurologist
                    </option>
                    <option value="Gastroenterologist">
                      Gastroenterologist
                    </option>
                  </select>
                </div>

                {/* Education */}
                <div className="md:col-span-2">
                  <label htmlFor="degree" className={labelClasses}>
                    <FiAward className={fieldIconClasses} />
                    Education / Degree
                  </label>

                  <input
                    id="degree"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className={inputClasses}
                    type="text"
                    placeholder="e.g. MBBS, MD, BDS"
                    required
                  />
                </div>
              </div>
            </div>

            {/* =====================================
                ADDRESS
            ====================================== */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-blue-600" />

                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                  Address
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="address1" className={labelClasses}>
                    <FiMapPin className={fieldIconClasses} />
                    Address Line 1
                  </label>

                  <input
                    id="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className={inputClasses}
                    type="text"
                    placeholder="Street / Building / Area"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address2" className={labelClasses}>
                    <FiMapPin className={fieldIconClasses} />
                    Address Line 2
                  </label>

                  <input
                    id="address2"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    className={inputClasses}
                    type="text"
                    placeholder="City / State / ZIP"
                    required
                  />
                </div>
              </div>
            </div>

            {/* =====================================
                ABOUT
            ====================================== */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-5 w-1 rounded-full bg-blue-600" />

                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                  About Doctor
                </h3>
              </div>

              <label htmlFor="about" className={labelClasses}>
                <FiFileText className={fieldIconClasses} />
                Professional Description
              </label>

              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={`${inputClasses} min-h-[130px] resize-y`}
                placeholder="Write a short professional description about the doctor, their expertise and experience..."
                rows={5}
                required
              />

              <div className="mt-1.5 flex justify-end">
                <span className="text-[11px] text-gray-400">
                  {about.length} characters
                </span>
              </div>
            </div>

            {/* =====================================
                ACTIONS
            ====================================== */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="
                  min-h-[46px]
                  rounded-xl
                  border border-gray-200
                  bg-white
                  px-6
                  text-sm
                  font-semibold
                  text-gray-600
                  transition-all
                  duration-200
                  hover:border-gray-300
                  hover:bg-gray-50
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:min-w-[120px]
                "
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  min-h-[46px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-7
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  shadow-blue-600/20
                  transition-all
                  duration-200
                  hover:bg-blue-700
                  hover:shadow-md
                  hover:shadow-blue-600/20
                  active:scale-[0.98]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:min-w-[150px]
                "
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin text-base" />
                    Adding...
                  </>
                ) : (
                  <>
                    <FiPlus className="text-base" />
                    Add Doctor
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;