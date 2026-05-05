import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch roles from backend
  useEffect(() => {
    axios.get("https://resume-analyzer-backend.onrender.com/roles")
      .then(res => {
        setRoles(res.data);
        setRole(res.data[0]);
      })
      .catch(err => console.error(err));
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Upload resume first");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("role", role);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://resume-analyzer-backend.onrender.com/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Score color
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          🚀 AI Resume Analyzer
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Upload your resume and get instant feedback based on job role
        </p>

        {/* Upload Box */}
        <div className="border-2 border-dashed p-6 rounded-lg text-center mb-4 cursor-pointer hover:bg-gray-50">
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="fileUpload"
          />
          <label htmlFor="fileUpload" className="cursor-pointer">
            {file ? (
              <p className="text-green-600 font-semibold">
                ✅ {file.name}
              </p>
            ) : (
              <p className="text-gray-500">
                Click to upload resume (PDF / DOCX)
              </p>
            )}
          </label>
        </div>

        {/* Role Dropdown */}
        <select
          className="border p-2 mb-4 w-full rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((r, i) => (
            <option key={i} value={r}>
              {r.replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>

        {/* Button */}
        <button
          onClick={handleUpload}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white w-full py-3 rounded-lg hover:scale-105 transition"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        {/* RESULT */}
        {result && (
          <div className="mt-8">

            {/* Score */}
            <div className="text-center">
              <h2 className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}%
              </h2>
              <p className="text-gray-500">ATS Score</p>
            </div>

            {/* Progress */}
            <div className="w-full bg-gray-200 h-4 rounded mt-4">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded"
                style={{ width: `${result.score}%` }}
              ></div>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {/* Matched Skills */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">
                  ✅ Matched Skills
                </h3>
                <ul className="text-sm">
                  {(result.matched || []).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-red-700 mb-2">
                  ❌ Missing Skills
                </h3>
                <ul className="text-sm">
                  {(result.missing || []).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Preview */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">📄 Resume Preview</h3>
              <p className="text-sm text-gray-600">
                {result.preview}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;