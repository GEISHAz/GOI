import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import styles from './profile.module.css'

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* 뒤로가기 */}
      <div className='mt-5 ml-10'>
        <button
          onClick={() => navigate(-1)}
          className='font-bold text-white text-xl'
        >
          Back
        </button>
      </div>

      {/* 프로필 변경 */}
      <div>
        
      </div>
    </div>
  );
}