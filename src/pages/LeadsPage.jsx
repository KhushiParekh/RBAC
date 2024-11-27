
// src/pages/LeadsPage.jsx
const LeadsPage = () => {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Leads Management</h1>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Recent Leads</h2>
                <p className="text-sm text-gray-500">Manage and track your leads</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add New Lead
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-4">Name</th>
                  <th className="py-4">Email</th>
                  <th className="py-4">Status</th>
                  <th className="py-4">Source</th>
                  <th className="py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample lead data */}
                <tr className="border-b">
                  <td className="py-4">Karan Arjun</td>
                  <td className="py-4">KA@example.com</td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      Active
                    </span>
                  </td>
                  <td className="py-4">Website</td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-800">View Details</button>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default LeadsPage;
  
