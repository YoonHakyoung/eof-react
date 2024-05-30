// execute.js

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './execute.css';

const Execute = () => {
  const { id } = useParams();
  const [testData, setTestData] = useState(null);
  const isExecuted = useRef(false); // useRef로 실행 여부를 추적

  const executeTest = async () => {
    if (!isExecuted.current) { // isExecuted가 false일 때만 실행
      isExecuted.current = true; // 실행 후 true로 변경
      try {
        const response = await axios.get(`http://localhost:8000/testcase/${id}/execute/`);
        setTestData(response.data);
      } catch (error) {
        console.error('Error executing test:', error);
      }
    }
  };

  const deleteTest = async () => {
    try {
      await axios.delete(`http://localhost:8000/testcase/${id}/stats/`);
      console.log('Test deleted successfully');
    } catch (error) {
      console.error('Error deleting test:', error);
    }
  };

  useEffect(() => {
    console.log(1);
    deleteTest(); // 삭제 요청 실행
    

    // 실행 요청을 삭제 요청 후에 보내도록 setTimeout 사용
    setTimeout(() => {
      executeTest();
    }, 1000); // 1초 후 실행

  }, []); // 빈 배열로 한 번만 실행되도록 설정

  return (
    <div className="Execute">
      <h2>테스트 실행 중</h2>
      {testData ? (
        <div className="test-details">
          <p>테스트 ID: {testData.test_id}</p>
          <p>테스트 이름: {testData.test_name}</p>
          <p>타겟 URL: {testData.target_url}</p>
          <p>사용자 수: {testData.user_num}</p>
          <p>추가 사용자 수: {testData.user_plus_num}</p>
          <p>인터벌 시간: {testData.interval_time}</p>
          <p>추가 카운트: {testData.plus_count}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
}

export default Execute;
