import React, { useEffect, useState } from 'react';

// Endpoint tipi tanımlaması
type Endpoint = {
  controller: string;
  action: string;
  httpMethod: string;
  route: string;
};

function Permissions() {
  const endpointsUrls = [
    'https://localhost:7289/api/Users/register-service',
    'https://localhost:7016/api/media/register-service',
    'https://localhost:7254/api/Notifications/register-service',
    'https://localhost:7100/api/admin/register-service',
  ];

  const [endpoints, setEndpoints] = useState<{ [key: string]: Endpoint[] }>({});
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [isAllCollapsed, setIsAllCollapsed] = useState(false);

  const getEndpoints = async () => {
    for (let i = 0; i < endpointsUrls.length; i++) {
      const url = endpointsUrls[i];
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: Endpoint[] = await response.json();

      // Burada her controller için ayrı bir grup oluşturuyoruz
      setEndpoints((prev) => {
        const newEndpoints = { ...prev }; // Önceki state'i kopyalıyoruz

        // Veriyi her controller için gruplayacağız
        data.forEach((item) => {
          if (newEndpoints[item.controller]) {
            newEndpoints[item.controller].push(item);
          } else {
            newEndpoints[item.controller] = [item];
          }
        });

        return newEndpoints;
      });
    }
  };

  useEffect(() => {
    getEndpoints();
  }, []);

  const toggleCollapse = (controller: string) => {
    setCollapsed((prev) => ({ ...prev, [controller]: !prev[controller] }));
  };

  const toggleAllCollapse = () => {
    const newCollapseState = !isAllCollapsed;
    setIsAllCollapsed(newCollapseState);

    const updatedCollapsed = Object.keys(collapsed).reduce((acc, key) => {
      acc[key] = newCollapseState;
      return acc;
    }, {} as { [key: string]: boolean });

    setCollapsed(updatedCollapsed);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Permissions</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg text-gray-600">Here are the endpoints registered for each service:</p>
        <button
          onClick={toggleAllCollapse}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {isAllCollapsed ? 'Expand All' : 'Collapse All'}
        </button>
      </div>

      {Object.keys(endpoints).map((controller) => (
        <div className="bg-white shadow-lg rounded-lg mb-6 p-4" key={controller}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{controller}</h2>
            <button
              className="text-blue-500 hover:text-blue-700 font-semibold"
              onClick={() => toggleCollapse(controller)}
            >
              {collapsed[controller] ? 'Show Endpoints' : 'Hide Endpoints'}
            </button>
          </div>

          {!collapsed[controller] && (
            <div className="mt-4">
              {endpoints[controller].map((endpoint, index) => (
                <div
                  key={index}
                  className="border-b py-4 last:border-0"
                >
                  <p className="text-xl text-gray-800 font-medium">{endpoint.action}</p>
                  <p className="text-gray-600">
                    <strong>HTTP Method:</strong> {endpoint.httpMethod}
                  </p>
                  <p className="text-gray-600">
                    <strong>Route:</strong> {endpoint.route}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Permissions;
