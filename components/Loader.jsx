// components/Loader.jsx
import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen w-screen fixed bg-white/20 top-0 left-0  z-40">
            <div className="relative w-20 h-20">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin" />

                {/* Middle Ring - slower and inset */}
                <div className="absolute inset-2 border-b-4 border-blue-400 rounded-full animate-[spin_2s_linear_infinite]" />

                {/* Inner Ring - slowest */}
                <div className="absolute inset-4 border-l-4 border-blue-300 rounded-full animate-[spin_1s_linear_infinite]" />
            </div>
        </div>
    );
};

export default Loader;
