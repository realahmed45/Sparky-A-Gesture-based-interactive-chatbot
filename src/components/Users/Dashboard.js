import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUserProfileAPI } from "../../apis/user/userAPI";
import StatusMessage from "../Alert/StatusMessage";

const Dashboard = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  if (isLoading) {
    return <StatusMessage type="loading" message="Loading please wait..." />;
  }

  if (isError) {
    return (
      <StatusMessage type="error" message={error?.response?.data?.message} />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">
        User Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-orange-100 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Profile Information
          </h2>
          <div className="mb-4">
            <p className="text-gray-800 font-semibold mb-2">Name</p>
            <p className="text-gray-900">{data?.user?.username}</p>
          </div>
          <div>
            <p className="text-gray-800 font-semibold mb-2">Email</p>
            <p className="text-gray-900">{data?.user?.email}</p>
          </div>
        </div>

        <div className="bg-orange-100 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Credit Usage
          </h2>
          <div className="mb-4">
            <p className="text-gray-800 font-semibold">
              Monthly Credit: {data?.user?.monthlyRequestCount}
            </p>
            <p className="text-gray-800 font-semibold">
              Credit Used: {data?.user?.apiRequestCount}
            </p>
            <p className="text-gray-800 font-semibold">
              Credit Remaining:{" "}
              {data?.user?.monthlyRequestCount - data?.user?.apiRequestCount}
            </p>
            <p className="text-gray-800 font-semibold">
              Next Billing Date:{" "}
              {data?.user?.nextBillingDate
                ? data?.user?.nextBillingDate
                : "No Billing date"}
            </p>
          </div>
        </div>

        <div className="bg-orange-100 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Payment & Plans
          </h2>
          <div className="mb-4">
            <p className="text-gray-800 font-semibold">
              Current Plan: {data?.user?.subscriptionPlan}
            </p>
            {data?.user?.subscriptionPlan === "Trial" && (
              <p className="text-gray-800 font-semibold">
                Trial: 1000 monthly request
              </p>
            )}

            {/* Other subscription plans go here */}
          </div>
          <Link
            to="/plans"
            className="py-2 px-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-md text-sm font-medium inline-block"
          >
            Upgrade Plan
          </Link>
        </div>

        <div className="bg-orange-100 rounded-lg shadow p-6 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">
            Payment History
          </h2>
          {data?.user?.payments?.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {data?.user?.payments?.map((payment) => (
                <li key={payment?.id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-800 font-semibold">
                        {payment?.subscriptionPlan}
                      </p>
                      <p className="text-xs text-gray-700">
                        {new Date(payment?.createdAt).toDateString()}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          payment?.status === "succeeded"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {payment?.status}
                      </p>
                      <p className="text-sm text-gray-800 ml-4">
                        $ {payment?.amount}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-800">No Payment History</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
