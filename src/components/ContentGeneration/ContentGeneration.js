import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfileAPI } from "../../apis/user/userAPI";
import StatusMessage from "../Alert/StatusMessage";
import { generateContentAPI } from "../../apis/chatGPT/chatGPT";

const BlogPostAIAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  //get the user profile
  const { data: userProfile, error: userProfileError } = useQuery({
    queryFn: getUserProfileAPI,
    queryKey: ["profile"],
  });

  //mutation
  const mutation = useMutation({ mutationFn: generateContentAPI });

  // Formik setup for handling form data
  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required("A prompt is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await mutation.mutateAsync(
          `Generate output based ${values.prompt}, `
        );
        setGeneratedContent(response.content);
      } catch (error) {
        console.error("Error generating content:", error);
      }
      setIsLoading(false);
    },
  });

  // Display loading
  if (isLoading) {
    return <StatusMessage type="loading" message="Loading please wait..." />;
  }

  // Display user profile loading or error
  if (!userProfile || userProfileError) {
    return (
      <StatusMessage
        type="error"
        message={
          userProfileError?.response?.data?.message ||
          "User profile not available"
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full p-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          SPARKY!
        </h2>

        {/* Display generated content */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Generated Content:</h3>
          <pre className="px-4 py-2 bg-gray-100 rounded-md text-gray-800 whitespace-pre-wrap">
            {generatedContent}
          </pre>
        </div>

        {/* Display user profile */}
        <div className="flex mt-3">
          <div className="mr-2 mb-2">
            <span className="text-sm font-semibold bg-green-200 px-4 py-2 rounded-full">
              Plan: {userProfile.user.subscriptionPlan}
            </span>
          </div>

          <div className="mr-2 mb-2">
            <span className="text-sm font-semibold bg-green-200 px-4 py-2 rounded-full">
              Credit: {userProfile.user.apiRequestCount} /{" "}
              {userProfile.user.monthlyRequestCount}
            </span>
          </div>
        </div>

        {/* Form for generating content */}
        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
          {/* Prompt input field */}
          <div className="relative">
            <input
              id="prompt"
              type="text"
              {...formik.getFieldProps("prompt")}
              className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              placeholder="Type here..."
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
          {formik.touched.prompt && formik.errors.prompt && (
            <div className="text-red-500">{formik.errors.prompt}</div>
          )}

          {/* Link to view history */}
          <Link to="/history" className="text-gray-600 hover:text-gray-900">
            View history
          </Link>
        </form>
      </div>
    </div>
  );
};

export default BlogPostAIAssistant;
