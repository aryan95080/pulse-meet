import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiMapPin,
  FiRefreshCw,
  FiShield,
  FiUser,
  FiXCircle,
} from "react-icons/fi";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const navigate = useNavigate();

  // --------------------------------------------------
  // Format appointment date
  // --------------------------------------------------
  const slotDateFormate = (slotDate) => {
    if (!slotDate) return "Date unavailable";

    const dateArray = slotDate.split("-");

    if (dateArray.length !== 3) {
      return slotDate;
    }

    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[Number(dateArray[1])] || dateArray[1];

    return `${dateArray[2]} ${month} ${dateArray[0]}`;
  };

  // --------------------------------------------------
  // Fetch user appointments
  // --------------------------------------------------
  const getUserAppointments = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/user/appointments`,
        {
          headers: { token },
        }
      );

      if (data.success) {
        setAppointments([...data.appointments].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Cancel appointment
  // --------------------------------------------------
  const cancelAppointment = async (appointmentId) => {
    try {
      setProcessingId(appointmentId);

      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        toast.success(data.message);

        setAppointments((prev) =>
          prev.map((item) =>
            item._id === appointmentId
              ? { ...item, cancelled: true }
              : item
          )
        );

        // Refresh doctors after cancellation
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to cancel appointment."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // --------------------------------------------------
  // Razorpay payment initialization
  // --------------------------------------------------
  const initpay = (order) => {
    if (!window.Razorpay) {
      toast.error(
        "Razorpay is not loaded. Please refresh the page and try again."
      );
      setProcessingId(null);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Pulse+Meet",
      description: "Appointment Payment",
      order_id: order.id,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verifyRazorpay`,
            response,
            {
              headers: { token },
            }
          );

          if (data.success) {
            toast.success(
              data.message || "Payment completed successfully."
            );

            await getUserAppointments();

            navigate("/my-appointments");
          } else {
            toast.error(
              data.message || "Payment verification failed."
            );
          }
        } catch (error) {
          console.log(error);

          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Payment verification failed."
          );
        } finally {
          setProcessingId(null);
        }
      },

      modal: {
        ondismiss: () => {
          setProcessingId(null);
        },
      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", (response) => {
      console.log("Payment failed:", response);

      toast.error(
        response?.error?.description ||
          "Payment failed. Please try again."
      );

      setProcessingId(null);
    });

    rzp.open();
  };

  // --------------------------------------------------
  // Create Razorpay order
  // --------------------------------------------------
  const appointmentRazorpay = async (appointmentId) => {
    try {
      setProcessingId(appointmentId);

      const { data } = await axios.post(
        `${backendUrl}/api/user/payment-razorpay`,
        { appointmentId },
        {
          headers: { token },
        }
      );

      if (data.success) {
        initpay(data.order, appointmentId);
      } else {
        toast.error(
          data.message || "Unable to start payment."
        );

        setProcessingId(null);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to start payment."
      );

      setProcessingId(null);
    }
  };

  // --------------------------------------------------
  // Fetch on mount/token change
  // --------------------------------------------------
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  // --------------------------------------------------
  // Loading state
  // --------------------------------------------------
  if (loading) {
    return (
      <main className="min-h-[70vh] w-full overflow-x-hidden bg-gray-50 px-3 py-8 sm:px-5 md:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header skeleton */}
          <div className="mb-6">
            <div className="h-7 w-48 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Appointment skeletons */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="h-40 w-full rounded-xl bg-gray-200 sm:h-32 sm:w-32" />

                  <div className="flex-1">
                    <div className="h-5 w-40 rounded bg-gray-200" />
                    <div className="mt-3 h-4 w-28 rounded bg-gray-200" />
                    <div className="mt-5 h-3 w-56 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-48 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-52 rounded bg-gray-200" />
                  </div>

                  <div className="flex gap-2 sm:flex-col">
                    <div className="h-10 w-full rounded-lg bg-gray-200 sm:w-44" />
                    <div className="h-10 w-full rounded-lg bg-gray-200 sm:w-44" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] w-full overflow-x-hidden bg-gray-50 px-3 py-7 sm:px-5 sm:py-9 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* ==================================================
            PAGE HEADER
        ================================================== */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                <FiCalendar />
                Your Healthcare
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                My Appointments
              </h1>

              <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
                View, manage and pay for your upcoming doctor appointments
                from one place.
              </p>
            </div>

            <button
              type="button"
              onClick={getUserAppointments}
              className="
                inline-flex min-h-[42px] items-center justify-center gap-2
                rounded-xl border border-gray-200 bg-white px-4 py-2
                text-xs font-semibold text-gray-600 shadow-sm
                transition-all duration-300
                hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600
                active:scale-95 sm:text-sm
              "
            >
              <FiRefreshCw />
              Refresh
            </button>
          </div>

          {/* Appointment count */}
          {appointments.length > 0 && (
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-500">
              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-blue-600 px-2 font-bold text-white">
                {appointments.length}
              </span>

              <span>
                {appointments.length === 1
                  ? "appointment"
                  : "appointments"}{" "}
                in your account
              </span>
            </div>
          )}
        </div>

        {/* ==================================================
            EMPTY STATE
        ================================================== */}
        {appointments.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-14 text-center shadow-sm sm:rounded-3xl sm:px-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FiCalendar className="text-2xl" />
            </div>

            <h2 className="mt-5 text-lg font-bold text-gray-900 sm:text-xl">
              No appointments yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              You haven't booked an appointment yet. Find a trusted doctor
              and schedule your first appointment.
            </p>

            <button
              type="button"
              onClick={() => {
                navigate("/doctors");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="
                mt-6 min-h-[44px] rounded-xl bg-blue-600 px-6 py-2.5
                text-sm font-semibold text-white shadow-lg shadow-blue-100
                transition-all duration-300
                hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl
                active:scale-95
              "
            >
              Find a Doctor
            </button>
          </div>
        ) : (
          /* ==================================================
              APPOINTMENT LIST
          ================================================== */
          <div className="space-y-4">
            {appointments.map((item) => {
              const isProcessing = processingId === item._id;

              return (
                <article
                  key={item._id}
                  className="
                    overflow-hidden rounded-2xl border border-gray-100
                    bg-white shadow-sm transition-all duration-300
                    hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/40
                    sm:rounded-3xl
                  "
                >
                  <div className="flex flex-col gap-5 p-4 sm:p-5 md:flex-row md:gap-6">
                    {/* ==================================================
                        DOCTOR IMAGE
                    ================================================== */}
                    <div className="relative w-full shrink-0 md:w-36 lg:w-40">
                      <div className="overflow-hidden rounded-2xl bg-blue-50">
                        <img
                          className="
                            aspect-[4/3] w-full object-cover
                            transition-transform duration-500
                            hover:scale-105
                            md:aspect-square
                          "
                          src={item.docData?.image}
                          alt={item.docData?.name || "Doctor"}
                        />
                      </div>

                      {/* Availability */}
                      {!item.cancelled && !item.isCompleted && (
                        <div className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-green-600 shadow-sm backdrop-blur-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          Appointment
                        </div>
                      )}
                    </div>

                    {/* ==================================================
                        APPOINTMENT INFORMATION
                    ================================================== */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                              <FiUser className="text-sm" />
                            </div>

                            <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                              {item.docData?.name || "Doctor"}
                            </h2>
                          </div>

                          <p className="mt-2 text-sm font-medium text-blue-600">
                            {item.docData?.speciality ||
                              "Healthcare Specialist"}
                          </p>
                        </div>

                        {/* Status */}
                        {item.cancelled ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-bold text-red-600 sm:text-xs">
                            <FiXCircle />
                            Cancelled
                          </span>
                        ) : item.isCompleted ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-bold text-green-600 sm:text-xs">
                            <FiCheckCircle />
                            Completed
                          </span>
                        ) : item.payment ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600 sm:text-xs">
                            <FiCheckCircle />
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-600 sm:text-xs">
                            <FiCreditCard />
                            Payment Pending
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="mt-5 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                            <FiMapPin className="text-sm" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-700">
                              Clinic Address
                            </p>

                            <p className="mt-1 break-words text-xs leading-5 text-gray-500">
                              {item.docData?.address?.line1 ||
                                "Address unavailable"}
                            </p>

                            {item.docData?.address?.line2 && (
                              <p className="break-words text-xs leading-5 text-gray-500">
                                {item.docData.address.line2}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <FiCalendar className="text-sm" />
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-gray-700">
                              Appointment Date & Time
                            </p>

                            <p className="mt-1 text-xs font-medium text-gray-600 sm:text-sm">
                              {slotDateFormate(item.slotDate)}
                              <span className="mx-2 text-gray-300">
                                •
                              </span>
                              {item.slotTime}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                            <FiClock className="text-sm" />
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-gray-700">
                              Appointment Status
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {item.cancelled
                                ? "This appointment has been cancelled."
                                : item.isCompleted
                                ? "This appointment has been completed."
                                : "Your appointment is scheduled."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ==================================================
                        ACTIONS
                    ================================================== */}
                    <div className="flex w-full shrink-0 flex-col justify-end gap-2 md:w-48">
                      {/* Payment Done */}
                      {!item.cancelled &&
                        item.payment &&
                        !item.isCompleted && (
                          <button
                            type="button"
                            disabled
                            className="
                              inline-flex min-h-[42px] items-center
                              justify-center gap-2 rounded-xl border
                              border-green-100 bg-green-50 px-4 py-2.5
                              text-xs font-semibold text-green-600
                              sm:text-sm
                            "
                          >
                            <FiCheckCircle />
                            Payment Done
                          </button>
                        )}

                      {/* Pay Online */}
                      {!item.cancelled &&
                        !item.payment &&
                        !item.isCompleted && (
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() =>
                              appointmentRazorpay(item._id)
                            }
                            className="
                              inline-flex min-h-[44px] items-center
                              justify-center gap-2 rounded-xl bg-blue-600
                              px-4 py-2.5 text-xs font-semibold text-white
                              shadow-md shadow-blue-100 transition-all
                              duration-300 hover:-translate-y-0.5
                              hover:bg-blue-700 hover:shadow-lg
                              active:scale-95 disabled:cursor-not-allowed
                              disabled:bg-blue-400 disabled:shadow-none
                              sm:text-sm
                            "
                          >
                            {isProcessing ? (
                              <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <FiCreditCard />
                                Pay Online
                              </>
                            )}
                          </button>
                        )}

                      {/* Cancel */}
                      {!item.cancelled && !item.isCompleted && (
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() =>
                            cancelAppointment(item._id)
                          }
                          className="
                            inline-flex min-h-[42px] items-center
                            justify-center gap-2 rounded-xl border
                            border-gray-200 bg-white px-4 py-2.5
                            text-xs font-semibold text-gray-500
                            transition-all duration-300
                            hover:border-red-200 hover:bg-red-50
                            hover:text-red-600
                            active:scale-95 disabled:cursor-not-allowed
                            disabled:opacity-50
                            sm:text-sm
                          "
                        >
                          <FiXCircle />
                          {isProcessing ? "Processing..." : "Cancel Appointment"}
                        </button>
                      )}

                      {/* Cancelled */}
                      {item.cancelled && !item.isCompleted && (
                        <div
                          className="
                            inline-flex min-h-[42px] items-center
                            justify-center gap-2 rounded-xl border
                            border-red-100 bg-red-50 px-4 py-2.5
                            text-xs font-semibold text-red-600
                            sm:text-sm
                          "
                        >
                          <FiXCircle />
                          Appointment Cancelled
                        </div>
                      )}

                      {/* Completed */}
                      {item.isCompleted && (
                        <div
                          className="
                            inline-flex min-h-[42px] items-center
                            justify-center gap-2 rounded-xl border
                            border-green-100 bg-green-50 px-4 py-2.5
                            text-xs font-semibold text-green-600
                            sm:text-sm
                          "
                        >
                          <FiCheckCircle />
                          Appointment Completed
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Security/payment footer */}
                  {!item.cancelled && !item.isCompleted && (
                    <div className="flex items-center gap-2 border-t border-gray-100 bg-gray-50/70 px-4 py-3 text-[10px] text-gray-500 sm:px-5 sm:text-xs">
                      <FiShield className="shrink-0 text-green-500" />

                      <span>
                        Online payments are processed securely through
                        Razorpay.
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyAppointments;