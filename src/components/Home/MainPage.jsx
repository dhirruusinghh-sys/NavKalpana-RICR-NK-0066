import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-white opacity-60 -z-10"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div className="mb-8 inline-block transform hover:scale-105 transition-transform duration-300">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold shadow-md border border-green-200">
            <span className="w-3 h-3 bg-green-800 rounded-full animate-pulse"></span>
            #1 Trusted Healthcare Platform 2026
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tighter tracking-tight text-gray-900">
          Advanced Healthcare with
          {' '}
          <span className="text-green-800 relative inline-block">
            Expert Medical Care
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-green-200 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                opacity="0.3"
              />
            </svg>
          </span>{' '}
          Courses
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Join <span className="text-gray-900 font-bold">10,000+</span> patients who trust our platform and connect with{' '}
          <span className="text-gray-900 font-bold">500+</span> certified doctors across multiple specialties for secure and reliable healthcare services.
        </p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
          <button
            onClick={() => navigate('/login')}
            className="group bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            LOG IN
            <svg
              className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>


        </div>
      </div>
    </section>
  );
};

export default HeroSection;
