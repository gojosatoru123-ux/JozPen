
'use client';
import { useState } from 'react';
import { Rocket, BookOpen, Wrench, Briefcase, User, Users, FolderKanban } from 'lucide-react';

// A reusable component for the feature cards on the right
const FeatureCard = ({ title, subtitle1, subtitle2, bgColor, textColor, illustration }) => {
  return (
    <div className={`rounded-2xl p-6 flex flex-col justify-between h-48 relative overflow-hidden shadow-xsm transform hover:scale-105 transition-transform duration-300 ${bgColor} ${textColor}`}>
      <div>
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="mt-1">{subtitle1}</p>
        <p>{subtitle2}</p>
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-80">
        {illustration}
      </div>
    </div>
  );
};


// Main App Component
export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex items-center justify-center p-4">
      <main className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
              Build Your Future
            </h1>
            <p className="mt-6 text-gray-600 text-lg">
              Discover paths to success from across worldwide, enhance skills, gain CV portfolio, & land your dream company.
            </p>
            
            <div className="mt-12">
              <p className="text-sm font-medium text-gray-500">Status / Upcoming Milestones</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border-2 border-blue-100 rounded-2xl p-6 flex items-start relative overflow-hidden">
              <div className="flex-grow">
                <h2 className="font-bold text-xl text-gray-800">Get personalized insights!</h2>
                <p className="mt-2 text-gray-600">Share your background and career data for personalized recommendations!</p>
                <button className="mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                  Setup my preferences
                </button>
              </div>
              <Rocket className="absolute -bottom-4 -right-4 text-blue-200 w-24 h-24 transform rotate-12 opacity-70" strokeWidth={1.5} />
            </div>
          </div>
          
          {/* Right Column - Grid of Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureCard 
              title="Courses"
              subtitle1="Learn New Skills"
              subtitle2="Expert-Led"
              bgColor="bg-teal-100"
              textColor="text-teal-900"
              illustration={<BookOpen className="w-full h-full text-teal-300 transform -rotate-12" strokeWidth={1.5} />}
            />
            <FeatureCard 
              title="Workshops"
              subtitle1="Hands-On"
              subtitle2="Industry Pros."
              bgColor="bg-orange-100"
              textColor="text-orange-900"
              illustration={<Wrench className="w-full h-full text-orange-300 transform -rotate-12" strokeWidth={1.5} />}
            />
            <FeatureCard 
              title="Freelance"
              subtitle1="Find Projects"
              subtitle2="Flexible Work"
              bgColor="bg-sky-100"
              textColor="text-sky-900"
              illustration={<Briefcase className="w-full h-full text-sky-300 transform -rotate-12" strokeWidth={1.5} />}
            />
            <FeatureCard 
              title="Portfolio"
              subtitle1="Showcase Your Work"
              subtitle2="Get Noticed"
              bgColor="bg-purple-100"
              textColor="text-purple-900"
              illustration={<FolderKanban className="w-full h-full text-purple-300 transform -rotate-12" strokeWidth={1.5} />}
            />
            <FeatureCard 
              title="Mentors"
              subtitle1="Guidance"
              subtitle2="From Experts"
              bgColor="bg-yellow-100"
              textColor="text-yellow-900"
              illustration={<User className="w-full h-full text-yellow-300 transform -rotate-12" strokeWidth={1.5} />}
            />
            <FeatureCard 
              title="Community"
              subtitle1="Grow Together"
              subtitle2=""
              bgColor="bg-pink-100"
              textColor="text-pink-900"
              illustration={<Users className="w-full h-full text-pink-300 transform -rotate-12" strokeWidth={1.5} />}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
