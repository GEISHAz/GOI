import React from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function HubTop() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className='mt-5 ml-10'>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-xl'
        >
          Back
        </button>
      </div>
      <div className='mt-5 mr-10'>
        <Link to='/login' className='font-bold text-white text-xl'>
          Login
        </Link>
      </div>
    </div>
  );
};