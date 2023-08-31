const API_URL = "http://localhost:3000/Friends";

$(document).ready(function () {
    loadFriends();

    $("#friendForm").submit(function (e) {
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

function addFriend() {
    const book = {
    firstName: $("#firstName").val(),
    lastName: $("#lastName").val()
    };
    $.post(API_URL, book, function () {
        resetForm();
        loadBooks();
    });
}

function editFriend(id) {
    $.get(API_URL + "/" + id, function (friend) {
        $("#friendId").val(friend.id);
        $("#firstName").val(friend.firstName);
        $("#lastName").val(friend.lastName);
    });
}

function updateFriend(id) {
    const friend = {
        title: $("#firstName").val(),
        author: $("#lastName").val()
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

function deleteFriend(id) {
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