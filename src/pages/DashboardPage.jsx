// src/pages/DashboardPage.jsx
const DashboardPage = () => {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sample dashboard widgets */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Active Sessions</h3>
            <p className="text-3xl font-bold">56</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">New Leads</h3>
            <p className="text-3xl font-bold">89</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default DashboardPage;
