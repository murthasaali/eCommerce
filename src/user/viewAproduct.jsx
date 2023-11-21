import React from 'react';
import { useParams } from 'react-router-dom';

function ViewAproduct() {
  const { productId } = useParams();

 

  return (
    <div>
      {/* Display details of the product */}
    </div>
  );
}

export default ViewAproduct;
