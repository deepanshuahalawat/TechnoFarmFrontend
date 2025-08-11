// NotFoundPage.jsx
import React from 'react';
import NavBarCom from '../NavBr/NavBrCom';
function NotFoundPage() {
  return (
   <div>
     {/* <NavBarCom /> */}
     <div className='mx-20 mt-20 p-20 border-1 border-gray-600'>
      <h1 className='text-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight items-center'>404 - Page Not Found</h1>
      <p className='text-center text-xl  leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight items-center'>Sorry, the page you are looking for does not exist.</p>
    </div>
   </div>
  );
}

export default NotFoundPage;
