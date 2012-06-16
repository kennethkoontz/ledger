var LedgerCtrl = function($scope, $filter) {

    $scope.constructDateString = function() {
        var d = new Date(),
            day = (d.getDate().toString().length == 1) ? '0' + d.getDate() : d.getDate() 
            month = (d.getMonth().toString().length == 1) ? '0' + d.getMonth() : d.getMonth() 
            year = d.getFullYear();

        return year + '-' + month + '-' + day;
    }

    var date = $scope.constructDateString();
    var master = {
        date: date,
        transaction: 0.00,
        description: ''
    };

    $scope.date = /^\d\d\d\d-\d\d-\d\d$/;
    $scope.transaction = /^(-\d*(\.|\d)\d{0,2}|\d*(\.|\d)\d{0,2})$/   

    $scope.initialBalance = 0;
    $scope.entries = [{"date": "2012-01-01", "transaction": 0.00, "description": "Start of 2012, Initial balance"},
                      {"date": "2012-01-01", "transaction": -200, "description": "Livery for January (4 weeks)"},
                      {"date": "2012-01-05", "transaction": -21.69, "description": "1 x HiFi Lite, 1 x Pasture Mix"},
                      {"date": "2012-01-06", "transaction": 200.00, "description": "Cheque"},
                      {"date": "2012-01-19", "transaction": -10.99, "description": "1 x HiFi Lite"},
                      {"date": "2012-01-28", "transaction": -87.5, "description": "Hay from Owen Smith, 5 bales for £175"},
                      {"date": "2012-02-01", "transaction": -200, "description": "Livery for February (to 26th)"},
                      {"date": "2012-02-02", "transaction": 200.00, "description": "Cash"},
                      {"date": "2012-02-04", "transaction": 100.18, "description": "Cheque"},
                      {"date": "2012-02-09", "transaction": -43.38, "description": "2 x HiFi Lite, 2 x Pasture Mix (invoice 99)"},
                      {"date": "2012-03-01", "transaction": -200, "description": "Livery for March (to 25th)"},
                      {"date": "2012-03-02", "transaction": 200.00, "description": "Cash"}];

    $scope.insertBalances = function() {
        var currentBalance = $scope.initialBalance;

        angular.forEach($scope.entries, function(v, k) {
            currentBalance += v.transaction
            v['balance'] = accounting.formatMoney(currentBalance);
            v.transaction = accounting.formatMoney(v.transaction);
        });
    }

    $scope.submit = function() {
        var form = $scope.form,
            entries = $scope.entries;

        balance = accounting.unformat(entries[entries.length - 1].balance) + accounting.unformat(form.transaction);
        form['balance'] = accounting.formatMoney(balance);
        form.transaction = accounting.formatMoney(form.transaction);
        entries.push(form);
        $scope.form = angular.copy(master);
    };


    $scope.isSubmitDisabled = function() {
        return angular.equals($scope.form, master) || $scope.entryForm.$invalid;
    };

    $scope.form = angular.copy(master);
    $scope.insertBalances();
};
