import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UsersIcon, EnvelopeIcon, PhoneIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import type { User } from '../../model/User';

function ManageCustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]); 
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);
    axios.get<User[]>('http://localhost:8080/user/getAll', { 
      headers: { 'Authorization': `Bearer ${token}` }
    })

      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setLoading(false);
      });
  };

  const filteredCustomers = customers.filter(customer => 
    customer.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.phoneNumber && customer.phoneNumber.includes(searchTerm))
  );

  return (
    <div className="min-h-screen bg-transparent py-10 px-6 font-sans relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <UsersIcon className="w-10 h-10 text-indigo-500" />
              Customer Management
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">View and manage all registered customers in the system.</p>
          </div>

          <div className="relative w-full md:w-96">
            <MagnifyingGlassIcon className="absolute top-3.5 left-4 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    <th className="p-5">Customer Profile</th>
                    <th className="p-5">Contact Details</th>
                    <th className="p-5">Account Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, index) => (
                      <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                        
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg border border-indigo-200 dark:border-indigo-800">
                              {customer.userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900 dark:text-white text-base">{customer.userName}</span>
                              <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><UserCircleIcon className="w-3.5 h-3.5"/> User Account</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="p-5">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <EnvelopeIcon className="w-4 h-4 text-slate-400"/> 
                              {customer.email}
                            </span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                              <PhoneIcon className="w-4 h-4 text-slate-400"/> 
                              {customer.phoneNumber || 'Not Provided'}
                            </span>
                          </div>
                        </td>
                        
                        <td className="p-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                            Active
                          </span>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="p-10 text-center">
                        <UsersIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">No customers found.</p>
                        {searchTerm && <p className="text-sm text-slate-400 mt-1">Try adjusting your search term.</p>}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ManageCustomersPage;