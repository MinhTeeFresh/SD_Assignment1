$(function () {

    /**
     * @description These start when the website starts
     * They initialize all the tables to start as hidden
     */
    $('#tweetTable').hide();
    $('#userID').hide();
    $('#searchResult').hide();

    /**
     * GET method for All Tweets table
     * 
     * @description This is a method for grabbing all the
     * information needed to display all tweets. When requested
     * by the server from the click of the tweets button.
     * The Jquery makes the table visible as well as appends
     * the the html table tweetTable with the specific information
     * required.
     */
    $('#tweetBtn').on('click', function () {
        $.ajax({
            method: 'GET',
            url: '/tweets',
            contentType: 'application/json',
            success: function (data) {
                $('#tweetTable').toggle();

                var tbodyEL = $('#tweetTable > tbody');

                tbodyEL.html('');

                let tweet_data = '';
                $.each(data, function (key, value) {
                    tweet_data += '<tr>';
                    tweet_data += '<td>' + value.created_at + '</td>';
                    tweet_data += '<td>' + value.text + '</td>';
                    tweet_data += '<td>' + value.id + '</td>';
                    tweet_data += '</tr>';
                });
                $('#tweetTable').append(tweet_data);
            }

        })
    });

    /**
     * @description GET method for All Users table
     * 
     * This ajax call will append the html table
     * userID with the necessary information when the
     * website starts.
     */
    $.ajax({
        method: 'GET',
        url: '/tweets',
        contentType: 'application/json',
        success: function (data) {

            var tbodyEL = $('#userID > tbody');

            tbodyEL.html('');

            let tweet_data = '';
            $.each(data, function (key, value) {
                tweet_data += '<tr>';
                tweet_data += '<td>' + value.user.id + '</td>';
                tweet_data += '</tr>';
            });
            $('#userID').append(tweet_data);
        }

    })

    /**
     * @description This is a small function to toggle
     * the All Users table when the userBtn is pressed.
     */
    $('#userBtn').on('click', function () {
        $('#userID').toggle();
    });

    /**
     * @description A GET method for the tweet search
     * 
     * This method retrieves the information in the search
     * field and sends that to the server as an id parameter.
     * When the necessary index is retrieved back, then the
     * method appends the table searchResult with the necessary
     * information.
     */
    $('#search').on('click', function (event) {
        event.preventDefault();
        $('#searchResult').show();

        let id = $('#searchEntry').val();

        $.ajax({
            url: '/tweets/' + id,
            contentType: 'application/json',
            success: function (response) {
                var tbodyEl = $('#searchResult > tbody');

                tbodyEl.html('');

                let tweet_data = '';
                tweet_data += '<tr>';
                tweet_data += '<td>' + response.created_at + '</td>';
                tweet_data += '<td>' + response.text + '</td>';
                tweet_data += '</tr>';
                $('#searchResult').append(tweet_data);
            }
        });
    });

    /**
     * @description POST method for creating a new tweet.
     * 
     * When the button is clicked, the method will retrieve
     * the information in the fields and some default information
     * and send it to the server as data. When the information is
     * returned the server will clear the fields.
     */
    $('#add').on('click', function (event) {
        event.preventDefault();
        var dt = new Date().toString();

        $.ajax({
            url: '/tweets',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                created_at: dt,
                text: $('#text').val(),
                id: $('#userFill').val(),
                user: {
                    id: Math.min(),
                    screen_name: null
                }
            }),
            success: function (response) {
                clearInputs();
                console.log(response);
            }
        })
    });

    /**
     * @description DELETE method for deleting a tweet
     * 
     * When the delete button is clicked, this method
     * will retrieve the information in the field
     * and send it to the server as an id parameter.
     */
    $('#delete').on('click', function (event) {
        event.preventDefault();
        var id = $('#delEntry').val();

        $.ajax({
            method: 'DELETE',
            url: '/tweets/' + id,
            contentType: 'application/json',
            success: function (data) {
                console.log(data);
            }
        })
    });

    /**
     * @description PUT method for changing a screen name
     * 
     * When the change button is clicked, the method will
     * obtain the information from the two fields and send
     * the old name field as a parameter and the new name
     * information as data.
     */
    $('#change').on('click', function (event) {
        event.preventDefault();
        var id = $('#oldName').val();
        var newName = $('#newName').val();

        $.ajax({
            url: '/tweets/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function (response) {
                console.log(response);
            }
        })
    })

    /**
     * @description This is a small field for clearing out
     * fields in the create tweet task
     */
    function clearInputs() {
        $("#userFill").val('');
        $("#text").val('');
    }



});