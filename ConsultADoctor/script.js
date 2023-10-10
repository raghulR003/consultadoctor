var doctorApp = angular.module('doctorApp', []);

doctorApp.controller('DoctorController', function ($scope, $http) {
    // Initialize the doctors array
    $scope.doctors = [];
    $scope.selectedRank = null; // Initialize selected rank
    $scope.shouldGenerateRank = false; // Flag to control rank generation

    // Function to check availability
    $scope.checkAvailability = function (doctor) {
        // Update the button based on the selected rank
        if ($scope.selectedRank === doctor.Rank) {
            doctor.availabilityStatus = 'Available';
            doctor.buttonClass = 'available';
            doctor.showBookButton = true;
        } else {
            doctor.availabilityStatus = 'Unavailable';
            doctor.buttonClass = 'unavailable';
            doctor.showBookButton = false;
        }
    };

    // Function to generate a random rank and highlight cards with the same rank
    $scope.generateRandomRank = function () {
        // Generate a random rank value between 1 and 15
        var randomRank = Math.floor(Math.random() * 15) + 1;

        // Update the topValue with the generated rank
        $scope.topValue = 'You rank at: ' + randomRank;
        $scope.selectedRank = randomRank; // Set selected rank
        $scope.shouldGenerateRank = true; // Enable rank generation

        // Highlight cards with the same rank
        $scope.doctors.forEach(function (doctor) {
            doctor.highlight = doctor.Rank === randomRank;
        });
    };

    // Function to handle topValue click
    $scope.handleTopValueClick = function () {
        // Generate rank and highlight cards only when allowed
        if ($scope.shouldGenerateRank) {
            $scope.generateRandomRank();
        }
    };

    // Fetch doctor data from the server
    $http.get('http://localhost:3000/doctors')
        .then(function (response) {
            // Handle the successful response
            $scope.doctors = response.data;
        })
        .catch(function (error) {
            // Handle any errors
            console.error(error);
        });

    // Initialize topValue
    $scope.topValue = 'Welcome to Doctor Information';
});
