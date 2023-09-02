const API_URL = "http://localhost:3000/Friends";

$(function () {
    loadFriends();

    $("#friendForm").on("submit", function (e) {
        e.preventDefault();
        let friendId = $("#friendId").val();
        if (friendId) {
            updateFriend(friendId);
        } else {
            addFriend();
        }
    });
});

function loadFriends() {
    $.get(API_URL, function (data) {
        let rows = "";
        data.forEach(friend => {
            rows += `<tr>
                    <td>${friend.id}</td>
                    <td>${friend.firstName}</td>
                    <td>${friend.lastName}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editFriend(${friend.id})">Edit</button>
                        <button class="btn btn-success" onclick="deleteFriend(${friend.id})">Delete</button>
                    </td>
                </tr>`;
        });
        $("#friendsTableBody").html(rows);
    });
}

function addFriend() { // Add a friend's first name and last name to the Friends App as well as to the db.json file.
    const friend = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val()
    };
    $.post(API_URL, friend, function () {
        resetForm();
        loadFriends();
    });
}

function editFriend(id) { // Edit a friend's first name, last name, or both by the clicking the yellow edit button. Once a change is made, click the submit button. 
    $.get(API_URL + "/" + id, function (friend) {
        $("#friendId").val(friend.id);
        $("#firstName").val(friend.firstName);
        $("#lastName").val(friend.lastName);
    });
}

function updateFriend(id) { // Update a friend's first name, last name, or both after one click of the submit button.  The change is updated in the db.json file.
    const friend = {
        friendId: $("#friendId").val(),
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val()
    };
    $.ajax({
        url: API_URL + "/" + id,
        type: 'PUT',
        data: friend,
        success: function () {
            resetForm();
            loadFriends();
        }
    });
}

function deleteFriend(id) { //Delete a friend's first and last name as well as their ID by clicking the green delete button.
    $.ajax({
        url: API_URL + "/" + id,
        type: 'DELETE',
        success: function () {
            loadFriends();
        }
    });
}

function resetForm() {
    $("#friendId").val("");
    $("#firstName").val("");
    $("#lastName").val("");
}