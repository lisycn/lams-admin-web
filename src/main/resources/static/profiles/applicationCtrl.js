angular.module("lamsAdmin").controller("applicationCtrl", [ "$scope", "$rootScope", "Notification", "applicationService", "Constant", "$filter", "$stateParams", "documentService",
	function($scope,  $rootScope, Notification, applicationService, Constant, $filter, $stateParams, documentService) {

		$scope.applicationTypeCode = $stateParams.appCode;
		$scope.applicationTypeId = $rootScope.getAppTypeIdByCode($scope.applicationTypeCode);
		$scope.applicationId = $stateParams.appId;
		$scope.editApplicationForm = true;
		$scope.statuses = [ Constant.Status.RESPONDED, Constant.Status.ACCEPTED, Constant.Status.REJECTED ];
		$scope.status = Constant.Status.RESPONDED;
		$scope.employmentType = $stateParams.empType;
		
		$scope.getApplicationDetails = function() {

			applicationService.getLoanDetails($scope.applicationId, $scope.applicationTypeId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.applicationDetails = success.data.data;
						if ($scope.employmentType == Constant.EmploymentType.SALARIED) {
							$scope.getDocumentList([ Constant.documentType.PHOTO_GRAPH, Constant.documentType.PAN_CARD, Constant.documentType.AADHAR_CARD, Constant.documentType.LAST_3_MONTH_SALARY_SLIP,
								Constant.documentType.LAST_6_MONTHS_BANK_ACCOUNT_STATEMENT, Constant.documentType.FORM_16_OR_APPOIMENT_LETTER,
								Constant.documentType.INVESTMENT_PROOFS, Constant.documentType.EXISTING_LOAN_DOCUMENT, Constant.documentType.OTHER_DOCUMENT ]);
						} else if ($scope.employmentType == Constant.EmploymentType.SELF_EMPLOYED) {
							$scope.getDocumentList([ Constant.documentType.PHOTO_GRAPH, Constant.documentType.PAN_CARD, Constant.documentType.AADHAR_CARD,
								Constant.documentType.CORPORATE_ITR_SET_YEAR1, Constant.documentType.CORPORATE_ITR_SET_YEAR2,
								Constant.documentType.CORPORATE_ITR_SET_YEAR3,
								Constant.documentType.CORPORATE_BANK_ACCOUNT_STATEMENT, Constant.documentType.INDIVIDUAL_ITR_SET_YEAR1,
								Constant.documentType.INDIVIDUAL_ITR_SET_YEAR2, Constant.documentType.INDIVIDUAL_ITR_SET_YEAR3,
								Constant.documentType.INDIVIDUAL_BANK_ACCOUNT_STATEMENT ]);
						}
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		$scope.getApplicationDetails();

		

		$scope.documentList = [];
		$scope.getDocumentList = function(listOfDocumentMstId) {
			console.log("$scope.documentList---------------------------------->",$scope.documentList)
			documentService.getDocumentList($scope.applicationId, listOfDocumentMstId).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.documentList = success.data.data;
						console.log("$scope.documentList---------------------------------->",$scope.documentList)
					} else {
						Notification.warning(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		}
		
		$scope.getConnections = function(appId, status) {
			applicationService.getConnections(appId, status).then(
				function(success) {
					if (success.data.status == 200) {
						$scope.connections = success.data.data;
					} else {
						Notification.error(success.data.message);
					}
				}, function(error) {
					$rootScope.validateErrorResponse(error);
				});
		};

		$scope.getConnections($scope.applicationId, Constant.Status.RESPONDED);


		

	} ]);