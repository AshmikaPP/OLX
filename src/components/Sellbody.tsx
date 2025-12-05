// Sellbody.tsx
import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase/setup.jsx';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

type FormData = {
  title: string;
  price: string;
  category: string;
  description: string;
};


const Sellbody = () => {


  let navigate = useNavigate()
  useEffect(()=>{
    const email = localStorage.getItem("user");
    if(!email){
      navigate('/')
    }
  },[])
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: '',
    category: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      let image = '';
      console.log()
      if (imageFile) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        image = await getDownloadURL(imageRef);
      }

      // Add data to Firestore
      console.log(formData,"Formdata")
      const docRef = await addDoc(collection(db, 'products'), {
        ...formData,
        image,
      });


      console.log("Document written with ID: ", docRef.id);
      setSuccessMessage("Item submitted successfully!");
      setFormData({
        title: '',
        price: '',
        category: '',
        description: '',
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setIsSubmitting(false);
      navigate('/')
    }

  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 px-6 py-2 font-semibold rounded-lg transition ${isSubmitting ? 'bg-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Sellbody;
