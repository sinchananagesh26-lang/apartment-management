// =====================================================
// RESIDENT DATA
// =====================================================

var residents = [

    {
        id: "R001",
        name: "Sanjeevini",
        flat: "A-101",
        phone: "9876543210",
        password: "1234"
    },

    {
        id: "R002",
        name: "Rahul",
        flat: "A-102",
        phone: "9876543211",
        password: "1234"
    },

    {
        id: "R003",
        name: "Priya",
        flat: "A-103",
        phone: "9876543212",
        password: "1234"
    },

    {
        id: "R004",
        name: "Arjun",
        flat: "A-104",
        phone: "9876543213",
        password: "1234"
    },

    {
        id: "R005",
        name: "Neha",
        flat: "A-105",
        phone: "9876543214",
        password: "1234"
    },

    {
        id: "R006",
        name: "Karan",
        flat: "B-201",
        phone: "9876543215",
        password: "1234"
    },

    {
        id: "R007",
        name: "Ananya",
        flat: "B-202",
        phone: "9876543216",
        password: "1234"
    },

    {
        id: "R008",
        name: "Rohit",
        flat: "B-203",
        phone: "9876543217",
        password: "1234"
    },

    {
        id: "R009",
        name: "Meera",
        flat: "B-204",
        phone: "9876543218",
        password: "1234"
    },

    {
        id: "R010",
        name: "Vikram",
        flat: "C-301",
        phone: "9876543219",
        password: "1234"
    },

    {
        id: "R011",
        name: "Divya",
        flat: "C-302",
        phone: "9876543220",
        password: "1234"
    },

    {
        id: "R012",
        name: "Aditya",
        flat: "C-303",
        phone: "9876543221",
        password: "1234"
    }

];


// =====================================================
// ADMIN DETAILS
// =====================================================

var admin = {

    id: "ADMIN",

    password: "admin@123"

};


// =====================================================
// CURRENT USER
// =====================================================

var currentUser = null;

var currentRole = null;


// =====================================================
// LOAD SAVED RESIDENTS
// =====================================================

var savedResidents =
    localStorage.getItem("residents");


if (savedResidents !== null) {

    var storedResidents =
        JSON.parse(savedResidents);


    for (
        var i = 0;
        i < storedResidents.length;
        i++
    ) {

        residents.push(
            storedResidents[i]
        );

    }

}


// =====================================================
// LOAD MAINTENANCE REQUESTS
// =====================================================

var maintenanceRequests =
    JSON.parse(
        localStorage.getItem(
            "maintenanceRequests"
        )
    ) || [];


// =====================================================
// LOAD FACILITY BOOKINGS
// =====================================================

var facilityBookings =
    JSON.parse(
        localStorage.getItem(
            "facilityBookings"
        )
    ) || [];


// =====================================================
// LOGIN SCREEN
// =====================================================

function showResidentLogin() {

    document.getElementById(
        "residentLoginBox"
    ).style.display = "block";


    document.getElementById(
        "adminLoginBox"
    ).style.display = "none";

}


function showAdminLogin() {

    document.getElementById(
        "residentLoginBox"
    ).style.display = "none";


    document.getElementById(
        "adminLoginBox"
    ).style.display = "block";

}


// =====================================================
// SHOW SIGNUP
// =====================================================

function showSignup() {

    document.getElementById(
        "loginPage"
    ).style.display = "none";


    document.getElementById(
        "signupPage"
    ).style.display = "flex";

}


// =====================================================
// RESIDENT LOGIN
// =====================================================

function residentLogin() {

    var id =
        document.getElementById(
            "residentLoginId"
        )
        .value
        .trim()
        .toUpperCase();


    var password =
        document.getElementById(
            "residentLoginPassword"
        )
        .value;


    var message =
        document.getElementById(
            "residentLoginMessage"
        );


    var foundResident = null;


    for (
        var i = 0;
        i < residents.length;
        i++
    ) {

        if (

            residents[i].id === id &&

            residents[i].password === password

        ) {

            foundResident =
                residents[i];

            break;

        }

    }


    if (foundResident !== null) {

        currentUser =
            foundResident;

        currentRole =
            "resident";


        message.innerText = "";


        showResidentDashboard();

    }

    else {

        message.innerText =
            "Invalid Resident ID or Password.";

        message.style.color = "red";

    }

}


// =====================================================
// ADMIN LOGIN
// =====================================================

function adminLogin() {

    var id =
        document.getElementById(
            "adminLoginId"
        )
        .value
        .trim()
        .toUpperCase();


    var password =
        document.getElementById(
            "adminLoginPassword"
        )
        .value;


    var message =
        document.getElementById(
            "adminLoginMessage"
        );


    if (

        id === admin.id &&

        password === admin.password

    ) {

        currentUser =
            admin;

        currentRole =
            "admin";


        message.innerText = "";


        showAdminDashboard();

    }

    else {

        message.innerText =
            "Invalid Admin ID or Password.";

        message.style.color = "red";

    }

}


// =====================================================
// SHOW RESIDENT DASHBOARD
// =====================================================

function showResidentDashboard() {

    document.getElementById(
        "loginPage"
    ).style.display = "none";


    document.getElementById(
        "signupPage"
    ).style.display = "none";


    document.getElementById(
        "adminPage"
    ).style.display = "none";


    document.getElementById(
        "residentPage"
    ).style.display = "block";


    // Resident information

    document.getElementById(
        "residentWelcome"
    ).innerText =
        "Welcome, " +
        currentUser.name +
        " 👋";


    document.getElementById(
        "myResidentId"
    ).innerText =
        currentUser.id;


    document.getElementById(
        "myResidentName"
    ).innerText =
        currentUser.name;


    document.getElementById(
        "myResidentFlat"
    ).innerText =
        currentUser.flat;


    document.getElementById(
        "myResidentPhone"
    ).innerText =
        currentUser.phone;

}


// =====================================================
// SHOW ADMIN DASHBOARD
// =====================================================

function showAdminDashboard() {

    document.getElementById(
        "loginPage"
    ).style.display = "none";


    document.getElementById(
        "signupPage"
    ).style.display = "none";


    document.getElementById(
        "residentPage"
    ).style.display = "none";


    document.getElementById(
        "adminPage"
    ).style.display = "block";


    displayResidentsForAdmin();

    displayMaintenanceForAdmin();

    displayBookingsForAdmin();

    updateAdminStats();

}


// =====================================================
// CREATE NEW RESIDENT ACCOUNT
// =====================================================

function createAccount() {

    var name =
        document.getElementById(
            "newName"
        ).value.trim();


    var flat =
        document.getElementById(
            "newFlat"
        )
        .value
        .trim()
        .toUpperCase();


    var phone =
        document.getElementById(
            "newPhone"
        )
        .value
        .trim();


    var password =
        document.getElementById(
            "newPassword"
        ).value;


    var confirmPassword =
        document.getElementById(
            "confirmPassword"
        ).value;


    var message =
        document.getElementById(
            "signupMessage"
        );


    // Check phone

    if (!/^[0-9]{10}$/.test(phone)) {

        message.innerText =
            "Enter a valid 10-digit phone number.";

        message.style.color = "red";

        return;

    }


    // Check password

    if (password.length < 4) {

        message.innerText =
            "Password must contain at least 4 characters.";

        message.style.color = "red";

        return;

    }


    // Confirm password

    if (password !== confirmPassword) {

        message.innerText =
            "Passwords do not match.";

        message.style.color = "red";

        return;

    }


    // Check duplicate flat

    for (
        var i = 0;
        i < residents.length;
        i++
    ) {

        if (
            residents[i].flat === flat
        ) {

            message.innerText =
                "This flat is already registered.";

            message.style.color = "red";

            return;

        }

    }


    // Check duplicate phone

    for (
        var j = 0;
        j < residents.length;
        j++
    ) {

        if (
            residents[j].phone === phone
        ) {

            message.innerText =
                "This phone number is already registered.";

            message.style.color = "red";

            return;

        }

    }


    // Create new ID

    var newNumber =
        residents.length + 1;


    var newId =
        "R" +
        String(newNumber).padStart(3, "0");


    // New resident

    var newResident = {

        id: newId,

        name: name,

        flat: flat,

        phone: phone,

        password: password

    };


    // Add to residents array

    residents.push(
        newResident
    );


    // Save only newly-created residents

    var saved =
        JSON.parse(
            localStorage.getItem(
                "residents"
            )
        ) || [];


    saved.push(
        newResident
    );


    localStorage.setItem(

        "residents",

        JSON.stringify(saved)

    );


    alert(

        "Account created successfully!\n\n" +

        "Resident ID: " +
        newId +

        "\nPassword: " +
        password

    );


    // Clear form

    document
        .querySelector(
            "#signupPage form"
        )
        .reset();


    // Go back to login

    document.getElementById(
        "signupPage"
    ).style.display = "none";


    document.getElementById(
        "loginPage"
    ).style.display = "flex";


    showResidentLogin();


    document.getElementById(
        "residentLoginId"
    ).value = newId;

}


// =====================================================
// SUBMIT MAINTENANCE REQUEST
// =====================================================

function submitMaintenance() {

    if (
        currentRole !== "resident"
    ) {

        alert(
            "Please login as a resident."
        );

        return;

    }


    var type =
        document.getElementById(
            "maintenanceType"
        ).value;


    var description =
        document.getElementById(
            "maintenanceDescription"
        )
        .value
        .trim();


    if (
        type === "" ||
        description === ""
    ) {

        alert(
            "Please fill all details."
        );

        return;

    }


    var requestNumber =
        maintenanceRequests.length + 1;


    var requestId =
        "M" +
        String(requestNumber).padStart(3, "0");


    var request = {

        id: requestId,

        residentId:
            currentUser.id,

        residentName:
            currentUser.name,

        flat:
            currentUser.flat,

        type:
            type,

        description:
            description,

        status:
            "Pending"

    };


    maintenanceRequests.push(
        request
    );


    localStorage.setItem(

        "maintenanceRequests",

        JSON.stringify(
            maintenanceRequests
        )

    );


    alert(

        "Maintenance request submitted successfully!\n\n" +

        "Request ID: " +
        requestId +

        "\nStatus: Pending"

    );


    document.getElementById(
        "maintenanceForm"
    ).reset();

}


// =====================================================
// FACILITY BOOKING
// =====================================================

function bookFacility() {

    if (
        currentRole !== "resident"
    ) {

        alert(
            "Please login as a resident."
        );

        return;

    }


    var facility =
        document.getElementById(
            "facilityName"
        ).value;


    var date =
        document.getElementById(
            "bookingDate"
        ).value;


    var time =
        document.getElementById(
            "bookingTime"
        ).value;


    if (
        facility === "" ||
        date === "" ||
        time === ""
    ) {

        alert(
            "Please fill all booking details."
        );

        return;

    }


    var bookingNumber =
        facilityBookings.length + 1;


    var bookingId =
        "B" +
        String(bookingNumber).padStart(3, "0");


    var booking = {

        id: bookingId,

        residentId:
            currentUser.id,

        residentName:
            currentUser.name,

        flat:
            currentUser.flat,

        facility:
            facility,

        date:
            date,

        time:
            time

    };


    facilityBookings.push(
        booking
    );


    localStorage.setItem(

        "facilityBookings",

        JSON.stringify(
            facilityBookings
        )

    );


    alert(

        "Facility booked successfully!\n\n" +

        "Booking ID: " +
        bookingId +

        "\nFacility: " +
        facility +

        "\nDate: " +
        date +

        "\nTime: " +
        time

    );


    document.getElementById(
        "bookingForm"
    ).reset();

}


// =====================================================
// ADMIN - DISPLAY RESIDENTS
// =====================================================

function displayResidentsForAdmin() {

    var tableBody =
        document.getElementById(
            "adminResidentTableBody"
        );


    tableBody.innerHTML = "";


    for (
        var i = 0;
        i < residents.length;
        i++
    ) {

        var row =
            tableBody.insertRow();


        row.insertCell(0).innerText =
            residents[i].id;


        row.insertCell(1).innerText =
            residents[i].name;


        row.insertCell(2).innerText =
            residents[i].flat;


        row.insertCell(3).innerText =
            residents[i].phone;

    }

}


// =====================================================
// ADMIN - DISPLAY MAINTENANCE
// =====================================================

function displayMaintenanceForAdmin() {

    var tableBody =
        document.getElementById(
            "maintenanceTableBody"
        );


    tableBody.innerHTML = "";


    if (
        maintenanceRequests.length === 0
    ) {

        var row =
            tableBody.insertRow();


        var cell =
            row.insertCell(0);


        cell.colSpan = 6;


        cell.innerText =
            "No maintenance requests yet.";

        return;

    }


    for (
        var i = 0;
        i < maintenanceRequests.length;
        i++
    ) {

        var request =
            maintenanceRequests[i];


        var row =
            tableBody.insertRow();


        row.insertCell(0).innerText =
            request.id;


        row.insertCell(1).innerText =
            request.residentName;


        row.insertCell(2).innerText =
            request.flat;


        row.insertCell(3).innerText =
            request.type;


        row.insertCell(4).innerText =
            request.description;


        row.insertCell(5).innerText =
            request.status;

    }

}


// =====================================================
// ADMIN - DISPLAY BOOKINGS
// =====================================================

function displayBookingsForAdmin() {

    var tableBody =
        document.getElementById(
            "bookingTableBody"
        );


    tableBody.innerHTML = "";


    if (
        facilityBookings.length === 0
    ) {

        var row =
            tableBody.insertRow();


        var cell =
            row.insertCell(0);


        cell.colSpan = 6;


        cell.innerText =
            "No facility bookings yet.";

        return;

    }


    for (
        var i = 0;
        i < facilityBookings.length;
        i++
    ) {

        var booking =
            facilityBookings[i];


        var row =
            tableBody.insertRow();


        row.insertCell(0).innerText =
            booking.id;


        row.insertCell(1).innerText =
            booking.residentName;


        row.insertCell(2).innerText =
            booking.flat;


        row.insertCell(3).innerText =
            booking.facility;


        row.insertCell(4).innerText =
            booking.date;


        row.insertCell(5).innerText =
            booking.time;

    }

}


// =====================================================
// ADMIN STATISTICS
// =====================================================

function updateAdminStats() {

    document.getElementById(
        "totalResidents"
    ).innerText =
        residents.length;


    document.getElementById(
        "totalMaintenance"
    ).innerText =
        maintenanceRequests.length;


    document.getElementById(
        "totalBookings"
    ).innerText =
        facilityBookings.length;

}


// =====================================================
// ADMIN RESIDENT SEARCH
// =====================================================

function searchAdminResidents() {

    var search =
        document.getElementById(
            "adminResidentSearch"
        )
        .value
        .toLowerCase();


    var table =
        document.getElementById(
            "adminResidentTableBody"
        );


    var rows =
        table.getElementsByTagName(
            "tr"
        );


    for (
        var i = 0;
        i < rows.length;
        i++
    ) {

        var name =
            rows[i]
            .getElementsByTagName("td")[1]
            .innerText
            .toLowerCase();


        if (
            name.includes(search)
        ) {

            rows[i].style.display = "";

        }

        else {

            rows[i].style.display =
                "none";

        }

    }

}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    currentUser = null;

    currentRole = null;


    document.getElementById(
        "residentPage"
    ).style.display = "none";


    document.getElementById(
        "adminPage"
    ).style.display = "none";


    document.getElementById(
        "signupPage"
    ).style.display = "none";


    document.getElementById(
        "loginPage"
    ).style.display = "flex";


    document.getElementById(
        "residentLoginId"
    ).value = "";


    document.getElementById(
        "residentLoginPassword"
    ).value = "";


    document.getElementById(
        "adminLoginId"
    ).value = "";


    document.getElementById(
        "adminLoginPassword"
    ).value = "";


    showResidentLogin();

}