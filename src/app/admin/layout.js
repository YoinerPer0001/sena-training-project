import { Sidebar } from "@/components/adminComponents/navbar/Sidebar";
export default function adminLayout({ children }) {

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-grow flex flex-col">
        {/* Navbar */}
        <div className="w-full h-16 bg-white">
          {/* Aquí va el contenido del Navbar */}

        </div>
        <div className="flex-grow bg-[#F6F4F2]">
          {children}
        </div>
      </div>
    </div>
  );
}