import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useEffect } from 'react';

    
    const Dashboard = () => {

      const {aToken,cancelAppointment,dashData,getDashdData} = useContext(AdminContext);

      useEffect(() => {
        if(aToken){
          getDashdData();
        }
      }, [aToken]);

      return dashData&&(
        <div className='m-5'>

          <div className='flex flex-wrap gap-3'>
            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 shadow-md cursor-pointer hover scale-105 transition-all duration-200'>
              <img src=" " alt="doc_img" />
              <div>
                <p>{dashData.doctors}</p>
                <p>Doctors</p>
              </div>
            </div>

            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 shadow-md cursor-pointer hover scale-105 transition-all duration-200'>
              <img src=" " alt="doc_img" />
              <div>
                <p>{dashData.appointments}</p>
                <p>Appointments</p>
              </div>
            </div>

            <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 shadow-md cursor-pointer hover scale-105 transition-all duration-200'>
              <img src=" " alt="doc_img" />
              <div>
                <p>{dashData.patients}</p>
                <p>Patients </p>
              </div>
            </div>

          </div>

        </div>
      )
    }
    
    export default Dashboard;