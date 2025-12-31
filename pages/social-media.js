export default function SocialMedia() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">📱 Connect with Us on Social Media</h1>
      <p className="text-lg mb-6 text-gray-700">
        Stay updated, share your thoughts, and be part of the Azania Learning Hub community.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/share/1BDM3tu2S1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded shadow text-lg"
        >
          📘 Facebook
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/@azanialearninghub"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-100 hover:bg-pink-200 text-pink-800 p-4 rounded shadow text-lg"
        >
          📸 Instagram
        </a>

        {/* Twitter/X */}
        <a
          href="https://twitter.com/@AzaniaMaake"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-4 rounded shadow text-lg"
        >
          🐦 Twitter / X
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@mrsazania"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white hover:bg-gray-900 p-4 rounded shadow text-lg"
        >
          🎵 TikTok
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/27726264724"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-100 hover:bg-green-200 text-green-800 p-4 rounded shadow text-lg"
        >
          💬 WhatsApp
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/@azanialearninghub"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-100 hover:bg-red-200 text-red-700 p-4 rounded shadow text-lg"
        >
          ▶️ YouTube
        </a>
      </div>
    </div>
  );
}
