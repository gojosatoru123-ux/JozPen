import Loader from "@/components/Loader";

export default function Loading() {
    return (<>
     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-[#EE2B69] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-[#EE2B69] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-[#EE2B69] rounded-full animate-bounce"></div>
      </div>
    </div>
    </>)
}