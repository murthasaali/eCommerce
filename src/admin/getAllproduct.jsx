import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, selectToken, setProducts as setProductsAction } from '../redux/authSlice'; // Rename setProducts to setProductsAction
import { motion } from 'framer-motion';
import { FaEdit, FaSearch } from 'react-icons/fa';
const container = {
  hidden: { opacity: 0.8, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
function GetAllproduct() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleToggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };
  const token = useSelector(selectToken);
  console.log(token);
  const products = useSelector(selectProducts); // Rename setProducts to products
  const dispatch = useDispatch();
  const [isEdit,setIsedit]=useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProductData,setupdatedProductData]=useState(null)

  const dealerToken = token;

  // const getAllProducts = async (token) => {
  //   try {
  //     const response = await axios.get('https://ecommerce-api.bridgeon.in/products?accessKey=55eebc5550c70b2b7736', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const { status, message, data } = response.data;
  //     if (status === 'success') {
  //       // Successfully fetched products.
  //       dispatch(setProductsAction(data)); // Use setProductsAction instead of setProducts
  //       console.log('Fetched products:', data);
  //     } else {
  //       console.error('Product retrieval failed. Message:', message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };


  //   getAllProducts(dealerToken);
  const getAllProducts = async (token) => {
    try {
      const response = await axios.get('https://ecommerce-api.bridgeon.in/products?accessKey=55eebc5550c70b2b7736', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully fetched products.
        dispatch(setProductsAction(data)); // Use setProductsAction instead of setProducts
        console.log('Fetched products:', data);
      } else {
        console.error('Product retrieval failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    getAllProducts(dealerToken);
  }, [updatedProductData]);

  

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log(selectedProduct)
  };
  const deleteProduct = async (productId, token) => {
    try {
      const response = await axios.delete(`https://ecommerce-api.bridgeon.in/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message } = response.data;
      if (status === 'success') {
        // Successfully deleted the product.
        console.log('Product deleted.');
        // Call the API again to refresh the product list
        getAllProducts(dealerToken);
      } else {
        console.error('Product deletion failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const handleDelete = (productId) => {
    deleteProduct(productId, dealerToken)
  };
  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product._id === productId);
    console.log(productToEdit);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsedit(true);
    }
  };
  
  const handleUpdateProduct = async (productId,updatedProductData, token) => {
    try {
      const response = await axios.patch(`https://ecommerce-api.bridgeon.in/products/${productId}`, updatedProductData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { status, message, data } = response.data;
      if (status === 'success') {
        // Successfully updated the product.
        console.log('Updated product details:', data);
        // Call the API again to refresh the product list
        getAllProducts(token);
        setIsedit(false); // Hide the edit section after successful update
        alert(`succussfully updated  ${updatedProductData.title}`)
        setupdatedProductData(null)
      } else {
        console.error('Product update failed. Message:', message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      
      setIsedit(false)
    }
  };

  return (
    <div className=' flex justify- items-center gap-10 flex-col w-full h-full overflow-auto pl-2 '>
       <div className='h-24 p-4 flex justify-start gap-10 items-center w-full sticky top-0 bg-white bg-opacity-90'>
      <motion.button
        onClick={handleToggleSearch}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
       <FaSearch className='text-3xl font-thin text-black first-letter  '/>
      </motion.button>

      {isSearchVisible && (
        <motion.input variants={item}
        type="text"
        className='bg-stone-300  text-white w-3/4 h-14 rounded-3xl pl-4 overflow-hidden shadow-md'
        placeholder="Search..."
        initial={{ opacity: 0, x: '-20%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '-50%' }}
        />
        )}
        <div className='absolute right-0 mr-20 font-thin  z-20'>sort</div>
    </div>
    <motion.table className="w-full bg-white text-blue-800 font-sans rounded-xl overflow-hidden shadow-md"
           initial="hidden"
           animate="visible">
          <thead>
            <tr className="">
              <th className="py-2 px-4 w-1/12 sm:w-1/6">ID</th>
              <th className="py-2 px-4 w-1/12 sm:w-1/12">Title</th>
              <th className="py-2 px-4 w-1/12 sm:w-1/12">Price</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Category</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Image</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Description</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Edit</th>
              <th className="py-2 px-4 w-1/6 sm:w-1/6">Delete</th>
            </tr>
          </thead>
          <tbody >
            {products.map((product, index) => (
              <tr  key={product._id} className='' onClick={() => handleProductClick(product)}>
                <motion.td  variants={item} className="py-2 px-4 w-1/12 sm:w-1/6">{index + 1}</motion.td >
                <motion.td  variants={item}  className="py-2 px-4 w-1/6 sm:w-1/6">{product.title}</motion.td >
                <motion.td   variants={item} className="py-2 px-4 text-red-800 w-1/12 sm:w-1/3">₹ {product.price}</motion.td >
                <motion.td   variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">{product.category}</motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/3 rounded-lg">
                  <img src={product.image} alt={product.title} className="w-full h-20 overflow-hidden rounded-lg" />
                </motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">{product.description}</motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleEdit(product._id)}>
                    <FaEdit/>
                  </button>
                </motion.td >
                <motion.td  variants={item} className="py-2 px-4 w-1/6 sm:w-1/6">
                  <button className="bg-red-500 hover:bg-red-700 text- stroke-neutral-800 font-bold py-2 px-4 rounded" onClick={()=>handleDelete(product._id)}>
                    Delete
                  </button>
                </motion.td >
              </tr >
            ))}
          </tbody>
        </motion.table>
      
      
    
      
       {isEdit && (
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5, ease: "easeOut" } }}
    style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
  }}
  onClick={() => setIsedit(false)}
>
          <motion.div
            initial={{ x: 50,y:50, opacity: 0 }}
            animate={{ x: 0,y:0, opacity: 1 }}
            transition={{ type: 'tween', stiffness: 260, damping: 20 }}
            // style={{
            //   background: 'white',
            //   padding: '2rem',
            //   borderRadius: '0.5rem',
            // }}
            onClick={(e) => e.stopPropagation()}
            className='bg-white w-3/4 h-3/4 rounded-xl bg-opacity-70'
            
          >
           <div className='bg-fuchsia-600-800 text-white w-full p-4 rounded-md mb-4 h-full'>
          {/* editing process */}
          <motion.form
           variants={container} 
           initial="hidden"
           animate="visible"
            onSubmit={(e) => {
              e.preventDefault();
               setupdatedProductData({
                title: e.target.title.value,
                price: e.target.price.value,
                description: e.target.description.value,
                category: e.target.category.value,
              });
              handleUpdateProduct(selectedProduct._id, updatedProductData,token);
            }}
          className='w-full h-full flex justify-center items-center'>

            <div className='w-1/2 flex flex-col justify-around p-10 h-full '>

            <input variants={item}
              type='text'
              name='title'
              placeholder='Title'
              defaultValue={selectedProduct.title}
              className='bg-fuchsia-500 bg-opacity-60 text-black w-3/4 rounded-md px-3 py-2 mb-2'
              /> 
            {/* <input variants={item}
              type='file'
              name='image'
              placeholder='choose image'
              defaultValue={selectedProduct.title}
              className='bg-fuchsia-500 bg-opacity-60 text-black w-3/4 rounded-md px-3 py-2 mb-2'
              /> */}
            <input variants={item}
              type='number'
              name='price'
              placeholder='Price'
              defaultValue={selectedProduct.price}
              className='bg-fuchsia-500 bg-opacity-60 text-black w-3/4 rounded-md px-3 py-2 mb-2'
            />
            <input variants={item}
              type='text'
              name='category'
              placeholder='Category'
              defaultValue={selectedProduct.category}
              className='bg-fuchsia-500 bg-opacity-60 text-black w-3/4 rounded-md px-3 py-2 mb-2'
            />
            <textarea
              name='description'
              placeholder='Description'
              defaultValue={selectedProduct.description}
              className='bg-fuchsia-500 bg-opacity-60 text-black w-3/4 rounded-md px-3 py-2 mb-2'
            />
              </div>
              <div className='w-3/4 p-10 flex flex-col gap-20 items-center'>

              <div className='w-full h-2/5 rounded-full  flex flex-col items-center justify-center'>
            <img className='h-52 w-52 rounded-full' src={selectedProduct.image} alt="" />
        
          </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded'>
              Update Product
            </button>
              </div>
          </motion.form>
        </div>

           
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default GetAllproduct;
