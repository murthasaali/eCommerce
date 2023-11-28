import React from 'react';
import { useParams } from 'react-router-dom';

function ViewAproduct() {
  const { productId } = useParams();

 

  return (
    <div>
    {productId}
    </div>
  );
}

export default ViewAproduct;
