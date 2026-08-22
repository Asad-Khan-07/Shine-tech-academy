import { useSearchParams, useNavigate } from "react-router-dom";
import AdmissionForm from "../pages/AdmissionForm";

// Course names mapping
const COURSE_NAMES = {
  "ai-everyone": "AI for Everyone",
  "ai-productivity": "AI Productivity & Prompt Engineering",
  "digital-marketing": "AI-Powered Digital Marketing",
  mern: "Modern MERN Stack Engineering",
  "full-stack-web": "Full Stack Web Development",
  "robotics-ai": "Robotics & AI Automation",
  "graphic-design-live": "Graphic Designing & Visual Communication",
  "ms-office": "Microsoft Office Professional",
  "pro-english": "Professional English for Career & Freelancing",
};

export default function ProgramApply() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get("course");
  const courseName = COURSE_NAMES[courseId] || courseId || "Program";

  const handleBack = (appId, form) => {
    // After form submission, go back to home
    navigate("/");
    if (appId && form) {
      // Optional: show success modal
      console.log("Application submitted:", appId, form);
    }
  };

  // If no course selected, show error
  if (!courseId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <h2 className="text-xl font-bold text-slate-800">
            No Course Selected
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Please go back and choose a program to apply for.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <svg
              className="w-5 h-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Apply for <span className="text-blue-600">{courseName}</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Fill in your details to enroll in this program.
            </p>
          </div>
        </div>

        {/* Admission Form with pre-selected course */}
        <AdmissionForm
          onBack={handleBack}
          preselectedCourse={courseId}
          courseName={courseName}
        />
      </div>
    </div>
  );
}
