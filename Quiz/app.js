// Define the AngularJS module
var app = angular.module('quizApp', []);

// Create a controller for the quiz
app.controller('QuizController', ['$scope', function($scope) {
    // Initialize form data
    $scope.formData = {};

    // Function to submit the form
    $scope.submitForm = function() {
        // Handle form submission logic here
        // You can access form data in $scope.formData
        console.log('Form submitted with data:', $scope.formData);
        // Add further processing or submission logic as needed
    };
}]);
app.controller('myCtrl', function($scope) {
    $scope.selectedItems = [];

    $scope.toggleSelection = function(item) {
        var index = $scope.selectedItems.indexOf(item);
        if (index === -1) {
            $scope.selectedItems.push(item);
        } else {
            $scope.selectedItems.splice(index, 1);
        }
    };

    $scope.isSelected = function(item) {
        return $scope.selectedItems.indexOf(item) !== -1;
    };
});
app.controller('SymptomController', ['$scope', '$http', function($scope, $http) {
    $scope.formData = {
        symptoms: [{ value: '', suggestions: [] }]
    };

    // Function to add a new symptom input field
    $scope.addSymptom = function() {
        if ($scope.formData.symptoms.length < 5) {
            $scope.formData.symptoms.push({ value: '', suggestions: [] });
        }
    };

    // Function to remove a symptom input field
    $scope.removeSymptom = function(index) {
        $scope.formData.symptoms.splice(index, 1);
    };
}]);

app.directive('ngListenInput', function() {
    return {
        link: function(scope, element) {
            element.on('focus', function() {
                element.addClass('input-focus');
            });
            element.on('blur', function() {
                element.removeClass('input-focus');
            });
        }
    };
});