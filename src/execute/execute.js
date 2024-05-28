// Execute.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './execute.css';

const Execute = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <></>
  );
};

export default Execute;
