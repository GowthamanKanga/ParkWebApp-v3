import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  authorsTableData,
  existingClients,
} from "../admin/data/authors-table-data";
import FormData from "form-data";

function ActionResultModal({ action, clientName, onClose }) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  {action === "accept"
                    ? "Accepted Client Request"
                    : "Rejected Client Request"}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You have {action}ed the client request for {clientName}.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentModal({ documents, onClose }) {
  const renderDocuments = () => {
    return Object.entries(documents).map(
      ([docName, docUrl]) => {
        return (
          <tr
            key={docName}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap px-6 py-4">
              <div className="text-sm font-medium text-gray-900">{docName.replace(/_/g, ' ')}</div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <a
               href={`http://localhost:3000/${docUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {docName +"_Doc.pdf"}
              </a>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <a
                type="button"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                href={`http://localhost:3000/${docUrl}`}
              >
                View
              </a>
            </td>
          </tr>
        );
      }
    );
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>
        <div className="mx-auto inline-block max-w-screen-lg transform rounded-lg bg-white p-4 align-middle shadow-xl transition-all sm:p-6">
          <div className="px-6 py-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Documents
            </h3>
            <div className="overflow-x-auto">
              <table className="mt-4 w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-s font-medium uppercase tracking-wider text-gray-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-s font-medium uppercase tracking-wider text-gray-500">
                      URL
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {renderDocuments()}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-100 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationModal({ action, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  {action === "accept"
                    ? "Accept Client Request"
                    : "Reject Client Request"}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to {action} this client request?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              {action === "accept" ? "Accept" : "Reject"}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Tables() {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedClientIndex, setSelectedClientIndex] = useState(null);
  const [tableData, setTableData] = useState(authorsTableData);
  const [showActionResultModal, setShowActionResultModal] = useState(false);
  const [clientName, setClientName] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // replace with the actual client ID
        const response = await fetch(`http://localhost:3000/park/request`, {
          method: "GET",
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const handleConfirm = () => {
    console.log(`Confirmed: ${action}`);
    setShowModal(false);
    setClientName(tableData[selectedClientIndex].client_name);
    setShowActionResultModal(true);
    setTableData(tableData.filter((_, index) => index !== selectedClientIndex));
// sending msg to backend 
const formData = new FormData();

formData.append("accepted", action);
console.log(action)


const request_id = tableData[selectedClientIndex]._id

// Make a POST request to the backend API to save the updated home data
fetch(`http://localhost:3000/park/accept-request/${request_id}`, {
  method: "PUT",
  body: formData,
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
   
  })
  .catch((error) => console.error(error));





    console.log(request_id)
    setSelectedClientIndex(null);
  };

  const handleViewClick = (documents) => {
    setDocuments(documents);
    setShowDocumentModal(true);
  };

  const handleCloseDocumentModal = () => {
    setShowDocumentModal(false);
  };

  const handleButtonClick = (actionType, index) => {
    setAction(actionType);
    setSelectedClientIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseActionResultModal = () => {
    setShowActionResultModal(false);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      {/* {requests.map((event) => (
        <div key={event._id}>
          <a
            href={`http://localhost:3000/${event.land_title_deed}`}
            target="_blank"
          >
            Open Document
          </a>
        </div>
      ))} */}
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            New Clients Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["client", "park name", "request date", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map(
                ({ client_pic, client_name, email, park_name, createdAt }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={client_name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={`http://localhost:3000/profileImgs/${client_pic}`} alt={client_name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {client_name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {park_name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {new Date(createdAt).toLocaleString()}
                        </Typography>
                      </td>
                      <td className={className}>
                        <button
                          className="mt-1 rounded-md bg-blue-600 py-1 px-3 text-white hover:bg-blue-700 focus:outline-none"
                          onClick={() => handleButtonClick("accept", key)}
                        >
                          Accept
                        </button>
                        <button
                          className="mt-1 ml-3 rounded-md bg-red-600 py-1 px-3 text-white hover:bg-red-700 focus:outline-none"
                          onClick={() => handleButtonClick("reject", key)}
                        >
                          Reject
                        </button>

                        <button
                          className="mt-1 ml-3 rounded-md bg-green-600 py-1 px-3 text-white hover:bg-green-700 focus:outline-none"
                          onClick={() =>
                            handleViewClick(tableData[key].documents)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Existing Clients Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "park id",
                  "park name",
                  "client name",
                  "client id",
                  "park link",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {existingClients.map(
                ({ parkId, parkName, clientName, clientId, parkLink }, key) => {
                  const className = `py-3 px-5 ${
                    key === existingClients.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={clientId}>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {parkId}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {parkName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {clientName}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {clientId}
                        </Typography>
                      </td>
                      <td className={className}>
                        <a href={parkLink} target="_blank" rel="noreferrer">
                          <Typography className="text-xs font-semibold text-blue-gray-600 underline">
                            {parkLink}
                          </Typography>
                        </a>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {showModal && (
        <ConfirmationModal
          action={action}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      )}
      {showDocumentModal && (
        <DocumentModal
          documents={documents}
          onClose={handleCloseDocumentModal}
        />
      )}
      {showActionResultModal && (
        <ActionResultModal
          action={action}
          clientName={clientName}
          onClose={handleCloseActionResultModal}
        />
      )}
    </div>
  );
}

export default Tables;
