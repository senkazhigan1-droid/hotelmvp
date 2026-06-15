export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏨</span>
          <span className="font-bold text-xl">Mövenpick Hotel</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="hover:text-orange-600">Services</a>
          <a href="/admin" className="hover:text-orange-600">Staff</a>
        </nav>
      </div>
    </header>
  );
}