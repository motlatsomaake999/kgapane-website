// components/AdminDashboard.js
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminDashboard() {
  const [role, setRole] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState("curriculum"); // curriculum, staff, activity

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  useEffect(() => {
    const checkRole = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setRole(userDoc.data().role);
      }
    };
    checkRole();
  }, []);

  if (role !== "admin") return <p>Access denied. Admins only.</p>;

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "notices"), {
      message: announcement,
      date: new Date().toISOString(),
      postedBy: auth.currentUser.email,
    });
    alert("Notice posted!");
    setAnnouncement("");
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const storageRef = ref(storage, `${uploadType}/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);

    const targetCollection = {
      curriculum: "curriculumDocs",
      staff: "staffProfiles",
      activity: "activities",
    }[uploadType];

    await addDoc(collection(db, targetCollection), {
      title: file.name,
      fileUrl,
      uploadedBy: auth.currentUser.email,
    });

    alert(`${uploadType} file uploaded!`);
    setFile(null);
  };

  return (
    <section className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Admin Dashboard
      </h1>

      {/* Post Notice */}
      <form onSubmit={handleAnnouncementSubmit} className="mb-8">
        <label className="block text-lg font-semibold mb-2">New Notice</label>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="w-full border rounded p-2 mb-4"
          placeholder="Type your notice here..."
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Post Notice
        </button>
      </form>

      {/* Upload File */}
      <form onSubmit={handleFileUpload}>
        <label className="block text-lg font-semibold mb-2">Upload File</label>
        <select
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value)}
          className="mb-4 border p-2 rounded"
        >
          <option value="curriculum">Curriculum Document</option>
          <option value="staff">Staff Photo</option>
          <option value="activity">Activity Icon</option>
        </select>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
        >
          Upload File
        </button>
      </form>
    </section>
  );
}
