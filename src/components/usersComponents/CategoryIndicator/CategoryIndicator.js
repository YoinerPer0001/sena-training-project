const CategoryIndicator = ({ pages, label, actualPage }) => {
    return (
      <div className="flex flex-col justify-center items-center relative">
        <span className={`flex justify-center items-center w-[40px] h-[40px] rounded-full ${pages >= actualPage ? 'bg-[#6fccff] text-[#00324D] font-semibold' : 'bg-gray-400 text-white'}`}>{actualPage+1}</span>
        <span className={`hidden md:block absolute top-10 ${pages >= actualPage ? 'text-[#00324D] font-semibold' : ''}`}>{label}</span>
      </div>
    );
  };
  
  export default CategoryIndicator;