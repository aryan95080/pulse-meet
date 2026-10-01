import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FiCalendar,
  FiCamera,
  FiCheck,
  FiEdit3,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSave,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";

const MyProfile = () => {
  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData,
  } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // Cleanup preview URL when image changes/unmounts
  // --------------------------------------------------
  useEffect(() => {
    if (!image) return;

    const previewUrl = URL.createObjectURL(image);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [image]);

  // --------------------------------------------------
  // Update profile
  // --------------------------------------------------
  const updateUserProfileData = async () => {
    if (!userData?.name?.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!userData?.phone?.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);

      formData.append(
        "address",
        JSON.stringify(userData.address || {
          line1: "",
          line2: "",
        })
      );

      formData.append("gender", userData.gender || "");
      formData.append("dob", userData.dob || "");

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Profile updated successfully.");

        await loadUserProfileData();

        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message || "Unable to update profile.");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Cancel editing
  // --------------------------------------------------
  const handleCancelEdit = async () => {
    setIsEdit(false);
    setImage(false);

    // Reload original server data so unsaved changes disappear.
    if (token) {
      await loadUserProfileData();
    }
  };

  // --------------------------------------------------
  // Image selection
  // --------------------------------------------------
  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

    setImage(selectedFile);
  };

  if (!userData) {
    return (
      <main className="min-h-[70vh] w-full overflow-x-hidden bg-gray-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-8 w-44 rounded-lg bg-gray-200" />
          <div className="mt-2 h-4 w-64 rounded bg-gray-200" />

          <div className="mt-8 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col items-center">
              <div className="h-28 w-28 rounded-full bg-gray-200" />
              <div className="mt-5 h-6 w-40 rounded bg-gray-200" />
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="mt-2 h-11 rounded-xl bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  const previewImage = image
    ? URL.createObjectURL(image)
    : userData.image;

  return (
    <main className="min-h-[70vh] w-full overflow-x-hidden bg-gray-50 px-3 py-7 sm:px-5 sm:py-9 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* ==================================================
            PAGE HEADER
        ================================================== */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
            <FiUser />
            Account Profile
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
            Manage your personal information and keep your PULSE-MEET
            profile up to date.
          </p>
        </div>

        {/* ==================================================
            PROFILE CARD
        ================================================== */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:rounded-3xl">
          {/* ==================================================
              PROFILE HERO
          ================================================== */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 px-4 py-8 sm:px-8 sm:py-10">
            {/* Decorative shapes */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              {/* Profile image */}
              <div className="relative shrink-0">
                <label
                  htmlFor="profile-image"
                  className={
                    isEdit
                      ? "group block cursor-pointer"
                      : "block"
                  }
                >
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white/80 bg-white shadow-xl sm:h-32 sm:w-32">
                    <img
                      src={previewImage}
                      alt={userData.name || "Profile"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {isEdit && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 text-white opacity-100 transition-all">
                        <FiCamera className="text-xl" />

                        <span className="mt-1 text-[10px] font-semibold">
                          Change Photo
                        </span>
                      </div>
                    )}
                  </div>

                  {isEdit && (
                    <span className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-blue-600 bg-white text-blue-600 shadow-lg">
                      <FiCamera className="text-sm" />
                    </span>
                  )}

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Profile information */}
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm sm:text-xs">
                    PULSE-MEET Member
                  </span>

                  <span className="inline-flex items-center gap-1 rounded-full bg-green-400/15 px-2.5 py-1 text-[10px] font-semibold text-green-100 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                    Active
                  </span>
                </div>

                {isEdit ? (
                  <input
                    type="text"
                    value={userData.name || ""}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Enter your name"
                    className="
                      mt-3 w-full max-w-sm rounded-xl border
                      border-white/20 bg-white/10 px-4 py-3
                      text-lg font-bold text-white outline-none
                      placeholder:text-white/50
                      focus:border-white/50 focus:bg-white/15
                    "
                  />
                ) : (
                  <h2 className="mt-3 break-words text-2xl font-bold text-white sm:text-3xl">
                    {userData.name || "PULSE-MEET User"}
                  </h2>
                )}

                <p className="mt-2 flex items-center justify-center gap-2 break-all text-xs text-blue-100 sm:justify-start sm:text-sm">
                  <FiMail className="shrink-0" />
                  {userData.email}
                </p>
              </div>

              {/* Desktop edit button */}
              <div className="hidden shrink-0 sm:block">
                {!isEdit ? (
                  <button
                    type="button"
                    onClick={() => setIsEdit(true)}
                    className="
                      inline-flex min-h-[44px] items-center gap-2
                      rounded-xl bg-white px-5 py-2.5 text-sm
                      font-semibold text-blue-600 shadow-lg
                      transition-all duration-300
                      hover:-translate-y-0.5 hover:bg-blue-50
                      active:scale-95
                    "
                  >
                    <FiEdit3 />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="
                      inline-flex min-h-[44px] items-center gap-2
                      rounded-xl border border-white/30
                      bg-white/10 px-5 py-2.5 text-sm
                      font-semibold text-white backdrop-blur-sm
                      transition-all duration-300
                      hover:bg-white/20 active:scale-95
                      disabled:cursor-not-allowed disabled:opacity-50
                    "
                  >
                    <FiX />
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Mobile action */}
            <div className="relative mt-6 sm:hidden">
              {!isEdit ? (
                <button
                  type="button"
                  onClick={() => setIsEdit(true)}
                  className="
                    flex min-h-[44px] w-full items-center
                    justify-center gap-2 rounded-xl bg-white
                    px-5 py-2.5 text-sm font-semibold
                    text-blue-600 shadow-lg transition-all
                    duration-300 active:scale-[0.98]
                  "
                >
                  <FiEdit3 />
                  Edit Profile
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="
                    flex min-h-[44px] w-full items-center
                    justify-center gap-2 rounded-xl border
                    border-white/30 bg-white/10 px-5 py-2.5
                    text-sm font-semibold text-white
                    backdrop-blur-sm transition-all
                    duration-300 active:scale-[0.98]
                    disabled:opacity-50
                  "
                >
                  <FiX />
                  Cancel Editing
                </button>
              )}
            </div>
          </div>

          {/* ==================================================
              PROFILE CONTENT
          ================================================== */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* ==================================================
                CONTACT INFORMATION
            ================================================== */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiUser />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                    Contact Information
                  </h3>

                  <p className="text-xs text-gray-500">
                    Your primary contact details
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Email */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <FiMail />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Email Address
                      </p>

                      <p className="mt-1 break-all text-sm font-medium text-gray-800">
                        {userData.email || "Not provided"}
                      </p>

                      <p className="mt-1 text-[10px] text-gray-400">
                        Email cannot be changed here
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <FiPhone />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Phone Number
                      </p>

                      {isEdit ? (
                        <input
                          type="tel"
                          value={userData.phone || ""}
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="Enter phone number"
                          className="
                            mt-2 min-h-[42px] w-full rounded-xl
                            border border-gray-200 bg-white px-3
                            text-sm text-gray-800 outline-none
                            transition-all
                            focus:border-blue-500 focus:ring-4
                            focus:ring-blue-100
                          "
                        />
                      ) : (
                        <p className="mt-1 break-words text-sm font-medium text-gray-800">
                          {userData.phone || "Not provided"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 sm:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                      <FiMapPin />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Address
                      </p>

                      {isEdit ? (
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          <input
                            type="text"
                            value={userData.address?.line1 || ""}
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                address: {
                                  ...(prev.address || {}),
                                  line1: e.target.value,
                                },
                              }))
                            }
                            placeholder="Address line 1"
                            className="
                              min-h-[42px] w-full rounded-xl
                              border border-gray-200 bg-white px-3
                              text-sm text-gray-800 outline-none
                              transition-all
                              focus:border-blue-500 focus:ring-4
                              focus:ring-blue-100
                            "
                          />

                          <input
                            type="text"
                            value={userData.address?.line2 || ""}
                            onChange={(e) =>
                              setUserData((prev) => ({
                                ...prev,
                                address: {
                                  ...(prev.address || {}),
                                  line2: e.target.value,
                                },
                              }))
                            }
                            placeholder="Address line 2"
                            className="
                              min-h-[42px] w-full rounded-xl
                              border border-gray-200 bg-white px-3
                              text-sm text-gray-800 outline-none
                              transition-all
                              focus:border-blue-500 focus:ring-4
                              focus:ring-blue-100
                            "
                          />
                        </div>
                      ) : (
                        <div className="mt-1 text-sm leading-6 text-gray-700">
                          <p>
                            {userData.address?.line1 ||
                              "Address not provided"}
                          </p>

                          {userData.address?.line2 && (
                            <p>{userData.address.line2}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <div className="my-7 h-px bg-gray-100 sm:my-8" />

            {/* ==================================================
                BASIC INFORMATION
            ================================================== */}
            <section>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiCalendar />
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                    Basic Information
                  </h3>

                  <p className="text-xs text-gray-500">
                    Personal information used for your profile
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Gender */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Gender
                  </p>

                  {isEdit ? (
                    <select
                      value={userData.gender || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      className="
                        mt-2 min-h-[42px] w-full rounded-xl
                        border border-gray-200 bg-white px-3
                        text-sm text-gray-800 outline-none
                        transition-all
                        focus:border-blue-500 focus:ring-4
                        focus:ring-blue-100
                      "
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-gray-800">
                      {userData.gender || "Not provided"}
                    </p>
                  )}
                </div>

                {/* Birthday */}
                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Date of Birth
                  </p>

                  {isEdit ? (
                    <input
                      type="date"
                      value={userData.dob || ""}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                      className="
                        mt-2 min-h-[42px] w-full rounded-xl
                        border border-gray-200 bg-white px-3
                        text-sm text-gray-800 outline-none
                        transition-all
                        focus:border-blue-500 focus:ring-4
                        focus:ring-blue-100
                      "
                    />
                  ) : (
                    <p className="mt-2 text-sm font-medium text-gray-800">
                      {userData.dob || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* ==================================================
                SECURITY INFO
            ================================================== */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-green-100 bg-green-50/60 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                <FiShield />
              </div>

              <div>
                <p className="text-xs font-bold text-green-800 sm:text-sm">
                  Your information is protected
                </p>

                <p className="mt-1 text-[10px] leading-5 text-green-700 sm:text-xs">
                  Your profile information is securely associated with
                  your PULSE-MEET account.
                </p>
              </div>
            </div>

            {/* ==================================================
                ACTIONS
            ================================================== */}
            {isEdit && (
              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="
                    min-h-[46px] rounded-xl border border-gray-200
                    bg-white px-6 py-2.5 text-sm font-semibold
                    text-gray-600 transition-all duration-300
                    hover:border-gray-300 hover:bg-gray-50
                    active:scale-95 disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={updateUserProfileData}
                  disabled={saving}
                  className="
                    inline-flex min-h-[46px] items-center
                    justify-center gap-2 rounded-xl bg-blue-600
                    px-7 py-2.5 text-sm font-semibold text-white
                    shadow-lg shadow-blue-100 transition-all duration-300
                    hover:-translate-y-0.5 hover:bg-blue-700
                    hover:shadow-xl active:scale-95
                    disabled:cursor-not-allowed disabled:bg-blue-400
                    disabled:shadow-none
                  "
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Save Information
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}
          <div className="border-t border-gray-100 bg-gray-50/70 px-4 py-4 sm:px-8">
            <div className="flex flex-col items-center justify-between gap-2 text-center text-[10px] text-gray-400 sm:flex-row sm:text-left sm:text-xs">
              <p>Keep your profile information up to date.</p>

              <div className="flex items-center gap-1.5">
                <FiCheck className="text-green-500" />
                <span>PULSE-MEET Account</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyProfile;