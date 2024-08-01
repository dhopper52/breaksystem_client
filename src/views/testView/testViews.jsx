import React, { useState } from "react";
import * as XLSX from "xlsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const ImportUsersComponent = () => {
  const [users, setUsers] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      setUsers(worksheet);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = () => {
    // Handle the submission of the users array to your backend or further processing
    console.log("Imported Users:", users);
  };

  return (
    <div className="import-users">
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Excel File</Form.Label>
          <Form.Control
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          Import Users
        </Button>
      </Form>
      {users.length > 0 && (
        <div className="users-preview mt-3">
          <h5>Preview Imported Users</h5>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{JSON.stringify(user)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImportUsersComponent;
