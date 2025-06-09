import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [] = useState("");


  const {backendUrl,aToken}=useContext(AdminContext)

  const onSubmitHandler=async(even)=>{
    even.preventDefault();
    try {
      if(!docImg){
        return toast.error('Image not selected')
      }
      const formData=new FormData()
      formData.append('image',docImg);
      formData.append('name',name);
      formData.append('email',email);
      formData.append('password',password);
      formData.append('experience',experience);
      formData.append('fees',Number(fees));
      formData.append('about',about);
      formData.append('speciality',speciality);
      formData.append('degree',degree);
      formData.append('address',JSON.stringify({line1:address1,line2:address2}));
      formData.append('about',about);
      
      //console log formdat
      formData.forEach((val,key)=>{
        console.log(`${key} : ${val}`)
      })

      const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-blue-100 px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
              className={`w-25 h-25  shrink-0 object-cover border-dotted px-1 py-1 border-gray-200 border bg-gray-200 rounded ${
                docImg ? "rounded-full w-30 h-30" : "border-5 "
              }`}
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            className="cursor-pointer hidden"
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          {/* Doctor Name */}
          <div className="flex flex-col gap-1">
            <label>Doctor Name</label>
            <input onChange={(e)=>setName((e.target.value))}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Name"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input onChange={(e)=>setEmail(e.target.value)}
              className="border rounded px-3 py-2"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)}
              className="border rounded px-3 py-2"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-1">
            <label>Experience</label>
            <select onChange={(e)=>setExperience(e.target.value)} className="border rounded px-3 py-2" required>
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
              <option value="More than 10">More than 10</option>
            </select>
          </div>

          {/* Fees */}
          <div className="flex flex-col gap-1">
            <label>Fees</label>
            <input onChange={(e)=>setFees(e.target.value)}
              className="border rounded px-3 py-2"
              type="number"
              placeholder="Fees"
              required
            />
          </div>

          {/* Speciality */}
          <div className="flex flex-col gap-1">
            <label>Speciality</label>
            <select onChange={(e)=>setSpeciality(e.target.value)} className="border rounded px-3 py-2" required>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Education */}
          <div className="flex flex-col gap-1">
            <label>Education</label>
            <input onChange={(e)=>setDegree(e.target.value)}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Education"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label>Address</label>
            <input onChange={(e)=>setAddress1(e.target.value)}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Address Line 1"
              required
            />
            <input onChange={(e)=>setAddress2(e.target.value)}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Address Line 2"
              required
            />
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6 flex flex-col gap-1 text-gray-700">
          <label>About</label>
          <textarea
            className="border rounded px-3 py-2"
            placeholder="Write about the doctor"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
