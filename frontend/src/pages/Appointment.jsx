import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FiArrowLeft,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiInfo,
  FiMapPin,
  FiShield,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

const Appointment = () => {
  const { docId } = useParams();

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const daysOfWeek = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(false);

  // --------------------------------------------------
  // Scroll helper
  // --------------------------------------------------
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --------------------------------------------------
  // Get doctor information
  // --------------------------------------------------
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // --------------------------------------------------
  // Generate available appointment slots
  // --------------------------------------------------
  const getAvailableSlots = async () => {
    if (!docInfo) return;

    setDocSlots([]);
    setSlotIndex(0);
    setSlotTime("");

    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);

      currentDate.setDate(today.getDate() + i);

      // Appointment closing time: 9:00 PM
      const endTime = new Date(today);

      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Start time
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        );

        currentDate.setMinutes(
          currentDate.getMinutes() > 30 ? 30 : 0
        );
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      const timeSlots = [];

      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        const slotDate = `${year}-${month}-${day}`;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked?.[slotDate]?.includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // --------------------------------------------------
  // Book appointment
  // --------------------------------------------------
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      navigate("/login");
      scrollToTop();
      return;
    }

    if (!docSlots.length || !docSlots[slotIndex]?.length) {
      toast.warn("No appointment slots available for this day");
      return;
    }

    if (!slotTime) {
      toast.warn("Please select an appointment time");
      return;
    }

    try {
      setLoading(true);

      const date = docSlots[slotIndex][0].datetime;

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const slotDate = `${year}-${month}-${day}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        getDoctorsData();

        navigate("/my-appointments");
        scrollToTop();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while booking the appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Effects
  // --------------------------------------------------
  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // --------------------------------------------------
  // Loading / doctor not found
  // --------------------------------------------------
  if (!docInfo) {
    return (
      <main className="min-h-[60vh] w-full bg-gray-50 px-4 py-16">
        <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <FiUser className="text-2xl" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Doctor not found
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            We couldn't find the doctor you're looking for. Please return to
            the doctors list and try again.
          </p>

          <button
            type="button"
            onClick={() => {
              navigate("/doctors");
              scrollToTop();
            }}
            className="
              mt-6 inline-flex min-h-[44px] items-center gap-2
              rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold
              text-white shadow-lg shadow-blue-100 transition-all duration-300
              hover:-translate-y-0.5 hover:bg-blue-700
              active:scale-95
            "
          >
            <FiArrowLeft />
            Back to Doctors
          </button>
        </div>
      </main>
    );
  }

  const selectedDate =
    docSlots.length &&
    docSlots[slotIndex]?.length > 0
      ? docSlots[slotIndex][0].datetime
      : null;

  return (
    <main className="w-full overflow-x-hidden bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-7 md:px-6 md:py-10">
        {/* ==================================================
            BACK BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={() => {
            navigate("/doctors");
            scrollToTop();
          }}
          className="
            mb-5 inline-flex min-h-[40px] items-center gap-2 rounded-full
            border border-gray-200 bg-white px-4 py-2 text-xs font-semibold
            text-gray-600 shadow-sm transition-all duration-300
            hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
            active:scale-95 sm:mb-6 sm:text-sm
          "
        >
          <FiArrowLeft />
          Back to Doctors
        </button>

        {/* ==================================================
            DOCTOR PROFILE
        ================================================== */}
        <section className="grid w-full gap-5 lg:grid-cols-[330px_1fr] lg:gap-6">
          {/* Doctor image */}
          <div
            className="
              relative overflow-hidden rounded-2xl bg-blue-100
              shadow-sm ring-1 ring-gray-100 sm:rounded-3xl
            "
          >
            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-green-600 shadow-sm backdrop-blur sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {docInfo.available ? "Available" : "Currently Unavailable"}
            </div>

            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="
                aspect-[4/3] w-full object-cover object-top
                transition-transform duration-500 hover:scale-[1.02]
                lg:aspect-auto lg:h-full lg:min-h-[430px]
              "
            />
          </div>

          {/* Doctor information */}
          <div
            className="
              flex flex-col justify-between rounded-2xl border border-gray-100
              bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7
              lg:p-9
            "
          >
            <div>
              {/* Name */}
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                  {docInfo.name}
                </h1>

                <img
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  src={assets.verified_icon}
                  alt="Verified doctor"
                />
              </div>

              {/* Degree + speciality */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-gray-600 sm:text-base">
                  {docInfo.degree} • {docInfo.speciality}
                </p>

                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-semibold text-blue-600 sm:text-xs">
                  {docInfo.experience}
                </span>
              </div>

              {/* Divider */}
              <div className="my-5 h-px w-full bg-gray-100" />

              {/* About */}
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FiInfo />
                  </span>
                  About Doctor
                </div>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-500 sm:text-base">
                  {docInfo.about}
                </p>
              </div>

              {/* Doctor quick information */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <FiUser />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Specialist
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-800">
                    {docInfo.speciality}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <FiClock />
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      Experience
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-800">
                    {docInfo.experience}
                  </p>
                </div>
              </div>
            </div>

            {/* Fee */}
            <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Appointment fee
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                  {currencySymbol}
                  {docInfo.fees}.00
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <FiShield className="text-green-500" />
                Secure booking
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            BOOKING SECTION
        ================================================== */}
        <section
          className="
            mt-6 rounded-2xl border border-gray-100 bg-white p-5
            shadow-sm sm:rounded-3xl sm:p-7 md:p-8
          "
        >
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FiCalendar />
                </span>

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Book an Appointment
                </h2>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
                Select a convenient date and available time slot.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <FiClock />
              <span>30-minute slots</span>
            </div>
          </div>

          {/* Dates */}
          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500">
              Select Date
            </p>

            <div
              className="
                flex w-full gap-2 overflow-x-auto pb-2
                scrollbar-thin
              "
            >
              {docSlots.map((item, index) => {
                const date = item[0]?.datetime;

                if (!date) {
                  return (
                    <button
                      type="button"
                      key={index}
                      disabled
                      className="
                        flex min-w-[70px] shrink-0 flex-col items-center
                        justify-center rounded-2xl border border-gray-100
                        bg-gray-50 px-3 py-3 text-xs text-gray-300
                      "
                    >
                      <FiXCircle className="mb-1" />
                      <span>Closed</span>
                    </button>
                  );
                }

                const isSelected = slotIndex === index;

                return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => {
                      setSlotIndex(index);
                      setSlotTime("");
                    }}
                    className={`
                      group flex min-w-[70px] shrink-0 flex-col
                      items-center justify-center rounded-2xl px-3 py-3
                      transition-all duration-300 active:scale-95
                      sm:min-w-[78px] sm:px-4 sm:py-4
                      ${
                        isSelected
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                          : "border border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      }
                    `}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase ${
                        isSelected ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {daysOfWeek[date.getDay()]}
                    </span>

                    <span className="mt-1 text-xl font-bold">
                      {date.getDate()}
                    </span>

                    <span
                      className={`mt-0.5 text-[10px] ${
                        isSelected ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      {date.toLocaleDateString([], {
                        month: "short",
                      })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Select Time
              </p>

              {selectedDate && (
                <span className="text-xs font-medium text-blue-600">
                  {selectedDate.toLocaleDateString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
              <div
                className="
                  flex w-full gap-2 overflow-x-auto pb-2
                "
              >
                {docSlots[slotIndex].map((item, index) => {
                  const isSelected = item.time === slotTime;

                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setSlotTime(item.time)}
                      className={`
                        min-h-[42px] shrink-0 rounded-full px-4 py-2
                        text-xs font-medium transition-all duration-300
                        active:scale-95 sm:text-sm
                        ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                            : "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        }
                      `}
                    >
                      {item.time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-4 text-sm text-orange-700">
                <FiClock className="shrink-0" />
                <span>
                  No available time slots for the selected date.
                </span>
              </div>
            )}
          </div>

          {/* Booking summary */}
          <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Appointment Summary
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <FiCalendar className="text-blue-600" />

                  <span>
                    {selectedDate
                      ? selectedDate.toLocaleDateString([], {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FiClock className="text-blue-600" />

                  <span>{slotTime || "Select a time"}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={bookAppointment}
              disabled={
                loading ||
                !slotTime ||
                !docSlots.length ||
                !docSlots[slotIndex]?.length
              }
              className="
                inline-flex min-h-[48px] w-full items-center justify-center
                gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold
                text-white shadow-lg shadow-blue-100 transition-all duration-300
                hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl
                active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300
                disabled:shadow-none sm:w-auto
              "
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Booking...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Book Appointment
                </>
              )}
            </button>
          </div>

          {/* Security note */}
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-700">
            <FiShield className="mt-0.5 shrink-0" />
            <p>
              Your appointment details are securely processed. Please select
              both a date and time before confirming your booking.
            </p>
          </div>
        </section>

        {/* ==================================================
            RELATED DOCTORS
        ================================================== */}
        <div className="mt-8 sm:mt-10">
          <RelatedDoctors
            docId={docId}
            speciality={docInfo.speciality}
          />
        </div>
      </div>
    </main>
  );
};

export default Appointment;