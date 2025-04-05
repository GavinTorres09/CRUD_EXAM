import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import '../../styles/table.scss'; 
import '../../styles/modal.scss'; 



/* SAMPLE DATA */

const usersData = [
  { id: 1, avatar: "avatar_male.png", email: "Lebron@example.com", firstName: "Lebron", lastName: "Haymes" },
  { id: 2, avatar: "avatar_male.png", email: "Chandlerb@example.com", firstName: "Chandler", lastName: "Bing" },
  { id: 3, avatar: "avatar_male.png", email: "larry@example.com", firstName: "Larry", lastName: "Bird" },
  { id: 4, avatar: "avatar_female.png", email: "emma@example.com", firstName: "Emma", lastName: "Watson" },
  { id: 5, avatar: "avatar_female.png", email: "Taylor@example.com", firstName: "Taylor", lastName: "Sweep" },
  { id: 6, avatar: "avatar_female.png", email: "hayley@example.com", firstName: "Hayley", lastName: "Williams" },
  { id: 7, avatar: "avatar_male.png", email: "Ksotto@example.com", firstName: "Kai", lastName: "Sotto" },
  { id: 8, avatar: "avatar_female.png", email: "Avril@example.com", firstName: "Avril", lastName: "Lavinge" },
  { id: 9, avatar: "avatar_male.png", email: "Bossing@example.com", firstName: "Joel", lastName: "Malupiton" },
  { id: 10, avatar: "avatar_female.png", email: "nadine@example.com", firstName: "Nadine", lastName: "Loosethread" },
];


const usersPerPage = 10;

function UserTable() {
	/* initialization for all the functions */
	const [users, setUsers] = useState(usersData);
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [viewModalOpen, setViewModalOpen] = useState(false); // For View Modal
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [addModalOpen, setAddModalOpen] = useState(false);
	const [newUser, setNewUser] = useState({ email: "", firstName: "", lastName: "" });
	const [editForm, setEditForm] = useState({ email: "", firstName: "", lastName: "" });
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(Math.ceil(usersData.length / usersPerPage));
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  /* fetching data from API*/
  useEffect(() => {
    setTimeout(() => {
      setUsers(usersData);
      setLoading(false);
    }, 2000); // Simulate a delay of 2 seconds
  }, []);

    
  /*Pagination logic */
  const fetchUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return users.slice(startIndex, startIndex + usersPerPage);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

   const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


/* ADD MODAL FUNCTIONS */
/* to Open Add Modal */
const handleAddClick = () => {
	setAddModalOpen(true);
  };
  
  /* Handle Save New User */

  const handleSaveNewUser = () => {
    /* Check if all fields are filled */
    if (!newUser.email || !newUser.firstName || !newUser.lastName) {
      alert("All fields are required!");
      return; /* Prevent submission if fields are empty */
    }
    
    /* Generate a new user ID */
    const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    
    /* Create new user data */
    const newUserData = {
      id: newId,
      avatar: "avatar_default.png",
      ...newUser,
    };
    
    /* Add new user to the users list */
    const updatedUsers = [...users, newUserData];
    
    /* Recalculate total pages and set total pages */
    setTotalPages(Math.ceil(updatedUsers.length / usersPerPage));
    
    /* If the new user exceeds the current page limit, move to the next page */
    if (updatedUsers.length > currentPage * usersPerPage) {
      setCurrentPage(Math.ceil(updatedUsers.length / usersPerPage)); /* Go to the next page */
    }
    
    /* Update users state */
    setUsers(updatedUsers);
    
    /* Show success message using alert */
    alert("User successfully added!");
    
    /* Close the modal and reset the input fields */
    setAddModalOpen(false);
    setNewUser({ email: "", firstName: "", lastName: "" });
  };
    
  /* Handle change in the input fields for the new user */
  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value, /* Update the specific field (email, firstName, lastName) */
    }));
  };
    
    
  
  /* VIEW MODAL FUNCTIONS */
  /* Handle View button click */
  const handleViewClick = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };
    
  /* Close View Modal */
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedUser(null);
  };
  
  /* EDIT MODAL FUNCTIONS */
  /* Open Edit Modal */
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditForm(user);
    setEditModalOpen(true);
  };
    
  /* Handle Edit Input Change */
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
    
  /* Save Edited User */
  const handleSaveEdit = () => {
    /* Check if all fields are filled */
    if (!editForm.email || !editForm.firstName || !editForm.lastName) {
      alert("All fields are required!");
      return; /* Prevent submission if fields are empty */
    }
    
    /* Update the users list with the edited user */
    setUsers(users.map((user) => (user.id === selectedUser.id ? editForm : user)));
    
    /* Show success message using alert */
    alert("User successfully edited!");
    
    /* Close the modal */
    setEditModalOpen(false);
  };
    
  /* DELETE MODAL FUNCTIONS */
  /* Open Delete Modal */
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };
    
  /* Confirm Delete */
  const confirmDelete = () => {
    /* Remove the user from the list */
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    
    /* Recalculate the total number of pages */
    const newTotalPages = Math.ceil(updatedUsers.length / usersPerPage);
    setTotalPages(newTotalPages);
    
    /* If the current page is greater than the total pages, adjust the current page */
    if (currentPage > newTotalPages) {
      /* If the current page is greater than the number of pages, go to the last page */
      setCurrentPage(newTotalPages);
    }
    
    /* If no users are left, reset to the first page and show a "No data available" message */
    if (updatedUsers.length === 0) {
      setCurrentPage(1);
    }
    
    /* Show success message after deletion */
    alert("User successfully deleted!");
    
    /* Close the delete modal */
    setModalOpen(false);
  };

/*HTML */
  return (
    <Container>

      {/* Show loading indicator while data is being fetched */}
      {loading ? (
        <div className="text-center mt-5">
          <h4>Loading users...</h4>
        </div>
      ) : (
        <>

      {/* Add User Button */}
      <div className="mt-3 text-right">
	  <Button className="add-user-btn" onClick={handleAddClick}>+ Add User</Button>
      </div>

      {/* Users Table */}
	  <Table className="mt-3 table-modern table-striped table-hover shadow-sm rounded">
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fetchUsers().map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-circle avatar-border"
                  width="50"
                  height="40"
                />
              </td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
<div className="action-buttons">
  <Button color="info" onClick={() => handleViewClick(user)} aria-label="View User">
    <i className="fa-solid fa-eye"></i> {/* Instead of <FaEye /> */}
  </Button>
  <Button color="warning" size="sm" className="mr-2" onClick={() => handleEditClick(user)} aria-label="Edit User">
    <i className="fa-solid fa-edit"></i> {/* Instead of <FaEdit /> */}
  </Button>
  <Button color="danger" size="sm" onClick={() => handleDeleteClick(user)} aria-label="Delete User">
    <i className="fa-solid fa-trash"></i> {/* Instead of <FaTrash /> */}
  </Button>
</div>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>
  
   {/* Pagination */}
<div className="pagination-controls text-center mt-3">
  {/* Show "No data available" if there are no users */}
  {users.length === 0 ? (
    <div>No data available</div>
  ) : (
    <>
      <Button
        className="custom-pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <span className="mx-3">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className="custom-pagination-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </>
  )}
</div>



  {/*MODALS SECTION */}

    {/* Add User Modal */}
	<Modal isOpen={addModalOpen} toggle={() => setAddModalOpen(false)} className="add-user-modal">
	<ModalHeader toggle={() => setAddModalOpen(false)}>Add New User</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="email" style={{ color: "black" }}>Email</Label>
        <Input type="email" id="email" name="email" value={newUser.email} onChange={handleAddUserChange} />
      </FormGroup>
      <FormGroup>
        <Label for="firstName" style={{ color: "black" }}>First Name</Label>
        <Input type="text" id="firstName" name="firstName" value={newUser.firstName} onChange={handleAddUserChange} />
      </FormGroup>
      <FormGroup>
        <Label for="lastName" style={{ color: "black" }}>Last Name</Label>
        <Input type="text" id="lastName" name="lastName" value={newUser.lastName} onChange={handleAddUserChange} />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button className="btn-cancel" onClick={() => setAddModalOpen(false)}>Cancel</Button>
    <Button className="btn-add-user" onClick={handleSaveNewUser}>Add User</Button>
  </ModalFooter>
</Modal>


  {/* Edit User Modal */}
<Modal isOpen={editModalOpen} toggle={() => setEditModalOpen(false)} className="edit-modal">
  <ModalHeader toggle={() => setEditModalOpen(false)}>Edit User</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" id="email" name="email" value={editForm.email} onChange={handleEditChange} />
      </FormGroup>
      <FormGroup>
        <Label for="firstName">First Name</Label>
        <Input type="text" id="firstName" name="firstName" value={editForm.firstName} onChange={handleEditChange} />
      </FormGroup>
      <FormGroup>
        <Label for="lastName">Last Name</Label>
        <Input type="text" id="lastName" name="lastName" value={editForm.lastName} onChange={handleEditChange} />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={() => setEditModalOpen(false)}>Cancel</Button>
    <Button color="primary" onClick={handleSaveEdit}>Save Changes</Button>
  </ModalFooter>
</Modal>



{/* View User Modal */}
<Modal isOpen={viewModalOpen} toggle={handleCloseViewModal} className="view-user-modal">
  <ModalHeader toggle={handleCloseViewModal}>User Details</ModalHeader>
  <ModalBody>
    {selectedUser && (
      <>
       <div className="d-flex align-items-center">
        <img
          src={selectedUser.avatar}
          alt="avatar"
          className="square-avatar mr-3"
          width="70"
          height="70"
        />
        <div>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
        </div>
      </div>
      </>
    )}
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={handleCloseViewModal}>Close</Button>
  </ModalFooter>
</Modal>


  {/* Soft Confirmation Modal */}
{selectedUser && (
  <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} className="delete-modal">
    <ModalHeader toggle={() => setModalOpen(false)}>Delete User</ModalHeader>
    <ModalBody>
      <p>Are you sure you want to delete this user?</p>
      <div className="d-flex align-items-center">
        <img
          src={selectedUser.avatar}
          alt="avatar"
          className="square-avatar mr-3"
          width="70"
          height="70"
        />
        <div>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
      <Button color="danger" onClick={() => setShowFinalConfirm(true)}>Delete</Button>
    </ModalFooter>
  </Modal>
)}

{/* Hard Confirmation Modal */}
<Modal isOpen={showFinalConfirm} toggle={() => setShowFinalConfirm(false)} className="final-delete-modal">
  <ModalHeader toggle={() => setShowFinalConfirm(false)}>Final Confirmation</ModalHeader>
  <ModalBody>
    <p><strong>This action cannot be undone. Are you sure you want to delete this user?</strong> Once deleted, this user will be permanently removed from the system.</p>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={() => setShowFinalConfirm(false)}>Cancel</Button>
    <Button color="danger" onClick={() => { 
      confirmDelete();
      setShowFinalConfirm(false);
      setModalOpen(false); 
    }}>
      Yes, Delete
    </Button>
  </ModalFooter>
</Modal>
</>
      )}
    </Container>
  );
}

export default UserTable;